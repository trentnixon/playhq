import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  rem,
} from "@mantine/core";
import { BTN_ONCLICK } from "../../../utils/Buttons";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },
  selectedCard: {
    backgroundColor: theme.colors.gray[3],
  },
  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
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
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

export function TemplateCard({ template, isSelected, onSelect }) {
  const { classes } = useStyles();

  // Extract new attributes
  const { Name, Category, Variation, FrontEndName } = template.attributes;
  const posterURL =
    template.attributes.Poster.data.attributes.formats.small.url;

  return (
    <Card
      withBorder
      radius="md"
      className={isSelected ? `${classes.selectedCard}` : classes.card}
    >
      <Card.Section className={classes.imageSection}>
        <Image src={posterURL} alt={Name} />
      </Card.Section>
      <Group position="apart" mt="md">
        <div>
          <Text fw={500}>{FrontEndName}</Text>
          <Text fz="xs" c="dimmed">
            {Variation}
          </Text>
        </div>
        <Badge variant="outline">{Category}</Badge>
      </Group>

      <Card.Section className={classes.section}>
        <Group spacing={30} position="center">
          {isSelected ? (
            <Text
              fz="xl"
              ta="center"
              c="dimmed"
              fw={500}
              sx={{ lineHeight: 1 }}
            >
              Selected
            </Text>
          ) : (
            <BTN_ONCLICK HANDLE={() => onSelect(template)} LABEL={"Select"} />
          )}
        </Group>
      </Card.Section>
    </Card>
  );
}
