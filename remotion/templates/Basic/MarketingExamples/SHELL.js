/* eslint-disable camelcase */
import { ThemeProvider } from "styled-components";
import { AbsoluteFill, Audio, interpolate, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Heebo";
import { BGImageAnimation } from "../Components/Common/BGImageAnimation";
import { TitleSequenceFrame } from "../Components/Intro";
import { OutroSequenceFrame } from "../Components/Outro";
import { Fixtures } from "../Compositions/UpcomingFixtures";
import { CompositionLength } from "../../../utils/helpers";
import { WeekendResults } from "../Compositions/WeekendResults";

export const ExampleSHELL = (props) => {
  const { DATA } = props;
  const { fontFamily } = loadFont();
  const { TIMINGS } = DATA;

  const THEME = DATA.VIDEOMETA.Video.Theme;

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
          children
         {/*  {props.children} */}
        </Sequence>
        <Sequence
          durationInFrames={TIMINGS.FPS_OUTRO}
          from={TIMINGS.FPS_INTRO + TIMINGS.FPS_MAIN}
        >
          <OutroSequenceFrame
            theme={THEME}
            fontFamily={fontFamily}
            FPS={TIMINGS.FPS_OUTRO}
            DATA={DATA}
            from={TIMINGS.FPS_INTRO + TIMINGS.FPS_MAIN}
          />
        </Sequence>

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
