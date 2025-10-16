import { useState } from 'react';
import { Container, Grid, Tabs } from '@mantine/core';
import {
  IconCalendarEvent,
  IconHistory,
  IconCalendar,
  IconUsersGroup,
} from '@tabler/icons-react';
import { P, SectionHeaders } from '../../../../Members/Common/Type';
import { ListMonth } from './ListMonth';
import { FixtureTable } from './FixturesTable';
import { RoundedSectionContainer } from '../../../../UI/Containers/SectionContainer';
import { GamesCalendar } from '../GamesCalendar';
import { ClubList } from '@/components/pages/members/tracking/ListClubs/Clubs';
import { TeamList } from '@/components/pages/members/tracking/ListTeams/Teams';
import { FilterBar } from './FilterBar';

// Helper to group games by month
const groupByMonth = gamesData => {
  return gamesData.reduce((acc, gameDay) => {
    const month = gameDay.date.toLocaleDateString(undefined, { month: 'long' });
    acc[month] = acc[month] ? [...acc[month], gameDay] : [gameDay];
    return acc;
  }, {});
};

// Row component for table

export const GamesListing = props => {
  const { accountType, organizationDetails, gamesData } = props;

  const [filters, setFilters] = useState({
    searchTerm: '',
    dateRange: [null, null],
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Convert and sort gamesData
  const gamesWithDateObjects = Object.entries(gamesData)
    .map(([date, games]) => ({
      date: new Date(date),
      games,
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  // Filter games based on search and date range
  const { searchTerm, dateRange } = filters;

  const filteredGames = gamesWithDateObjects
    .map(({ date, games }) => ({
      date,
      games: games.filter(game => {
        // Search filter (team names and grade)
        const matchesSearch =
          !searchTerm ||
          game.teamHome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.teamAway?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.grade?.toLowerCase().includes(searchTerm.toLowerCase());

        // Date range filter
        const [startDate, endDate] = dateRange;
        let matchesDateRange = true;

        if (startDate) {
          const start = new Date(startDate);
          start.setHours(0, 0, 0, 0);
          matchesDateRange = matchesDateRange && date >= start;
        }

        if (endDate) {
          const end = new Date(endDate);
          end.setHours(23, 59, 59, 999);
          matchesDateRange = matchesDateRange && date <= end;
        }

        return matchesSearch && matchesDateRange;
      }),
    }))
    .filter(({ games }) => games.length > 0);

  // Split filtered games into upcoming and previous
  const upcomingGames = filteredGames.filter(({ date }) => date >= today);
  const upcomingGamesGroupedByMonth = groupByMonth(upcomingGames);

  const previousGames = filteredGames.filter(({ date }) => date < today);
  const previousGamesGroupedByMonth = groupByMonth(previousGames);

  // Find the next fixture date (first upcoming date with games)
  const nextFixtureDate =
    upcomingGames.length > 0 ? upcomingGames[0].date : null;

  // Count filtered results
  const totalFilteredGames = filteredGames.reduce(
    (sum, { games }) => sum + games.length,
    0
  );

  // Render function for games list
  const renderGamesList = (
    gamesGroupedByMonth,
    title,
    isNextFixtureList = false,
    isPreviousFixtures = false
  ) => {
    const entries = Object.entries(gamesGroupedByMonth);
    if (entries.length === 0) {
      return (
        <P textAlign='center' color={8}>
          {`There are currently no ${title.toLowerCase()}.`}
        </P>
      );
    }

    return (
      <>
        <Grid grow gutter={5}>
          {entries.map(([month, gameDays], monthIndex) => (
            <RoundedSectionContainer
              key={month}
              headerContent={''}
              topContent={
                <ListMonth month={month} isPrevious={isPreviousFixtures} />
              }
              bottomContent={
                <FixtureTable
                  gameDays={gameDays}
                  isNextFixtureList={isNextFixtureList}
                  monthIndex={monthIndex}
                  isPreviousFixtures={isPreviousFixtures}
                  nextFixtureDate={nextFixtureDate}
                />
              }
              className=''
            />
          ))}
        </Grid>
      </>
    );
  };

  // Convert filtered games to calendar format
  const filteredGamesForCalendar = filteredGames.reduce(
    (acc, { date, games }) => {
      const dateKey = date.toISOString().split('T')[0];
      acc[dateKey] = games;
      return acc;
    },
    {}
  );

  return (
    <Container mt='xl'>
      {/* Tabs Section */}
      <Tabs defaultValue='upcoming' variant='pills' color='blue'>
        <Tabs.List position='left' mb='0'>
          <Tabs.Tab value='upcoming' icon={<IconCalendarEvent size='1rem' />}>
            Upcoming Fixtures
          </Tabs.Tab>
          <Tabs.Tab value='previous' icon={<IconHistory size='1rem' />}>
            Previous Fixtures
          </Tabs.Tab>
          <Tabs.Tab value='calendar' icon={<IconCalendar size='1rem' />}>
            Calendar View
          </Tabs.Tab>
          <Tabs.Tab value='clubs' icon={<IconUsersGroup size='1.2rem' />}>
            {accountType === 'Association' ? 'View Clubs' : 'View Teams'}
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='upcoming' pt='xs'>
          {/* Filter Section */}
          <FilterBar
            onFilterChange={setFilters}
            totalFilteredGames={totalFilteredGames}
          />

          {renderGamesList(
            upcomingGamesGroupedByMonth,
            'Upcoming Fixtures',
            true
          )}
        </Tabs.Panel>

        <Tabs.Panel value='previous' pt='xs'>
          {/* Filter Section */}
          <FilterBar
            onFilterChange={setFilters}
            totalFilteredGames={totalFilteredGames}
          />

          {renderGamesList(
            previousGamesGroupedByMonth,
            'Previous Fixtures',
            false,
            true
          )}
        </Tabs.Panel>

        <Tabs.Panel value='calendar' pt='xs'>
          <GamesCalendar gamesData={filteredGamesForCalendar} />
        </Tabs.Panel>
        <Tabs.Panel value='clubs' pt='xs'>
          {accountType === 'Association' ? (
            <ClubList {...props} />
          ) : (
            <TeamList {...props} />
          )}
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};
