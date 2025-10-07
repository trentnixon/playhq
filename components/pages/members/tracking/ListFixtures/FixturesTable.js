import { Table } from '@mantine/core';

export const FixtureTable = props => {
  const { gameDays, isNextFixtureList, monthIndex } = props;
  return (
    <>
      {gameDays.map(({ date, games }, index) => (
        <Table mt={30} striped highlightOnHover key={index}>
          <thead>
            <tr>
              <th></th>
              <th>Home</th>
              <th></th>
              <th>Away</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game, gameIndex) => (
              <Row
                key={gameIndex}
                game={game}
                month={date.toLocaleDateString(undefined, {
                  month: 'long',
                })}
                date={getOrdinalSuffix(date.getDate())}
                isNextFixture={
                  isNextFixtureList &&
                  monthIndex === 0 &&
                  index === 0 &&
                  gameIndex === 0
                }
              />
            ))}
          </tbody>
        </Table>
      ))}
    </>
  );
};

const getOrdinalSuffix = day => {
  if (day % 10 === 1 && day !== 11) return `${day}st`;
  if (day % 10 === 2 && day !== 12) return `${day}nd`;
  if (day % 10 === 3 && day !== 13) return `${day}rd`;
  return `${day}th`;
};

const Row = ({ game, month, date, isNextFixture }) => (
  <tr style={{ backgroundColor: isNextFixture ? '#f0f0f0' : 'transparent' }}>
    <td>
      {date} {month}
    </td>
    <td>{game.teamHome}</td>
    <td>vs</td>
    <td>{game.teamAway}</td>
  </tr>
);
