import React from "react";
import { Sequence, Series } from "remotion";

// Components
import { LogoClubTitleHeaderLimited } from "../../Components/Header/LogoClubTitleHeader";
import { Fixture } from "./Fixture";

export const RosterPoster = (props) => {
  const { FPS_MAIN } = props;
  return (
    <Sequence durationInFrames={FPS_MAIN} layout="none">
      <Fixture {...props} />
    </Sequence>
  );
};
/* <LogoClubTitleHeaderLimited {...props} /> */
