import { useState } from "react";
import { fetcher } from "../lib/api";
import fetcherV2 from "../lib/fetcher";
import qs from "qs";

const buildQueryString = (name) => {
  return qs.stringify(
    {
      filters: {
        Name: {
          $containsi: name,
        },
      },
      fields: ["Name"],
    },
    {
      encodeValuesOnly: true,
    }
  );
};

const buildQueryStringClubs = (name,ID) => {
  return qs.stringify(
    {
      filters: {
        Name: {
          $containsi: name,
        },
        associations :{
          id:{
            $in:[ID]
          }
        }
      },
      fields: ["Name"],
    },
    {
      encodeValuesOnly: true,
    }
  );
};

const fetchData = async (url) => {
  try {
    const response = await fetcher(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (err) {
    return null;
  }
};

// Fetch clubs
export const useClubs = () => {
  const [clubs, setClubs] = useState(null);

  const fetchClubs = async (name, AssociationID) => {
    setClubs(true);
    const query = buildQueryStringClubs(name, AssociationID);
    const data = await fetchData(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/clubs?${query}`
    );
    setClubs(data);
  };

  return [clubs, fetchClubs];
};

// Fetch associations
export const useAssociations = () => {
  const [associations, setAssociations] = useState(null);

  const fetchAssociations = async (name) => {
    setAssociations(true);
    const query = buildQueryString(name);
    const data = await fetchData(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/associations?${query}`
    );
    setAssociations(data);
  };

  return [associations, fetchAssociations];
};


export const useSendExpressionOfInterestForm = () => {
  const [expression, setExpression] = useState(null);

  const createExpression = async (DATA) => {
    return new Promise(async (resolve, reject) => {
      setExpression(true);
      const res = await fetcherV2("/expression-of-interests", "POST", {
        data: DATA,
      });
      setExpression(res);

      if (res.error) {
        reject(res);
      } else {
        resolve(res);
      }
    });
  };

  return [expression, createExpression];
};

