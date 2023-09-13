/* eslint-disable camelcase */
import { AbsoluteFill, Sequence } from "remotion";
// Import {RemotionThemes} from '../../theme/themes'
import { loadFont } from "@remotion/google-fonts/Heebo";


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
  const FEDuration = 400;
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
    Ladder: (
      <Ladder
        DATA={DATA}
        theme={THEME}
        fontFamily={fontFamily}
        FPS_MAIN={FEDuration}
        FPS_LADDER={TIMINGS.FPS_LADDER}
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
  };

  return (
    <AbsoluteFill style={{ backgroundColor: THEME.primary }}>
      <Sequence durationInFrames={FEDuration} from={0}>
        {TEMPLATES[TEMPLATE]}
      </Sequence>
      <NoiseComp speed={0.01} circleRadius={50} maxOffset={60} />
    </AbsoluteFill>
  );
};

// {TEMPLATES[RENDER.THEME.VideoTemplate]}
