import { Box, Group } from '@mantine/core';
import { SelectDeliveryDayWithWrapper } from './SelectDeliveryDay';
// Utils
import { DisplayDaysTillDelivery } from './daysTillDelivery/DisplayDaysTillDelivery';
import { DaysTillWithWrapper } from './daysTillDelivery/DaysTillDeliverWrapper';

export const DaysTillClean = ({ renders }) => {
  return <DisplayDaysTillDelivery renders={renders} color={8} />;
};

export const DownloadsSelectDays = ({ renders }) => {
  if (!renders) return false;
  return (
    <>
      <Group position='apart'>
        <Box p={0} m={0}>
          <SelectDeliveryDayWithWrapper />
        </Box>

        <DaysTillWithWrapper renders={renders} />
      </Group>
    </>
  );
};
