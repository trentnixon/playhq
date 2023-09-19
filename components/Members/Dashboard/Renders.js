import { ThemeIcon, Progress, Text, Group, Paper, rem } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles"; // Import the styles
import { useGetSchedulerDetails } from "../../../Hooks/useDashBoard";
import { FixturaLoading } from "../Common/Loading";
import { BTN_TOINTERALLINK } from "../Common/utils/Buttons";
import { getContrastColor, lightenColor } from "../../../utils/actions";

const ICON_SIZE = rem(60);

export const DashBoardRenders = ({ IconComponent, schedulerID, Theme }) => {
  // Consistent variable naming
  const { classes } = useStyles();

  // Initialize state with an object
  const [stats, setStats] = useState({});

  // Destructuring for easier use
  const [schedulerDetails, isLoading, fetchSchedulerDetails] =
    useGetSchedulerDetails();

  // Fetch scheduler details when the scheduler ID changes
  useEffect(() => {
    if (schedulerID) {
      fetchSchedulerDetails(schedulerID);
    }
  }, [schedulerID]); // Added schedulerID as a dependency

  // Calculate stats when schedulerDetails change
  useEffect(() => {
    if (schedulerDetails?.attributes) {
      const calculatedStats = calculateStats(schedulerDetails.attributes);
      setStats(calculatedStats);
    }
  }, [schedulerDetails]);

  // Differentiate between loading state and no data
  if (isLoading) {
    return <FixturaLoading />;
  }

  if (!stats.totalRenders) {
    return <ZeroItemsState classes={classes} IconComponent={IconComponent} stats={stats}/>;
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
        color={"green.5"}
        className={classes.icon}
        size={ICON_SIZE}
        radius={ICON_SIZE}
      >
        <IconComponent size="2rem" stroke={1.5} color={"white"} />
      </ThemeIcon>

      <Text ta="center" fw={700} className={classes.title}>
        {stats.totalRenders}
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        Bundles
      </Text>

      <Group position="apart" mt="xs">
        <Text fz="sm" color="dimmed">
          Email Sent
        </Text>
        <Text fz="sm" color="dimmed">
          {((stats.emailSent / stats.totalRenders) * 100).toFixed(0)}%
        </Text>
      </Group>

      <Progress
        value={(stats.emailSent / stats.totalRenders) * 100}
        mt={5}
        color="cyan.5"
      />
      <Group position="apart" mt="md">
        <Text fz="sm">{`${stats.emailSent} / ${stats.totalRenders}`}</Text>
        <Text c="dimmed" ta="center" fz="sm">
          Next Order: {stats.DeliveryDay}
        </Text>
      </Group>
      <Group position="right" mt="md">
        <BTN_TOINTERALLINK
          LABEL={"View Bundles"}
          URL={"members/orderHistory/"}
        />
      </Group>
    </Paper>
  );
};

const ZeroItemsState = ({ classes, IconComponent,stats }) => (
  <Paper
    radius="md"
    withBorder
    shadow="md"
    className={classes.card}
    mt={`calc(${ICON_SIZE} / 3)`}
  >
    <ThemeIcon
      color={`red.9`}
      className={classes.icon}
      size={ICON_SIZE}
      radius={ICON_SIZE}
    >
      <IconComponent size="2rem" stroke={1.5} color={`white`} />
    </ThemeIcon>
    <Text ta="center" fw={700} className={classes.title}>
      {0}
    </Text>
    <Text c="dimmed" ta="center" fz="sm">
      Bundles
    </Text>
    <Text c="dimmed" ta="center" fz="sm">
      Your first bundle will be ready 1 week before the first fixture.
    </Text>
    <Progress
        value={(stats.emailSent / stats.totalRenders) * 100}
        mt={5}
        color="cyan.5"
      />
    <Group position="apart" mt="md">
        <Text fz="sm">{`${stats.emailSent} / ${stats.totalRenders}`}</Text>
        <Text c="dimmed" ta="center" fz="sm">
          Next Order: {stats.DeliveryDay}
        </Text>
      </Group>
    <Group position="center" mt="md">
      <BTN_TOINTERALLINK LABEL={"View Bundles"} URL={"members/orderHistory/"} />
    </Group>
  </Paper>
);

// Added comments to explain what the function does
/**
 * Calculate various statistics from the scheduler data
 * @param {Object} schedulerData - The scheduler data object
 * @returns {Object} Calculated statistics
 */
const calculateStats = (schedulerData) => {
  const totalRenders = schedulerData.renders.data.length;
  const completedRenders = schedulerData.renders.data.filter(
    (render) => render.attributes.Complete
  ).length;
  const processingRenders = schedulerData.renders.data.filter(
    (render) => render.attributes.Processing
  ).length;
  const emailSent = schedulerData.renders.data.filter(
    (render) => render.attributes.sendEmail
  ).length;

  return {
    totalRenders,
    completedRenders,
    processingRenders,
    emailSent,
    /*  latestRender: latestRender?.attributes.Name,
    oldestRender: oldestRender?.attributes.Name, */
    DeliveryDay: schedulerData.days_of_the_week.data.attributes.Name,
  };
};
