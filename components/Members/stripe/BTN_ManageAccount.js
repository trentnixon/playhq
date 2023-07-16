import React from "react";
import { useEffect, useState } from "react";
import { useCreateStripePortal } from "../../../Hooks/useSubscription";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import { useAccountDetails } from "../../../lib/userContext";
import { useRouter } from "next/router";

export const BTN_ManageSubscription = ({Label, theme='cta'}) => {
  const [Portal, setPortal] = useCreateStripePortal();
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [ORDER, setOrder] = useState(
    userAccount?.attributes?.order?.data?.attributes
  );

  const router = useRouter();
  const manageSubscription = () => {
    //useCreateStripePortal
    setPortal();
  };

  const CreateStripePromise = async (Portal) => {
    //console.log(Portal.url);
    if (Portal?.url) {
      router.push(Portal.url);
    }
  };
  useEffect(() => {
    if (Portal !== null) {
      CreateStripePromise(Portal);
    }
  }, [Portal]);

  return ORDER === undefined ? (
    false
  ) : (
    <BTN_ONCLICK
      LABEL={Label}
      HANDLE={manageSubscription}
      THEME={theme}
    />
  );
};
export default BTN_ManageSubscription;
