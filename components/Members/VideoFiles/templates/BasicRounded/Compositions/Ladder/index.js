import React from "react";
import { Sequence } from "remotion";
// Components
import { LadderMain } from "./LadderMain";
import { LogoClubTitleHeader } from "../../Components/Header/LogoClubTitleHeader";
export const Ladder = ({ DATA, theme, fontFamily, FPS_MAIN, FPS_LADDER }) => {
  return (
    <>
      <LogoClubTitleHeader
        THEME={theme}
        fontFamily={fontFamily}
        DATA={DATA.VIDEOMETA}
        FPS_MAIN={FPS_MAIN}
      />
      <LadderMain
        THEME={theme}
        DATA={DATA.DATA}
        fontFamily={fontFamily}
        FPS_MAIN={FPS_MAIN}
        FPS_LADDER={FPS_LADDER}
      />
    </>
  );
};
