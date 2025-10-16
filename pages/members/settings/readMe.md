# Folder Overview

Handles member settings pages for account configuration and customization.

## Files

- `index.js`: Main settings dashboard displaying all available settings as cards
- `account/index.js`: View and manage account settings and information
- `change-day-bundle-arrives/index.js`: Page for selecting bundle delivery day
- `how-to-group-your-bundles/index.js`: Configure asset bundling preferences
- `change-brand-logo/index.js`: Update organization logo
- `change-brand-colors/index.js`: Customize brand primary and secondary colors

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: `Hooks/useAccountSettings.js`, `components/Members/Common`
- Consumed by: Member navigation, settings cards redirect to individual pages

## Dependencies

- Internal: `Hooks`, `components/Members`, `components/Layouts`
- External: Mantine UI components, Tabler icons, Strapi API
