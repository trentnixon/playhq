// Core
import React from "react";
// Components
import { SelectATemplate } from "../Common/Customiser/Design/SelectATemplate";
import { SelectATheme } from "../Common/Customiser/Design/SelectATheme";
import { SelectAudio } from "../Common/Customiser/Design/SelectAudio";

export const TABCONTENT = (props) => {
  const { isPlaying } = props;

  return (
    <>
      <SelectATemplate />
      <SelectATheme />
      <SelectAudio isPlaying={isPlaying} />
    </>
  );
};
