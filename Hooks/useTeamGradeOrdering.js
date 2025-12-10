import { useState, useEffect, useRef } from 'react';
import Adminfetcher from '../lib/Adminfetcher';
import {
  categorizeTeamsByAgeGroup,
  categorizeTeamsBySeniorJunior,
  groupByCompetitionName,
} from '../utils/group_assets_by';

export const useTeamGradeOrdering = (
  organizationDetails,
  AccType,
  accountId,
  groupAssetsByAllAgeGroups,
  refetchOrganizationDetails
) => {
  const [orderedGroups, setOrderedGroups] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const isInitialized = useRef(false);

  // Initialize ordered groups when data is loaded or refreshed
  useEffect(() => {
    if (!organizationDetails?.data?.attributes) return;

    // ONLY initialize once on first load or after explicit reset
    if (isInitialized.current) {
      return;
    }

    isInitialized.current = true;

    const groupedItems = extractAndGroupItems(
      organizationDetails,
      AccType,
      groupAssetsByAllAgeGroups
    );

    if (Object.keys(groupedItems).length > 0) {
      const sortedGroups = sortGroupedItems(groupedItems, AccType);
      setOrderedGroups(sortedGroups);
    }
  }, [organizationDetails, AccType, groupAssetsByAllAgeGroups]);

  // Handle drag end
  const handleDragEnd = result => {
    if (!result.destination) return;

    const groupName = result.source.droppableId;

    const items = Array.from(orderedGroups[groupName] || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOrderedGroups(prev => ({
      ...prev,
      [groupName]: items,
    }));

    setHasUnsavedChanges(true);
  };

  // Generate complete ordering data for all groups
  const getAllOrderingData = () => {
    const allOrderingData = [];

    Object.entries(orderedGroups).forEach(([groupName, items]) => {
      items.forEach((item, index) => {
        allOrderingData.push({
          id: item.id,
          sortOrder: index + 1,
        });
      });
    });

    return allOrderingData;
  };

  // Save ordering to CMS
  const handleSaveOrdering = async () => {
    const allOrderingData = getAllOrderingData();
    setIsSaving(true);

    try {
      const response = await Adminfetcher(
        '/account/update-team-grade-order',
        'POST',
        {
          accountId,
          accountType: AccType,
          orderingData: allOrderingData,
        }
      );

      if (response.error) {
        setIsSaving(false);
      } else {
        setHasUnsavedChanges(false);
        setOrderedGroups({});
        isInitialized.current = false; // Reset so it can re-initialize after refetch

        setTimeout(() => {
          refetchOrganizationDetails();

          setTimeout(() => {
            setIsSaving(false);
          }, 500);
        }, 300);
      }
    } catch (error) {
      setIsSaving(false);
    }
  };

  return {
    orderedGroups,
    hasUnsavedChanges,
    isSaving,
    handleDragEnd,
    handleSaveOrdering,
  };
};

// Helper function to extract and group items
const extractAndGroupItems = (
  organizationDetails,
  AccType,
  groupAssetsByAllAgeGroups
) => {
  let groupedItems = {};

  if (organizationDetails?.data?.attributes) {
    if (AccType === 'Club') {
      const teams = organizationDetails.data.attributes.teams?.data || [];

      if (groupAssetsByAllAgeGroups) {
        groupedItems = categorizeTeamsByAgeGroup(teams);
      } else {
        groupedItems = categorizeTeamsBySeniorJunior(teams);
      }
    } else if (AccType === 'Association') {
      const competitions =
        organizationDetails.data.attributes.competitions?.data || [];
      groupedItems = groupByCompetitionName(competitions);
    }
  }

  return groupedItems;
};

// Helper function to sort grouped items
const sortGroupedItems = (groupedItems, AccType) => {
  if (AccType === 'Association') {
    const flattenedGroups = {};
    Object.entries(groupedItems).forEach(([competitionName, competitions]) => {
      const allGrades = competitions.flatMap(
        comp => comp.attributes?.grades?.data || []
      );
      const sortedGrades = allGrades.sort(
        (a, b) =>
          (a.attributes?.sortOrder || 0) - (b.attributes?.sortOrder || 0)
      );
      flattenedGroups[competitionName] = sortedGrades;
    });
    return flattenedGroups;
  } else {
    const sortedGroups = {};
    Object.entries(groupedItems).forEach(([groupName, teams]) => {
      const sortedTeams = [...teams].sort(
        (a, b) =>
          (a.attributes?.sortOrder || 0) - (b.attributes?.sortOrder || 0)
      );
      sortedGroups[groupName] = sortedTeams;
    });
    return sortedGroups;
  }
};
