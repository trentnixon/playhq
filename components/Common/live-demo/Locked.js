// src/Common/components/Locked.js

import { Tooltip, useMantineTheme } from '@mantine/core';
import { IconLockSquareRounded } from '@tabler/icons-react';

const Locked = () => {
  const theme = useMantineTheme();
  return (
    <Tooltip
      position='bottom'
      withArrow
      label='Upload a media item to unlock this item'
    >
      <IconLockSquareRounded size={'1.9em'} color={theme.colors.gray[0]} />
    </Tooltip>
  );
};

export default Locked;
