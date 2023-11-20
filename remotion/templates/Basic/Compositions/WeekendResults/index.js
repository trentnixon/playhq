import React from "react";
import { Series } from "remotion";

// Components
import { LogoClubTitleHeader } from "../../Components/Header/LogoClubTitleHeader";
import { Results } from "./Results";
import { PrincipalBodySponsor } from "../../Components/Intro/PrincipalSponsor";

export const WeekendResults = (props) => {
  const { FPS_MAIN } = props;

  return (
    <>
      <LogoClubTitleHeader {...props} />
      <Results {...props} />
      <PrincipalBodySponsor {...props} />
    </>
  );
};
