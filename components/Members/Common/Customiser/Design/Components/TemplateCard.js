import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  rem,
  Tooltip,
  useMantineTheme,
  Paper,
} from "@mantine/core";
import { BTN_ONCLICK } from "../../../utils/Buttons";
import { IconLockSquareRounded } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  selectedCard: {
    backgroundColor: theme.colors.green[1],
  },
  imageSection: {
    padding: '0',
    textAlign:'center',
    marginTop: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.xs,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

export function TemplateCard({
  template,
  isSelected,
  onSelect,
  onMoreInfo,
  hasMediaItems,
}) {
  const { classes } = useStyles();

  // Extract new attributes
  const { Name, Category, Variation, FrontEndName } = template.attributes;
  const posterURL =
    template.attributes.Poster.data.attributes.formats.small.url;
  const requiresMedia = template.attributes.requiresMedia;
  console.log(template.attributes.requiresMedia);
  return (
    <Card radius="md" p={0}>
      <Group position="right">
        <Text fw={900}>{FrontEndName}</Text>
      </Group>
      <Paper
        withBorder
        p={0}
        className={isSelected ? `${classes.selectedCard}` : classes.card}
      >
        <Card.Section className={classes.imageSection}>
          <Image src={posterURL} alt={Name}   />
        </Card.Section>
        <Group position="apart" mt="0" p={'xs'}>
          <div>
            <Text fz="xs" c="dimmed">
              {Variation}
            </Text>
          </div>
          <Badge variant="outline">{Category}</Badge>
        </Group>
        <Card.Section className={classes.section}>
          <Group spacing={30} position="center">
            {!requiresMedia ? (
              <CTABTN FUNC={() => onMoreInfo(template)} />
            ) : hasMediaItems === 0 ? (
              <Locked />
            ) : (
              <CTABTN FUNC={() => onMoreInfo(template)} />
            )}
          </Group>
        </Card.Section>
      </Paper>
    </Card>
  );
}

const Locked = () => {
  const theme = useMantineTheme();
  return (
    <Tooltip
      position="bottom"
      withArrow
      label="Upload a media item to unlock this item"
    >
      <IconLockSquareRounded size={"1.9em"} color={theme.colors.gray[5]} />
    </Tooltip>
  );
};

const CTABTN = ({ FUNC }) => {
  return <BTN_ONCLICK HANDLE={FUNC} LABEL={"View"} />;
};

/*  {isSelected ? (
            <>
              <Text
                fz="xl"
                ta="center"
                c="dimmed"
                fw={500}
                sx={{ lineHeight: 1 }}
              >
                Selected
              </Text>
              <BTN_ONCLICK
                HANDLE={() => onMoreInfo(template)}
                LABEL={"More Info"}
              />
            </>
          ) : (
            
          )} */
