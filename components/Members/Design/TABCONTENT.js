// Core
import React from "react";
import { useEffect, useState } from "react";

// UTILS

// PACK
import { Paper, Tabs } from "@mantine/core";

// Components

import { SelectATemplate } from "../Common/Customiser/Design/SelectATemplate";
import { SelectATheme } from "../Common/Customiser/Design/SelectATheme";
import { SelectAudio } from "../Common/Customiser/Design/SelectAudio";

export const TABCONTENT = (props) => {
  const { isPlaying } = props;
  //const [activeTab, setActiveTab] = useState("Templates");
  const [width, setWidth] = useState(0);
  function getContainerWidth() {
    if (width < 890) {
      return "100%";
    } else if (width >= 890 && width < 980) {
      return "450px";
    } else if (width >= 980 && width < 1124) {
      return "500px";
    } else if (width >= 1124) {
      return "700px";
    }
  }
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    if (width === 0) {
      handleResize();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Paper
      radius="md"
      shadow="0"
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.white,
        width: getContainerWidth(),
      })}
    >
      <Tabs.Panel value="Templates" pt="xs">
        <SelectATemplate />
      </Tabs.Panel>

      <Tabs.Panel value="Branding" pt="xs">
        <SelectATheme />
      </Tabs.Panel>

      <Tabs.Panel value="Audio options" pt="xs">
        <SelectAudio isPlaying={isPlaying} />
      </Tabs.Panel>
    </Paper>
  );
};
