//
import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getAccountFromLocalCookie } from "../lib/auth";
const qs = require("qs");


export const useGetAssets = () => {
    const [Assets, setAssets] = useState(null);
  // /api/assets
  const query = qs.stringify(
    {
      populate: [
        "asset_category"
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );
    const GetAssets = async () => {
      const user = await getAccountFromLocalCookie();
      console.log(user)
      setAssets(true)
      if (user) {
        try { 
            console.log("ASSET FETCH IS RUNNING")
          const response = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/assets?${query}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("jwt")}`,
              }
            }
          );
          console.log(response)
          setAssets(response.data);
        } catch (err) {
            setAssets(null);
        }
      }
    };
  
    return [Assets, GetAssets];
  };