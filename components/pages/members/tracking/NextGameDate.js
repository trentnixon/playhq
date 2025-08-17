import { Group } from '@mantine/core';
import { P } from '../../../Members/Common/Type';

export const NextGameDate = ({ gamesData }) => {
  const nextGame = getNextDate(gamesData);
  return (
    <Group position='apart'>
      <P>{`Upcoming Fixture: ${nextGame?.date}`}</P>
      <P>{`Games Listed ${nextGame?.obj?.length}`}</P>
    </Group>
  );
};

function getNextDate(data) {
  // Get today's date
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignore time

  let closestDate;
  let closestObj;

  // Iterate through each key in the object
  for (let key in data) {
    // Parse the date from the key
    const date = new Date(key);

    // If the date is in the future and closer than the currently found closest date
    if (date > today && (!closestDate || date < closestDate)) {
      closestDate = date;
      closestObj = data[key];
    }
  }

  // Return the closest date (formatted as "Day-Month") and associated object
  let formattedDate;
  if (closestDate) {
    // Get the day
    const day = closestDate.getDate();
    let daySuffix;

    // Determine the suffix for the day
    if (day > 3 && day < 21) daySuffix = 'th';
    else
      switch (day % 10) {
        case 1:
          daySuffix = 'st';
          break;
        case 2:
          daySuffix = 'nd';
          break;
        case 3:
          daySuffix = 'rd';
          break;
        default:
          daySuffix = 'th';
          break;
      }

    // Get the month
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const monthName = monthNames[closestDate.getMonth()];

    formattedDate = `${day}${daySuffix} ${monthName}`;
  }

  return { date: formattedDate, obj: closestObj };
}
