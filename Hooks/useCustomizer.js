//
import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getAccountFromLocalCookie } from "../lib/auth";
const qs = require("qs");


// GET
// Fetch all of the options
export const useGETDesignElement = () => {
  const [DesignElement, setDesignElement] = useState(null);
  const query = qs.stringify(
    {
      pagination: {
        pageSize: 1000,
      },
    }
  );
  const CreateDesignElement = async (OBJ) => {
    /*
          OBJ={COLLECTIONID:COLLECTIONID,}
          */
    setDesignElement(true);
    try {
      //console.log("CreateDesignElement");
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/${OBJ.COLLECTIONID}?${query}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
        }
      );

      console.log(response.data);
      setDesignElement(response.data);
    } catch (err) {
      setDesignElement(null);
    }
  };

  return [DesignElement, CreateDesignElement];
};

// PUT
// Change a users design options

export const useAssignDesignElement = () => {
  const [DesignElement, setDesignElement] = useState(null);

  const CreateDesignElement = async (OBJ) => {
    /*
        OBJ={
            CollectionSaveTo:'',
            Body:'',
            COLLECTIONID:COLLECTIONID,
            RelationProperty:RelationProperty
        }
        */
    setDesignElement(true);
    try {
      //console.log("CreateDesignElement");
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/${OBJ.CollectionSaveTo}/${OBJ.COLLECTIONID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("jwt")}`,
          },
          body: JSON.stringify({
            data: {
              [OBJ.RelationProperty]: OBJ.Body,
            },
          }),
        }
      );
      setDesignElement(response);
    } catch (err) {
      setDesignElement(null);
    }
  };

  return [DesignElement, CreateDesignElement];
};

/* ***************************************** */
// User Create new theme!

///api/themes

export const UserCreateTheme = () => {
  const [THEME, setTHEME] = useState(false);

  const CreateTHEME = async (OBJ) => {
    const user = await getAccountFromLocalCookie();

    //console.log(user);

    if (user) {
      try {
        //console.log("AI IS RUNNING");
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/themes`,
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
        //console.log(response);
        setTHEME(response);
      } catch (err) {
        setTHEME(null);
      }
    }
  };

  return [THEME, CreateTHEME];
};

export const UserUpdateTheme = () => {
  const [UPDATE, setUPDATE] = useState(false);

  const UpdateTHEME = async (OBJ, ID) => {
    const user = await getAccountFromLocalCookie();

    //console.log(user);

    if (user) {
      try {
        //console.log("AI IS RUNNING");
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/themes/${ID}`,
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
        //console.log(response);
        setUPDATE(response);
      } catch (err) {
        setUPDATE(null);
      }
    }
  };

  return [UPDATE, UpdateTHEME];
};
