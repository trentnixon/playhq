import Cookies from 'js-cookie';
import { useState } from 'react';
import { fetcher } from '../lib/api';
import { getUserFromLocalCookie, getIdFromLocalCookie } from '../lib/auth';

/**
 * Get the users Order. used to check validity and details
 * triggers when "purchase sub" is clicked
 */
export const useGetUsersSubscriptionOrder = () => {};

/** Create a newq Instace of an Order
 *
 * triggers when "purchase sub" is clicked
 */
export const useCreateNewInstanceOfSubscription = () => {
  const [Subscription, setSubscription] = useState(null);

  const CreateSubscription = async productId => {
    const user = await getUserFromLocalCookie();
    if (user) {
      try {
        const UserID = await getIdFromLocalCookie();
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            body: JSON.stringify({
              subscription_tier: productId,
              account: UserID,
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
};

/* 
this hook is used to Confirm the user has paid for a subscription.  
  DO NOT CHANGE THIS!
*/
export const useConfirmOrder = () => {
  const [order, setOrder] = useState(null);

  const confirmOrder = async session_id => {
    const user = await getUserFromLocalCookie();
    if (user) {
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/confirm`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
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

/* 
this hook is used to Cancel the process and remove the order before it has been completed  
  DO NOT CHANGE THIS!
*/
export const useCancelCreateOrder = () => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const requestOrderCancellation = async (session_id, OrderSetup) => {
    const user = await getUserFromLocalCookie();
    if (user) {
      setIsLoading(true);
      try {
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/CancelCreateSubscription`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            body: JSON.stringify({ checkout_session: session_id, OrderSetup }),
          }
        );
        setOrder(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return [order, requestOrderCancellation, error, isLoading];
};

//
/**
 *
 *   change a Users Subscription Plan to Fixtura
 *
 */
export const useChangeSubscription = () => {
  const [plan, setPlan] = useState(null);

  const confirmPlan = async newPlanId => {
    const user = await getUserFromLocalCookie();
    if (user) {
      try {
        const UserID = await getIdFromLocalCookie();
        const response = await fetcher(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/orders/changeSubscription`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Cookies.get('jwt')}`,
            },
            body: JSON.stringify({ UserID, newPlanId }),
          }
        );
        setPlan(response);
      } catch (err) {
        setPlan(null);
      }
    }
  };

  return [plan, confirmPlan];
};

/**
 *
 *   Cancel a Users Subscription to Fixtura
 *
 */
export const useCancelSubscription = () => {};

/**
 *
 *   Cancel a Users Subscription to Fixtura
 *
 */
export const usePauseSubscription = () => {};
