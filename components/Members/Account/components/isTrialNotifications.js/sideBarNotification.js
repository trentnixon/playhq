import { Card, Group, useMantineTheme, Tooltip } from "@mantine/core";

import { P } from "../../../Common/Type";
import { getTrialNotificationStatus } from "../../../../../lib/members/getTrialNotificationStatus";
import { BTN_TOINTERALLINK } from "../../../Common/utils/Buttons";

export const SideBarTrialNotification = ({ user }) => {
  const theme = useMantineTheme();
  const trialNotificationStatus = getTrialNotificationStatus(user);

  if (trialNotificationStatus === "subscribed") {
    // The user has an active subscription, so no need to show any notifications
    return null;
  }

  const notificationConfig = {
    active_trial: {
      label: "Free trial is Active",
      backgroundColor: theme.colors.green[1],
      text: "Trial Version...",
    },
    ended_trial: {
      label:
        "Your trial has ended. Please subscribe to continue using all features.",
      backgroundColor: theme.colors.red[2],
      text: "Trial Ended",
    },
    available_trial: {
      label: "Activate now for two weeks FREE on us!",
      backgroundColor: theme.colors.blue[1],
      text: "Free Trial Available",
    },
  };

  const config = notificationConfig[trialNotificationStatus]; 

  return (
    <>
      <Tooltip label={config?.label} position="top">
        <Group position="center" mt={14}>
          <BTN_TOINTERALLINK LABEL={config?.text} URL={"/members/account"} />
        </Group>
      </Tooltip>
    </>
  );
};
