import { useEffect } from "react";

import { useAccountDetails } from "../../../../lib/userContext";
import { LoadingStateWrapper } from "../HOC/LoadingStateWrapper";
import { CreateFreeTrial } from "./CreateFreeTrial/userCreateFreeTrial";
import { UserSubscription } from "./CreateSubscription/userSubscription";
import { FreeTrialActive } from "./FreeTrialActive/userFreeTrialActive";
import { UserSubscriptionActive } from "./SubscriptionActive/userSubscriptionActive";
import { UserSubscriptionPending } from "./SubscriptionPending/userSubscriptionPending";
import { getTrialNotificationStatus } from "../../../../lib/members/getTrialNotificationStatus";
import { UserSubscriptionActiveDatePending } from "./SubscriptionActiveDatePending/userSubscriptionActiveDatePending";

export const UsersAccountStatusViews = () => {
  const { account } = useAccountDetails();
  const trialStatusObj = {
    available_trial: <CreateFreeTrial account={account} />,
    active_trial: <FreeTrialActive account={account} />,
    ended_trial: <UserSubscription />,
    pending_subscriber: <UserSubscriptionPending />,
    account_active_pending: <UserSubscriptionActiveDatePending />,
    subscribed: <UserSubscriptionActive />,
    ended_paid_subscription: <UserSubscription />,
  };
   
  useEffect(() => {}, [account]);
  //console.log("getTrialNotificationStatus(account) ", getTrialNotificationStatus(account))
  const componentToRender = trialStatusObj[getTrialNotificationStatus(account)];

  return (
    <LoadingStateWrapper conditions={[account]}>
      {componentToRender}
    </LoadingStateWrapper>
  );
};
 