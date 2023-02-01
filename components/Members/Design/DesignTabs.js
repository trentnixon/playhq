import React, { useState } from "react";


// PACK
import { Flex, Space, Tabs } from "@mantine/core";
import { IconTemplate, IconBadgeTm, IconMusic } from "@tabler/icons";
import { TABCONTENT } from "./TABCONTENT";
import { RemotionPlayerContainer } from "./RemotionPlayerContainer";
import { P } from "../Common/Type";

// Components

/*
This component renders a set of tabs, each with its own icon and label. 
It uses the "useState" hook to manage the active tab state and it also renders additional UI 
elements and other functional components that are being passed the props from the parent component.
It also uses some props such as variant, color and position, these are used to style the tab and
 other elements as per the requirements.
*/
export function DesignTabs(props) {
  const [activeTab, setActiveTab] = useState("Templates");

  return (
    <Tabs
      value={activeTab}
      onTabChange={setActiveTab}
      variant="pills"
      color="blue.8"
    >
      <Tabs.List position="center" grow={true}>
        <Tabs.Tab value="Templates" icon={<IconTemplate size={14} />}>
          <P
            marginBottom={0}
            color={activeTab === "Templates" ? 0 : 2}
            Weight={400}
            Copy={`Templates`}
          />
        </Tabs.Tab>
        <Tabs.Tab value="Branding" icon={<IconBadgeTm size={14} />}>
          <P
            marginBottom={0}
            color={activeTab === "Branding" ? 0 : 2}
            Weight={400}
            Copy={`Branding`}
          />
        </Tabs.Tab>
        <Tabs.Tab value="Audio options" icon={<IconMusic size={14} />}>
          <P
            marginBottom={0}
            color={activeTab === "Audio options" ? 0 : 2}
            Weight={400}
            Copy={`Audio options`}
          />
        </Tabs.Tab>
      </Tabs.List>

      <Space h={20} />
      <P
        Copy={`Customize your assets to match your club's unique style by selecting an option from the template, theme, and audio list. Make sure your assets stand out and effectively promote your club or association.`}
      />

      <Flex wrap="wrap">
        <TABCONTENT {...props} />
        <RemotionPlayerContainer {...props} /> 
      </Flex>
    </Tabs>
  );
}
