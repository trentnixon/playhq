// hooks/useCreateInvoice.js

import { useState } from "react";
import Cookies from "js-cookie";
import { fetcher } from "../lib/api";
import {
  getAccountIDFromServer,
  getIdFromLocalCookie,
  getUserFromLocalCookie,
  setAccountFromLocalCookie,
} from "../lib/auth";

export const useCreateInvoice = () => {
  const [invoice, setInvoice] = useState(null);

  const createInvoice = async (product_id, startDate, endDate, couponId) => {
    const token = Cookies.get("jwt");
    const user = await getUserFromLocalCookie();

    console.log("couponId ", couponId)
    if (user) {
      if (token) {
        try {
          const UserID = await getAccountIDFromServer();
          const response = await fetcher(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/createInvoice`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                AccountID: UserID.account.id,
                product_id,
                startDate,
                endDate,
                couponId,
              }),
            }
          );

          setInvoice(response);
        } catch (err) {
          console.error("Failed to create invoice:", err);
          setInvoice(null);
        }
      } else {
        console.log(
          "No user token found, user must be logged in to create an invoice."
        );
      }
    }
  };

  return [invoice, createInvoice];
};
