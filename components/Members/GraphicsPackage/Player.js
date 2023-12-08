import { Player } from "@remotion/player";
import DATA_FIXTURES from "../../../remotion/utils/upcoming_v2.json";
import DATA_RESULTS from "../../../remotion/utils/WeekendResultsV2.json";
import DATA_TOP5RUNS from "../../../remotion/utils/Top5RunsV2.json";
import DATA_TOP5WICKETS from "../../../remotion/utils/Top5WicketsV2.json";
import DATA_LADDER from "../../../remotion/utils/LadderV2.json";

import {
  UpComingFixtures as Example_Video_Upcoming_Basic,
  WeekendResults as Example_Video_WeekendResults_Basic,
  Top5BattingList as Example_Video_Top5BattingList_Basic,
  Top5BowlingList as Example_Video_Top5BowlingList_Basic,
  Ladder as Example_Video_Ladder_Basic,
} from "../../Campaign/GLOBAL/Examples/AssetExamples";

import {
  UpComingFixtures as Example_Video_Upcoming_CNSW,
  WeekendResults as Example_Video_WeekendResults_CNSW,
  Top5BattingList as Example_Video_Top5BattingList_CNSW,
  Top5BowlingList as Example_Video_Top5BowlingList_CNSW,
  Ladder as Example_Video_Ladder_CNSW,
} from "../../Campaign/GLOBAL/Examples/AssetExampleCNSW";

import { Center } from "@mantine/core";
import { P } from "../Common/Type";

const ASSETS = {
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
};

export const MembersPreviewPlayer = ({ OBJ, Selected, HeroImage }) => {
  const templateType = OBJ.template.Category; // e.g., 'Basic' or 'CNSW'

  if (!ASSETS[templateType] || !ASSETS[templateType][Selected]) {
    // Consider rendering a user-friendly error message
    return (
      <Center>
        <P marginBottom={0}>Invalid template or asset type selected.</P>
      </Center>
    );
  }

  const useData = ASSETS[templateType][Selected];
  let updatedData = mergeData(useData.DATA, OBJ);

  const useLOGO = OBJ.Account.logo;
  const accountName = OBJ.Account.name;
  const DEFAULTLOGO =
    "https://fixtura.s3.ap-southeast-2.amazonaws.com/Logo_Blue_on_transparent_0e86187b28.png";

  updatedData = updateDataBasedOnSelected(
    updatedData,
    Selected,
    useLOGO,
    accountName,
    DEFAULTLOGO
  );

    console.log(updatedData.VIDEOMETA.Video.audio_option)

  return (
    <Player
      component={useData.component}
      durationInFrames={[
        updatedData.TIMINGS.FPS_INTRO,
        updatedData.TIMINGS.FPS_MAIN,
        updatedData.TIMINGS.FPS_OUTRO,
      ].reduce((a, b) => a + b, 0)}
      compositionHeight={1350}
      compositionWidth={1080}
      fps={30}
      controls
      inputProps={{ DATA: updatedData }}
      style={{ width: "100%" }}
    />
  );
};

function updateDataBasedOnSelected(
  data,
  selectedAsset,
  useLOGO,
  accountName,
  defaultLogo
) {
  switch (selectedAsset) {
    case "UpComingFixtures":
      return updateUpComingFixtures(data, useLOGO, accountName);
    case "WeekendResults":
      return updateWeekendResults(data, useLOGO, defaultLogo, accountName);
    case "Top5BattingList":
      return updateTop5RunScorers(data, useLOGO, accountName);
    case "Top5BowlingList":
      return updateTop5Bowlers(data, useLOGO, accountName);
    case "Ladder":
      return updateLadderFirstItem(data, useLOGO, accountName);
    default:
      return data;
  }
}

const updateTop5RunScorers = (data, useLOGO, accountName) => {
  data.DATA.forEach((player) => {
    player.teamLogo = useLOGO;
    player.playedFor = accountName;
  });
  return data;
};

const updateUpComingFixtures = (data, useLOGO, NAME) => {
  data.DATA.forEach((game) => {
    game.teamHomeLogo = game.teamHomeLogo || useLOGO;
    game.teamAwayLogo = game.teamAwayLogo || useLOGO;

    game.teamHome = game.teamHomeLogo ? game.teamHome : NAME;
    game.teamAway = game.teamAwayLogo ? game.teamAway : NAME;
  });
  return data;
};

const updateWeekendResults = (data, useLOGO, DEFUALT, NAME) => {
  data.DATA.forEach((game) => {
    game.teamHomeLogo = useLOGO;
    game.teamAwayLogo = DEFUALT;
    game.homeTeam.name = NAME;
  });
  return data;
};
const updateTop5Bowlers = (data, useLOGO, accountName) => {
  data.DATA.forEach((player) => {
    player.teamLogo = useLOGO;
    player.playedFor = accountName;
  });
  return data;
};

const updateLadderFirstItem = (data, useLOGO, accountName) => {
  /*  console.log(data.DATA[0].bias); */
  if (data && data.DATA.length > 0) {
    data.DATA[0].League[0].teamName = accountName;
    data.DATA[0].League[0].teamLogo = useLOGO;
    data.DATA[0].bias = accountName;
  }

  return data;
};

const mergeData = (useData, customObj) => {
  console.log(useData.VIDEOMETA.Video.HeroImage);
  console.log(customObj.HeroImage);

  if (customObj.theme) {
    useData.VIDEOMETA.Video.Theme = {
      ...useData.VIDEOMETA.Video.Theme,
      ...customObj.theme,
    };
  }

  // Template Replacement
  if (customObj.template && customObj.template.TemplateVariation) {
    useData.VIDEOMETA.Video.TemplateVariation = {
      ...useData.VIDEOMETA.Video.TemplateVariation,
      ...customObj.template.TemplateVariation,
    };
  }

  // Sponsors Replacement
  if (customObj.sponsors && customObj.sponsors.length > 0) {
    const ARR = customObj.sponsors.map((sponsor) => ({
      Name: sponsor.attributes.Name,
      URL: sponsor.attributes.URL,
      Logo: sponsor.attributes.Logo.data.attributes.url,
      isPrimary: sponsor.attributes.isPrimary,
    }));
    useData.VIDEOMETA.Club.Sponsors = ARR;
  }

  // Account Data Replacement
  if (customObj.Account) {
    useData.VIDEOMETA.Club.Name =
      customObj.Account.name || useData.VIDEOMETA.Club.Name;
    useData.VIDEOMETA.Club.Logo =
      customObj.Account.logo || useData.VIDEOMETA.Club.Logo;
  }

  // Hero Image Replacement
  useData.VIDEOMETA.Video.HeroImage = customObj.HeroImage;
  console.log(useData);

    // Hero Image Replacement
    console.log(customObj)
    useData.VIDEOMETA.Video.audio_option = customObj.audio_option.attributes.URL;
    console.log(useData);


  return useData;
};
