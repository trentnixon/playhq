import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { fetcher } from "../lib/api";
import { getAccountFromLocalCookie } from "../lib/auth";
const qs = require("qs");

export const useGetOrganizationDetails = (accountType, accountId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Clubquery = qs.stringify(
    {
      populate: {
        teams: {
          populate: {
            // Include specific fields for each team and exclude gameHistory
            gameHistory: {
              fields: [] // Leave empty to exclude all fields from gameHistory
            }
          },
          fields: ['teamName', 'gamesPlayed', 'wins', 'losses', 'form', 'href', 'teamID'] // Specify the fields you want to include
        },
        associations: true, // Include all fields for associations
        club_to_competitions: true // Include all fields for club_to_competitions
      }
    },
    {
      encodeValuesOnly: true,
    }
  );

  const Assoicationquery = qs.stringify(
    {
      populate: {
        clubs: {
          populate: {
            teams: {
              populate: {
                // Exclude all fields from gameHistory
                gameHistory: {
                  fields: [] 
                }
              },
              // Include only the 'teamName' field for each team
              fields: ['teamName'] 
            }
          }
        },
        // Including other relevant fields or relationships if needed
      }
    },
    {
      encodeValuesOnly: true,
    }
  );
  
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log("accountType", accountType)
        const endpoint =
          accountType === "Association"
            ? `/associations/${accountId}`
            : `/clubs/${accountId}`;

        const query = accountType === "Association" ? Assoicationquery : Clubquery;

        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}${endpoint}?${query}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
          }
        );

        setData(response);
      } catch (err) {
        setError(err);
        console.error("Error fetching organization details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchData();
    }
  }, [accountType, accountId]);

  return { data, loading, error };
};
