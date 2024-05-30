// RemotionAssets.js
// Templates
import { Template_Basic } from "../../remotion/templates/Basic/PreviewShell";
import { Template_CNSW } from "../../remotion/templates/CNSW/PreviewShell";
import { Template_QLDC } from "../../remotion/templates/QLDC/PreviewShell";

// DATA
import DATA_CRICKET_UPCOMINGFIXTURES from "../../remotion/data/cricket/DATA_CRICKET_UPCOMINGFIXTURES.json";
import DATA_CRICKET_RESULTS from "../../remotion/data/cricket/DATA_CRICKET_RESULTS.json";
import DATA_CRICKET_TOP5RUNS from "../../remotion/data/cricket/DATA_CRICKET_TOP5RUNS.json";
import DATA_CRICKET_TOP5WICKETS from "../../remotion/data/cricket/DATA_CRICKET_TOP5WICKETS.json";
import DATA_CRICKET_LADDER from "../../remotion/data/cricket/DATA_CRICKET_LADDER.json";

// Utility function to create category structure
const createCategoryAssets = (template, data) => {
  return {
    UpComingFixtures: {
      component: template,
      DATA: data.UpComingFixtures,
      ASSET: {
        Title: "Fixtures",
        TitleSplit: ["Fixtures"],
        CompositionID: "UpComingFixtures",
        VideoTitle: `Upcoming Fixtures`,
      },
    },
    WeekendResults: {
      component: template,
      DATA: data.WeekendResults,
      ASSET: {
        Title: "Results",
        TitleSplit: ["Results"],
        CompositionID: "WeekendResults",
        VideoTitle: "Weekend Results",
      },
    },
    Top5BattingList: {
      component: template,
      DATA: data.Top5BattingList,
      ASSET: {
        Title: "Top 5",
        TitleSplit: ["Top 5", "Run-Scorers"],
        CompositionID: "Top5BattingList",
        VideoTitle: "Top 5 Run Scorers",
      },
    },
    Top5BowlingList: {
      component: template,
      DATA: data.Top5BowlingList,
      ASSET: {
        Title: "Top 5",
        TitleSplit: ["Top 5", "Bowlers"],
        CompositionID: "Top5BowlingList",
        VideoTitle: "Top 5 Bowlers",
      },
    },
    Ladder: {
      component: template,
      DATA: data.Ladder,
      ASSET: {
        Title: "Ladder",
        TitleSplit: ["Ladder"],
        CompositionID: "Ladder",
        VideoTitle: "League Tables",
      },
    },
  };
};

const cricketData = {
  UpComingFixtures: DATA_CRICKET_UPCOMINGFIXTURES,
  WeekendResults: DATA_CRICKET_RESULTS,
  Top5BattingList: DATA_CRICKET_TOP5RUNS,
  Top5BowlingList: DATA_CRICKET_TOP5WICKETS,
  Ladder: DATA_CRICKET_LADDER,
};

export const ASSETS = {
  Cricket: {
    Basic: createCategoryAssets(Template_Basic, cricketData),
    CNSW: createCategoryAssets(Template_CNSW, cricketData),
    QLDC: createCategoryAssets(Template_QLDC, cricketData),
  },
  AFL: {},
  Netball: {},
};
