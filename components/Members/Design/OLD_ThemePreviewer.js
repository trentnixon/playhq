import { Center, useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Player, Thumbnail } from "@remotion/player";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";

import { Template_Basic_Sqaure } from "../VideoFiles/templates/BasicSqaure/index";
import { Template_Basic_Rounded } from "../VideoFiles/templates/BasicRounded/index";
import DATA from "../Remotion/utils/Data.json";
import DATA_Ladder from "../Remotion/utils/DATA_LADDERS.json";
import DATA_UpComingFixtures from "../Remotion/utils/upcoming_v2.json";
import DATA_WeekendResults from "../Remotion/utils/WeekendResultsV2.json";
import DATA_Top5BattingList from "../Remotion/utils/Top5RunsV2.json";
import DATA_Top5BowlingList from "../Remotion/utils/Top5WicketsV2.json";
import DATA_WeekendSingleGameResult from "../Remotion/utils/WeekendResultsV2.json";

import {
  FindAccountLabel,
  FindAccountLogo,
  getUniqueCompositionIDsAndFilterByIdentifier,
} from "../../../lib/actions";
import initialDATA from "../Remotion/utils/Data.json";

/*
"UpComingFixtures"
"WeekendResults"
"Top5BattingList"
"Top5BowlingList"
"Ladder"
"WeekendSingleGameResult"
*/
const RemotionPreview = ({ setIsPlaying, userAccount, Assets }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  // Moved from RemotionPlayerContainer
  const [dataReady, setDataReady] = useState(false);
  const [DATA, setDATA] = useState(initialDATA);
  const [assetJsonData, setAssetJsonData] = useState({});

  useEffect(() => {
    setDataReady(false);

    if (userAccount) {
      let updatedData = { ...DATA };

      updatedData = updateVideoMeta(updatedData, userAccount);
      updatedData = updateClubMeta(updatedData, userAccount);
      updatedData = updateSponsors(updatedData, userAccount);

      setDATA(updatedData);

      // Generate JSON data for each asset type
      const newAssetJsonData = {};
      Assets.forEach((assetType) => {
        newAssetJsonData[assetType] = generateJsonForAsset(
          userAccount,
          assetType
        );
      });

      setAssetJsonData(newAssetJsonData);
      setDataReady(true);
    }
  }, [userAccount, Assets]);

  const AvailableTemplates = {
    "Basic Sqaure": Template_Basic_Sqaure,
    "Basic Rounded": Template_Basic_Rounded,
  };
  if (
    typeof AvailableTemplates[DATA.VIDEOMETA.Video.Template] === "undefined"
  ) {
    console.error("Template component is undefined");
  }

  const defaultTemplate = Template_Basic_Sqaure;
  const selectedTemplate =
    AvailableTemplates[DATA.VIDEOMETA.Video.Template] || defaultTemplate;

  if (!selectedTemplate) {
    console.error("No suitable template found, falling back to default");
  }

  const Create = {
    ratio: { width: 1080, height: 1350 },
    fps: 30,
    CompositionID: DATA.VIDEOMETA.Video.CompositionID,
    Template: selectedTemplate,
    durationInFrames: [
      DATA.VIDEOMETA.Video.TIMINGS.FPS_INTRO,
      HasSponsors(DATA),
      DATA.VIDEOMETA.Video.TIMINGS.FPS_MAIN,
    ].reduce((a, b) => a + b, 0),
  };

  // Your existing code logic and rendering
  if (dataReady) {
    return (
      <Center>
        HERE
        {/* <Carousel
          maw={"100%"}
          slideSize="33.33333%"
          breakpoints={[{ maxWidth: "xs", slideSize: "100%", slideGap: 0 }]}
          slideGap="xs"
          align="start"
          loop
          sx={{ flex: 1 }}
          slidesToScroll={mobile ? 1 : 2}
          withIndicators
        >
          {getUniqueCompositionIDsAndFilterByIdentifier(Assets, "IMAGE").map(
            (Asset, i) => {
              return (
                <Carousel.Slide key={Asset}>
                  <Thumbnail
                    id={Asset}
                    component={Create.Template}
                    compositionWidth={Create.ratio.width}
                    compositionHeight={Create.ratio.height}
                    durationInFrames={Create.durationInFrames}
                    frameToDisplay={50}
                    fps={30}
                    inputProps={AddNewComposition(`DATA_${Asset}`, Asset)}
                    style={{
                      width: parseInt(Create.ratio.width) * 0.25,
                      height: parseInt(Create.ratio.height) * 0.25,
                    }}
                  />
                </Carousel.Slide>
              );
            }
          )}
        </Carousel> */}
      </Center>
    );
  } else {
    return "Loading...";
  }
};

