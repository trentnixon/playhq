import React from "react";
import { Series } from "remotion";

// Components
import { LogoClubTitleHeader } from "../../Components/Header/LogoClubTitleHeader";
import { FixturesMain } from "./Fixtures";
import { PrincipalBodySponsor } from "../../Components/Intro/PrincipalSponsor";

export const Fixtures = (props) => {
  const { FPS_MAIN } = props;

  return (
    <>
      <LogoClubTitleHeader {...props} />
      <FixturesMain {...props} />
      <PrincipalBodySponsor {...props} />
    </>
  );
};
