import { Group } from '@mantine/core';
import { DaysTillClean } from './components/DaysTillDeliveryContainer';
import { SelectDeliveryDayClean } from './components/SelectDeliveryDay';

export const Setting_Action = ({ renders }) => {
  return (
    <Group position='apart'>
      <DaysTillClean renders={renders} />
      <SelectDeliveryDayClean />
    </Group>
  );
};
