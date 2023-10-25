//
import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getUserFromLocalCookie, getAccountFromLocalCookie } from "../lib/auth";

export const useCreateSponsor = () => {
  const [Sponsor, setSponsor] = useState(null);

  const CreateSponsor = async (OBJ) => {
    const user = await getAccountFromLocalCookie();
    setSponsor(true);
    if (user) {
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/sponsors`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify({ data: OBJ }),
          }
        );
        setSponsor(response);
      } catch (err) {
        setSponsor(null);
      }
    }
  };

  return [Sponsor, CreateSponsor];
};

export const useUpdateSponsor = () => {
  const [UpdatedSponsor, setUpdatedSponsor] = useState(null);

  const UpdateSponsor = async (OBJ, _ID) => {
    const user = await getAccountFromLocalCookie();
    setUpdatedSponsor(true);
    if (user) {
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/sponsors/${_ID}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify({ data: OBJ }),
          }
        );
        setUpdatedSponsor(response);
      } catch (err) {
        setUpdatedSponsor(null);
      }
    }
  };

  return [UpdatedSponsor, UpdateSponsor];
};

export const useDeleteSponsor = () => {
  const [DeleteSponsor, setDeleteSponsor] = useState(null);

  const ConfirmDeleteSponsor = async (_ID) => {
    const user = await getAccountFromLocalCookie();
    setDeleteSponsor(true);
    if (user) {
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/sponsors/${_ID}`,
          {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
          }
        );

        setDeleteSponsor(response);
      } catch (err) {
        setDeleteSponsor(null);
      }
    }
  };

  return [DeleteSponsor, ConfirmDeleteSponsor];
};
