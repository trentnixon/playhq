import React from 'react';
import { Series } from 'remotion';
// Components
import { LogoClubTitleHeader } from '../../Components/Header/LogoClubTitleHeader';
import { LadderMain } from './LadderMain';
import { PrincipalBodySponsor } from '../../Components/Intro/PrincipalSponsor';

export const Ladder = props => {
  const { FPS_MAIN } = props;
  return (
    <>
      <LogoClubTitleHeader {...props} />
      <LadderMain {...props} />
      <PrincipalBodySponsor {...props} />
    </>
  );
};
