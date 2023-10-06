//
import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getAccountFromLocalCookie } from "../lib/auth";

export const useCreateTrial = () => {
  const [Trial, setTrial] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Add this line
  const CreateTrial = async (OBJ) => {
    const user = await getAccountFromLocalCookie();
    console.log(OBJ);
    setLoading(true);
    setError(null); // Reset error before new request
    if (user) {
      try {
        //console.log("useCreateTrial IS RUNNING");
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/trial-instances`,
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
        const updateAcc = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${OBJ.account[0]}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify({ data: {subscription_tier:OBJ.subscription_tier} }),
          }
        );
        console.log(updateAcc);
        setTrial(response.data);
      } catch (err) {
        setError(err.message); // Update this line
      } finally {
        setLoading(false);
      }
    }
  };

  return [Trial, CreateTrial, loading, error];
};
