//
import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getUserFromLocalCookie, getAccountFromLocalCookie } from "../lib/auth";


export const useGetAIExample = () => {
    const [AIExample, setAIExample] = useState(null);
  
    const CreateAIExample = async (prompt) => {
      const user = await getAccountFromLocalCookie();
      console.log(user)
      setAIExample(true)
      if (user) {
        try {
            console.log("AI IS RUNNING")
          const response = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/ai-publication/openai`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("jwt")}`,
              },
              body: JSON.stringify({ prompt: prompt }),
            }
          );
          console.log(response)
          setAIExample(response.response);
        } catch (err) {
            setAIExample(null);
        }
      }
    };
  
    return [AIExample, CreateAIExample];
  };