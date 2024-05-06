import React, { useEffect, useState } from "react";
import { Group, Paper, Stack } from "@mantine/core";
import Adminfetcher from "../../../../lib/Adminfetcher";
import { getIdFromLocalCookie } from "../../../../lib/auth";
import { P } from "../../../Members/Common/Type";

export const SideBarExtraShell = ({ account }) => {
  const [renders, setRenders] = useState({ renders: [] });

  useEffect(() => {
    const fetchData = async () => {
      const ID = await getIdFromLocalCookie();
      const fetchedRenders = await Adminfetcher(
        `/scheduler/getDownloads/${ID}`
      );
      setRenders(fetchedRenders || { renders: [] });
    };

    fetchData();
  }, [account]);

  const OBJ = {
    scheduler: account.attributes.scheduler.data.attributes,
  };

  return (
    <Paper mt={20}>
      <P marginBottom={0} Weight={800}>
        Overview
      </P>
      <Paper shadow="xs" p="md" withBorder mt={5}>
        <Stack>
          <DeliveryDay scheduler={OBJ.scheduler} />
          <RenderCount renders={renders} />
          <DownloadCount renders={renders} />
          <UpcomingGames renders={renders} />
          <ResultsGames renders={renders} />
        </Stack>
      </Paper>
    </Paper>
  );
};

const DeliveryDay = ({ scheduler }) => {
  return (
    <Group position="apart">
      <Group position="left" spacing="xs" align="center">
        <P size="sm" fw={500} marginBottom={0}>
          Bundle Delivery
        </P>
      </Group>
      <P size="sm" c="dimmed" marginBottom={0} Weight={800}>
        {scheduler.days_of_the_week.data.attributes.Name}
      </P>
    </Group>
  );
};

const sumProperty = (renders, propName) => {
  return renders.renders.reduce(
    (total, current) => total + (current[propName] || 0),
    0
  );
};

const RenderCount = ({ renders }) => {
  return (
    <Group position="apart">
      <Group position="left" spacing="xs" align="center">
        <P size="sm" fw={500} marginBottom={0}>
          Bundles
        </P>
      </Group>
      <P size="sm" c="dimmed" marginBottom={0} Weight={800}>
        {renders.renders.length}
      </P>
    </Group>
  );
};

const DownloadCount = ({ renders }) => {
  const totalDownloads = sumProperty(renders, "downloads");
  return (
    <Group position="apart">
      <Group position="left" spacing="xs" align="center">
        <P size="sm" fw={500} marginBottom={0}>
          Downloads Created
        </P>
      </Group>
      <P size="sm" c="dimmed" marginBottom={0} Weight={800}>
        {totalDownloads}
      </P>
    </Group>
  );
};

const UpcomingGames = ({ renders }) => {
  const totalUpcoming = sumProperty(renders, "upcoming_games_in_renders");
  return (
    <Group position="apart">
      <Group position="left" spacing="xs" align="center">
        <P size="sm" fw={500} marginBottom={0}>
          Upcoming Fixtures Analysed
        </P>
      </Group>
      <P size="sm" c="dimmed" marginBottom={0} Weight={800}>
        {totalUpcoming}
      </P>
    </Group>
  );
};

const ResultsGames = ({ renders }) => {
  const totalResults = sumProperty(renders, "game_results_in_renders");
  return (
    <Group position="apart">
      <Group position="left" spacing="xs" align="center">
        <P size="sm" fw={500} marginBottom={0}>
          Fixture Results Analysed
        </P>
      </Group>
      <P size="sm" c="dimmed" marginBottom={0} Weight={800}>
        {totalResults}
      </P>
    </Group>
  );
};
