import { useState, useEffect, useCallback } from "react";
import { Player, Thumbnail } from "@remotion/player";
import DATA_FIXTURES from "../../../remotion/utils/upcoming_v2.json";
import DATA_RESULTS from "../../../remotion/utils/WeekendResultsV2.json";
import DATA_TOP5RUNS from "../../../remotion/utils/Top5RunsV2.json";
import DATA_TOP5WICKETS from "../../../remotion/utils/Top5WicketsV2.json";
import DATA_LADDER from "../../../remotion/utils/LadderV2.json";
import DATA_ROSTER from "../../../remotion/utils/RosterPoster.json";
import { getDominantColors } from "../../../remotion/utils/colors";
import {
  UpComingFixtures, 
  WeekendResults,
  Top5BattingList, 
  Top5BowlingList,
  Ladder,
  WeekendSingleGameResult,
  RosterPoster,
} from "../GLOBAL/Examples/AssetExamples";
import { AbsoluteFill } from "remotion";
import { IconPlayBasketball, IconPlayerPlayFilled } from "@tabler/icons-react";
import { Image } from "@mantine/core";

export const RemotionPlayer = ({
  AccountData,
  selectedMedia,
  TYPE,
  userColors,
  userlogoUrl,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState({});
  const DEFAULTLOGO =
    "https://fixtura.s3.ap-southeast-2.amazonaws.com/Default_ICON_171b58a21b.png";

  //console.log("selectedMedia", selectedMedia);
  const ASSETS = {
    UpComingFixtures: {
      component: UpComingFixtures,
      DATA: DATA_FIXTURES,
    },
    WeekendResults: {
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
    },
    WeekendSingleGameResult: {
      component: WeekendSingleGameResult,
      DATA: DATA_RESULTS,
    },
    RosterPoster: {
      component: RosterPoster,
      DATA: DATA_ROSTER,
    },
  };

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

  useEffect(() => {
    if (
      AccountData &&
      selectedMedia?.CompositionID &&
      ASSETS[selectedMedia.CompositionID]
    ) {
      let updatedData;
      const currentAsset = ASSETS[selectedMedia.CompositionID];
      const accountName = AccountData.attributes.Name; // or the appropriate field for the account name
      const useLOGO = DefineLogo(AccountData, userlogoUrl);
      updatedData = updateDataWithClubInfo(
        AccountData,
        currentAsset.DATA,
        DEFAULTLOGO
      );
      switch (selectedMedia.CompositionID) {
        case "UpComingFixtures":
          updatedData = updateUpComingFixtures(
            currentAsset.DATA,
            useLOGO,
            accountName
          );
          break;
        case "WeekendResults":
          updatedData = updateWeekendResults(
            currentAsset.DATA,
            useLOGO,
            DEFAULTLOGO,
            accountName
          );
          break;
        case "Top5BattingList":
          updatedData = updateTop5RunScorers(
            currentAsset.DATA,
            useLOGO,
            accountName
          );
          break;
        case "Top5BowlingList":
          updatedData = updateTop5Bowlers(
            currentAsset.DATA,
            useLOGO,
            accountName
          );
          break;
        case "Ladder":
          updatedData = updateLadderFirstItem(
            currentAsset.DATA,
            useLOGO,
            accountName
          );
          break;
        default:
          break;
      }

      // updatedData = { ...currentAsset.DATA };
      updateColorTheme(AccountData, updatedData);
    }
  }, [AccountData, selectedMedia, ASSETS]);

  const DefineLogo = (AccountData, userlogoUrl) => {
    // If userlogoUrl is provided and not false, use it as the logo
    if (userlogoUrl) {
      return userlogoUrl;
    }

    // Otherwise, fallback to the existing logic
    return (
      AccountData.attributes.Logo?.data?.url ||
      AccountData.attributes?.ParentLogo ||
      DEFAULTLOGO
    );
  };

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
  // Extracted color theme update function
  const updateColorTheme = (AccountData, updatedData) => {
    /* console.log("OVERRIDE COLORS", userColors); */
    const logoUrl =
      AccountData.attributes.Logo.data || AccountData.attributes.ParentLogo;
    if (logoUrl) {
      getDominantColors(logoUrl)
        .then((colors) => {
          if (colors && colors.length >= 2) {
            updatedData.VIDEOMETA.Video.Theme.primary = userColors[0]
              ? userColors[0]
              : colors[0];
            updatedData.VIDEOMETA.Video.Theme.secondary = userColors[1]
              ? userColors[1]
              : colors[1];
          }
          setData(updatedData);
        })
        .catch((error) => {
          console.error("Error fetching dominant colors:", error);
          setData(updatedData); // Set data even if color fetching fails
        });
    } else {
      updatedData.VIDEOMETA.Video.Theme.primary = userColors[0];
      updatedData.VIDEOMETA.Video.Theme.secondary = userColors[1];

      setData(updatedData);
    }
  };

  const updateDataWithClubInfo = (AccountData, initialData, defaultLogo) => {
    const updatedData = { ...initialData };

    // Determine the logo to use: Club Logo > Parent Logo > Default Logo
    const useLOGO = DefineLogo(AccountData, userlogoUrl);

    updatedData.VIDEOMETA.Club.Name = AccountData.attributes.Name;
    updatedData.VIDEOMETA.Club.Logo = useLOGO;

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
  if (TYPE === "Player")
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
        renderPoster={({ height, width }) =>
          renderPoster({
            height,
            width,
            useLOGO: DefineLogo(AccountData, userlogoUrl),
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
        component={AssetComponent}
        durationInFrames={[
          data.TIMINGS.FPS_INTRO,
          data.TIMINGS.FPS_MAIN,
          data.TIMINGS.FPS_OUTRO,
        ].reduce((a, b) => a + b, 0)}
        compositionHeight={1350}
        compositionWidth={1080}
        fps={30}
        frameToDisplay={data.VIDEOMETA.Video.FRAMES[1]}
        inputProps={{ DATA: data }}
        style={{ width: "100%" }}
      />
    );
};
