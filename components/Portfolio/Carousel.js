import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import FsLightbox from "fslightbox-react";
import { createStyles, Paper, Text, useMantineTheme, rem } from "@mantine/core";
import { useState } from "react";

const useStyles = createStyles((theme) => ({
  card: {
    height: "500px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.colors.dark[0],
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.colors.dark[1],
    opacity: 0.7,
    fontWeight: 700,
    textTransform: "uppercase",
  },
}));

function Card({ image, title, category, video, setToggler, setVideoUrl }) {
  const { classes } = useStyles();

  console.log(video);
  const handlePlayClick = () => {
    setVideoUrl(video);
    setToggler(true);
  };

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        {video ? (
          <div className="video-box">
            <div className="video-btn" onClick={handlePlayClick}>
              <i className="fa-solid fa-play"></i>
            </div>
          </div>
        ) : (
          false
        )}
        <Text className={classes.category} size="xs" color="dark">
          {category}
        </Text>
      </div>
    </Paper>
  );
}

export function CardsCarousel({ data }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [toggler, setToggler] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} setToggler={setToggler} setVideoUrl={setVideoUrl} />
    </Carousel.Slide>
  ));

  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={[videoUrl]}
        onClose={() => setToggler(false)}
      />
      <div style={{ height: 500, display: "flex" }}>
        <Carousel
          slideSize="33.33333%"
          breakpoints={[
            { maxWidth: "sm", slideSize: "100%", slideGap: "10px" },
          ]}
          slideGap="xl"
          align="start"
          loop
          sx={{ flex: 1 }}
          slidesToScroll={mobile ? 1 : 2}
          withIndicators
        >
          {slides}
        </Carousel>
      </div>
    </>
  );
}
