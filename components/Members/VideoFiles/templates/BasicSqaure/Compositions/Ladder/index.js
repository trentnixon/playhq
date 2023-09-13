import React from "react";
import { Sequence, Series } from "remotion";
// Components
import { LogoClubTitleHeader } from "../../Components/Header/LogoClubTitleHeader";
import { LadderMain } from "./LadderMain";

export const Ladder = ({ DATA, theme, fontFamily, FPS_MAIN, FPS_LADDER }) => {
  return (
    <Sequence durationInFrames={FPS_MAIN} from={0}>
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
    </Sequence>
  );
};
