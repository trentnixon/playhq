/* eslint-disable camelcase */

import { loadFont } from '@remotion/google-fonts/Heebo';
import { WeekendSingleGameResult } from '../Compositions/WeekendSingleGameResult';
import { AbsoluteFill } from 'remotion';
export const Example_Video_WeekendSingleGameResult = props => {
  const { DATA } = props;
  const { fontFamily } = loadFont();
  const { TIMINGS } = DATA;

  const THEME = DATA.VIDEOMETA.Video.Theme;

  const commonProps = {
    DATA: DATA.DATA,
    VIDEOMETA: DATA.VIDEOMETA,
    TIMINGS: DATA.TIMINGS,
    THEME: THEME,
    fontFamily,
    FPS_MAIN: TIMINGS.FPS_MAIN,
    FPS_SCORECARD: TIMINGS.FPS_SCORECARD,
    FPS_LADDER: TIMINGS.FPS_LADDER,
    TemplateVariation: DATA.VIDEOMETA.Video.TemplateVariation,
  };

  return (
    <AbsoluteFill style={{ zIndex: 100 }}>
      <WeekendSingleGameResult {...commonProps} />
    </AbsoluteFill>
  );
};
