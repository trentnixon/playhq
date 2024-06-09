import React, { useEffect, useState } from "react";
import { Paper, Stack } from "@mantine/core";
import Adminfetcher from "../../../../lib/Adminfetcher";
import { getIdFromLocalCookie } from "../../../../lib/auth";
import { P } from "../../../Members/Common/Type";

import { RenderCount } from "./components/SideBarExtraShell/RenderCount";
import { DownloadCount } from "./components/SideBarExtraShell/DownloadCount";
import { UpcomingGames } from "./components/SideBarExtraShell/UpcomingGames";
import { ResultsGames } from "./components/SideBarExtraShell/ResultsGames";
import { RecentRenderButton } from "./components/SideBarExtraShell/RecentRenderButton";
import { DeliveryDay } from "./components/SideBarExtraShell/DeliveryDay";

export const SideBarExtraShell = ({ account }) => {
  const [renders, setRenders] = useState({ renders: [] });
  const [token, setToken] = useState("");

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

  if (renders.renders.length === 0) return false;
  console.log("renders ", renders.render_token.token);
  return (
    <Paper mt={20}>
      <P marginBottom={0} Weight={800}>
        Overview
      </P>
      <Paper shadow="xs" p="md" withBorder mt={5}>
        <Stack>
          <RecentRenderButton
            renders={renders.renders}
            account={account}
            token={renders.render_token.token}
          />
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
