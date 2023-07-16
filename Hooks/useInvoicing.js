import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getUserFromLocalCookie, getAccountFromLocalCookie } from "../lib/auth";


//orders/invoicing

export const useGetInvoice = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const Getinvoice = async () => {
    const user = await getAccountFromLocalCookie();
    console.log(user);
    setLoading(true);
    if (user) {
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/invoicing`,
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
        console.log(response);
        setInvoice(response);
      } catch (err) {
        setInvoice(null);
      }
    }
    setLoading(false);
  };

  return [invoice, Getinvoice, loading];
};
