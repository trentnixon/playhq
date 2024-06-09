import {
  Card,
  Text,
  Group,
  createStyles,
  rem,
  Tooltip,
  useMantineTheme,
  Paper,
  BackgroundImage,
} from "@mantine/core";
import { BTN_ONCLICK } from "../../../utils/Buttons";
import { IconLockSquareRounded, IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/router";
import { P } from "../../../Type";
import { IconCheckbox } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    position: "relative",
  },
  selectedCard: {
    backgroundColor: theme.colors.green[1],
    position: "relative",
  },
  imageSection: {
    padding: 0,
    textAlign: "center",
    marginTop: 0,
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
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: theme.spacing.xs,
    background:
      "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 90%)",
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },

  gradientText: {
    color: theme.white,
    fontWeight: 900,
  },

  selectedIcon: {
    position: "absolute",
    top: rem(5),
    right: rem(5),
    color: theme.white ,
    backgroundColor: theme.colors.green[5],
    borderRadius: "50%",
    zIndex: 200,
    padding: rem(2),
  },
}));

export function TemplateCard({ template, isSelected, hasMediaItems }) {
  const { classes } = useStyles();
  const router = useRouter();

  // Extract new attributes
  const { Name, Category, Variation, FrontEndName } = template.attributes;
  const posterURL =
    template.attributes.Poster.data.attributes.formats?.small.url;
  const requiresMedia = template.attributes.requiresMedia;

  const handleCTAClick = () => {
    router.push(`/members/templates/${template.id}`);
  };

  return (
    <Paper
      radius="md"
      withBorder
      shadow="md"
      p={0}
      className={isSelected ? `${classes.selectedCard}` : classes.card}
    >
      {isSelected && (
        <IconCheckbox size={50} className={classes.selectedIcon} />
      )}
      <BackgroundImage
        src={posterURL}
        radius="sm"
        sx={(theme) => ({
          minHeight: "300px", // Minimum height
          maxHeight: "400px", // Maximum height
          width: "100%",
          position: "relative",
        })}
      >
        <Group position="center"
          sx={(theme) => ({
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            padding: "2px 5px",
          })}
        >
          <P color={0} Weight={600} size="xs" marginBottom={0}>
            {FrontEndName}
          </P>
        </Group>
        <Card.Section className={classes.section}>
          <Group position="right">
            {!requiresMedia ? (
              <CTABTN FUNC={handleCTAClick} isSelected={isSelected} />
            ) : hasMediaItems === 0 ? (
              <Locked />
            ) : (
              <CTABTN FUNC={handleCTAClick} isSelected={isSelected} />
            )}
          </Group>
        </Card.Section>
      </BackgroundImage>
    </Paper>
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
      <IconLockSquareRounded size={"1.9em"} color={theme.colors.gray[0]} />
    </Tooltip>
  );
};

const CTABTN = ({ FUNC, isSelected }) => {
  return <BTN_ONCLICK HANDLE={FUNC} THEME={"white"} LABEL={isSelected ? "Current" : "Preview"} />;
};
