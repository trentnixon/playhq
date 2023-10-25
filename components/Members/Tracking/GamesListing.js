import React from "react";
import {
  Card,
  Container,
  Grid,
  Group,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { P } from "../Common/Type";
import { IconCalendar, IconCricket } from "@tabler/icons-react";

const groupByMonth = (sortedGamesData) => {
  return sortedGamesData.reduce((acc, gameDay) => {
    const month = gameDay.date.toLocaleDateString(undefined, { month: "long" });
    acc[month] = acc[month] ? [...acc[month], gameDay] : [gameDay];
    return acc;
  }, {});
};

const getCardStyles = (theme, date, today, sortedGamesData, index) => {
  let styles = {
    opacity: 1,
    display: "block",
    backgroundColor: theme.colors.white,
  };

  if (date < today) {
    styles.opacity = 0.5;
    styles.display = "none";
    styles.backgroundColor = theme.colors.gray[0];
  } else if (
    date > today &&
    (!sortedGamesData[index - 1] || sortedGamesData[index - 1].date < today)
  ) {
    //styles.backgroundColor = theme.colors.green[1];
  }

  return styles;
};

const Game = ({ game }) => (
  <P marginBottom={"12px"} size={"sm"}>
    {`${game.teamHome} vs ${game.teamAway}`}
  </P>
);

export const GamesListing = ({ gamesData }) => {
  const theme = useMantineTheme();
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds

  const getOrdinalSuffix = (day) => {
    if (day % 10 === 1 && day !== 11) return `${day}st`;
    if (day % 10 === 2 && day !== 12) return `${day}nd`;
    if (day % 10 === 3 && day !== 13) return `${day}rd`;
    return `${day}th`;
  };

  const sortedGamesData = Object.entries(gamesData)
    .map(([date, games]) => ({
      date: new Date(date),
      games,
    }))
    .sort((a, b) => a.date - b.date)
    .filter(({ date }) => date >= today); // Filtering out past games

  const gamesGroupedByMonth = groupByMonth(sortedGamesData);

  return (
    <Container>
      <P marginBottom={14} size={24} Weight={900}>
        Fixtures
      </P>
      <Grid grow gutter={5}>
        {Object.entries(gamesGroupedByMonth).map(([month, gameDays]) => {
          // If the last day of the month is in the past, do not render the month and its games
          const lastDayOfGameDays = gameDays[gameDays.length - 1].date;
          if (lastDayOfGameDays < today) return null;

          return (
            <React.Fragment key={month}>
              <Group>
                <P marginBottom={0} size={30} Weight={900}>
                  {month}
                </P>
                <IconCalendar size={"1.8em"} color="gray" />
              </Group>

              {gameDays.map(({ date, games }, index) => (
                <Grid.Col sm={12} key={index} className="game-day">
                  <Group position="apart">
                    <P marginBottom={0} Weight={400} size={25}>
                      {getOrdinalSuffix(date.getDate())}
                    </P>
                    <P marginBottom={0} size={"xs"}>
                      {date.toLocaleDateString(undefined, { month: "long" })}
                    </P>
                  </Group>
                  <Card
                    shadow="sm"
                    padding="lg"
                    mb={50}
                    p={`xs`}
                    radius={`xs`}
                    style={getCardStyles(
                      theme,
                      date,
                      today,
                      sortedGamesData,
                      index
                    )}
                  >
                    <Stack align="left" spacing={0}>
                      {games.map((game, gameIndex) => (
                        <Game key={gameIndex} game={game} />
                      ))}
                    </Stack>
                  </Card>
                </Grid.Col>
              ))}
            </React.Fragment>
          );
        })}
      </Grid>
    </Container>
  );
};
