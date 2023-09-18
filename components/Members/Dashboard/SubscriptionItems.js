import React from "react";
import { ThemeIcon, Text, Group, Paper, rem } from "@mantine/core";
import { BTN_TOINTERALLINK } from "../Common/utils/Buttons";
import { useStyles } from "./styles";
import {
  IconCheck,
  IconAlertTriangle,
  IconCurrencyDollar,
  IconClockPause,
} from "@tabler/icons-react";

const ICON_SIZE = rem(60);

export const DashBoardSubscriptionItems = ({ user, Theme }) => {
  const { classes } = useStyles();

  // Extract user's subscription status and details
  const { isActive, Status, cancel_at_period_end, isPaused } =
    user.attributes.order?.data?.attributes ?? {};
  const subscriptionTier = user.attributes.subscription_tier?.data?.attributes;
  const includesSponsors =
    user.attributes.subscription_tier.data?.attributes?.includeSponsors;

  let statusMessage = "Unknown status";
  let statusColor = "red.9"; // Default color
  let StatusIcon = IconCurrencyDollar; // Default icon

  if (isActive) {
    if (Status) {
      if (cancel_at_period_end) {
        statusMessage = "Cancelling";
        StatusIcon = IconAlertTriangle;
        statusColor = "yellow.6";
      } else if (isPaused) {
        statusMessage = "Paused";
        StatusIcon = IconClockPause;
        statusColor = "yellow.6";
      } else {
        statusMessage = "Active";
        StatusIcon = IconCheck;
        statusColor = "green.6";
      }
    }
  } else {
    statusMessage = "Not Active";
    statusColor = "red.9";
  }

  return (
    <Paper
      radius="md"
      withBorder
      shadow="md"
      className={classes.card}
      mt={`calc(${ICON_SIZE} / 3)`}
    >
      <ThemeIcon
        color={statusColor}
        className={classes.icon}
        size={ICON_SIZE}
        radius={ICON_SIZE}
      >
        <StatusIcon size="2rem" stroke={1.5} color={"white"} />
      </ThemeIcon>

      <Text ta="center" fw={700} className={classes.title}>
        {statusMessage}
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        Subscription Status
      </Text>

      <Text ta="center" fz="sm" c="dimmed">
        Plan: {subscriptionTier?.Name ?? "Awaiting Selection"}
      </Text>

      <Group position="center" mt="md">
        {includesSponsors ? (
          <Text fz="sm" c="dimmed">
            Sponsors Enabled: <IconCheck size={"1em"} color={"green"} />
          </Text>
        ) : (
          <Text fz="sm" c="dimmed">
            Sponsors Disabled: <IconAlertTriangle size={"1em"} color={"red"} />
          </Text>
        )}
      </Group>

      <Group position="center" mt="md">
        <BTN_TOINTERALLINK LABEL={"View Account"} URL={"members/account/"} />
      </Group>
    </Paper>
  );
};
