# Folder Overview

This folder contains components for displaying team information and statistics for club accounts.

## Files

- `Teams.js`: wrapper component that receives organization details and renders team list
- `ListTeams.js`: displays individual team cards with statistics (wins, losses, form, games played)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: `Members/Common` components, `UI/Containers`
- Consumed by: Season Tracking page when account type is Club

## Dependencies

### Internal

- `components/Members/Common/Type` - typography component (P)
- `components/UI/Containers/SectionContainer` - RoundedSectionContainer wrapper

### External

- `@mantine/core` - Badge, Group, Stack components for layout
- `@mantine/styles` - useMantineTheme for styling

## Component Flow

1. `Teams.js` receives organizationDetails prop from parent
2. Extracts team data from `organizationDetails.data.attributes.teams.data`
3. Passes teams array to `ListTeams` component
4. `ListTeams` maps over teams and displays each with:
   - Team name
   - Form badge
   - Games played, wins, losses statistics

## Data Structure

Expected team object:

```javascript
{
  id: number,
  attributes: {
    teamName: string,
    form: string,
    gamesPlayed: number,
    wins: number,
    losses: number
  }
}
```
