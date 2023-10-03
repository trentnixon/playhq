//
import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getAccountFromLocalCookie } from "../lib/auth";
const qs = require("qs");

export const useGetTemplates = () => {
  const [Templates, setTemplates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // /api/assets
  const query = qs.stringify(
    {
      populate: ["asset_category", "Poster", "bundle_audio"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const GetTemplates = async (ID) => {
    const user = await getAccountFromLocalCookie();

    if (user) {
      setIsLoading(true);
      try {
        console.log("ASSET FETCH IS RUNNING");
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/templates/${ID}?${query}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
          }
        );

        setTemplates(response.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    }
  };

  return [Templates, isLoading, GetTemplates];
};
