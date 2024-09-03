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

/**
 * This component fetches renders data based on the account id from cookies
 * and renders various statistics about the account.
 *
 * @param {Object} account - The account object containing account details.
 * @returns {JSX.Element} - The JSX element containing the SideBarExtras component.
 */
export const SideBarExtraShell = ({ account }) => {
  // State hook to store the renders data.
  const [renders, setRenders] = useState({ renders: [] });

  // Effect hook to fetch the renders data when the component mounts or when the account changes.
  useEffect(() => {
    // Asynchronous function to fetch the renders data based on the account id from cookies.
    const fetchData = async () => {
      // Get the account id from cookies.
      const ID = await getIdFromLocalCookie();
      // Fetch the renders data from the server.
      const fetchedRenders = await Adminfetcher(
        `/scheduler/getDownloads/${ID}`
      );
      // Update the renders state with the fetched data or an empty array if the fetch fails.
      setRenders(fetchedRenders || { renders: [] });
    };

    // Call the fetchData function to fetch the renders data.
    fetchData();
  }, [account]);

  // Extract the scheduler object from the account object.
  const OBJ = {
    scheduler: account.attributes.scheduler.data.attributes,
  };

  // If there are no renders, return false to hide the component.
  if (renders.renders.length === 0) return false;

  // Log the render token to the console.

  // Render the SideBarExtras component.
  return (
    <Paper mt={20}>
      <P marginBottom={0} Weight={800}>
        Overview
      </P>
      <Paper shadow="xs" p="md" withBorder mt={5}>
        <Stack>
          {/* Render the RecentRenderButton component with the renders, account, and render token as props. */}
          <RecentRenderButton
            renders={renders.renders}
            account={account}
            token={renders?.render_token?.token}
          />
          {/* Render the DeliveryDay component with the scheduler as a prop. */}
          <DeliveryDay scheduler={OBJ.scheduler} />
          {/* Render the RenderCount component with the renders as a prop. */}
          <RenderCount renders={renders} />
          {/* Render the DownloadCount component with the renders as a prop. */}
          <DownloadCount renders={renders} />
          {/* Render the UpcomingGames component with the renders as a prop. */}
          <UpcomingGames renders={renders} />
          {/* Render the ResultsGames component with the renders as a prop. */}
          <ResultsGames renders={renders} />
        </Stack>
      </Paper>
    </Paper>
  );
};
