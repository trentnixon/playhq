import { Carousel } from "@mantine/carousel";
import { Center, Group, Paper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/styles";
import { Thumbnail } from "@remotion/player";
import { useEffect, useState } from "react";
//import { BTN_TOINTERALLINK } from "../../../../../Members/Common/utils/Buttons";
import { prepareMockData } from "../../../../../../utils/Remotion/RemotionPrepareMockData";

export const SponsorsPreviewer = ({ account }) => {
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
  //console.log("[mockData]", mockData);

  return (
    <>
      <Paper shadow="0" pb="sm">
        <Center>
          <Carousel
            maw={"100%"}
            slideSize="50%"
            breakpoints={[{ maxWidth: "xs", slideSize: "100%", slideGap: 0 }]}
            slideGap="xs"
            align="start"
            loop
            sx={{ flex: 1 }}
            slidesToScroll={mobile ? 1 : 2}
            withIndicators>
            <Carousel.Slide>
              <Thumbnail
                component={mockData[0].component}
                compositionHeight={1350}
                compositionWidth={1080}
                frameToDisplay={30}
                durationInFrames={[
                  mockData[0].data.TIMINGS.FPS_INTRO,
                  mockData[0].data.TIMINGS.FPS_MAIN,
                  mockData[0].data.TIMINGS.FPS_OUTRO,
                ].reduce((a, b) => a + b, 0)}
                fps={30}
                inputProps={{ DATA: mockData[0].data }}
                key={JSON.stringify(mockData[0].data)} // Use key to force re-render
                style={{ width: "100%" }}
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <Thumbnail
                component={mockData[0].component}
                compositionHeight={1350}
                compositionWidth={1080}
                frameToDisplay={mockData[0].data.VIDEOMETA.Video.FRAMES[0]}
                durationInFrames={[
                  mockData[0].data.TIMINGS.FPS_INTRO,
                  mockData[0].data.TIMINGS.FPS_MAIN,
                  mockData[0].data.TIMINGS.FPS_OUTRO,
                ].reduce((a, b) => a + b, 0)}
                fps={30}
                inputProps={{ DATA: mockData[0].data }}
                key={JSON.stringify(mockData[0].data)} // Use key to force re-render
                style={{ width: "100%" }}
              />
            </Carousel.Slide>
            <Carousel.Slide>
              <Thumbnail
                component={mockData[0].component}
                compositionHeight={1350}
                compositionWidth={1080}
                frameToDisplay={
                  [
                    mockData[0].data.TIMINGS.FPS_INTRO,
                    mockData[0].data.TIMINGS.FPS_MAIN,
                    mockData[0].data.TIMINGS.FPS_OUTRO,
                  ].reduce((a, b) => a + b, 0) - 30
                }
                durationInFrames={[
                  mockData[0].data.TIMINGS.FPS_INTRO,
                  mockData[0].data.TIMINGS.FPS_MAIN,
                  mockData[0].data.TIMINGS.FPS_OUTRO,
                ].reduce((a, b) => a + b, 0)}
                fps={30}
                inputProps={{ DATA: mockData[0].data }}
                key={JSON.stringify(mockData[0].data)} // Use key to force re-render
                style={{ width: "100%" }}
              />
            </Carousel.Slide>
          </Carousel>
        </Center>
      </Paper>

      {/*   <Group position="right">
        <BTN_TOINTERALLINK LABEL={"Free Template"} URL={"/members/templates/"} />
      </Group> */}
    </>
  );
};
