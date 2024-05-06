import { Carousel } from "@mantine/carousel";
import { Center, Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/styles";
import { Thumbnail } from "@remotion/player";
import { useEffect, useState } from "react";
import { createPreviewObject, mergeData, updateDataBasedOnSelected } from "../../../utils/RemotionUtils";
import { ASSETS, DEFAULTLOGO } from "../../../utils/RemotionAssets";
 
export const PreviewGallery = ({ account }) => {
  const [previewObj, setPreviewObj] = useState({});
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  useEffect(() => {
    const updatedPreviewObj = createPreviewObject(account);
    setPreviewObj(updatedPreviewObj);
  }, [account]);

  if (!previewObj.template) {
    return <Center>Loading...</Center>;
  }
  
  const templateType = previewObj.template.Category;
  const assetTypes = Object.keys(ASSETS[templateType]);
 
  return (
    <Paper shadow="0" p="sm">
      <Center>
        <Carousel
          maw={"100%"}
          slideSize="25%"
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
  );
}; 
