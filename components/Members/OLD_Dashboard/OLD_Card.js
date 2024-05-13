import { createStyles, ThemeIcon, Progress, Text, Group, Badge, Paper, rem } from '@mantine/core';
import React from 'react';

const ICON_SIZE = rem(60);

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    overflow: 'visible',
    padding: theme.spacing.xl,
    paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`,
  },

  icon: {
    position: 'absolute',
    top: `calc(-${ICON_SIZE} / 3)`,
    left: `calc(50% - ${ICON_SIZE} / 2)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

export function StatsCard({
  title,
  subTitle,
  progress,
  badgeText,
  IconComponent,
  remaining,
  total
}) {
  const { classes } = useStyles();

  return (
    <Paper radius="md" withBorder className={classes.card} mt={`calc(${ICON_SIZE} / 3)`}>
      <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
        <IconComponent size="2rem" stroke={1.5} />
      </ThemeIcon>

      <Text ta="center" fw={700} className={classes.title}>
        {title}
      </Text>
      <Text c="dimmed" ta="center" fz="sm">
        {subTitle}
      </Text>

      <Group position="apart" mt="xs">
        <Text fz="sm" color="dimmed">
          Progress
        </Text>
        <Text fz="sm" color="dimmed">
          {progress}%
        </Text>
      </Group>

      <Progress value={progress} mt={5} />

      <Group position="apart" mt="md">
        <Text fz="sm">{`${remaining} / ${total}`}</Text>
        <Badge size="sm">{badgeText}</Badge>
      </Group>
    </Paper>
  );
}

