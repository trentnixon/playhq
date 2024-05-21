import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api"; // Adjust the import path as necessary
import { getAccountFromLocalCookie } from "../lib/auth";
const qs = require("qs");

// Create Sponsorship Allocation
export const useCreateSponsorshipAllocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSponsorshipAllocation = async (allocationData) => {
    const user = await getAccountFromLocalCookie();
    if (user) {
      setIsLoading(true);
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/sponsorship-allocations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify({ data: allocationData }),
          }
        );
        setError(null);
        return response.data;
      } catch (fetchError) {
        console.error("Failed to create sponsorship allocation:", fetchError);
        setError(fetchError.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return [createSponsorshipAllocation, isLoading, error];
};

// Update Sponsorship Allocation
export const useUpdateSponsorshipAllocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateSponsorshipAllocation = async (allocationId, allocationData) => {
    const user = await getAccountFromLocalCookie();
    if (user) {
      setIsLoading(true);
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/sponsorship-allocations/${allocationId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify({ data: allocationData }),
          }
        );
        setError(null);
        return response.data;
      } catch (fetchError) {
        console.error("Failed to update sponsorship allocation:", fetchError);
        setError(fetchError.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return [updateSponsorshipAllocation, isLoading, error];
};

// Delete Sponsorship Allocation
export const useDeleteSponsorshipAllocation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteSponsorshipAllocation = async (allocationId) => {
    const user = await getAccountFromLocalCookie();
    if (user) {
      setIsLoading(true);
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/sponsorship-allocations/${allocationId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            }
          }
        );
        setError(null);
        return response.data;
      } catch (fetchError) {
        console.error("Failed to delete sponsorship allocation:", fetchError);
        setError(fetchError.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return [deleteSponsorshipAllocation, isLoading, error];
};
