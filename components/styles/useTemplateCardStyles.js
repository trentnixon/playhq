// src/styles/useTemplateCardStyles.js

import { createStyles, rem } from '@mantine/core';

const useTemplateCardStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    position: 'relative',
  },
  selectedCard: {
    backgroundColor: theme.colors.green[1],
    position: 'relative',
  },
  imageBackground: {
    minHeight: '300px', // Minimum height
    maxHeight: '400px', // Maximum height
    width: '100%',
    position: 'relative',
  },
  imageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: '2px 5px',
  },
  section: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: theme.spacing.xs,
    background:
      'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 90%)',
  },
  selectedIcon: {
    position: 'absolute',
    top: rem(5),
    right: rem(5),
    color: theme.white,
    backgroundColor: theme.colors.green[5],
    borderRadius: '50%',
    zIndex: 200,
    padding: rem(2),
  },
}));

export default useTemplateCardStyles;
