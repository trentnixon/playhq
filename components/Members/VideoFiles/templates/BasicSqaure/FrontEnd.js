/* eslint-disable camelcase */
import { ThemeProvider } from "styled-components";
import { AbsoluteFill, Sequence } from "remotion";
// Import {RemotionThemes} from '../../theme/themes'
import { loadFont } from "@remotion/google-fonts/Heebo";

// Import Design Templates for MATCHDAYRESULT.
// Add new deisng patterns below
// Componnets

// Assets
import { Top5List } from "./Compositions/Top5List/frontend";
import { WeekendResults } from "./Compositions/WeekendResults/index";
import { Fixtures } from "./Compositions/UpcomingFixtures/index";
import { Ladder } from "./Compositions/Ladder/index";
import { NoiseComp } from "./Components/Common/niose3D";
import { WeekendSingleGameResult } from "./Compositions/WeekendSingleGameResult";

// END

export const Template_Basic_Sqaure = (props) => {
  const { DATA } = props;
  const { fontFamily } = loadFont();
  const { TIMINGS } = DATA;
  const TEMPLATE = DATA.VIDEOMETA.Video.CompositionID;
  const THEME = DATA.VIDEOMETA.Video.Theme;
  const FEDuration = 400;

  const TEMPLATES = {
    Top5BattingList: (
      <Top5List
        DATA={DATA}
        theme={THEME}
        TYPE="BATTING"
        fontFamily={fontFamily}
        FPS_MAIN={FEDuration}
      />
    ),
    Top5BowlingList: (
      <Top5List
        DATA={DATA}
        TYPE="BOWLING"
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={FEDuration}
      />
    ),
    WeekendResults: (
      <WeekendResults
        DATA={DATA}
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={FEDuration}
        FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
      />
    ),
    WeekendSingleGameResult: (
      <WeekendSingleGameResult
        DATA={DATA}
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={FEDuration}
        FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
      />
    ),
    UpComingFixtures: (
      <Fixtures
        DATA={DATA}
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={FEDuration}
        FPS_SCORECARD={TIMINGS.FPS_SCORECARD}
      />
    ),
    Ladder: (
      <Ladder
        DATA={DATA}
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={FEDuration}
        FPS_LADDER={TIMINGS.FPS_LADDER}
      />
    ),
  };

  return (
    <ThemeProvider theme={THEME}>
      <AbsoluteFill style={{ backgroundColor: THEME.primary }}>
        <Sequence durationInFrames={FEDuration} from={0}>
          {TEMPLATES[TEMPLATE]}
        </Sequence>
        <NoiseComp speed={0.01} circleRadius={50} maxOffset={60} />
      </AbsoluteFill>
    </ThemeProvider>
  );
};
