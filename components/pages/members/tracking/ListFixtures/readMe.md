# Folder Overview

This folder contains components for displaying fixture listings organized by month and date.

## Files

- `ListFixtures.js`: main component that organizes and displays fixtures with three view options (upcoming list, previous list, calendar grid)
- `FilterBar.js`: reusable filter component with search and date range inputs, manages filter state
- `FixturesTable.js`: renders fixture data in table format with home/away teams, grade, and View CTA button
- `ListMonth.js`: displays month header for grouped fixtures
- `FixtureDetailModal.js`: modal component that displays detailed fixture information with scores and results

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: `Members/Common` components, `UI/Containers`
- Consumed by: Season Tracking page via parent tracking components

## Dependencies

### Internal

- `components/Members/Common/Type` - typography components (P, SectionHeaders)
- `components/UI/Containers/SectionContainer` - RoundedSectionContainer wrapper

### External

- `@mantine/core` - Table, Container, Grid, Tabs, Badge, Group, TextInput, Button, Paper components
- `@mantine/dates` - DatePickerInput for date range filtering
- `@tabler/icons-react` - IconCalendarEvent, IconHistory, IconCalendar, IconClock, IconSearch, IconX, IconEye for visual indicators
- `../GamesCalendar` - calendar grid view component

## Component Flow

1. `ListFixtures.js` receives raw game data (object with date keys)
2. Converts date strings to Date objects and sorts chronologically
3. **Filtering**: Applies search (team name or grade) and date range filters to game data
4. Filters into upcoming vs previous games based on current date
5. Groups fixtures by month using `groupByMonth` helper
6. **Filter UI**: Displays search input, date range picker, and clear button above tabs
7. Shows filtered results count when filters are active
8. Renders tabbed interface with three view options: "Upcoming Fixtures", "Previous Fixtures", and "Calendar View"
9. List views (upcoming/previous) render fixtures using `ListMonth` header and `FixtureTable` for games
10. Calendar view uses `GamesCalendar` component to display fixtures in responsive grid format
11. Previous fixtures styled with reduced opacity and gray color for visual differentiation
12. All fixtures on the next upcoming date automatically highlighted with blue background, left border, bold text, and "Next Game" badge (uses date comparison to handle multiple games on same day)
13. **View Fixture CTA**: Each row has a "View" button with eye icon that opens the fixture detail modal
14. **Fixture Detail Modal**: Shows team matchup with scores (if available), match result, date, grade, round, status badge, and Next Game indicator in centered modal

## Data Structure

Expected input format:

```javascript
{
  "Saturday, 04 October 2025": [
    {
      teamHome: "Strathmore Heights (Kyte)",
      teamAway: "Lalor Warriors (Kyte)",
      grade: "1.2 Vic Kyte Shield",
      round: "Round 1",
      status: "Final",
      hasScorecard: true,
      scores: {
        home: "10/215",
        homeOvers: "(39.2)",
        homeFirstInnings: "1",
        away: "5/236",
        awayOvers: "(40)",
        awayFirstInnings: "1"
      },
      result: "Lalor Warriors (Kyte) won by 5 wickets"
    }
  ],
  "Saturday, 11 October 2025": [...]
}
```

**Note:** The API endpoint (`/account/createTracking/${ID}`) returns comprehensive fixture data including team names, grade, round, status, scores (when available), and match results.
