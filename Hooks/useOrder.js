import Cookies from "js-cookie";
import { useState } from "react";
import { fetcher } from "../lib/api";
import { getUserFromLocalCookie, getIdFromLocalCookie } from "../lib/auth";

/** 
 * Get the users Order. used to check validity and details
 * triggers when "purchase sub" is clicked
 */
export const useGetUsersSubscriptionOrder=()=>{

}


/** Create a newq Instace of an Order
 * 
 * triggers when "purchase sub" is clicked
 */
export const useCreateNewInstanceOfSubscription=()=>{
  const [Subscription, setSubscription] = useState(null);

  const CreateSubscription = async (session_id) => {
    const user = await getUserFromLocalCookie();
    console.log(session_id)
    if (user) {
      try {

        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders`,
          {
            method: "POST",
            headers: { 
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify({
              product: 1,
              userID: await getIdFromLocalCookie(),
            }),
          }
        );
        setSubscription(response);
      } catch (err) {
        setSubscription(null);
      }
    }
  };

  return [Subscription, CreateSubscription];
}


/* 
this hook is used to Confirm the user has paid for a subscription.  
  DO NOT CHANGE THIS!
*/
export const useConfirmOrder = () => {
  const [order, setOrder] = useState(null);

  const confirmOrder = async (session_id) => {
    const user = await getUserFromLocalCookie();
    console.log(session_id)
    if (user) {
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/confirm`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
            body: JSON.stringify({ checkout_session: session_id }),
          }
        );
        setOrder(response);
      } catch (err) {
        setOrder(null);
      }
    }
  };

  return [order, confirmOrder];
};


/** 
 * 
 *   Cancel a Users Subscription to Fixtura
 * 
 */
export const useCancelSubscription=()=>{

}

/** 
 * 
 *   Cancel a Users Subscription to Fixtura
 * 
 */
export const usePauseSubscription=()=>{

}