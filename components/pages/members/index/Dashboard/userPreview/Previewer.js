import { Carousel } from "@mantine/carousel";
import { Center, Group, Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/styles";
import { Thumbnail } from "@remotion/player";
import { useEffect, useState } from "react";
import { BTN_TOINTERALLINK } from "../../../../../Members/Common/utils/Buttons";
import { prepareMockData } from "../../../../../../utils/Remotion/RemotionPrepareMockData";

export const Previewer = ({ account }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  
  const [mockData, setMockData] = useState([]);

  useEffect(() => {
    if (account) {
      const data = prepareMockData(account);
      setMockData(data);
    }
  }, [account]);

  if (!mockData.length) {
    return <Center>Loading...</Center>;
  } 

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
            {mockData.map((asset, i) => (
              <Carousel.Slide key={i}>
                <Thumbnail
                  component={asset.component}
                  compositionHeight={1350}
                  compositionWidth={1080}
                  frameToDisplay={asset.data.VIDEOMETA.Video.FRAMES[0]}
                  durationInFrames={[
                    asset.data.TIMINGS.FPS_INTRO,
                    asset.data.TIMINGS.FPS_MAIN,
                    asset.data.TIMINGS.FPS_OUTRO,
                  ].reduce((a, b) => a + b, 0)}
                  fps={30}
                  inputProps={{ DATA: asset.data }}
                  key={JSON.stringify(asset.data)} // Use key to force re-render
                  style={{ width: "100%" }}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Center>
      </Paper>

    {/*   <Group position="right">
        <BTN_TOINTERALLINK LABEL={"Free Template"} URL={"/members/templates/"} />
      </Group> */}
    </>
  );
};
