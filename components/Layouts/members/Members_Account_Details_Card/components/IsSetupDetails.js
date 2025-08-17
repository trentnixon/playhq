import { Text, Group, useMantineTheme, Box } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import { FixturaDivider } from '../../../../Members/Common/Divider';

export const IsSetupDetails = () => {
  const theme = useMantineTheme();
  return (
    <Box
      sx={theme => ({
        '@media (max-width: 768px)': {
          display: 'none',
        },
      })}
    >
      <FixturaDivider />
      <Group position='apart'>
        <IconCheck size={`1.1em`} color={theme.colors.green[6]} />
        <Text ta='center' fz='sm' c='dimmed'>
          Subscription
        </Text>
        <Text ta='center' fz='sm' c={theme.colors.green[6]} fw={500}>
          After Setup
        </Text>
      </Group>
      <Group position='apart'>
        <IconCheck size={`1.1em`} color={theme.colors.green[6]} />
        <Text ta='center' fz='sm' c='dimmed'>
          Delivery Day
        </Text>
        <Text ta='center' fz='sm' c={theme.colors.green[6]} fw={500}>
          After Setup
        </Text>
      </Group>
      <Group position='apart'>
        <IconCheck size={`1.1em`} color={theme.colors.green[6]} />
        <Text ta='center' fz='sm' c='dimmed'>
          Video settings
        </Text>
        <Text ta='center' fz='sm' c={theme.colors.green[6]} fw={500}>
          After Setup
        </Text>
      </Group>
      <Group position='apart'>
        <IconCheck size={`1.1em`} color={theme.colors.green[6]} />
        <Text ta='center' fz='sm' c='dimmed'>
          Image settings
        </Text>
        <Text ta='center' fz='sm' c={theme.colors.green[6]} fw={500}>
          After Setup
        </Text>
      </Group>
      <Group position='apart'>
        <IconCheck size={`1.1em`} color={theme.colors.green[6]} />
        <Text ta='center' fz='sm' c='dimmed'>
          Audio settings
        </Text>
        <Text ta='center' fz='sm' c={theme.colors.green[6]} fw={500}>
          After Setup
        </Text>
      </Group>
    </Box>
  );
};
