import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getUserFromLocalCookie, getAccountFromLocalCookie } from "../lib/auth";


export const useCreateStripePortal = () => {
    const [Portal, setPortal] = useState(null);
  
    const CreatePortal= async () => {
      const user = await getAccountFromLocalCookie();
      console.log(user)
      setPortal(true)
      if (user) {
        try {
          const response = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/StripeCustomerPortal`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("jwt")}`,
              },
              body: JSON.stringify({ user: user }),
            }
          );
          console.log(response)
          setPortal(response);
        } catch (err) {
            setPortal(null);
        }
      }
    };
  
    return [Portal, CreatePortal];
  };