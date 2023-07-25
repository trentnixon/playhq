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
  PageCopyWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { showNotification } from "@mantine/notifications";

import { useAccountDetails } from "../../lib/userContext";
import { FixturaDivider } from "../../components/Members/Common/Divider";

import { P, PageTitle } from "../../components/Members/Common/Type";
import SetupCheck from "../../components/Members/Account/HOC/SetupCheck";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";

const Tracking = ({ DATA }) => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  /* is User Auth */
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;

  console.log("DATA", DATA);
  const nextDateData = getNextDate(DATA);
  console.log(nextDateData);
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
  // then in the component

  return (
    <MembersWrapper>
      <SetupCheck>
        <LoadingStateWrapper conditions={[user, userAccount, DATA]}>
          <PageTitle Copy={`Tracking`} ICON={<IconTrack size={40} />} />
          <PageCopyWrapper>
            <P
              Copy={`Get an overview of the fixtures Fixtura is tracking for your club or association. Simply hover over the icons to see the games scheduled for each date. Rest assured that Fixtura regularly checks and updates your fixtures, so you don't need to worry about any changes to your playing schedule. Stay organized and informed with Fixtura's reliable tracking feature.`}
            />
          </PageCopyWrapper>
          <NextGameDate gamesData={DATA} />

          <P Copy={`Full Calendar`} />
          <GamesCalendar gamesData={DATA} />
          <FixturaDivider />
        </LoadingStateWrapper>
      </SetupCheck>
    </MembersWrapper>
  );
};

export default Tracking;

Tracking.getInitialProps = async (ctx) => {
  const ID = await getIdFromLocalCookie();

  if (ID === undefined) {
    return { DATA: false };
  }

  const res = await Adminfetcher(`/account/createTracking/${ID}`);
  let DATA = res;

  return { DATA };
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
    if (day > 3 && day < 21) daySuffix = "th";
    else
      switch (day % 10) {
        case 1:
          daySuffix = "st";
          break;
        case 2:
          daySuffix = "nd";
          break;
        case 3:
          daySuffix = "rd";
          break;
        default:
          daySuffix = "th";
          break;
      }

    // Get the month
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = monthNames[closestDate.getMonth()];

    formattedDate = `${day}${daySuffix} ${monthName}`;
  }

  return { date: formattedDate, obj: closestObj };
}

const NextGameDate = ({ gamesData }) => {
  const nextGame = getNextDate(gamesData);
  console.log(nextGame);
  return (
    <Group position="apart">
      <P Copy={`Upcoming Fixture: ${nextGame?.date}`} />
      <P Copy={`Games Listed ${nextGame?.obj.length}`} />
    </Group>
  );
};
