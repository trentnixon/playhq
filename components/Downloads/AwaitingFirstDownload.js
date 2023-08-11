import React from "react";
import { MembersWrapper, Wrapper } from "../Members/Common/Containers";
import { P, PageTitle } from "../Members/Common/Type";
import { IconDownload } from "@tabler/icons";
import { Box, Group } from "@mantine/core";
import { DownloadsSelectDays } from "./DownloadsSelectDays";

const AwaitingFirstDownload = ({scheduler}) => {
  return (
    <MembersWrapper>
      <PageTitle Copy={`Downloads`} ICON={<IconDownload size={40} />} />
    
      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "60%",
            })}
          >
            <P>Awaiting first download.</P>
            <DownloadsSelectDays scheduler={scheduler} />
            <P>To ensure you receive weekly deliveries check the following items</P>
            <ul>
              <li>Active Subscription with Fixtura</li>
              <li>Selection of assets (match reports, videos, images)</li>
              <li>Day of the week for delivery</li>
              <li>Club/Association logo and colors</li>
              <li>
                Any specific information or branding to be included in the
                assets
              </li>
              <li>Up-to-date email address for the delivery</li>
            </ul>
          </Box>
        </Group>
      </Wrapper>
    </MembersWrapper>
  );
};

export default AwaitingFirstDownload;
