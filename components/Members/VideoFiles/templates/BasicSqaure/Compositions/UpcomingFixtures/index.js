import React from "react";
import { Sequence, Series } from "remotion";

// Components
import { LogoClubTitleHeader } from "../../Components/Header/LogoClubTitleHeader";
import { FixturesMain } from "./Fixtures";

export const Fixtures = ({
  DATA,
  theme,
  fontFamily,
  FPS_MAIN,
  FPS_SCORECARD,
}) => {
  return (
    <>
      <LogoClubTitleHeader
        THEME={theme}
        fontFamily={fontFamily}
        DATA={DATA.VIDEOMETA}
        FPS_MAIN={FPS_MAIN}
      />
      <FixturesMain 
        THEME={theme}
        DATA={DATA.DATA}
        fontFamily={fontFamily}
        FPS_MAIN={FPS_MAIN}
        FPS_SCORECARD={FPS_SCORECARD}
      />
    </>
  );
};
