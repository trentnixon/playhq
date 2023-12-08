import React from "react";
import { Series } from "remotion";

// Components
import { LogoClubTitleHeader } from "../../Components/Header/LogoClubTitleHeader";
import { Results } from "./Results";
import { PrincipalBodySponsor } from "../../Components/Intro/PrincipalSponsor";
import { HeaderLogo } from "../../Components/Header/Logo";

export const WeekendResults = (props) => {
  return (
    <>
      <LogoClubTitleHeader {...props} />
      <Results {...props} />
      <PrincipalBodySponsor {...props} />
    </>
  );
};
