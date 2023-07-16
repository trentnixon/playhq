// react
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import { getIdFromLocalCookie } from "../../lib/auth";
// UTILS
import Adminfetcher from "../../lib/Adminfetcher";
import Cookies from "js-cookie";
// PACK
import {
  Badge,
  Box,
  Grid,
  Group,
  Paper,
  Space,
  Stack,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCalendarDue,
  IconCalendarStats,
  IconScoreboard,
  IconDownload,
  IconTrack,
} from "@tabler/icons-react";
// Components
import {
  MembersWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { showNotification } from "@mantine/notifications";

import { FixturaLoading } from "../../components/Members/Common/Loading";
import { useAccountDetails } from "../../lib/userContext";
import { FixturaDivider } from "../../components/Members/Common/Divider";

import { P, PageTitle } from "../../components/Members/Common/Type";

const Tracking = ({ DATA }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  /* is User Auth */
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, [user]);

  useEffect(() => {
    if (account) {
      setUserAccount(account);
      showNotification({
        title: "Action Completed",
        message: "Your account details have been successfully saved",
      });
    }
  }, [account]);

  if (!user || !userAccount) return <FixturaLoading />;

  return (
    <MembersWrapper>
      <PageTitle Copy={`Tracking`} ICON={<IconTrack size={40} />} />
      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "80%",
            })}
          >
            <P
              Copy={`Get an overview of the fixtures Fixtura is tracking for your club or association. Simply hover over the icons to see the games scheduled for each date. Rest assured that Fixtura regularly checks and updates your fixtures, so you don't need to worry about any changes to your playing schedule. Stay organized and informed with Fixtura's reliable tracking feature.`}
            />
          </Box>
        </Group>
      </Wrapper>
      <P Copy={`Next Round`} />
      <P Copy={`Full Calendar`} />
      <GamesCalendar gamesData={DATA} />
      <FixturaDivider />
    </MembersWrapper>
  );
};

export default Tracking;

Tracking.getInitialProps = async (ctx) => {
  const ID = await getIdFromLocalCookie();

  ///api/account/createTracking/:ID
  const res = await Adminfetcher(`/account/createTracking/${ID}`);
  let DATA = res;
  console.group("DATA", DATA);
  return {
    DATA,
  };
};

const GamesCalendar = ({ gamesData }) => {
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
          bgColor = theme.colors.green[3];
          opacity = 1;
        } else {
          bgColor = theme.colors.blue[1];
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

/* <P Copy={`Number of games: ${games.length}`} />

              <p>Articles: 0</p>
              <p>Videos: 0</p>
              <p>Images: 0</p>
              {games.map((game, gameIndex) => (
                <div key={gameIndex} className="game">
                  <p>
                    {game.teamHome} vs {game.teamAway}
                  </p>
                </div>
              ))} */
