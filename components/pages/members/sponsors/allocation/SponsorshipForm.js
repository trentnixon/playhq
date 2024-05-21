import React, { useState, useEffect } from "react";
import {
  useCreateSponsorshipAllocation,
  useUpdateSponsorshipAllocation,
  useDeleteSponsorshipAllocation,
} from "../../../../../Hooks/useSponsorshipAllocations";
import { P } from "../../../../Members/Common/Type";
import { FixturaLoading } from "../../../../Members/Common/Loading";
import SponsorSelection from "./SponsorSelection";
import SponsorDisplay from "./SponsorDisplay";
import ActionButtons from "./ActionButtons";
import { SponsorLabel } from "./SponsorLabel";

// Main component for managing sponsorship allocation
const SponsorshipForm = ({ level, sponsors, accountType }) => {
  const [selectedSponsor, setSelectedSponsor] = useState("");
  const [selectedSponsorObj, setSelectedSponsorObj] = useState(null);
  const [allocationId, setAllocationId] = useState(null);
  const [createSponsorshipAllocation, isLoadingCreate, errorCreate] =
    useCreateSponsorshipAllocation();
  const [updateSponsorshipAllocation, isLoadingUpdate, errorUpdate] =
    useUpdateSponsorshipAllocation();
  const [deleteSponsorshipAllocation, isLoadingDelete, errorDelete] =
    useDeleteSponsorshipAllocation();

  // Effect to initialize existing allocation
  useEffect(() => {
    const existingAllocation = sponsors
      .flatMap((sponsor) => sponsor.attributes.sponsorship_allocations.data)
      .find(
        (allocation) =>
          allocation.attributes.Allocation?.accountGroup?.id === level.id
      );

    if (existingAllocation) {
      setAllocationId(existingAllocation.id);
      setSelectedSponsor(existingAllocation.attributes.Allocation.sponsor.id);
      const sponsorObj = sponsors.find(
        (sponsor) =>
          sponsor.id === existingAllocation.attributes.Allocation.sponsor.id
      );
      setSelectedSponsorObj(sponsorObj);
    }
  }, [sponsors, level]);

  // Handles sponsor change and updates or creates allocation
  const handleSponsorChange = async (sponsorId) => {
    setSelectedSponsor(sponsorId);

    const sponsorObj = sponsors.find((sponsor) => sponsor.id === sponsorId);
    setSelectedSponsorObj(sponsorObj);

    if (!sponsorObj) {
      console.error("Selected sponsor not found");
      return;
    }

    const allocationData = {
      Allocation: {
        accountType: accountType,
        sponsor: {
          id: sponsorId,
          name: sponsorObj.attributes.Name,
          logo: sponsorObj.attributes.Logo?.data?.attributes?.url || "",
        },
        accountGroup: {
          level: level.level,
          id: level.id,
          category: level.category,
          name: level?.name || "",
        },
      },
      sponsor: { id: sponsorId },
    };

    try {
      if (allocationId) {
        await updateSponsorshipAllocation(allocationId, allocationData);
      } else {
        const newAllocation = await createSponsorshipAllocation(allocationData);
        setAllocationId(newAllocation.id);
      }
    } catch (error) {
      console.error("Error in handleSponsorChange:", error);
    }
  };

  // Handles deletion of sponsorship allocation
  const handleDelete = async () => {
    if (allocationId) {
      try {
        await deleteSponsorshipAllocation(allocationId);
        setSelectedSponsor("");
        setSelectedSponsorObj(null);
        setAllocationId(null);
      } catch (error) {
        console.error("Error in handleDelete:", error);
      }
    }
  };

  // Loading state handling
  if (isLoadingCreate || isLoadingUpdate || isLoadingDelete)
    return (
      <tr>
        <td colSpan={4}>
          <FixturaLoading />
        </td>
      </tr>
    );

  // Main render for sponsorship form row
  return (
    <tr>
      <td>
        {selectedSponsorObj && (
          <SponsorDisplay sponsorObj={selectedSponsorObj} />
        )}
      </td>
      <td>
        <SponsorLabel level={level} />
      </td>
      <td>
        <SponsorSelection
          selectedSponsor={selectedSponsor}
          handleSponsorChange={handleSponsorChange}
          sponsors={sponsors}
        />
      </td>
      <td>
        {selectedSponsorObj && (
          <ActionButtons
            handleDelete={handleDelete}
            error={errorCreate || errorUpdate || errorDelete}
          />
        )}
        {(errorCreate || errorUpdate || errorDelete) && (
          <P color="red">{errorCreate || errorUpdate || errorDelete}</P>
        )}
      </td>
    </tr>
  );
};

export default SponsorshipForm;
