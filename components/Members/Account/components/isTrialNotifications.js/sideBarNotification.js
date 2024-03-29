import {
  Card,
  Group,
  useMantineTheme,
  Tooltip,
  Text,
  Button,
  Paper,
  Container,
} from "@mantine/core";
import { IconAlertTriangleFilled } from "@tabler/icons-react";

import { P } from "../../../Common/Type";
import { getTrialNotificationStatus } from "../../../../../lib/actions";

export const SideBarTrialNotification = ({ user }) => {
  const theme = useMantineTheme();
  const trialNotificationStatus = getTrialNotificationStatus(user);

  if (trialNotificationStatus === "subscribed") {
    // The user has an active subscription, so no need to show any notifications
    return null;
  }
  // eppiong order 92

  const notificationConfig = {
    active_trial: {
      label: "Free trial is Active",
      backgroundColor: theme.colors.green[2],
      text: "Trial Version",
    },
    ended_trial: {
      label:
        "Your trial has ended. Please subscribe to continue using all features.",
      backgroundColor: theme.colors.red[2],
      text: "Trial Ended",
    },
    available_trial: {
      label:
        "Activate now for two weeks FREE on us!",
      backgroundColor: theme.colors.blue[1],
      text: "Free Trial Available",
    },
  };

  const config = notificationConfig[trialNotificationStatus];

  return (
    <Tooltip label={config?.label} position="top">
      <Card
        withBorder
        padding="sm"
        radius="md"
        mt={5}
        style={{ backgroundColor: config?.backgroundColor }}
      >
        <Group position="center">
          <P marginBottom={0}>{config?.text}</P>
        </Group>
      </Card>
    </Tooltip>
  );
};
