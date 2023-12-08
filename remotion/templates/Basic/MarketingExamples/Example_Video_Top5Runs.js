/* eslint-disable camelcase */

import { loadFont } from "@remotion/google-fonts/Heebo";
import { Top5List } from "../Compositions/Top5List";

export const Example_Video_Top5Runs = (props) => {
  const { DATA,TYPE } = props;
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

  return <Top5List {...commonProps} TYPE={TYPE} />;
};
