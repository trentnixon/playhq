import { useState, useEffect, useRef } from 'react';
import Adminfetcher from '../lib/Adminfetcher';
import { groupByCompetitionName } from '../utils/group_assets_by';

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

    console.log('[TeamGradeOrdering] Initializing with grouped items:', {
      accountType: AccType,
      groupCount: Object.keys(groupedItems).length,
      groups: Object.keys(groupedItems),
    });

    if (Object.keys(groupedItems).length > 0) {
      const sortedGroups = sortGroupedItems(groupedItems, AccType);

      // Log the sorted groups to verify sortOrder is being used
      console.log(
        '[TeamGradeOrdering] After sorting, checking sortOrder values:'
      );
      Object.entries(sortedGroups).forEach(([groupName, items]) => {
        const itemsWithSortOrder = items.map(item => ({
          id: item.id,
          name: item.attributes?.gradeName,
          sortOrder: item.attributes?.sortOrder,
          hasSortOrder:
            item.attributes?.sortOrder !== null &&
            item.attributes?.sortOrder !== undefined,
        }));
        console.log(
          `[TeamGradeOrdering] Group "${groupName}" (${items.length} items):`,
          itemsWithSortOrder
        );

        // Check if any items have null sortOrder
        const nullCount = itemsWithSortOrder.filter(
          item => !item.hasSortOrder
        ).length;
        if (nullCount > 0) {
          console.warn(
            `[TeamGradeOrdering] WARNING: Group "${groupName}" has ${nullCount} items with null/undefined sortOrder`
          );
        }
      });

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
        // Ensure we're sending grade ID (item.id is the grade ID from the grade object)
        // NOTE: For Clubs, grades are nested under teams (Club → Teams → Grades)
        // The backend must traverse this relationship to update grade sortOrder
        // For Associations, grades are directly under competitions (Association → Competitions → Grades)
        allOrderingData.push({
          id: item.id, // Grade ID (same for both Club and Association)
          sortOrder: index + 1,
          category: groupName,
          type: 'grade', // Both Club and Association now order grades
          name: item.attributes?.gradeName || 'Unknown Grade',
        });
      });
    });

    console.log('[TeamGradeOrdering] Sending ordering data:', {
      accountType: AccType,
      totalItems: allOrderingData.length,
      sampleItem: allOrderingData[0],
      note:
        AccType === 'Club'
          ? 'Backend must find grades via Club → Teams → Grades relationship'
          : 'Backend finds grades via Association → Competitions → Grades',
    });

    return allOrderingData;
  };

  // Save ordering to CMS
  const handleSaveOrdering = async () => {
    const allOrderingData = getAllOrderingData();
    setIsSaving(true);

    console.log('[TeamGradeOrdering] Saving ordering:', {
      accountType: AccType,
      accountId,
      totalItems: allOrderingData.length,
      orderingData: allOrderingData,
    });

    try {
      const response = await Adminfetcher(
        '/account/update-team-grade-order',
        'POST',
        {
          accountId,
          // Always use 'Association' because we're only dealing with grades now
          // (Both clubs and associations order grades, not teams)
          accountType: 'Association',
          orderingData: allOrderingData,
        }
      );

      console.log('[TeamGradeOrdering] Save response:', response);

      // Check for both error property and success property
      if (response.error || response.success === false) {
        console.error(
          '[TeamGradeOrdering] Save error:',
          response.error || response
        );
        setIsSaving(false);
      } else if (response.success === true || !response.error) {
        // Success - proceed with reset and refetch
        console.log('[TeamGradeOrdering] Save successful, refetching data...');
        setHasUnsavedChanges(false);
        setOrderedGroups({});
        isInitialized.current = false; // Reset so it can re-initialize after refetch

        setTimeout(() => {
          refetchOrganizationDetails();

          setTimeout(() => {
            setIsSaving(false);
          }, 500);
        }, 300);
      } else {
        // Unknown response format
        console.warn(
          '[TeamGradeOrdering] Unexpected response format:',
          response
        );
        setIsSaving(false);
      }
    } catch (error) {
      console.error('[TeamGradeOrdering] Save exception:', error);
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

// Helper function to extract grades from teams and group by age group
const categorizeGradesByAgeGroup = teams => {
  const categorizedGrades = {
    Junior: [],
    Senior: [],
    Masters: [],
    Special: [],
  };
  const AGE_GROUPS = {
    JUNIOR: [
      'U7',
      'U8',
      'U9',
      'U10',
      'U11',
      'U12',
      'U13',
      'U14',
      'U15',
      'U16',
      'U17',
      'U18',
      'U19',
      'U20',
      'U21',
      'U22',
      'U23',
      'Y4',
      'Y5',
      'Y6',
      'Y7',
      'Y8',
      'Y9',
      'Y10',
      'Y11',
      'Y12',
      'Colts Y9 & 10',
      'Mixed Age Group',
    ],
    SENIOR: [
      'Open',
      'Premier',
      'First Grade',
      'Second Grade',
      'Third Grade',
      'Fourth Grade',
      'Fifth Grade',
      'Sixth Grade',
      'Seventh Grade',
      'Senior',
      'Senior/Open',
      'senior/open',
      'Mixed Age Group',
    ],
    MASTERS: [
      'Over 35',
      'Over 40',
      'Over 45',
      'Over 50',
      'Over 55',
      'Over 60',
      'Over 65',
      'Over 70',
    ],
  };

  const isAgeGroupInList = (ageGroup, ageGroupList) =>
    ageGroupList.includes(ageGroup);

  teams.forEach(team => {
    const grades = team.attributes?.grades?.data || [];
    grades.forEach(grade => {
      const ageGroup = grade.attributes?.ageGroup;
      if (isAgeGroupInList(ageGroup, AGE_GROUPS.JUNIOR)) {
        categorizedGrades['Junior'].push(grade);
      } else if (isAgeGroupInList(ageGroup, AGE_GROUPS.SENIOR)) {
        categorizedGrades['Senior'].push(grade);
      } else if (isAgeGroupInList(ageGroup, AGE_GROUPS.MASTERS)) {
        categorizedGrades['Masters'].push(grade);
      } else {
        categorizedGrades['Special'].push(grade);
      }
    });
  });

  // Remove empty categories
  Object.keys(categorizedGrades).forEach(category => {
    if (categorizedGrades[category].length === 0) {
      delete categorizedGrades[category];
    }
  });

  return categorizedGrades;
};

// Helper function to extract grades from teams and group by Senior/Junior
const categorizeGradesBySeniorJunior = teams => {
  const categorizedGrades = { Junior: [], Senior: [] };
  const AGE_GROUPS = {
    JUNIOR: [
      'U7',
      'U8',
      'U9',
      'U10',
      'U11',
      'U12',
      'U13',
      'U14',
      'U15',
      'U16',
      'U17',
      'U18',
      'U19',
      'U20',
      'U21',
      'U22',
      'U23',
      'Y4',
      'Y5',
      'Y6',
      'Y7',
      'Y8',
      'Y9',
      'Y10',
      'Y11',
      'Y12',
      'Colts Y9 & 10',
      'Mixed Age Group',
    ],
  };

  const isAgeGroupInList = (ageGroup, ageGroupList) =>
    ageGroupList.includes(ageGroup);

  teams.forEach(team => {
    const grades = team.attributes?.grades?.data || [];
    grades.forEach(grade => {
      const ageGroup = grade.attributes?.ageGroup;
      if (isAgeGroupInList(ageGroup, AGE_GROUPS.JUNIOR)) {
        categorizedGrades['Junior'].push(grade);
      } else {
        categorizedGrades['Senior'].push(grade);
      }
    });
  });

  // Remove empty categories
  Object.keys(categorizedGrades).forEach(category => {
    if (categorizedGrades[category].length === 0) {
      delete categorizedGrades[category];
    }
  });

  return categorizedGrades;
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

      // Extract grades from teams and group by age group (same as associations extract grades from competitions)
      if (groupAssetsByAllAgeGroups) {
        groupedItems = categorizeGradesByAgeGroup(teams);
      } else {
        groupedItems = categorizeGradesBySeniorJunior(teams);
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
  const sortedGroups = {};

  if (AccType === 'Association') {
    // For associations: groupedItems contains competitions grouped by competition name
    // We need to extract grades from competitions first
    Object.entries(groupedItems).forEach(([competitionName, competitions]) => {
      // Extract all grades from all competitions in this group
      const allGrades = competitions.flatMap(
        comp => comp.attributes?.grades?.data || []
      );

      // Remove duplicates based on grade ID
      const uniqueGradesMap = new Map();
      allGrades.forEach(grade => {
        const gradeId = grade.id;
        const existingGrade = uniqueGradesMap.get(gradeId);
        const currentSortOrder = grade.attributes?.sortOrder;
        const existingSortOrder = existingGrade?.attributes?.sortOrder;

        if (!existingGrade) {
          uniqueGradesMap.set(gradeId, grade);
        } else if (
          currentSortOrder !== null &&
          (existingSortOrder === null || currentSortOrder > existingSortOrder)
        ) {
          // Keep the grade with the higher sortOrder, or prefer non-null over null
          uniqueGradesMap.set(gradeId, grade);
        }
      });
      const uniqueGrades = Array.from(uniqueGradesMap.values());

      // Sort by sortOrder
      const sortedItems = uniqueGrades.sort((a, b) => {
        const aSort = a.attributes?.sortOrder;
        const bSort = b.attributes?.sortOrder;

        // If both have sortOrder, sort by it
        if (aSort !== null && bSort !== null) {
          return aSort - bSort;
        }
        // If only one has sortOrder, it comes first
        if (aSort !== null && bSort === null) return -1;
        if (aSort === null && bSort !== null) return 1;
        // If both are null, maintain original order (stable sort)
        return 0;
      });
      sortedGroups[competitionName] = sortedItems;
    });
  } else {
    // For clubs: groupedItems contains grades directly, grouped by age category
    Object.entries(groupedItems).forEach(([groupName, items]) => {
      // Remove duplicates based on grade ID (same grade might appear in multiple teams)
      // If a grade appears multiple times, keep the one with the highest sortOrder (or non-null)
      const uniqueGradesMap = new Map();
      items.forEach(grade => {
        const gradeId = grade.id;
        const existingGrade = uniqueGradesMap.get(gradeId);
        const currentSortOrder = grade.attributes?.sortOrder;
        const existingSortOrder = existingGrade?.attributes?.sortOrder;

        if (!existingGrade) {
          uniqueGradesMap.set(gradeId, grade);
        } else if (
          currentSortOrder !== null &&
          (existingSortOrder === null || currentSortOrder > existingSortOrder)
        ) {
          // Keep the grade with the higher sortOrder, or prefer non-null over null
          uniqueGradesMap.set(gradeId, grade);
        }
      });
      const uniqueGrades = Array.from(uniqueGradesMap.values());

      const sortedItems = uniqueGrades.sort((a, b) => {
        const aSort = a.attributes?.sortOrder;
        const bSort = b.attributes?.sortOrder;

        // If both have sortOrder, sort by it
        if (aSort !== null && bSort !== null) {
          return aSort - bSort;
        }
        // If only one has sortOrder, it comes first
        if (aSort !== null && bSort === null) return -1;
        if (aSort === null && bSort !== null) return 1;
        // If both are null, maintain original order (stable sort)
        return 0;
      });
      sortedGroups[groupName] = sortedItems;
    });
  }

  return sortedGroups;
};
