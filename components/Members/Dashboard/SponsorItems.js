import React from "react";
import { ThemeIcon, Progress, Text, Group, Paper, rem } from "@mantine/core";
import { FixturaLoading } from "../Common/Loading";
import { BTN_TOINTERALLINK } from "../Common/utils/Buttons";
import { useStyles } from "./styles";
import { IconCurrencyDollar } from "@tabler/icons-react";

const ICON_SIZE = rem(60);

export const DashBoardSponsoredItems = ({ IconComponent, sponsors, Theme }) => {
  const { classes } = useStyles();
  const activeSponsors = sponsors.filter(
    (sponsor) => sponsor.attributes.isActive
  ).length;

  if (activeSponsors === 0) {
    return <ZeroItemsState classes={classes} Theme={Theme} />;
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
        {activeSponsors}
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        Active Sponsors
      </Text>
      <Group position="apart" mt="xs">
        <Text fz="sm" color="dimmed">
          Sponsors
        </Text>
        <Text fz="sm" color="dimmed">
          {((activeSponsors / 5) * 100).toFixed(0)}%
        </Text>
      </Group>
      <Progress value={(activeSponsors / 5) * 100} mt={5} color="cyan.5" />
      <Group position="apart" mt="md">
        <Text fz="sm">{`${activeSponsors} / 5`}</Text>
      </Group>
      <Group position="right" mt="md">
        <BTN_TOINTERALLINK LABEL={"View"} URL={"members/sponsors/"} />
      </Group>
    </Paper>
  );
};

const ZeroItemsState = ({ classes, Theme }) => (
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
      <IconCurrencyDollar size="2rem" stroke={1.5} color={`white`} />
    </ThemeIcon>
    <Text ta="center" fw={700} className={classes.title}>
      0
    </Text>
    <Text c="dimmed" ta="center" fz="sm">
      Sponsors
    </Text>
    <Text c="dimmed" ta="center" fz="sm">
      Add sponsors to boost your club's visibility and funding.
    </Text>
    <Group position="center" mt="md">
      <BTN_TOINTERALLINK LABEL={"Manage"} URL={"members/sponsors/"} />
    </Group>
  </Paper>
);
