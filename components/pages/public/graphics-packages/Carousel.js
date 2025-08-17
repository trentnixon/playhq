import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import FsLightbox from 'fslightbox-react';
import {
  createStyles,
  Paper,
  Text,
  useMantineTheme,
  rem,
  ScrollArea,
  Box,
} from '@mantine/core';
import { useState } from 'react';
import { Modal } from '@mantine/core';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
const useStyles = createStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    textTransform: 'uppercase',
  },
}));

function Card(props) {
  const {
    image,
    title,
    MainDescription,
    category,
    video,
    setToggler,
    setVideoUrl,
  } = props;
  const { classes } = useStyles();
  const [articleModalOpen, setArticleModalOpen] = useState(false);

  const theme = useMantineTheme();
  const handleArticleClick = () => {
    setArticleModalOpen(true);
  };

  const handlePlayClick = () => {
    setVideoUrl(video);
    setToggler(true);
  };

  return (
    <Paper
      shadow='md'
      w={'100%'}
      p='sm'
      radius='md'
      sx={{
        backgroundImage: `url(${image})`,

        height: '500px',
        width: '400px',
        '@media (max-width: 48em)': {
          height: '400px',
          width: '320px',
        },
      }}
      className={classes.card}
    >
      <div>
        {video ? (
          <div className='video-box'>
            <div className='video-btn' onClick={handlePlayClick}>
              <i className='fa-solid fa-play'></i>
            </div>
          </div>
        ) : (
          false
        )}
        {category === 'WRITEUP' ? (
          <div className='video-box'>
            <div className='video-btn' onClick={handleArticleClick}>
              <i className='fa-solid fa-book'></i>
            </div>
          </div>
        ) : (
          false
        )}
        <Box
          sx={theme => ({
            backgroundColor: theme.colors.gray[9],
            padding: theme.spacing.sm,
            borderRadius: theme.radius.md,
            cursor: 'pointer',

            '&:hover': {
              backgroundColor: theme.colors.blue[9],
            },
          })}
        >
          <Text className={classes.category} size='xs' color='dark'>
            {category}
          </Text>
        </Box>
      </div>
      <Modal
        opened={articleModalOpen}
        onClose={() => setArticleModalOpen(false)}
        title={title}
        size='xl'
        scrollAreaComponent={ScrollArea.Autosize}
        transitionProps={{
          transition: 'fade',
          duration: 600,
          timingFunction: 'linear',
        }}
        centered
        overlayProps={{
          color: theme.colors.gray[6],
          opacity: 0.55,
          blur: 3,
        }}
        styles={{
          title: {
            color: theme.colors.gray[0],
          },
          header: {
            backgroundColor: theme.colors.gray[9],
            padding: '7px 10px',
            marginBottom: '14px',
          },
          content: { backgroundColor: theme.colors.gray[1] },
        }}
      >
        <ReactMarkdown className='markdown'>{MainDescription}</ReactMarkdown>
      </Modal>
    </Paper>
  );
}

export function CardsCarousel({ data }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [toggler, setToggler] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const slides = data.map(item => (
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
      <Carousel
        slideSize='33.33333%'
        breakpoints={[{ maxWidth: 'xs', slideSize: '100%', slideGap: 0 }]}
        slideGap='xl'
        align='start'
        loop
        sx={{ flex: 1 }}
        slidesToScroll={mobile ? 1 : 2}
        withIndicators
      >
        {slides}
      </Carousel>
    </>
  );
}
