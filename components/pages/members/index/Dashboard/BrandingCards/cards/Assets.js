import { useEffect, useState } from 'react';
import {
  ThemeIcon,
  Text,
  Group,
  Paper,
  rem,
  Tooltip,
  ActionIcon,
} from '@mantine/core';
import { IconInfoOctagon } from '@tabler/icons-react';
import { useStyles } from '../../DashboardCardStyles'; // Import the styles

import { BTN_TOINTERALLINK } from '../../../../../../Members/Common/utils/Buttons';
import { useGetTemplates } from '../../../../../../../Hooks/useGetTemplate';
import { FixturaLoading } from '../../../../../../Members/Common/Loading';

// JSDoc types are globally available

const ICON_SIZE = rem(60);

/**
 * Dashboard Assets component for displaying template information
 * @param {Object} props - Component props
 * @param {any} props.IconComponent - Icon component to display
 * @param {Object|null} props.template - Template option data
 * @param {Object} props.theme - Theme data
 * @param {Object} props.audio_option - Audio option data
 * @returns {JSX.Element} Dashboard assets card
 */
export const DashBoardAssets = ({
  IconComponent,
  template = null,
  theme = {},
  audio_option = {},
}) => {
  // Consistent variable naming
  const { classes } = useStyles();
  const [Templates, isLoading, GetTemplates] = useGetTemplates();
  const [displayTemplate, setDisplayTemplate] = useState(null);

  const templateCategory = template?.template_category?.data?.attributes;
  const templateName = templateCategory?.Name || 'N/A';
  const audioOptionName = audio_option?.Name || 'N/A';
  const isDefaultTemplate = templateName === 'Basic Sqaure';
  const isDefaultAudioOption = audioOptionName === 'Groover';

  useEffect(() => {
    if (template?.template_category?.data?.id) {
      GetTemplates(template.template_category.data.id);
    }
  }, [template?.template_category?.data?.id]);

  useEffect(() => {
    if (Templates) {
      setDisplayTemplate(Templates.attributes);
    }
  }, [Templates]);

  if (isLoading) {
    return <FixturaLoading />;
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
        <IconComponent size='2rem' stroke={1.5} color={'white'} />
      </ThemeIcon>
      <Text ta='center' fw={700} className={classes.title}>
        &nbsp;
      </Text>
      <Text c='dimmed' ta='center' fz='sm'>
        Graphics Package
      </Text>

      {/* <Image src={displayTemplate.Poster?.data.attributes.formats.small.url} /> */}
      <Group position='apart' mt='xs'>
        <Text fz='sm'>Category</Text>
        <Text fz='sm' color='dimmed'>
          {displayTemplate?.Category || 'N/A'}
        </Text>

        {isDefaultTemplate && (
          <Tooltip
            withArrow
            color='cyan.5'
            label="This is a default setting. Click 'Change' to customize it."
          >
            <ActionIcon color='yellow.9'>
              <IconInfoOctagon size={'1.1rem'} />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <Group position='apart' mt='xs'>
        <Text fz='sm'>Variation</Text>
        <Text fz='sm' color='dimmed'>
          {displayTemplate?.FrontEndName || 'N/A'}
        </Text>
      </Group>
      <Group position='apart' mt='xs'>
        <Text fz='sm'>Audio Option</Text>
        <Text fz='sm' color='dimmed'>
          {displayTemplate?.bundle_audio?.data?.attributes?.Name || 'N/A'}
        </Text>
      </Group>
      <Group position='right' mt='md'>
        <BTN_TOINTERALLINK LABEL={'Change'} URL={'members/templateBuilder/'} />
      </Group>
    </Paper>
  );
};