const generateJsonForAsset = (userAccount, assetType) => {
  // Initialize the base structure
  const jsonData = {
    TIMINGS: {
      FPS_INTRO: 90,
      FPS_OUTRO: 120,
      FPS_MAIN: 360,
    },
    VIDEOMETA: {
      Video: {
        // Populate from userAccount
      },
      Club: {
        // Populate from userAccount
      },
    },
    DATA: [],
  };

  // Populate VIDEOMETA from userAccount
  if (userAccount) {
    jsonData.VIDEOMETA.Video = {
      // ...other fields
      Theme: userAccount.attributes?.theme?.data?.attributes?.Theme,
      Template: userAccount.attributes?.template?.data?.attributes?.Name,
      audio_option: userAccount.attributes?.audio_option?.data?.attributes?.URL,
      // ...other fields
    };

    jsonData.VIDEOMETA.Club = {
      Name: FindAccountLabel(userAccount),
      Logo: FindAccountLogo(userAccount),
    };
  }

  // Populate DATA based on assetType
  switch (assetType) {
    case "UpComingFixtures":
      jsonData.DATA = DATA_UpComingFixtures;
      break;
    case "WeekendResults":
      jsonData.DATA = DATA_WeekendResults;
      break;
    // ...other cases
    default:
      console.error(`Unknown asset type: ${assetType}`);
  }

  return jsonData;
};

const HasSponsors = (data) => {
  const noSponsors = data.VIDEOMETA.Club.Sponsors.length === 0;
  const includeSponsors = data.VIDEOMETA.Video.includeSponsors;
  return noSponsors
    ? 0
    : includeSponsors
    ? data.VIDEOMETA.Video.TIMINGS.FPS_OUTRO
    : 0;
};

const AddNewComposition = (originalData, newCompositionID) => {
  const DATA = {
    ...originalData,
    VIDEOMETA: {
      ...originalData.VIDEOMETA,
      Video: {
        ...originalData.VIDEOMETA.Video,
        CompositionID: newCompositionID,
      },
    },
  };
  return { DATA };
};
// Refactored function to avoid direct state mutation
const updateVideoMeta = (dataCopy, userAccount) => {
  if (userAccount.attributes) {
    const { theme, template, audio_option } = userAccount.attributes;

    return {
      ...dataCopy,
      VIDEOMETA: {
        ...dataCopy.VIDEOMETA,
        Video: {
          ...dataCopy.VIDEOMETA.Video,
          Theme: theme?.data?.attributes?.Theme,
          Template: template?.data?.attributes?.Name,
          audio_option: audio_option?.data?.attributes?.URL,
        },
      },
    };
  }
  return dataCopy;
};

const updateClubMeta = (dataCopy, userAccount) => {
  if (userAccount) {
    const LOGO = FindAccountLogo(userAccount);
    const Name = FindAccountLabel(userAccount);

    return {
      ...dataCopy,
      VIDEOMETA: {
        ...dataCopy.VIDEOMETA,
        Club: {
          ...dataCopy.VIDEOMETA.Club,
          Logo: LOGO,
          Name: Name,
        },
      },
    };
  }
  return dataCopy;
};

