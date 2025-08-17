import React from 'react';
// Components
import { LogoClubTitleHeader } from '../../Components/Header/LogoClubTitleHeader';
import { Results } from './Results';
import { PrincipalBodySponsor } from '../../Components/Intro/PrincipalSponsor';

export const WeekendResults = props => {
  return (
    <>
      <LogoClubTitleHeader {...props} />
      <Results {...props} />
      <PrincipalBodySponsor {...props} />
    </>
  );
};
