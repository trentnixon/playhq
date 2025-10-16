# Folder Overview

This folder contains components for displaying club information and nested team lists for association accounts.

## Files

- `Clubs.js`: main component that receives organization details and renders club list with nested teams
- `ClubName.js`: displays club name header
- `ClubTeamList.js`: displays list of teams belonging to a specific club

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: `Members/Common` components, `UI/Containers`
- Consumed by: Season Tracking page when account type is Association

## Dependencies

### Internal

- `components/Members/Common/Type` - typography component (P)
- `components/UI/Containers/SectionContainer` - RoundedSectionContainer wrapper

### External

- None (uses only internal components and standard React)

## Component Flow

1. `Clubs.js` receives organizationDetails prop from parent
2. Extracts club data from `organizationDetails.data.attributes.clubs.data`
3. Maps over clubs array
4. For each club, renders:
   - RoundedSectionContainer wrapper
   - `ClubName` component in topContent
   - `ClubTeamList` component in bottomContent
5. `ClubTeamList` displays all teams nested under the club

## Data Structure

Expected club object:

```javascript
{
  id: number,
  attributes: {
    Name: string,
    teams: {
      data: [
        {
          id: number,
          attributes: {
            teamName: string
          }
        }
      ]
    }
  }
}
```

## Notes

This component set is specifically for Association-level accounts that manage multiple clubs, each containing multiple teams. Club accounts use the `ListTeams` components instead.
