import { Paper } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons';

export const DateSelector = ({ selectedDate, onDateChange }) => (
  <Paper p='xs' withBorder shadow='md' sx={{ backgroundColor: 'white' }}>
    <DatePicker
      label='Select the start date for your plan'
      placeholder='Pick date'
      value={selectedDate}
      onChange={onDateChange}
      required
      icon={<IconCalendarEvent size={20} />}
    />
  </Paper>
);
