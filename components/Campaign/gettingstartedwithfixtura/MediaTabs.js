import { Paper, Tabs } from "@mantine/core";

import {
  IconVideo,
  IconPictureInPicture,
  IconFileText,
} from "@tabler/icons-react";
import { RemotionPlayer } from "./Player";
import { DisplayWriteups } from "./DisplayWriteups";

export const MediaTabs = (props) => {
  const { selectedTab, setSelectedTab, selectedMedia } = props;
  return (
    <>
      <Tabs
        variant="pills"
        value={selectedTab}
        onTabChange={setSelectedTab}
        color="blue"
      
      >
        <Tabs.List grow position="center">
          <Tabs.Tab value="VIDEO" icon={<IconVideo size="30px" />}>
            VIDEOS
          </Tabs.Tab>
          <Tabs.Tab value="IMAGE" icon={<IconPictureInPicture size="30px" />}>
            Graphics
          </Tabs.Tab>
          <Tabs.Tab value="WRITEUP" icon={<IconFileText size="30px" />}>
            Write ups
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="VIDEO" pt="xs">
          <Paper shadow="md" p={0} withBorder>
            <RemotionPlayer TYPE={"Player"} {...props} />
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="IMAGE" pt="xs">
          <Paper shadow="md" p={0} withBorder>
            <RemotionPlayer TYPE={"Thumbnail"} {...props} />
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="WRITEUP" pt="xs">
          <DisplayWriteups selectedMedia={selectedMedia} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
