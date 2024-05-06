// hooks/useCancelInvoice.js
import { useState } from "react";
import Cookies from "js-cookie";
import { fetcher } from "../lib/api";

const useCancelInvoice = () => {
  const [loading, setLoading] = useState(false);

  const cancelInvoice = async (invoiceId) => {
    setLoading(true);
    const token = Cookies.get("jwt");
    if (token) {
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/void-invoice`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ invoiceId }),
          }
        );

        setLoading(false);
        return response; // return response to be handled by the component
      } catch (error) {
        console.error("Error cancelling the invoice:", error);
        setLoading(false);
        throw error; // throw an error to be caught and handled by the component
      }
    } else {
      setLoading(false);
      throw new Error("No authentication token found.");
    }
  };

  return { loading, cancelInvoice };
};

export default useCancelInvoice;
