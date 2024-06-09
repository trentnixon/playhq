import { Carousel } from "@mantine/carousel";
import { Center, Group, Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/styles";
import { Thumbnail } from "@remotion/player";
import { useMemo } from "react";
import {
  createPreviewObject,
  mergeData,
  updateDataBasedOnSelected,
} from "../../../../../../utils/RemotionUtils";
import { ASSETS, DEFAULTLOGO } from "../../../../../../utils/RemotionAssets";
import { BTN_TOINTERALLINK } from "../../../../../Members/Common/utils/Buttons";

export const Previewer = ({ account }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  // Use useMemo to only recreate the previewObj when `account` changes
  const previewObj = useMemo(() => createPreviewObject(account), [account]);

  // No useEffect needed anymore unless you have other side effects to handle

  if (!previewObj.template) {
    return <Center>Loading...</Center>;
  }

  // templateType is used to determine which template has been selected
  const templateType = previewObj.template.Category;
  // assetTypes is used to determine which assets have been selected
  const assetTypes = Object.keys(ASSETS[templateType]);


  return (
    <>
      <Paper shadow="0" pb="sm">
        <Center>
          <Carousel
            maw={"100%"}
            slideSize="33%"
            breakpoints={[{ maxWidth: "xs", slideSize: "100%", slideGap: 0 }]}
            slideGap="xs"
            align="start"
            loop
            sx={{ flex: 1 }}
            slidesToScroll={mobile ? 1 : 2}
            withIndicators
          >
            {assetTypes.map((assetType, i) => {
              const asset = ASSETS[templateType][assetType];
 
              let updatedData = mergeData(asset.DATA, previewObj);
              updatedData = updateDataBasedOnSelected(
                updatedData,
                assetType,
                previewObj.Account.logo,
                previewObj.Account.name,
                DEFAULTLOGO
              );
              return (
                <Carousel.Slide key={i}>
                  <Thumbnail
                    component={asset.component}
                    compositionHeight={1350}
                    compositionWidth={1080}
                    frameToDisplay={updatedData.VIDEOMETA.Video.FRAMES[0]}
                    durationInFrames={[
                      updatedData.TIMINGS.FPS_INTRO,
                      updatedData.TIMINGS.FPS_MAIN,
                      updatedData.TIMINGS.FPS_OUTRO,
                    ].reduce((a, b) => a + b, 0)}
                    fps={30}
                    inputProps={{ DATA: updatedData }}
                    style={{ width: "100%" }}
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        </Center>
      </Paper>

      <Group position="right">
        <BTN_TOINTERALLINK LABEL={"Templates"} URL={"/members/templates/"} />
      </Group>
    </>
  );
};
