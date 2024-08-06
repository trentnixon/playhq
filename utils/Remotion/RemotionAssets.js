// RemotionAssets.js

// Templates
import { Template_Basic } from "../../remotion/templates/Basic/index";
import { Template_CNSW } from "../../remotion/templates/CNSW/index";
import { Template_QLDC } from "../../remotion/templates/QLDC/index";
import { Template_CoastalCricketLeague } from "../../remotion/templates/CoastalCricketLeague/index";

// DATA
// Cricket
import DATA_CRICKET_UPCOMINGFIXTURES from "../../remotion/data/cricket/FIXTURA_PREVIEW_CRICKET_UPCOMINGFIXTURES.json";
import DATA_CRICKET_RESULTS from "../../remotion/data/cricket/FIXTURA_PREVIEW_CRICKET_RESULTS.json";
import DATA_CRICKET_TOP5RUNS from "../../remotion/data/cricket/FIXTURA_PREVIEW_CRICKET_TOP5RUNS.json";
import DATA_CRICKET_TOP5WICKETS from "../../remotion/data/cricket/FIXTURA_PREVIEW_CRICKET_TOP5WICKETS.json";
import DATA_CRICKET_LADDER from "../../remotion/data/cricket/FIXTURA_PREVIEW_CRICKET_LADDER.json";
// AFL
import DATA_AFL_LADDER from "../../remotion/data/afl/FIXTURA_PREVIEW_AFL_LADDER.json";
import DATA_AFL_UPCOMINGFIXTURES from "../../remotion/data/afl/FIXTURA_PREVIEW_AFL_UpComingFixtures.json";
import DATA_AFL_RESULTS from "../../remotion/data/afl/FIXTURA_PREVIEW_AFL_Results.json";
import DATA_AFL_TOP5 from "../../remotion/data/afl/FIXTURA_PREVIEW_AFL_Top5AFLScorers.json";

// Utility function to create category structure
const createCategoryAssets = (template, data, keyMapping) => {
  return Object.keys(keyMapping).reduce((acc, key) => {
    const {
      componentKey,
      dataKey,
      title,
      titleSplit,
      compositionID,
      videoTitle,
    } = keyMapping[key];

    acc[componentKey] = {
      component: template,
      DATA: data[dataKey],
      ASSET: {
        Title: title,
        TitleSplit: titleSplit,
        CompositionID: compositionID,
        VideoTitle: videoTitle,
      },
    };
    return acc;
  }, {});
};

// Key mappings for different sports
const cricketKeyMapping = {
  UpComingFixtures: {
    componentKey: "UpComingFixtures",
    dataKey: "UpComingFixtures",
    title: "Fixtures",
    titleSplit: ["Fixtures"],
    compositionID: "UpComingFixtures",
    videoTitle: "Upcoming Fixtures",
  },
  WeekendResults: {
    componentKey: "WeekendResults",
    dataKey: "WeekendResults",
    title: "Results",
    titleSplit: ["Results"],
    compositionID: "WeekendResults",
    videoTitle: "Weekend Results",
  },
  Top5BattingList: {
    componentKey: "Top5BattingList",
    dataKey: "Top5BattingList",
    title: "Top 5",
    titleSplit: ["Top 5"],
    compositionID: "Top5BattingList",
    videoTitle: "Top 5 Run Scorers",
  },
  Top5BowlingList: {
    componentKey: "Top5BowlingList",
    dataKey: "Top5BowlingList",
    title: "Top 5",
    titleSplit: ["Top 5", ""],
    compositionID: "Top5BowlingList",
    videoTitle: "Top 5 Bowlers",
  },
  Ladder: {
    componentKey: "Ladder",
    dataKey: "Ladder",
    title: "Ladder",
    titleSplit: ["Ladder"],
    compositionID: "Ladder",
    videoTitle: "League Tables",
  },
};

