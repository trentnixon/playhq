import {
  ThemeIcon,
  Progress,
  Text,
  Group,
  Paper,
  rem,
  Box,
} from "@mantine/core";

import { useStyles } from "../../DashboardCardStyles"; // Import the styles

import { BTN_TOINTERALLINK } from "../../../../../../Members/Common/utils/Buttons";

const ICON_SIZE = rem(60);

export const DashBoardTheme = ({
  IconComponent,
  template = {},
  theme = {},
  audio_option = {},
}) => {
  // Consistent variable naming
  const { classes } = useStyles();
  const { Name: templateName = "N/A" } = template;
  const { Name: audioOptionName = "N/A" } = audio_option;
  const isDefaultTemplate = templateName === "Basic Sqaure";
  const isDefaultAudioOption = audioOptionName === "Groover";

  return (
    <Paper
      radius="md"
      withBorder
      shadow="md"
      className={classes.card}
      mt={`calc(${ICON_SIZE} / 3)`}
    >
      <ThemeIcon
        color={"green.5"}
        className={classes.icon}
        size={ICON_SIZE}
        radius={ICON_SIZE}
      >
        <IconComponent size="2rem" stroke={1.5} color={"white"} />
      </ThemeIcon>
      <Text ta="center" fw={700} className={classes.title}>
        &nbsp;
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        Theming
      </Text>

      <Group position="apart" mt="xs">
        <Text fz="sm" color="dimmed">
          Theme
        </Text>
      </Group>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[2],

          padding: theme.spacing.xs,
          borderRadius: theme.radius.md,
          cursor: "pointer",

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
      >
        <Progress
          size="xl"
          sections={[
            {
              value: 50,
              label: theme.primary,
              color: theme.primary,
            },
            {
              value: 50,
              label: theme.secondary,
              color: theme.secondary,
            },
          ]}
        />
      </Box>
      <Group position="right" mt="md">
        <BTN_TOINTERALLINK LABEL={"Change"} URL={"members/customizer/"} />
      </Group>
    </Paper>
  );
};