const updateSponsors = (dataCopy, userAccount) => {
  if (userAccount.attributes?.sponsors?.data) {
    const updatedSponsors = userAccount.attributes.sponsors.data.map(
      (sponsor) => ({
        Name: sponsor.attributes.Name,
        URL: sponsor.attributes.URL,
        Logo: sponsor.attributes.Logo.data.attributes.url,
        isPrimary: sponsor.attributes.isPrimary,
      })
    );

    return {
      ...dataCopy,
      VIDEOMETA: {
        ...dataCopy.VIDEOMETA,
        Club: {
          ...dataCopy.VIDEOMETA.Club,
          Sponsors: updatedSponsors,
        },
      },
    };
  }
  return dataCopy;
};

export default RemotionPreview;

/* // CORE
import { Center, useMantineTheme } from "@mantine/core";
import { Player, Thumbnail } from "@remotion/player";
import { Carousel } from "@mantine/carousel";
//COMPONENTS
import { Template_Basic_Sqaure } from "../VideoFiles/templates/BasicSqaure/index";
import { Template_Basic_Rounded } from "../VideoFiles/templates/BasicRounded/index";
import { useMediaQuery } from "@mantine/hooks";


const RemotionPreview = ({ setIsPlaying, DATA }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const OBJ = {
    "Basic Sqaure": Template_Basic_Sqaure,
    "Basic Rounded": Template_Basic_Rounded,
  };

  const ASSETDATA = DATA.DATA;

  if (typeof OBJ[ASSETDATA.VIDEOMETA.Video.Template] === "undefined") {
    console.error("Template component is undefined");
  }
  const HasSponsors = () => {
    ASSETDATA.VIDEOMETA.Video.includeSponsors;
    if (ASSETDATA.VIDEOMETA.Club.Sponsors.length === 0) return 0;
    return ASSETDATA.VIDEOMETA.Video.includeSponsors
      ? ASSETDATA.VIDEOMETA.Video.TIMINGS.FPS_OUTRO
      : 0;
  };

  const Create = {
    ratio: { width: 1080, height: 1350 },
    fps: 30,
    CompositionID: ASSETDATA.VIDEOMETA.Video.CompositionID,
    Template: OBJ[ASSETDATA.VIDEOMETA.Video.Template],
    durationInFrames: [
      ASSETDATA.VIDEOMETA.Video.TIMINGS.FPS_INTRO,
      HasSponsors(),
      ASSETDATA.VIDEOMETA.Video.TIMINGS.FPS_MAIN,
    ].reduce((a, b) => a + b, 0),
  };


  return (
    <Center>
      <Carousel
        maw={'100%'}
        slideSize="33.33333%"
        breakpoints={[{ maxWidth: "xs", slideSize: "100%", slideGap: 0 }]}
        slideGap="xs"
        align="start"
        loop
        sx={{ flex: 1 }}
        slidesToScroll={mobile ? 1 : 2}
        withIndicators
      >
        <Carousel.Slide>
          <Thumbnail
            id={'WeekendResults'}
            component={Create.Template}
            compositionWidth={Create.ratio.width}
            compositionHeight={Create.ratio.height}
            frameToDisplay={50}
            durationInFrames={Create.durationInFrames}
            fps={30}
            inputProps={DATA}
            style={{
              width: parseInt(Create.ratio.width) * 0.25,
              height: parseInt(Create.ratio.height) * 0.25,
            }}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Thumbnail
            id={'WeekendResults'}
            component={Create.Template}
            compositionWidth={Create.ratio.width}
            compositionHeight={Create.ratio.height}
            frameToDisplay={200}
            durationInFrames={Create.durationInFrames}
            fps={30}
            inputProps={DATA}
            style={{
              width: parseInt(Create.ratio.width) * 0.25,
              height: parseInt(Create.ratio.height) * 0.25,
            }}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Thumbnail
            id={'Top5List'}
            component={Create.Template}
            compositionWidth={Create.ratio.width}
            compositionHeight={Create.ratio.height}
            frameToDisplay={350}
            durationInFrames={Create.durationInFrames}
            fps={30}
            inputProps={DATA}
            style={{
              width: parseInt(Create.ratio.width) * 0.25,
              height: parseInt(Create.ratio.height) * 0.25,
            }}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Thumbnail
             id={'Top5List'}
            component={Create.Template}
            compositionWidth={Create.ratio.width}
            compositionHeight={Create.ratio.height}
            frameToDisplay={350}
            durationInFrames={Create.durationInFrames}
            fps={30}
            inputProps={DATA}
            style={{
              width: parseInt(Create.ratio.width) * 0.25,
              height: parseInt(Create.ratio.height) * 0.25,
            }}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Thumbnail
             id={'Top5List'}
            component={Create.Template}
            compositionWidth={Create.ratio.width}
            compositionHeight={Create.ratio.height}
            frameToDisplay={350}
            durationInFrames={Create.durationInFrames}
            fps={30}
            inputProps={DATA}
            style={{
              width: parseInt(Create.ratio.width) * 0.25,
              height: parseInt(Create.ratio.height) * 0.25,
            }}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Thumbnail
             id={'Top5List'}
            component={Create.Template}
            compositionWidth={Create.ratio.width}
            compositionHeight={Create.ratio.height}
            frameToDisplay={350}
            durationInFrames={Create.durationInFrames}
            fps={30}
            inputProps={DATA}
            style={{
              width: parseInt(Create.ratio.width) * 0.25,
              height: parseInt(Create.ratio.height) * 0.25,
            }}
          />
        </Carousel.Slide>
        <Carousel.Slide>
          <Thumbnail
             id={'Top5List'}
            component={Create.Template}
            compositionWidth={Create.ratio.width}
            compositionHeight={Create.ratio.height}
            frameToDisplay={350}
            durationInFrames={Create.durationInFrames}
            fps={30}
            inputProps={DATA}
            style={{
              width: parseInt(Create.ratio.width) * 0.25,
              height: parseInt(Create.ratio.height) * 0.25,
            }}
          />
        </Carousel.Slide>
      </Carousel>
    </Center>
  );
};

export default RemotionPreview; */

