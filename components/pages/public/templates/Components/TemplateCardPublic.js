// src/Components/Templates/Components/TemplateCard.js

import { useRouter } from 'next/router';
import { Card, Group, Paper, BackgroundImage } from '@mantine/core';
import { IconCheckbox } from '@tabler/icons-react';
import { P } from '../../../../Members/Common/Type';

import useTemplateCardStyles from '../../../../styles/useTemplateCardStyles';
import CTABTN from '../../../../Common/live-demo/CTABTN';
import Locked from '../../../../Common/live-demo/Locked';

export function TemplateCardPublic({ template, isSelected, hasMediaItems }) {
  const { classes } = useTemplateCardStyles();
  const router = useRouter();

  const { FrontEndName, Poster, requiresMedia } = template.attributes;
  const posterURL = Poster.data.attributes.formats?.small.url;

  const handleCTAClick = () => {
    router.push(`/live-demo/${template.id}`);
  };

  return (
    <Paper
      radius='md'
      withBorder
      shadow='md'
      p={0}
      className={isSelected ? classes.selectedCard : classes.card}
    >
      {isSelected && (
        <IconCheckbox size={50} className={classes.selectedIcon} />
      )}
      <BackgroundImage
        src={posterURL}
        radius='sm'
        className={classes.imageBackground}
      >
        <Group position='center' className={classes.imageOverlay}>
          <P color={0} Weight={600} size='xs' marginBottom={0}>
            {FrontEndName}
          </P>
        </Group>
        <Card.Section className={classes.section}>
          <Group position='right'>
            {requiresMedia && hasMediaItems === 0 ? (
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
