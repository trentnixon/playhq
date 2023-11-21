import { Paper, Tabs } from "@mantine/core";

import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
  IconVideo,
  IconPictureInPicture,
  IconFileText,
} from "@tabler/icons-react";
import { RemotionPlayer } from "./Player";

export const MediaTabs = ({
  clubData,
  selectedTab,
  setSelectedTab,
  selectedMedia,
}) => {
  console.log("selectedMedia", selectedMedia);
  return (
    <>
      <Tabs
        variant="pills"
        value={selectedTab}
        onTabChange={setSelectedTab}
        color="gray.7"
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
            <RemotionPlayer
              clubData={clubData}
              selectedMedia={selectedMedia}
              TYPE={"Player"}
            />
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="IMAGE" pt="xs">
          <Paper shadow="md" p={0} withBorder>
            <RemotionPlayer
              clubData={clubData}
              selectedMedia={selectedMedia}
              TYPE={"Thumbnail"}
            />
          </Paper>
        </Tabs.Panel>

        <Tabs.Panel value="WRITEUP" pt="xs">
          Writeups tab content
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
