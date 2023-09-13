import React, { useState } from "react";

// PACK
import { Grid, Tabs } from "@mantine/core";
import { RemotionPlayerContainer } from "./RemotionPlayerContainer";
import { SelectATemplate } from "../Common/Customiser/Design/SelectATemplate";
//import { SelectATheme } from "../Common/Customiser/Design/SelectATheme";
import { SelectAudio } from "../Common/Customiser/Design/SelectAudio";
import { IconColumns3, IconVolume } from "@tabler/icons-react";

// Components
 
/*
This component renders a set of tabs, each with its own icon and label. 
It uses the "useState" hook to manage the active tab state and it also renders additional UI 
elements and other functional components that are being passed the props from the parent component.
It also uses some props such as variant, color and position, these are used to style the tab and
 other elements as per the requirements.
*/
export function DesignTabs(props) { 
  return (
    <>
      <Grid>
        <Grid.Col sm={12} md={12}>
          <RemotionPlayerContainer {...props} /> 
        </Grid.Col>
        <Grid.Col sm={12} md={12}>
          <Tabs defaultValue="theme" variant="pills" color="cyan.5">
            <Tabs.List grow position="center">
              <Tabs.Tab value="theme" icon={<IconColumns3 size="1.3rem" />}>
                Theme
              </Tabs.Tab>
              <Tabs.Tab value="audio" icon={<IconVolume size="1.3rem" />}>
                Audio
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="theme" pt="xs">
              <SelectATemplate />
            </Tabs.Panel>

            <Tabs.Panel value="audio" pt="xs">
              <SelectAudio isPlaying={props.isPlaying} />
            </Tabs.Panel>
          </Tabs>
        </Grid.Col>
      </Grid>
    </>
  );
}
/*  <SelectATemplate />
          <SelectAudio isPlaying={props.isPlaying} /> */
