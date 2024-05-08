import { useMemo } from "react";
import { Card, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import {
  AwaitingActivation,
  IsUserSubscriptionDetails,
  SeasonPassRequired,
} from "./components/IsUserSubscriptionDetails";
import { UserDetailsDisplay } from "./components/UserDetailsDisplay";
import { SideBarTrialNotification } from "../../../Members/Account/components/isTrialNotifications.js/sideBarNotification";
import { IsSetupDetails } from "./components/IsSetupDetails";
import { getTrialNotificationStatus } from "../../../../lib/members/getTrialNotificationStatus";
import { P } from "../../../Members/Common/Type";

export function UserDetailsCard({ user }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const UserTheme = useMemo(
    () => user.attributes.theme?.data?.attributes?.Theme,
    [user]
  );

  // default icon
  const trialNotificationStatus = useMemo(
    () => getTrialNotificationStatus(user),
    [user]
  );

  const TRIAL_STATUS_COMPONENTS = {
    no_user: NoUser,
    subscribed: Subscribed,
    pending_subscriber: PendingSubscriber,
    ended_trial: EndedTrial,
    active_trial: ActiveTrial,
    available_trial: AvailableTrial,
    ended_paid_subscription: EndedPaidSubscription,
    account_active_pending: PendingActivation,
  };

  console.log("Side Bar trialNotificationStatus ", trialNotificationStatus);
  const TrialStatusComponent =
    TRIAL_STATUS_COMPONENTS[trialNotificationStatus] || NoUser;

  if (mobile) return false;
  return (
    <Card withBorder padding="xl" radius="md" mt={60}>
      <Card.Section
        sx={{
          background: theme.fn.linearGradient(
            45,
            UserTheme?.primary,
            UserTheme?.secondary
          ),
          height: 70,
          "@media (max-width: 768px)": {
            height: 30,
          },
        }}
      />

      <UserDetailsDisplay user={user} />
      {user.attributes.hasCompletedStartSequence ? (
        <TrialStatusComponent user={user} />
      ) : (
        <IsSetupDetails />
      )}
    </Card>
  );
}
  
const NoUser = () => <span>No user object provided</span>;
const Subscribed = ({ user }) => <IsUserSubscriptionDetails user={user} />;
const PendingActivation = ({ user }) => <AwaitingActivation user={user} />; // Example usage
const PendingSubscriber = ({ user }) => (
  <IsUserSubscriptionDetails user={user} />
);

const EndedTrial = ({ user }) => <SideBarTrialNotification user={user} />;
const ActiveTrial = ({ user }) => (
  <>
    <SideBarTrialNotification user={user} />{" "}
    <IsUserSubscriptionDetails user={user} />
  </>
);
const AvailableTrial = ({ user }) => <SideBarTrialNotification user={user} />;

const EndedPaidSubscription = ({ user }) => <SeasonPassRequired user={user} />;
