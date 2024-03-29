/* eslint-disable camelcase */
import { AbsoluteFill } from "remotion";
import { loadFont } from "@remotion/google-fonts/Heebo";
import { Ladder } from "../Compositions/Ladder";

export const Example_Video_Ladder = (props) => {
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
      <Ladder {...commonProps} />
    </AbsoluteFill>
  );
};
