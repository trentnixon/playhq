import DATA_FIXTURES from "../remotion/utils/upcoming_v2.json";
import DATA_RESULTS from "../remotion/utils/WeekendResultsV2.json";
import DATA_TOP5RUNS from "../remotion/utils/Top5RunsV2.json";
import DATA_TOP5WICKETS from "../remotion/utils/Top5WicketsV2.json";
import DATA_LADDER from "../remotion/utils/LadderV2.json";
 
import {
  UpComingFixtures as Example_Video_Upcoming_Basic,
  WeekendResults as Example_Video_WeekendResults_Basic,
  Top5BattingList as Example_Video_Top5BattingList_Basic,
  Top5BowlingList as Example_Video_Top5BowlingList_Basic,
  Ladder as Example_Video_Ladder_Basic,
} from "../components/Campaign/GLOBAL/Examples/AssetExamples";

import {
  UpComingFixtures as Example_Video_Upcoming_CNSW,
  WeekendResults as Example_Video_WeekendResults_CNSW,
  Top5BattingList as Example_Video_Top5BattingList_CNSW,
  Top5BowlingList as Example_Video_Top5BowlingList_CNSW,
  Ladder as Example_Video_Ladder_CNSW,
} from "../components/Campaign/GLOBAL/Examples/AssetExampleCNSW";


import {
  UpComingFixtures as Example_Video_Upcoming_QLDC,
  WeekendResults as Example_Video_WeekendResults_QLDC,
  Top5BattingList as Example_Video_Top5BattingList_QLDC,
  Top5BowlingList as Example_Video_Top5BowlingList_QLDC,
  Ladder as Example_Video_Ladder_QLDC,
} from "../components/Campaign/GLOBAL/Examples/AssetExampleQLDC";



export const DEFAULTLOGO = "https://fixtura.s3.ap-southeast-2.amazonaws.com/Logo_Blue_on_transparent_0e86187b28.png";

   
export const ASSETS = {
  Basic: {
    UpComingFixtures: {
      component: Example_Video_Upcoming_Basic, // Replace with actual Basic template component for Upcoming Fixtures
      DATA: DATA_FIXTURES,
    },
    WeekendResults: {
      component: Example_Video_WeekendResults_Basic, // Replace with Basic template component for Weekend Results
      DATA: DATA_RESULTS,
    },
    Top5BattingList: {
      component: Example_Video_Top5BattingList_Basic, // Replace with Basic template component for Top 5 Batting List
      DATA: DATA_TOP5RUNS,
    },
    Top5BowlingList: {
      component: Example_Video_Top5BowlingList_Basic,
      DATA: DATA_TOP5WICKETS,
    },
    Ladder: {
      component: Example_Video_Ladder_Basic,
      DATA: DATA_LADDER,
    },
  }, 
  CNSW: {
    UpComingFixtures: {
      component: Example_Video_Upcoming_CNSW, // Replace with actual Basic template component for Upcoming Fixtures
      DATA: DATA_FIXTURES,
    },
    WeekendResults: {
      component: Example_Video_WeekendResults_CNSW, // Replace with Basic template component for Weekend Results
      DATA: DATA_RESULTS,
    },
    Top5BattingList: {
      component: Example_Video_Top5BattingList_CNSW, // Replace with Basic template component for Top 5 Batting List
      DATA: DATA_TOP5RUNS,
    },
    Top5BowlingList: {
      component: Example_Video_Top5BowlingList_CNSW,
      DATA: DATA_TOP5WICKETS,
    },
    Ladder: {
      component: Example_Video_Ladder_CNSW,
      DATA: DATA_LADDER, 
    },
  },
  QLDC: {
    UpComingFixtures: {
      component: Example_Video_Upcoming_QLDC, // Replace with actual Basic template component for Upcoming Fixtures
      DATA: DATA_FIXTURES,
    },
    WeekendResults: {
      component: Example_Video_WeekendResults_QLDC, // Replace with Basic template component for Weekend Results
      DATA: DATA_RESULTS,
    },
    Top5BattingList: {
      component: Example_Video_Top5BattingList_QLDC, // Replace with Basic template component for Top 5 Batting List
      DATA: DATA_TOP5RUNS,
    },
    Top5BowlingList: {
      component: Example_Video_Top5BowlingList_QLDC,
      DATA: DATA_TOP5WICKETS,
    },
    Ladder: {
      component: Example_Video_Ladder_QLDC,
      DATA: DATA_LADDER,
    },
  }, 
};
