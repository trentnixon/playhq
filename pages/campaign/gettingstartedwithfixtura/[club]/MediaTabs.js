import { Tabs } from "@mantine/core";

import {
  IconPhoto,
  IconMessageCircle,
  IconSettings,
} from "@tabler/icons-react";
import { RemotionPlayer } from "./Player";

export const MediaTabs = ({ clubData, selectedTab, setSelectedTab, selectedMedia }) => {
    console.log("selectedMedia", selectedMedia)
  return (
    <>
    
    <Tabs variant="pills" value={selectedTab} onTabChange={setSelectedTab} color="blue">
      <Tabs.List grow position="center">
        <Tabs.Tab value="VIDEO" icon={<IconPhoto size="0.8rem" />}>
        VIDEO
        </Tabs.Tab>
        <Tabs.Tab value="IMAGE" icon={<IconMessageCircle size="0.8rem" />}>
          Graphics
        </Tabs.Tab>
        <Tabs.Tab value="WRITEUP" icon={<IconSettings size="0.8rem" />}>
          Write ups
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="VIDEO" pt="xs">
        <RemotionPlayer clubData={clubData} selectedMedia={selectedMedia}/>
      </Tabs.Panel>

      <Tabs.Panel value="IMAGE" pt="xs">
        Graphics tab content
      </Tabs.Panel>

      <Tabs.Panel value="WRITEUP" pt="xs">
        Writeups tab content
      </Tabs.Panel>
    </Tabs>
    {selectedMedia?.Name}
    </>
  );
};