/*  <Player
        id={Create.CompositionID}
        component={Create.Template}
        durationInFrames={Create.durationInFrames}
        compositionWidth={Create.ratio.width}
        compositionHeight={Create.ratio.height}
        fps={Create.fps}
        numberOfSharedAudioTags={0}
        inputProps={DATA}
        controls
        style={{
          width: parseInt(Create.ratio.width) * 0.25,
          height: parseInt(Create.ratio.height) * 0.25,
        }}
      /> */
//console.log("RemotionPreview DATA CHECK", ASSETDATA.VIDEOMETA);
/* const playerRef = useRef(null); */

/* useEffect(() => {
    const { current } = playerRef;
    if (!current) {
      return;
    }

    const listener = () => {
   
      setIsPlaying(false);
    };

    const Playlistener = () => {
   
      setIsPlaying(true);
    };

    current.addEventListener("play", Playlistener);
    current.addEventListener("pause", listener);
    return () => {
      current.removeEventListener("pause", listener);
      current.removeEventListener("play", listener);
    };
  }, []); */

/*   const PlayerOnly = ({ playerRef }) => {
    return (
      <Player
        ref={playerRef}
        id={ASSETDATA.VIDEOMETA.Video.CompositionID}
        component={OBJ[ASSETDATA.VIDEOMETA.Video.Template]}
        durationInFrames={550}
        compositionWidth={1440}
        compositionHeight={1920}
        fps={30}
        numberOfSharedAudioTags={0}
        inputProps={DATA}
        controls
        style={{
          width: parseInt(1440) * 0.25,
          height: parseInt(1920) * 0.25,
        }}
      />
    );
  }; */
