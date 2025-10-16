# Folder Overview

This folder contains all components related to the Season Tracking feature, which displays fixtures, teams, and clubs being monitored by Fixtura for a user's sports organization.

## Files

- `GamesCalendar.js`: calendar view component showing fixtures by date with visual indicators for past/upcoming games
- `NextGameDate.js`: utility component to display the next upcoming fixture date and game count

## Subfolders

- `ListFixtures/`: components for displaying fixture listings organized by month
- `ListTeams/`: components for displaying team information (clubs view)
- `ListClubs/`: components for displaying club and nested team information (associations view)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Page route: `/pages/members/tracking.js`
- Key dependencies: `Members/Common` components, `UI/Containers`, Mantine UI library
- Consumed by: Season Tracking page (`pages/members/tracking.js`)

## Dependencies

### Internal

- `components/Members/Common/Type` - typography components (P, SectionHeaders, PageTitle)
- `components/Members/Common/Containers` - wrapper components (MembersWrapper, PageCopyWrapper, ShadowWrapper)
- `components/UI/Containers/SectionContainer` - RoundedSectionContainer component
- `lib/Adminfetcher` - API fetcher for tracking data
- `Hooks/useGetOrganizationDetails` - fetches organization/club/team details

### External

- `@mantine/core` - UI components (Table, Grid, Paper, Badge, Tabs, etc.)
- `@tabler/icons-react` - icons for UI elements
- `next/router` - routing functionality

## Data Flow

1. Page fetches tracking data via `/account/createTracking/${ID}` endpoint
2. Data contains games grouped by date (object with date keys)
3. Each game includes: teamHome, teamAway, grade, round, status, scores (if final), result
4. Organization details fetched separately via `useGetOrganizationDetails` hook
5. Components transform and display data:
   - Games sorted chronologically
   - Grouped by month for fixture view
   - Filtered into upcoming/past fixtures
   - Searchable by team name or grade
   - Teams/clubs displayed with statistics (wins, losses, form, etc.)

## Account Types

The feature adapts display based on account type:

- **Association**: displays clubs with nested team lists
- **Club**: displays individual teams with statistics
