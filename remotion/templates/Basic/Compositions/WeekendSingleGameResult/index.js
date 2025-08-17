import React from 'react';
import { Sequence } from 'remotion';

// Components
import { LogoClubTitleHeaderLimited } from '../../Components/Header/LogoClubTitleHeader';
import { Results } from './Results';

export const WeekendSingleGameResult = props => {
  const { FPS_MAIN } = props;
  return (
    <>
      <LogoClubTitleHeaderLimited {...props} />
      <Results {...props} />
    </>
  );
};