const aflKeyMapping = {
  AFLLadder: {
    componentKey: "AFLLadder",
    dataKey: "Ladder",
    title: "Ladder",
    titleSplit: ["Ladder"],
    compositionID: "AFLLadder",
    videoTitle: "AFL Ladder",
  },
  UpComingAFLFixtures: {
    componentKey: "UpComingAFLFixtures",
    dataKey: "UpComingFixtures",
    title: "Fixtures",
    titleSplit: ["Fixtures"],
    compositionID: "UpComingAFLFixtures",
    videoTitle: "Upcoming AFL Fixtures",
  },
  WeekendResultsAFL: {
    componentKey: "WeekendResultsAFL",
    dataKey: "WeekendResults",
    title: "Results",
    titleSplit: ["Results"],
    compositionID: "WeekendResultsAFL",
    videoTitle: "Weekend AFL Results",
  },
  Top5AFLScorers: {
    componentKey: "Top5AFLScorers",
    dataKey: "Top5",
    title: "Top 5 Scorers",
    titleSplit: ["Top 5", "Scorers"],
    compositionID: "Top5AFLScorers",
    videoTitle: "Top 5 AFL Scorers",
  },
};

const netballKeyMapping = {
  NetballLadder: {
    componentKey: "Ladder",
    dataKey: "Ladder",
    title: "Ladder",
    titleSplit: ["Ladder"],
    compositionID: "NetballLadder",
    videoTitle: "Netball Ladder",
  },
  UpComingNetBallFixtures: {
    componentKey: "UpComingFixtures",
    dataKey: "UpComingFixtures",
    title: "Fixtures",
    titleSplit: ["Fixtures"],
    compositionID: "UpComingNetBallFixtures",
    videoTitle: "Upcoming Netball Fixtures",
  },
  WeekendResultsNetball: {
    componentKey: "WeekendResults",
    dataKey: "WeekendResults",
    title: "Results",
    titleSplit: ["Results"],
    compositionID: "WeekendResultsNetball",
    videoTitle: "Weekend Netball Results",
  },
};

// Data for different sports
const cricketData = {
  UpComingFixtures: DATA_CRICKET_UPCOMINGFIXTURES,
  WeekendResults: DATA_CRICKET_RESULTS,
  Top5BattingList: DATA_CRICKET_TOP5RUNS,
  Top5BowlingList: DATA_CRICKET_TOP5WICKETS,
  Ladder: DATA_CRICKET_LADDER,
};

const aflData = {
  UpComingFixtures: DATA_AFL_UPCOMINGFIXTURES,
  WeekendResults: DATA_AFL_RESULTS,
  Top5: DATA_AFL_TOP5,
  Ladder: DATA_AFL_LADDER,
};

const netballData = {
  UpComingFixtures: {}, // Replace with actual data
  WeekendResults: {}, // Replace with actual data
  Top5: {}, // Replace with actual data
  Ladder: {}, // Replace with actual data
};

// Exported assets for different sports and templates
export const ASSETS = {
  Cricket: {
    Basic: createCategoryAssets(Template_Basic, cricketData, cricketKeyMapping),
    CNSW: createCategoryAssets(Template_CNSW, cricketData, cricketKeyMapping),
    QLDC: createCategoryAssets(Template_QLDC, cricketData, cricketKeyMapping),
    CoastalCricketLeague: createCategoryAssets(
      Template_CoastalCricketLeague,
      cricketData,
      cricketKeyMapping
    ),
  },
  AFL: {
    Basic: createCategoryAssets(Template_Basic, aflData, aflKeyMapping),
    CNSW: createCategoryAssets(Template_CNSW, aflData, aflKeyMapping),
    QLDC: createCategoryAssets(Template_QLDC, aflData, aflKeyMapping),
  },
  Netball: {
    Basic: createCategoryAssets(Template_Basic, netballData, netballKeyMapping),
    CNSW: createCategoryAssets(Template_CNSW, netballData, netballKeyMapping),
    QLDC: createCategoryAssets(Template_QLDC, netballData, netballKeyMapping),
  },
};
