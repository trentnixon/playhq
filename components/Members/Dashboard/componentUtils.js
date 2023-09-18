import React from "react";
import { ThemeIcon, Text, Group, Paper, Progress, rem } from "@mantine/core";
import { BTN_TOINTERALLINK } from "../Common/utils/Buttons";
import { useStyles } from "./styles";

const ICON_SIZE = rem(60);
// 1. Card Container
export const CardContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <Paper
      radius="md"
      withBorder
      shadow="md"
      className={classes.card}
      mt={`calc(${ICON_SIZE} / 3)`}
    >
      {children}
    </Paper>
  );
};

// 2. Icon Section
export const IconSection = ({ color, IconComponent }) => (
  <ThemeIcon color={color} size={ICON_SIZE} radius={ICON_SIZE}>
    <IconComponent size="2rem" stroke={1.5} color={"white"} />
  </ThemeIcon>
);

// 3. Title and Description
export const TitleAndDescription = ({ title, description }) => {
  const classes = useStyles();
  return (
    <>
      <Text ta="center" fw={700} className={classes.title}>
        {title}
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        {description}
      </Text>
    </>
  );
};

// 4. Progress Section
export const ProgressSection = ({ value, label }) => (
  <>
    <Group position="apart" mt="xs">
      <Text fz="sm" color="dimmed">
        {label}
      </Text>
      <Text fz="sm" color="dimmed">
        {value}%
      </Text>
    </Group>
    <Progress value={value} mt={5} color="cyan.5" />
  </>
);

// 5. CTA Button
export const CTAButton = ({ label, url }) => (
  <Group position="right" mt="md">
    <BTN_TOINTERALLINK LABEL={label} URL={url} />
  </Group>
);
