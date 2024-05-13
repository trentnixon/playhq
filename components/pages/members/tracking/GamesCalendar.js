// PACK
import {
  Badge,
  Grid,

  Paper,
  Stack,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconScoreboard } from "@tabler/icons-react";
import { P } from "../../../Members/Common/Type";
// Components


export const GamesCalendar = ({ gamesData }) => {
  const theme = useMantineTheme();
  // convert to date objects and sort
  const sortedGamesData = Object.entries(gamesData)
    .map(([date, games]) => ({
      date: new Date(date),
      games,
    }))
    .sort((a, b) => a.date - b.date);

  const today = new Date();

  return (
    <Grid grow gutter={5}>
      {sortedGamesData.map(({ date, games }, index) => {
        // determine background color
        let bgColor, opacity;
        if (date < today) {
          bgColor = theme.colors.gray[0];
          opacity = 0.5;
        } else if (
          date > today &&
          (!sortedGamesData[index - 1] ||
            sortedGamesData[index - 1].date < today)
        ) {
          bgColor = theme.colors.blue[7];
          opacity = 1;
        } else {
          bgColor = theme.colors.gray[4];
          opacity = 1;
        }

        return (
          <Grid.Col sm={6} md={4} lg={3} key={index} className="game-day">
            <Paper
              p={`xs`}
              radius={`sm`}
              shadow="md"
              style={{
                backgroundColor: bgColor,
                opacity: opacity,
                border: `1px solid ${theme.colors.gray[2]}`,
                position: "relative",
              }}
            >
              <Stack align="center" spacing={0}>
                <P
                  marginBottom={0}
                  size={"xs"}
                  Copy={date.toLocaleDateString(undefined, { month: "long" })}
                />
                <P
                  marginBottom={0}
                  Weight={900}
                  size={"xl"}
                  Copy={date.toLocaleDateString(undefined, { day: "numeric" })}
                />
                <Badge
                  pl={0}
                  mt={10}
                  size="sm"
                  color="gray.5"
                  radius="sm"
                  leftSection={
                    <Tooltip
                      label={games.map((game, gameIndex) => (
                        <div key={gameIndex} className="game">
                          <P
                            marginBottom={"7px"}
                            size={"xs"}
                            Copy={`${game.teamHome} vs ${game.teamAway}`}
                          />
                        </div>
                      ))}
                      color={theme.colors.gray[3]}
                      position="bottom-start"
                      withArrow
                    >
                      <IconScoreboard
                        size="1.1rem"
                        color={theme.colors.gray[5]}
                      />
                    </Tooltip>
                  }
                >
                  {`${games.length} Fixtures`}
                </Badge>
              </Stack>
            </Paper>
          </Grid.Col>
        );
      })}
    </Grid>
  );
};