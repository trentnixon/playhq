import React from "react";
import { Sequence, Series } from "remotion";

// Components
import { LogoClubTitleHeader } from "../../Components/Header/LogoClubTitleHeader";
import { Results } from "./Results";

export const WeekendResults = ({
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
      <Results
        THEME={theme}
        DATA={DATA.DATA}
        fontFamily={fontFamily}
        FPS_MAIN={FPS_MAIN}
        FPS_SCORECARD={FPS_SCORECARD}
      />
    </>
  );
};
