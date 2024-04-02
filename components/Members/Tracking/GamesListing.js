import React from "react";
import { Card, Container, Grid, Group, Stack, useMantineTheme, Table } from "@mantine/core";
import { P } from "../Common/Type";
import { IconCalendar, IconCricket } from "@tabler/icons-react";

// Helper to group games by month
const groupByMonth = (gamesData) => {
  return gamesData.reduce((acc, gameDay) => {
    const month = gameDay.date.toLocaleDateString(undefined, { month: "long" });
    acc[month] = acc[month] ? [...acc[month], gameDay] : [gameDay];
    return acc;
  }, {});
};

// Row component for table
const Row = ({ game, month, date, isNextFixture }) => (
  <tr style={{ backgroundColor: isNextFixture ? "#f0f0f0" : "transparent" }}>
    <td>
      {date} {month}
    </td>
    <td>{game.teamHome}</td>
    <td>vs</td>
    <td>{game.teamAway}</td>
  </tr>
);

export const GamesListing = ({ gamesData }) => {
  const theme = useMantineTheme();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Function to get ordinal suffix for dates
  const getOrdinalSuffix = (day) => {
    if (day % 10 === 1 && day !== 11) return `${day}st`;
    if (day % 10 === 2 && day !== 12) return `${day}nd`;
    if (day % 10 === 3 && day !== 13) return `${day}rd`;
    return `${day}th`;
  };

  // Convert and sort gamesData
  const gamesWithDateObjects = Object.entries(gamesData).map(([date, games]) => ({
    date: new Date(date),
    games,
  })).sort((a, b) => a.date - b.date);

  // Split into upcoming and previous games
  const upcomingGames = gamesWithDateObjects.filter(({ date }) => date >= today);
  const previousGames = gamesWithDateObjects.filter(({ date }) => date < today);

  // Group games by month
  const upcomingGamesGroupedByMonth = groupByMonth(upcomingGames);
  const previousGamesGroupedByMonth = groupByMonth(previousGames);

  // Find the next fixture
  const nextFixture = upcomingGames[0];

  // Render function for games list
  const renderGamesList = (gamesGroupedByMonth, title, isNextFixtureList = false) => {
    const entries = Object.entries(gamesGroupedByMonth);
    if (entries.length === 0) {
      return <P>{`There are currently no ${title.toLowerCase()}.`}</P>;
    }

    return (
      <>
        <P marginBottom={14} size={24} weight={900}>
          {title}
        </P>
        <Grid grow gutter={5}>
          {entries.map(([month, gameDays], monthIndex) => (
            <React.Fragment key={month}>
              <Group mt={20} position="right" w={"100%"}>
                <P marginBottom={0} size={30} weight={900}>
                  {month}
                </P>
                <IconCalendar size={"1.8em"} color="gray" />
              </Group>

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
                        month={date.toLocaleDateString(undefined, { month: "long" })}
                        date={getOrdinalSuffix(date.getDate())}
                        isNextFixture={isNextFixtureList && monthIndex === 0 && index === 0 && gameIndex === 0}
                      />
                    ))}
                  </tbody>
                </Table>
              ))}
            </React.Fragment>
          ))}
        </Grid>
      </>
    );
  };

  return (
    <Container>
      {nextFixture && (
        <P marginBottom={14} size={24} weight={900}>
          Next Fixture
        </P>
      )}
      {nextFixture && renderGamesList({ [nextFixture.date.toLocaleDateString(undefined, { month: "long" })]: [nextFixture] }, "Next Fixture", true)}
      {renderGamesList(upcomingGamesGroupedByMonth, "Upcoming Fixtures")}
      {renderGamesList(previousGamesGroupedByMonth, "Previous Fixtures")}
    </Container>
  );
};
