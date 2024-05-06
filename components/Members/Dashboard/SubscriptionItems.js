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
import { getTrialNotificationStatus } from "../../../lib/members/getTrialNotificationStatus";
import { useUserStatus } from "../../Layouts/members/Members_Account_Details_Card/components/useUserStatus";

const ICON_SIZE = rem(60);

export const DashBoardSubscriptionItems = ({ user, Theme }) => {
  const { classes } = useStyles();
  const trialNotificationStatus = getTrialNotificationStatus(user);
  const { statusMessage, statusColor, Title, includeSponsors } =
    useUserStatus(user);

  let StatusIcon = IconCurrencyDollar; // Default icon

  if (
    ["available_trial", "active_trial", "ended_trial"].includes(
      trialNotificationStatus
    )
  ) {
    return (
      <TrialStatusCard
        status={trialNotificationStatus}
        user={user}
        Theme={Theme}
      />
    );
  } else {
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
          Plan: {Title}
        </Text>

        <Group position="center" mt="md">
          {includeSponsors ? (
            <Text fz="sm" c="dimmed">
              Sponsors Enabled: <IconCheck size={"1em"} color={"green"} />
            </Text>
          ) : (
            <Text fz="sm" c="dimmed">
              Sponsors Disabled:{" "}
              <IconAlertTriangle size={"1em"} color={"red"} />
            </Text>
          )}
        </Group>

        <Group position="center" mt="md">
          <BTN_TOINTERALLINK LABEL={"View Account"} URL={"members/account/"} />
        </Group>
      </Paper>
    );
  }
};
const TrialStatusCard = ({ status, user, Theme }) => {
  const { classes } = useStyles();

  let statusMessage = "";
  let StatusIcon = null;
  let statusColor = "gray.4"; // Default color
  let ctaMessage = "";
  let buttonText = "";

  switch (status) {
    case "active_trial":
      statusMessage = "Your free trial is currently active.";
      StatusIcon = IconCheck;
      statusColor = "green.6";
      ctaMessage =
        "Your automated assets are on their way. Experience Fixtura's convenience firsthand!";
      buttonText = "Go to Account";
      break;
    case "ended_trial":
      statusMessage = "Your free trial has ended.";
      StatusIcon = IconAlertTriangle;
      statusColor = "red.9";
      ctaMessage = "Unlock continuous access to Fixtura by choosing a plan.";
      buttonText = "Choose a Subscription";
      break;
    case "available_trial":
      statusMessage = "You have a free trial available!";
      StatusIcon = IconCurrencyDollar;
      statusColor = "blue.6";
      ctaMessage =
        "Kickstart your Fixtura experience with a 14-day free trial.";
      buttonText = "Start Free Trial";
      break;
    default:
      statusMessage = "Unknown Status";
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
      <Text c="dimmed" ta="center" fz="sm" mt="xs">
        {ctaMessage}
      </Text>

      <Group position="center" mt="md">
        <BTN_TOINTERALLINK LABEL={buttonText} URL={"members/account/"} />
      </Group>
    </Paper>
  );
};
