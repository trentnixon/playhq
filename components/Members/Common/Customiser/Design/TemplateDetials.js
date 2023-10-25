import { P } from "../../Type";
import { BTN_ONCLICK } from "../../utils/Buttons";
import {
  ActionIcon,
  Center,
  Container,
  Group,
  Image,
  Paper,
  SimpleGrid,
  useMantineTheme,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import {
  IconMusic,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
export function TemplateDetail({ template, onBack, onSelect, isSelected }) {
  // Render the detailed view of the template

  const Display = template.attributes;
  return (
    <div>
      <Container my="md" fluid>
        <Group position="apart">
          <P Weight={900}>{Display.FrontEndName}</P>
        </Group>

        <Group position="apart" mb={20}>
          {isSelected ? (
            <P textAlign="right" color={6} marginBottom={0}>
              This is your currently selected template.
            </P>
          ) : (
            <BTN_ONCLICK
              HANDLE={() => onSelect(template)}
              LABEL={"Select this Template"}
              THEME="success"
            />
          )}
          <BTN_ONCLICK HANDLE={onBack} LABEL={"Back"} THEME="error" />
        </Group>
        <SimpleGrid
          cols={2}
          breakpoints={[
            { maxWidth: "md", cols: 3, spacing: "md" },
            { maxWidth: "sm", cols: 2, spacing: "sm" },
            { maxWidth: "xs", cols: 1, spacing: "sm" },
          ]}
          spacing="md"
        >
          <Paper>
            <Group position="right" mb={20}>
              <VideoPlayer url={Display.Video.data.attributes.url} />
            </Group>

            <AudioPlayer
              Audio={
                template.attributes.bundle_audio.data.attributes.audio_options
                  .data
              }
            />
          </Paper>
          <Paper mb={20}>
            <Paper shadow="md" mb={20} p="sm" >
              <ReactMarkdown>{Display.Description}</ReactMarkdown>
            </Paper>
            <Group position="right" mb={20}>
              <BTN_ONCLICK
                HANDLE={() => onSelect(template)}
                LABEL={"Select this Template"}
                THEME="success"
              />
            </Group>
          </Paper>
        </SimpleGrid>
        <ExampleGallery Gallery={Display.Gallery.data} />
        <Group position="right" mt={20}>
          <BTN_ONCLICK HANDLE={onBack} LABEL={"Back"} THEME="error" />
        </Group>
      </Container>
    </div>
  );
}

function VideoPlayer({ url }) {
  return (
    <video controls height="auto" width="100%">
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

function ExampleGallery({ Gallery }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
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
          {Gallery.map((DATA, i) => {
            return (
              <Carousel.Slide key={i}>
                <Image src={DATA.attributes.url} />
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Center>
    </Paper>
  );
}

const AudioPlayer = ({ Audio }) => {
  const [currentAudio, setCurrentAudio] = useState(null);
  const audioRef = useRef(null);
  const theme = useMantineTheme();
  const playAudio = (url) => {
    if (currentAudio === url) {
      audioRef.current.pause();
      setCurrentAudio(null);
    } else {
      setCurrentAudio(url);
    }
  };

  useEffect(() => {
    if (currentAudio) {
      audioRef.current.play();
    }
  }, [currentAudio]);
  return (
    <>
      <P Weight={900}>Curated Audio Bundle</P>
      <Paper mb={20}>
        {Audio.map((audio, i) => (
          <Group key={i} position="apart">
            <Group>
              <ActionIcon
                color="gray.5"
                size="lg"
                onClick={() => playAudio(audio.attributes.URL)}
              >
                {currentAudio === audio.attributes.URL ? (
                  <IconPlayerPauseFilled color={theme.colors.green[5]} />
                ) : (
                  <IconPlayerPlayFilled color={theme.colors.blue[9]} />
                )}
              </ActionIcon>

              <P marginBottom={0} textAlign="left"> 
                {audio.attributes.ComponentName}
              </P>
            </Group>
            <Group position="left">
              <P marginBottom={0} size={"xs"} textAlign="right">
                {audio.attributes.Name}
              </P>
              <IconMusic color={theme.colors.blue[9]} size={"0.8em"} />
            </Group>
          </Group>
        ))}
        <audio ref={audioRef} src={currentAudio} />
      </Paper>
      <P size={"xs"}>
        An audio bundle consists of a curated collection of audio files that are
        designated to be paired with this video template.
      </P>
    </>
  );
};
