/* eslint-disable camelcase */
import { ThemeProvider } from "styled-components";
import { Series, AbsoluteFill, Audio, interpolate, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Heebo";
import { BGImageAnimation } from "../Components/Common/BGImageAnimation";
import { TitleSequenceFrame } from "../Components/Intro";
import { OutroSequenceFrame } from "../Components/Outro";
import { Fixtures } from "../Compositions/UpcomingFixtures";
import { CompositionLength } from "../../../utils/helpers";

export const Example_Video_Upcoming = (props) => {
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
    <ThemeProvider theme={THEME}>
      <AbsoluteFill>
        <BGImageAnimation
          HeroImage={DATA.VIDEOMETA.Video.HeroImage}
          TIMINGS={TIMINGS.FPS_MAIN + 210}
          THEME={THEME}
        />
        <Sequence durationInFrames={TIMINGS.FPS_INTRO} from={0}>
          <TitleSequenceFrame
            THEME={THEME}
            fontFamily={fontFamily}
            FPS_INTRO={TIMINGS.FPS_INTRO}
            VIDEOMETA={DATA.VIDEOMETA}
          />
        </Sequence>
		<Sequence durationInFrames={TIMINGS.FPS_MAIN} from={TIMINGS.FPS_INTRO}>
            <Fixtures {...commonProps} />
          </Sequence>
        {/*    <Series>
          <Series.Sequence offset={0} durationInFrames={TIMINGS.FPS_INTRO}>
            <TitleSequenceFrame
              THEME={THEME}
              fontFamily={fontFamily}
              FPS_INTRO={TIMINGS.FPS_INTRO}
              VIDEOMETA={DATA.VIDEOMETA}
            />
          </Series.Sequence>
          <Series.Sequence durationInFrames={TIMINGS.FPS_MAIN}>
            <Fixtures {...commonProps} />
          </Series.Sequence>
          <Series.Sequence durationInFrames={TIMINGS.FPS_OUTRO}>
            <OutroSequenceFrame
              theme={THEME}
              fontFamily={fontFamily}
              FPS={TIMINGS.FPS_OUTRO}
              DATA={DATA}
            />
          </Series.Sequence>
        </Series> */}
        <Audio
          volume={(f) =>
            interpolate(
              f,
              [CompositionLength(DATA) - 30, CompositionLength(DATA)],
              [0.7, 0],
              { extrapolateLeft: "clamp" }
            )
          }
          src={`${DATA.VIDEOMETA.Video.audio_option}`}
        />
      </AbsoluteFill>
    </ThemeProvider>
  );
};
