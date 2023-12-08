import React from "react";
import { Series } from "remotion";

// Components
import { LogoClubTitleHeader } from "../../Components/Header/LogoClubTitleHeader";
import { Top5PlayersMap } from "./Top5Map";
import { PrincipalBodySponsor } from "../../Components/Intro/PrincipalSponsor";

export const Top5List = (props) => {
  const { FPS_MAIN } = props;
  return (
    <>
      <LogoClubTitleHeader {...props} />
      <Top5PlayersMap {...props} />
      <PrincipalBodySponsor {...props} />
    </>
  );
};
