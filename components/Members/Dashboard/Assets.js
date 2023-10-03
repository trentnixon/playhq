import {
  ThemeIcon,
  Progress,
  Text,
  Group,
  Paper,
  rem,
  Box,
  Tooltip,
  ActionIcon,
} from "@mantine/core";

import { useStyles } from "./styles"; // Import the styles

import { BTN_TOINTERALLINK } from "../Common/utils/Buttons";
import { getContrastColor, lightenColor } from "../../../utils/actions";
import { IconInfoOctagon } from "@tabler/icons-react";

const ICON_SIZE = rem(60);

export const DashBoardAssets = ({
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

  console.log(theme);

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
        Assets
      </Text>

      <Group position="apart" mt="xs">
        <Text fz="sm">Template</Text>
        <Text fz="sm" color="dimmed">
          {templateName}
        </Text>
        {isDefaultTemplate && (
          <Tooltip
            withArrow
            color="cyan.5"
            label="This is a default setting. Click 'Change' to customize it."
          >
            <ActionIcon color="yellow.9">
              <IconInfoOctagon size={"1.1rem"} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>

      <Group position="apart" mt="xs">
        <Text fz="sm">Audio Option</Text>
        <Text fz="sm" color="dimmed">
          {audioOptionName}
        </Text>
        {isDefaultAudioOption && (
          <Tooltip
            withArrow
            color="cyan.5"
            label="This is a default setting. Click 'Change' to customize it."
          >
            <ActionIcon color="yellow.9">
              <IconInfoOctagon size={"1.1rem"} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <Group position="right" mt="md">
        <BTN_TOINTERALLINK LABEL={"Change"} URL={"members/graphics-packages/"} />
      </Group>
    </Paper>
  );
};
