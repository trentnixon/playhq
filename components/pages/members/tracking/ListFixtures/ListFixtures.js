import React from 'react';
import { Container, Grid, useMantineTheme } from '@mantine/core';
import { P, SectionHeaders } from '../../../../Members/Common/Type';
import { ListMonth } from './ListMonth';
import { FixtureTable } from './FixturesTable';
import { RoundedSectionContainer } from '../../../../UI/Containers/SectionContainer';

// Helper to group games by month
const groupByMonth = gamesData => {
  return gamesData.reduce((acc, gameDay) => {
    const month = gameDay.date.toLocaleDateString(undefined, { month: 'long' });
    acc[month] = acc[month] ? [...acc[month], gameDay] : [gameDay];
    return acc;
  }, {});
};

// Row component for table

export const GamesListing = ({ gamesData }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Convert and sort gamesData
  const gamesWithDateObjects = Object.entries(gamesData)
    .map(([date, games]) => ({
      date: new Date(date),
      games,
    }))
    .sort((a, b) => a.date - b.date);

  // Split into upcoming and previous games
  const upcomingGames = gamesWithDateObjects.filter(
    ({ date }) => date >= today
  );
  const upcomingGamesGroupedByMonth = groupByMonth(upcomingGames);

  //const previousGames = gamesWithDateObjects.filter(({ date }) => date < today);
  //const previousGamesGroupedByMonth = groupByMonth(previousGames);

  // Render function for games list
  const renderGamesList = (
    gamesGroupedByMonth,
    title,
    isNextFixtureList = false
  ) => {
    const entries = Object.entries(gamesGroupedByMonth);
    if (entries.length === 0) {
      return <P>{`There are currently no ${title.toLowerCase()}.`}</P>;
    }

    return (
      <>
        <SectionHeaders Copy={title} />

        <Grid grow gutter={5}>
          {entries.map(([month, gameDays], monthIndex) => (
            <RoundedSectionContainer
              key={month}
              headerContent={''}
              topContent={<ListMonth month={month} />}
              bottomContent={
                <FixtureTable
                  gameDays={gameDays}
                  isNextFixtureList={isNextFixtureList}
                />
              }
            />
          ))}
        </Grid>
      </>
    );
  };

  return (
    <Container>
      {renderGamesList(upcomingGamesGroupedByMonth, 'Upcoming Fixtures')}
    </Container>
  );
};

{
  /*  {renderGamesList(previousGamesGroupedByMonth, "Previous Fixtures")} */
}

{
  /* {nextFixture && renderGamesList({ [nextFixture.date.toLocaleDateString(undefined, { month: "long" })]: [nextFixture] }, "Next Fixture", true)} */
}
{
  /*  {gameDays.map(({ date, games }, index) => (
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
                          month: "long",
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
              ))} */
}
