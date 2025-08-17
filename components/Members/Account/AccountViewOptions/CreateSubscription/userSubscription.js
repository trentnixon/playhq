import { useState } from 'react';
import { Container, Paper, Group, Box, Center, Space } from '@mantine/core';
import { IconBrandStripe, IconRotateClockwise } from '@tabler/icons';
import { P, PageTitle } from '../../../Common/Type';
import { SelectAPlan } from './components/SelectAPlan/SelectAPlan';
import dayjs from 'dayjs'; // Use dayjs to handle date operations
import { BTN_ONCLICK } from '../../../Common/utils/Buttons';
import { DateSelector } from './components/DateSelector';
import { PlanDetailsTable } from './components/PlanDetailsTable';

export const UserSubscription = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [endDate, setEndDate] = useState({
    month1: null,
    month3: null,
    month6: null,
  });

  const [datePickerVisible, setDatePickerVisible] = useState(true);

  const handleDateChange = date => {
    setSelectedDate(date);
    setDatePickerVisible(false); // Hide date picker after selecting the date
    // Calculate the end dates based on the selected start date
    const formattedEndDate = {
      month1: dayjs(date).add(30, 'day').format('YYYY-MM-DDTHH:mm:ssZ'),
      month3: dayjs(date).add(90, 'day').format('YYYY-MM-DDTHH:mm:ssZ'),
      month6: dayjs(date).add(365, 'day').format('YYYY-MM-DDTHH:mm:ssZ'),
    };
    setEndDate(formattedEndDate);
  };

  const handleEditDate = () => {
    setDatePickerVisible(true); // Show date picker to allow changing the date
  };

  return (
    <>
      <PageTitle
        Copy='Create a Season Pass'
        ICON={<IconBrandStripe size={40} />}
      />

      <Container size='lg' px={0}>
        {datePickerVisible ? (
          <>
            <P textAlign='center' Weight={600}>
              When would you like us to start process fixtures?
            </P>

            <Center my={20}>
              <DateSelector
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
            </Center>
            <P size='xs' textAlign='center'>
              Tip: Ensure you select the WEEK BEFORE the first game, or today's
              date if the season has already begun.
            </P>
          </>
        ) : (
          <>
            <Box py='lg'>
              <Group position='apart'>
                <P Weight={800} marginBottom={0}>
                  Selected start date:{' '}
                  {dayjs(selectedDate).format('MMMM DD, YYYY')}
                </P>

                <BTN_ONCLICK
                  HANDLE={handleEditDate}
                  LABEL={`Change ${dayjs(selectedDate).format(
                    'MMMM DD, YYYY'
                  )}`}
                  leftIcon={<IconRotateClockwise size={20} />}
                />
              </Group>
              <Space h={40} />
              <PlanDetailsTable selectedDate={selectedDate} endDate={endDate} />
            </Box>

            <Paper p='xs' sx={{ backgroundColor: 'white' }}>
              <SelectAPlan startDate={selectedDate} />
            </Paper>
          </>
        )}
      </Container>
    </>
  );
};
