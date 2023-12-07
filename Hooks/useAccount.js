import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import {
  getUserFromLocalCookie,
  getAccountFromLocalCookie,
  getAccountIDFromServer,
  getTokenFromLocalCookie,
} from "../lib/auth";
const qs = require("qs");

export const useAccount = (ctx) => {
  const [data, setData] = useState(null);
  /*
"ai_publication",
        "ai_writting_tone",
        "ai_writting_style",
        "assets",
*/
  const query = qs.stringify(
    {
      populate: [
        "scheduler",
        "scheduler.days_of_the_week",
        "account_type",
        "associations",
        "associations.Logo",
        "associations.trial_instance",
        "clubs",
        "clubs.Logo",
        "clubs.trial_instance",
        "template",
        "theme",
        "audio_option",
        "order",
        "sponsors",
        "sponsors.Logo",
        "subscription_tier",
        "account_media_libraries",
        "account_media_libraries.imageId"
       
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const fetchData = async () => {
    try {
      const ID = await getAccountIDFromServer();
      const JWT = getTokenFromLocalCookie();
      //console.log("fetchData accounts on id ", ID); 
      
      // Check if ID and its nested properties exist
      if (ID && ID.account && ID.account.id) {
        const res = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${ID.account.id}?${query}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JWT}`,
            },
          }
        );
        setData(res.data);
      } else {
        console.log("ID, or its nested properties, are undefined");
      }
    } catch (error) {
      console.error("An error occurred during fetchData:", error);
    }
  };
  

  return [data, fetchData];
};

export const useSetAccountTrue = (ctx) => {
  const [AccountTrue, SetAccountTrue] = useState(null);

  const CreateSetAccountTrue = async (_ID) => {
    SetAccountTrue(false);
    const ID = await getAccountIDFromServer();
    if (ID !== undefined) {
      const res = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${_ID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
          body: JSON.stringify({
            data: {
              hasCompletedStartSequence: true,
              isActive:true
            },
          }),
        }
      );

      SetAccountTrue(res.data);
    }
  };

  return [AccountTrue, CreateSetAccountTrue];
};


export const useDeleteAccount = () => {
  const [deleting, setDeleting] = useState(false);

  const deleteAccount = async (accountId) => {
    setDeleting(true);
    try {
      const res = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${accountId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );
      if (res.data && res.data.attributes && res.data.attributes.isActive === false) {
        setDeleting(true); // Set it to true to trigger the refresh
      } else {
        setDeleting(false); // Handle deletion failure
      }
    } catch (error) {
      console.error("An error occurred while deleting the account:", error);
      setDeleting(false);
    }
  };

  return [deleting, deleteAccount];
};
