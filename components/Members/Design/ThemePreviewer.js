import React, { useState, useEffect } from "react";
import { Center, Paper, useMantineTheme } from "@mantine/core";
import { Carousel } from "@mantine/carousel"; 
import { Thumbnail } from "@remotion/player";
import { useMediaQuery } from "@mantine/hooks";
import {
  FindAccountLabel,
  FindAccountLogo,
  getUniqueCompositionIDsAndFilterByIdentifier,
} from "../../../lib/actions";

import DATA_Ladder from "../Remotion/utils/DATA_LADDERS.json";
import DATA_UpComingFixtures from "../Remotion/utils/upcoming_v2.json";
import DATA_WeekendResults from "../Remotion/utils/WeekendResultsV2.json";
import DATA_Top5BattingList from "../Remotion/utils/Top5RunsV2.json";
import DATA_Top5BowlingList from "../Remotion/utils/Top5WicketsV2.json";
import DATA_WeekendSingleGameResult from "../Remotion/utils/WeekendResultsV2.json";

import { Template_Basic_Sqaure } from "../VideoFiles/templates/BasicSqaure/FrontEnd";
import { Template_Basic_Rounded } from "../VideoFiles/templates/BasicRounded/frontend";
import { Template_Sutherland } from "../VideoFiles/templates/Sutherland/frontend";
import { P } from "../Common/Type";

const AvailableTemplates = {
  "Basic Sqaure": Template_Basic_Sqaure,
  "Basic Rounded": Template_Basic_Rounded,
  "Sutherland": Template_Sutherland,
};

// Function to generate the JSON data structure for the thumbnail
const generateJsonForThumbnail = (userAccount, assetType, metadata) => {
  // Initialize the JSON structure with default values
  let jsonData = {
    TIMINGS: metadata.TIMINGS,
    VIDEOMETA: {
      Video: {},
      Club: {},
    },
    DATA: [],
  };

  // Populate 'VIDEOMETA' from userAccount
  if (userAccount?.attributes) {
    const { theme, template, audio_option, sponsors } = userAccount.attributes;
    jsonData.VIDEOMETA.Video = {
      ...metadata, // Spread in metadata fields
      Theme: theme?.data?.attributes?.Theme,
      Template: template?.data?.attributes?.Name,
      audio_option: audio_option?.data?.attributes?.URL,
      CompositionID: assetType,
    };

    // Populate 'Club' and 'Sponsors'
    jsonData.VIDEOMETA.Club = {
      Name: FindAccountLabel(userAccount),
      Logo: FindAccountLogo(userAccount),
      Sponsors:
        sponsors?.data?.map((sponsor) => ({
          Name: sponsor.attributes.Name,
          URL: sponsor.attributes.URL,
          Logo: sponsor.attributes.Logo.data.attributes.url,
          isPrimary: sponsor.attributes.isPrimary,
        })) || [],
    };

    // Include 'HasSponsors' logic
    const noSponsors = jsonData.VIDEOMETA.Club.Sponsors.length === 0;
    jsonData.VIDEOMETA.Video.includeSponsors = !noSponsors;
  }

  // Populate 'DATA' dynamically based on assetType
  switch (assetType) {
    case "UpComingFixtures":
      jsonData.DATA = DATA_UpComingFixtures;
      jsonData.VIDEOMETA.Video.frameToDisplay = 360;
      break;
    case "WeekendResults":
      jsonData.DATA = DATA_WeekendResults;
      jsonData.VIDEOMETA.Video.frameToDisplay = 360;
      break;
    case "Top5BattingList":
      jsonData.DATA = DATA_Top5BattingList;
      jsonData.VIDEOMETA.Video.frameToDisplay = 250;
      break;
    case "Top5BowlingList":
      jsonData.DATA = DATA_Top5BowlingList;
      jsonData.VIDEOMETA.Video.frameToDisplay = 250;
      break;
    case "Ladder":
      jsonData.DATA = DATA_Ladder;
      jsonData.VIDEOMETA.Video.frameToDisplay = 360;
      break;
    case "WeekendSingleGameResult":
      jsonData.DATA = DATA_WeekendSingleGameResult;
      jsonData.VIDEOMETA.Video.frameToDisplay = 380;
      break;
    default:
      console.warn(`Unknown asset type: ${assetType}`);
      break;
  }

  return jsonData;
};

const RemotionPreview = ({ setIsPlaying, userAccount, Assets }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [dataReady, setDataReady] = useState(false);
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Fetch unique asset objects filtered by "IMAGE"
    const uniqueAssets = getUniqueCompositionIDsAndFilterByIdentifier(
      Assets,
      "IMAGE" 
    );

    if (userAccount && uniqueAssets.length > 0) {
      const newJsonData = uniqueAssets.map(({ CompositionID, Metadata }) =>
        generateJsonForThumbnail(userAccount, CompositionID, Metadata)
      );
      setJsonData(newJsonData);
      setDataReady(true);
    }
  }, [userAccount, Assets]);

  if (!dataReady) {
    return "Loading...";
  }

  return (
    <>
      <P
        Weight={900}
        size="xs"
        marginBottom={0}
        textAlign={"right"}
        fontStyle="normal"
      >
       Branded Preview
      </P>
      <Paper shadow="md" p="sm" withBorder>
        <Center>
          <Carousel
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
            {jsonData.map((DATA, i) => {
              const assetType = DATA.VIDEOMETA.Video.CompositionID;
              const templateType = DATA.VIDEOMETA.Video.Template;
              return (
                <Carousel.Slide key={assetType}>
                  <Thumbnail
                    id={assetType}
                    component={AvailableTemplates[templateType]} // Replace with your template logic if needed
                    compositionWidth={1080}
                    compositionHeight={1350}
                    durationInFrames={300}
                    frameToDisplay={DATA.VIDEOMETA.Video.frameToDisplay}
                    fps={30}
                    inputProps={{ DATA }}
                    style={{
                      width: 1080 * 0.3,
                      height: 1350 * 0.3,
                    }}
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        </Center>
      </Paper>
    </>
  );
};

export default RemotionPreview;
