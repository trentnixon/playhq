# Primary Filters Folder Overview

This folder contains the core design option selectors that form the primary customization interface for the template builder. These components handle the main design decisions including template selection, color palettes, display modes, and background types.

## Files

- `DisplayTemplateOptions.js`: Template category selector that allows users to browse and select from available template designs
- `DisplayTemplatePalettes.js`: Color palette selector that fetches and displays brand-based color options from the API
- `DisplayModes.js`: Display mode selector for choosing between light/dark themes and their alternative variations
- `DisplayBackgroundOptions.js`: Background type selector for choosing between solid colors, images, graphics, gradients, patterns, and particles
- `DisplayAssetTypeSelector.js`: Asset type selector specifically for cricket-related content types (results, fixtures, ladder, etc.)

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: None (pure UI components)
- Consumed by: Main template builder container (`TemplateBuilderFilterContainer.js`)

## Dependencies

- Internal:
  - `../../../../Members/Common/utils/Selects`: Custom select component (`FixturaCustomSelect`)
  - `../../../../../Hooks/useCustomizer`: Custom hook for fetching template palettes
- External:
  - React hooks (`useEffect`)
  - Standard JavaScript array methods for data transformation
