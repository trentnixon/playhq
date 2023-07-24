import React, { useState } from "react";

// PACK
import { Grid } from "@mantine/core";
import { RemotionPlayerContainer } from "./RemotionPlayerContainer";
import { SelectATemplate } from "../Common/Customiser/Design/SelectATemplate";
import { SelectATheme } from "../Common/Customiser/Design/SelectATheme";
import { SelectAudio } from "../Common/Customiser/Design/SelectAudio";

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
        <Grid.Col span={6}>
          <SelectATemplate />
          <SelectAudio isPlaying={props.isPlaying} />
        </Grid.Col>
        <Grid.Col span={6}>
          <RemotionPlayerContainer {...props} />
        </Grid.Col>
      </Grid>
    </>
  );
}
