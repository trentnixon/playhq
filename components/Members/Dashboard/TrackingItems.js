import React, { useEffect, useState } from "react";
import {
  ThemeIcon,
  Progress,
  Text,
  Group,
  Paper,
  rem,
  Space,
} from "@mantine/core";
import { useGetGalleryItems } from "../../../Hooks/useDashBoard";
import { FixturaLoading } from "../Common/Loading";
import { BTN_TOINTERALLINK } from "../Common/utils/Buttons";
import { getContrastColor, lightenColor } from "../../../utils/actions";
import { useStyles } from "./styles";
import { IconTrack, IconUpload } from "@tabler/icons-react";
import Adminfetcher from "../../../lib/Adminfetcher";
import { getIdFromLocalCookie } from "../../../lib/auth";

const ICON_SIZE = rem(60);
async function GetTracking() {
  const ID = await getIdFromLocalCookie();
  return await Adminfetcher(`/account/createTracking/${ID}`);
}

// Extracted the zero-item state into its own component for readability
const ZeroItemsState = ({ classes, Theme }) => (
  <Paper
    radius="md"
    withBorder
    className={classes.card}
    mt={`calc(${ICON_SIZE} / 3)`}
  >
    <ThemeIcon
      color={`red.9`}
      className={classes.icon}
      size={ICON_SIZE}
      radius={ICON_SIZE}
    >
      <IconTrack
        size="2rem"
        stroke={1.5}
        color={"white"} // Add your contrast color function
      />
    </ThemeIcon>
    <Text ta="center" fw={700} className={classes.title}>
      {0}
    </Text>
    <Text c="dimmed" ta="center" fz="sm">
      No Games Tracked
    </Text>
    <Text c="dimmed" ta="center" fz="sm">
      Fixtura will update these numbers when games are found on PlayHQ.
    </Text>
    <Group position="center" mt="md">
      <BTN_TOINTERALLINK LABEL={"Start Tracking"} URL={"members/tracking/"} />
    </Group>
  </Paper>
);

// Main component function
export const DashBoardTrackingItems = ({ IconComponent, AccountID, Theme }) => {
  const { classes } = useStyles();
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      setIsLoading(true);
      const data = await GetTracking();
      setTrackingData(data);
      setIsLoading(false);
    };

    if (AccountID) {
      fetchTrackingData();
    }
  }, [AccountID]);

  if (isLoading) {
    return <div>Loading...</div>; // You can use your loading component here
  }

  if (!trackingData || totalGames === 0) {
    return <ZeroItemsState classes={classes} Theme={Theme} />;
  }


  // Calculate total number of dates and games
  const totalDates = Object.keys(trackingData).length;
  const totalGames = Object.values(trackingData).reduce(
    (acc, games) => acc + games.length,
    0
  );

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
        <IconTrack
          size="2rem"
          stroke={1.5}
          color={"white"} // Add your contrast color function
        />
      </ThemeIcon>
      <Text ta="center" fw={700} className={classes.title}>
        Tracking {totalGames}
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        Games
      </Text>
      <Space h={10} />
      <Text ta="center" fw={700} className={classes.title}>
        Over {totalDates}
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        Dates
      </Text>

      <Group position="center" mt="md">
        <BTN_TOINTERALLINK LABEL={"View Games"} URL={"members/tracking/"} />
      </Group>
    </Paper>
  );
};
