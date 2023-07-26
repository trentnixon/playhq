import { useState } from "react";
import { fetcher } from "../lib/api";
import {  setToken } from "../lib/auth";

export const useLogUser = () => {
  const [LogUser, setLogUser] = useState(null);

  const CreateLogUser = async (INFO) => {
    setLogUser(true);
    try {
      console.log("useLogUser IS RUNNING");
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(INFO),
        }
      );
      console.log(response);
      if (!response || !response.user) {
        setLogUser(null);
        return { error: "Invalid login details" };
      } else {
        setToken(response)
        setLogUser(response);
        return response;
      }
    } catch (err) {
      setLogUser(null);
      return { error: err.message };
    }
  };
  

  return [LogUser, CreateLogUser];
};
