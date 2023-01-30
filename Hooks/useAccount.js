import { useState, useEffect } from "react";
import { fetcher } from "../lib/api";
const qs = require("qs");
import { getAccountIDFromServer, getTokenFromLocalCookie } from "../lib/auth";

export const useAccount = (ctx) => {
  const [data, setData] = useState(null);

  const query = qs.stringify(
    {
      populate: [
        "scheduler",
        "scheduler.days_of_the_week",
        "account_type",
        "associations",
        "clubs",
        "template",
        "theme",
        "audio_option",
        "ai_publication",
        "ai_writting_tone",
        "ai_writting_style",
        "assets",
        "order",
        "sponsors",
        "sponsors.Logo"
        
      ],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const fetchData = async () => {
    const ID = await getAccountIDFromServer();
    const JWT = getTokenFromLocalCookie();
    //console.log("fetchData accounts on id ", ID);
    if (ID !== undefined) {
      
      const res = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${ID.account?.id}?${query}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
        }
      );

      //console.log(res.data);

      setData(res.data);
    }
  };

  return [data, fetchData];
};
