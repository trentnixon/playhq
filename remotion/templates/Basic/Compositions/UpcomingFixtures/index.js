import React from 'react';

// Components
import { LogoClubTitleHeader } from '../../Components/Header/LogoClubTitleHeader';
import { FixturesMain } from './Fixtures';
import { PrincipalBodySponsor } from '../../Components/Intro/PrincipalSponsor';

export const Fixtures = props => {
  return (
    <>
      <LogoClubTitleHeader {...props} />
      <FixturesMain {...props} />
      <PrincipalBodySponsor {...props} />
    </>
  );
};
