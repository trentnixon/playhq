# Folder Overview
Page for customizing the ordering of teams (clubs) or grades (associations) within member settings.

## Files
- `index.js`: Secure settings page that loads organization data, renders the draggable list, and saves ordering changes.
- `API_update-team-grade-order.md`: Backend route specification and payload contract.
- `API_update-team-grade-order-FRONTEND.md`: Frontend integration guide for the update route.

## Relations
- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: `Hooks/useTeamGradeOrdering.js`, `components/pages/members/settings/team-grade-ordering/OrderingList`, `context/userContext`, `lib/actions`
- Consumed by: `/members/settings/team-grade-ordering` route

## Dependencies
- Internal: `Hooks/useTeamGradeOrdering.js`, `components/Members/Common/Type`, `components/pages/members/settings/_components/BackToSettings`, `components/UI/Containers/SectionContainer`, `lib/actions`, `Hooks/useGetOrganizationDetails`
- External: Mantine UI, Tabler icons, Strapi API via `Adminfetcher`

