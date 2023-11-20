import { useState, useEffect } from "react";
import { Player } from "@remotion/player";
import DATA_FIXTURES from "../../../remotion/utils/upcoming_v2.json";
import DATA_RESULTS from "../../../remotion/utils/WeekendResultsV2.json";
import DATA_TOP5RUNS from "../../../remotion/utils/Top5RunsV2.json";
import DATA_TOP5WICKETS from "../../../remotion/utils/Top5WicketsV2.json";
import DATA_LADDER from "../../../remotion/utils/LadderV2.json";
import { getDominantColors } from "../../../remotion/utils/colors";
import {
  UpComingFixtures,
  WeekendResults,
  Top5BattingList,
  Top5BowlingList,
  Ladder,
} from "./Examples/AssetExamples";

export const RemotionPlayer = ({ clubData, selectedMedia }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState({});

  //console.log("selectedMedia", selectedMedia);
  const ASSETS = {
    UpComingFixtures: {
      component: UpComingFixtures,
      DATA: DATA_FIXTURES,
    },
    /*  WeekendResults: {
      component: WeekendResults,
      DATA: DATA_RESULTS,
    },
    Top5BattingList: {
      component: Top5BattingList,
      DATA: DATA_TOP5RUNS,
    },
    Top5BowlingList: {
      component: Top5BowlingList,
      DATA: DATA_TOP5WICKETS,
    },
    Ladder: {
      component: Ladder,
      DATA: DATA_LADDER,
    }, */
  };

  useEffect(() => {
    if (
      clubData &&
      selectedMedia?.CompositionID &&
      ASSETS[selectedMedia.CompositionID]
    ) {
      const currentAsset = ASSETS[selectedMedia.CompositionID];
      let updatedData = updateDataWithClubInfo(clubData, currentAsset.DATA);

      // Additional check for logo data
      const logoUrl = clubData.attributes.Logo.data
        ? clubData.attributes.Logo.data
        : clubData.attributes.ParentLogo;
      if (logoUrl) {
        getDominantColors(logoUrl).then((colors) => {
          if (colors) {
            updatedData.VIDEOMETA.Video.Theme.primary = colors[0];
            updatedData.VIDEOMETA.Video.Theme.secondary = colors[1];
            setData(updatedData);
          }
        });
      } else {
        setData(updatedData);
      }
    }
  }, [clubData, selectedMedia, ASSETS]);

  const updateDataWithClubInfo = (clubData, initialData) => {
    const updatedData = { ...initialData };
    const useLOGO = clubData.attributes.Logo.data
      ? clubData.attributes.Logo.data
      : clubData.attributes.ParentLogo;

    updatedData.VIDEOMETA.Club.Name = clubData.attributes.Name;
    updatedData.VIDEOMETA.Club.Logo = useLOGO;
    updatedData.DATA.forEach((game) => {
      if (!game.teamHomeLogo) game.teamHomeLogo = useLOGO;
      if (!game.teamAwayLogo) game.teamAwayLogo = useLOGO;
    });

    return updatedData;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !data || !data.TIMINGS || !selectedMedia?.CompositionID) {
    return null;
  }
  if (!isMounted || !selectedMedia?.CompositionID) {
    return null;
  }

  const AssetComponent = ASSETS[selectedMedia.CompositionID].component;

  return (
    <Player
      component={AssetComponent}
      durationInFrames={[
        data.TIMINGS.FPS_INTRO,
        data.TIMINGS.FPS_MAIN,
        data.TIMINGS.FPS_OUTRO,
      ].reduce((a, b) => a + b, 0)}
      compositionHeight={1350}
      compositionWidth={1080}
      fps={30}
      controls
      inputProps={{ DATA: data }}
      style={{ width: "100%" }}
    />
  );
};
