import React, { useEffect, useState } from 'react';
import { ThemeIcon, Progress, Text, Group, Paper, rem } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';

import { useGetGalleryItems } from '../../../../../../../Hooks/useDashBoard';
import { FixturaLoading } from '../../../../../../Members/Common/Loading';
import { BTN_TOINTERALLINK } from '../../../../../../Members/Common/utils/Buttons';
import { useStyles } from '../../DashboardCardStyles';

const ICON_SIZE = rem(60);

// Extracted the zero-item state into its own component for readability
const ZeroItemsState = ({ classes, Theme }) => (
  <Paper
    radius='md'
    withBorder
    shadow='md'
    className={classes.card}
    mt={`calc(${ICON_SIZE} / 3)`}
  >
    <ThemeIcon
      color={`red.9`}
      className={classes.icon}
      size={ICON_SIZE}
      radius={ICON_SIZE}
    >
      <IconUpload size='2rem' stroke={1.5} color={`white`} />
    </ThemeIcon>
    <Text ta='center' fw={700} className={classes.title}>
      {0}
    </Text>
    <Text c='dimmed' ta='center' fz='sm'>
      Media Items
    </Text>
    <Text c='dimmed' ta='center' fz='sm'>
      Upload items to add your club's unique personality to every asset.
    </Text>
    <Group position='center' mt='md'>
      <BTN_TOINTERALLINK LABEL={'Upload'} URL={'members/gallery/'} />
    </Group>
  </Paper>
);

// Main component function
export const DashBoardGalleryItems = ({ IconComponent, AccountID, Theme }) => {
  const { classes } = useStyles();
  const [galleryItems, isLoading, error, fetchGalleryItems] =
    useGetGalleryItems();
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (AccountID) {
      fetchGalleryItems(AccountID);
    }
  }, [AccountID]);

  useEffect(() => {
    if (galleryItems?.attributes) {
      const mediaItems =
        galleryItems.attributes.account_media_libraries.data.length;
      setStats({ mediaItems });
    }
  }, [galleryItems]);

  if (isLoading) {
    return <FixturaLoading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (stats.mediaItems === 0) {
    return <ZeroItemsState classes={classes} Theme={Theme} />;
  }

  return (
    <Paper
      radius='md'
      withBorder
      shadow='md'
      className={classes.card}
      mt={`calc(${ICON_SIZE} / 3)`}
    >
      <ThemeIcon
        color={'green.5'}
        className={classes.icon}
        size={ICON_SIZE}
        radius={ICON_SIZE}
      >
        <IconComponent
          size='2rem'
          stroke={1.5}
          color={'white'} // Add your contrast color function
        />
      </ThemeIcon>

      <Text ta='center' fw={700} className={classes.title}>
        {stats.mediaItems}
      </Text>
      <Text c='dimmed' ta='center' fz='sm'>
        Media Items
      </Text>

      <Group position='apart' mt='xs'>
        <Text fz='sm' color='dimmed'>
          Image
        </Text>
        <Text fz='sm' color='dimmed'>
          {((stats.mediaItems / 15) * 100).toFixed(0)}%
        </Text>
      </Group>

      <Progress value={(stats.mediaItems / 15) * 100} mt={5} color='cyan.5' />

      <Group position='apart' mt='md'>
        <Text fz='sm'>{`${stats.mediaItems} / 15`}</Text>
      </Group>

      <Group position='right' mt='md'>
        <BTN_TOINTERALLINK LABEL={'Upload'} URL={'members/gallery/'} />
      </Group>
    </Paper>
  );
};
