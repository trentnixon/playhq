import { useState, useEffect, useCallback } from "react";
import { Player, Thumbnail } from "@remotion/player";
import DATA_FIXTURES from "../../../remotion/utils/upcoming_v2.json";
import DATA_RESULTS from "../../../remotion/utils/WeekendResultsV2.json";
import DATA_TOP5RUNS from "../../../remotion/utils/Top5RunsV2.json";
import DATA_TOP5WICKETS from "../../../remotion/utils/Top5WicketsV2.json";
import DATA_LADDER from "../../../remotion/utils/LadderV2.json";
import DATA_ROSTER from "../../../remotion/utils/RosterPoster.json";

import * as AssetExampleCNSW from "../GLOBAL/Examples/AssetExampleCNSW";
import * as AssetExamplesBasic from "../GLOBAL/Examples/AssetExamples";

import { AbsoluteFill } from "remotion";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import { Image } from "@mantine/core";
import {
  defineLogo,
  updateColorTheme,
  updateDataWithClubInfo,
  updateLadderFirstItem,
  updateTop5Bowlers,
  updateTop5RunScorers,
  updateUpComingFixtures,
  updateWeekendResults,
} from "../../../lib/LiveDemo";

// UTILS

const templateMapping = {
  CNSW: AssetExampleCNSW,
  Basic: AssetExamplesBasic,
  // Add more mappings as needed
}; 

