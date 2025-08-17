import { Center, useMantineTheme } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons';

export const SelectedPlan = () => {
  const theme = useMantineTheme();
  return (
    <Center mt={20}>
      <IconCircleCheck size='2rem' color={theme.colors.green[5]} />
    </Center>
  );
};
