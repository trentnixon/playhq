import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import {
  Paper,
  Text,
  Title,
  Button,
  useMantineTheme,
  createStyles,
  rem,
} from '@mantine/core';

const useStyles = createStyles(theme => ({
  card: {
    height: rem(440),
    width: rem(400), // Fixed width for all cards
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
  },
  title: {
    fontFamily: 'Greycliff CF, sans-serif',
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },
  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
  },
}));

function Card({ image, title, category }) {
  const { classes } = useStyles();
  return (
    <Paper
      className={classes.card}
      style={{ backgroundImage: `url(${image})` }}
    ></Paper>
  );
}

const data = [
  {
    image:
      'https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Data_Display_28b305f5a1.jpg',
    title: 'Custom Data Display',
    category: 'Customization',
  },
  {
    image:
      'https://fixtura.s3.ap-southeast-2.amazonaws.com/Position_sponsors_c358bb7455.jpg',
    title: 'Position Your Sponsors',
    category: 'Customization',
  },
  {
    image:
      'https://fixtura.s3.ap-southeast-2.amazonaws.com/use_Video_BGS_da917258f0.jpg',
    title: 'Use of Video Backgrounds',
    category: 'Customization',
  },
  {
    image:
      'https://fixtura.s3.ap-southeast-2.amazonaws.com/Add_AI_Voice_d44d31442e.jpg',
    title: 'Add Voice Over',
    category: 'Customization',
  },
  {
    image:
      'https://fixtura.s3.ap-southeast-2.amazonaws.com/Fonts_b38221e872.jpg',
    title: 'Choice of Fonts',
    category: 'Customization',
  },
  {
    image:
      'https://fixtura.s3.ap-southeast-2.amazonaws.com/Additional_C_Olors_684ad62bec.jpg',
    title: 'Additional Colors',
    category: 'Customization',
  },
  {
    image:
      'https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Animations_39522e39a1.jpg',
    title: 'Custom Animations',
    category: 'Customization',
  },
];

export function CardsCarousel({ data }) {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map(item => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: rem(400), sm: '50%' }}
      slideGap='xl'
      align='center'
      slidesToScroll={mobile ? 1 : 2}
      loop
    >
      {slides}
    </Carousel>
  );
}