export const RemotionPlayer = (props) => {
  const {
    AccountData,
    selectedMedia,
    TYPE,
    userColors,
    userlogoUrl,
    BackgroundImageUrl,
    selectedTemplate,
  } = props;

  //console.log("RemotionPlayer selectedTemplate ", selectedTemplate);

  const [isMounted, setIsMounted] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const ASSETS = SelectTemplate(selectedTemplate, selectedMedia);

  if (!ASSETS) return <></>;

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        AccountData,
        selectedMedia,
        ASSETS,
        userlogoUrl,
      };

      // Get updated data
      let updatedData = await updateData(params);

      // Check if a logo URL is available for color theme update
      const logoUrl =
        AccountData.attributes.Logo?.data?.url ||
        AccountData.attributes?.ParentLogo;
        //console.log(updatedData);
      if (logoUrl || userColors.length !== 0) {
        // Apply color theme updates
        updatedData = await updateColorTheme(logoUrl, userColors, updatedData);
      }

      //console.log(selectedMedia, updatedData);
      //
      updatedData.VIDEOMETA.Video.HeroImage = BackgroundImageUrl;
      updatedData.VIDEOMETA.Video.TemplateVariation =
        selectedTemplate.TemplateVariation;
      //console.log(updatedData, userlogoUrl);
      /* BackgroundImageUrl */
      setPreviewData(updatedData);
      setIsMounted(true);
    };

    fetchData();
  }, [
    AccountData,
    selectedMedia?.CompositionID,
    userlogoUrl,
    userColors,
    selectedTemplate,
    BackgroundImageUrl,
  ]);

  const renderPoster = useCallback(
    ({ height, width, useLOGO, accountName, assetType }) => {
      return (
        <AbsoluteFill
          style={{
            backgroundColor: "white",
            opacity: 0.8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {useLOGO && (
            <Image
              height={200}
              width={"auto"}
              src={useLOGO}
              alt={`${accountName} logo`}
              style={{ marginBottom: "10px" }}
            />
          )}
          <IconPlayerPlayFilled size={60} style={{ marginRight: "10px" }} />
          <p>Click to play to preview</p>
        </AbsoluteFill>
      );
    },
    []
  );
  const isPreviewDataEmpty = (data) => {
    return Object.keys(data).length === 0;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (
    !isMounted ||
    !selectedMedia?.CompositionID ||
    isPreviewDataEmpty(previewData)
  ) {
    return false;
  }

  if (TYPE === "Player")
    return (
      <Player
        component={ASSETS.component}
        durationInFrames={[
          previewData.TIMINGS.FPS_INTRO,
          previewData.TIMINGS.FPS_MAIN,
          previewData.TIMINGS.FPS_OUTRO,
        ].reduce((a, b) => a + b, 0)}
        compositionHeight={1350}
        compositionWidth={1080}
        fps={30}
        controls
        inputProps={{ DATA: previewData }}
        style={{ width: "100%" }}
        renderPoster={({ height, width }) =>
          renderPoster({
            height,
            width,
            useLOGO: defineLogo(AccountData, userlogoUrl),
            accountName: AccountData.attributes.Name,
            assetType: selectedMedia.CompositionID,
          })
        }
        showPosterWhenUnplayed
      />
    );
  if (TYPE === "Thumbnail")
    return (
      <Thumbnail
        component={ASSETS.component}
        durationInFrames={[
          previewData.TIMINGS.FPS_INTRO,
          previewData.TIMINGS.FPS_MAIN,
          previewData.TIMINGS.FPS_OUTRO,
        ].reduce((a, b) => a + b, 0)}
        compositionHeight={1350}
        compositionWidth={1080}
        fps={30}
        frameToDisplay={previewData.VIDEOMETA.Video.FRAMES[0]}
        inputProps={{ DATA: previewData }}
        style={{ width: "100%" }}
      />
    );
};

const SelectTemplate = (selectedTemplate, selectedMedia) => {
  if (selectedMedia === null) return false;

  const TemplateComponents =
    templateMapping[selectedTemplate.Template || "Basic"];

  const ASSETS = {
    UpComingFixtures: {
      component: TemplateComponents.UpComingFixtures,
      DATA: DATA_FIXTURES,
    },
    WeekendResults: {
      component: TemplateComponents.WeekendResults,
      DATA: DATA_RESULTS,
    },
    Top5BattingList: {
      component: TemplateComponents.Top5BattingList,
      DATA: DATA_TOP5RUNS,
    },
    Top5BowlingList: {
      component: TemplateComponents.Top5BowlingList,
      DATA: DATA_TOP5WICKETS,
    },
    Ladder: {
      component: TemplateComponents.Ladder,
      DATA: DATA_LADDER,
    },
    WeekendSingleGameResult: {
      component: TemplateComponents.WeekendSingleGameResult,
      DATA: DATA_RESULTS,
    },
    RosterPoster: {
      component: TemplateComponents.RosterPoster,
      DATA: DATA_ROSTER,
    },
  };

  return ASSETS[selectedMedia.CompositionID];
};

const updateData = async (params) => {
  const { AccountData, selectedMedia, ASSETS, userlogoUrl } = params;
  let CreateUpdatedData;

  if (AccountData && selectedMedia?.CompositionID && ASSETS) {
    const currentAsset = ASSETS;
    const accountName = AccountData.attributes.Name;
    const useLOGO = defineLogo(AccountData, userlogoUrl);
    const DEFAULTLOGO =
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Default_ICON_171b58a21b.png";
    CreateUpdatedData = updateDataWithClubInfo(
      AccountData,
      currentAsset.DATA,
      DEFAULTLOGO
    );

    switch (selectedMedia.CompositionID) {
      case "UpComingFixtures":
        return updateUpComingFixtures(CreateUpdatedData, useLOGO, accountName);
        break;

      case "WeekendResults":
        return updateWeekendResults(
          CreateUpdatedData,
          useLOGO,
          DEFAULTLOGO,
          accountName
        );
        break;
      case "WeekendSingleGameResult":
        return updateWeekendResults(
          CreateUpdatedData,
          useLOGO,
          DEFAULTLOGO,
          accountName
        );
        break;
      case "Top5BattingList":
        return updateTop5RunScorers(CreateUpdatedData, useLOGO, accountName);
        break;
      case "Top5BowlingList":
        return updateTop5Bowlers(CreateUpdatedData, useLOGO, accountName);
        break;
      case "Ladder":
        return updateLadderFirstItem(CreateUpdatedData, useLOGO, accountName);
    }
  }
};
