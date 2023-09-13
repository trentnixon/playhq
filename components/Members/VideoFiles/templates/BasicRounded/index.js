/* eslint-disable camelcase */
import { ThemeProvider } from "styled-components";
import { Series, AbsoluteFill, Audio, interpolate } from "remotion";
// Import {RemotionThemes} from '../../theme/themes'
import { loadFont } from "@remotion/google-fonts/Heebo";

// Import Design Templates for MATCHDAYRESULT.
// Add new deisng patterns below
// Componnets
import { TitleSequenceFrame } from "./Components/Intro";
import { OutroSequenceFrame } from "./Components/Outro/index";
// Assets
import { Top5List } from "./Compositions/Top5List/index";
import { WeekendResults } from "./Compositions/WeekendResults/index";
import { Ladder } from "./Compositions/Ladder/index";
import { Fixtures } from "./Compositions/UpcomingFixtures/index";
// Noise
import { NoiseComp } from "./Components/Common/niose3D";
import { WeekendSingleGameResult } from "./Compositions/WeekendSingleGameResult";
// END

export const Template_Basic_Rounded = (props) => {
  const { DATA } = props;
  const { fontFamily } = loadFont();
  console.log("Template_Basic_Rounded DATA", props);
  const { TIMINGS } = DATA;
  const TEMPLATE = DATA.VIDEOMETA.Video.CompositionID;
  const THEME = DATA.VIDEOMETA.Video.Theme;

  const TEMPLATES = {
    Top5BattingList: (
      <Top5List
        DATA={DATA}
        theme={THEME}
        TYPE="BATTING"
        fontFamily={fontFamily}
        FPS_MAIN={300}
      />
    ),
    Top5BowlingList: (
      <Top5List
        DATA={DATA}
        TYPE="BOWLING"
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={300}
      />
    ),
    WeekendResults: (
      <WeekendResults
        DATA={DATA}
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={300}
        FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
      />
    ),
    WeekendSingleGameResult: (
      <WeekendSingleGameResult
        DATA={DATA}
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={300}
        FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
      />
    ),
    Ladder: (
      <Ladder
        DATA={DATA}
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={300}
        FPS_LADDER={TIMINGS.FPS_LADDER}
      />
    ),
    UpComingFixtures: (
      <Fixtures
        DATA={DATA}
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={300}
        FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
      />
    ),
  };

  const HasSponsors = () => {
    DATA.VIDEOMETA.Video.includeSponsors;
    if (DATA.VIDEOMETA.Club.Sponsors.length === 0) return 0;
    return DATA.VIDEOMETA.Video.includeSponsors ? DATA.TIMINGS.FPS_OUTRO : 0;
  };
  const CompositionLength = (DATA) => {
    return [
      DATA.TIMINGS.FPS_INTRO,
      HasSponsors(DATA),
      DATA.TIMINGS.FPS_MAIN,
    ].reduce((a, b) => a + b, 0);
  };

  return (
    <ThemeProvider theme={THEME}>
      <AbsoluteFill style={{ backgroundColor: THEME.primary }}>
        {TEMPLATES[TEMPLATE]}
        <NoiseComp speed={0.01} circleRadius={50} maxOffset={60} />
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

// {TEMPLATES[RENDER.THEME.VideoTemplate]}
