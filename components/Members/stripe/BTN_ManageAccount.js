import React from "react";
import { useEffect, useState } from "react";

import { useCreateStripePortal } from "../../../Hooks/useSubscription";

import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { useAccountDetails } from "../../../lib/userContext";

export const BTN_ManageSubscription = () => {
  const [Portal, setPortal] = useCreateStripePortal();
  const { account, ReRender } = useAccountDetails(); 
  const [userAccount, setUserAccount] = useState(account);


  const manageSubscription = () => {
    //useCreateStripePortal
    setPortal();
  };

  const CreateStripePromise = async (Portal) => {
    if (Portal?.url) {
      router.push(Portal.url);
    }
  };
  useEffect(() => {
    if (Portal !== null) {
      CreateStripePromise(Portal);
    }
  }, [Portal]);

  return userAccount?.attributes?.order.data === null || userAccount?.attributes?.order.data.stripe_status !== 'complete' ? (
    false
  ) : (
    <BTN_ONCLICK
      LABEL={"Manage Subscription"}
      HANDLE={manageSubscription}
      THEME="cta"
    />
  );
};
export default BTN_ManageSubscription