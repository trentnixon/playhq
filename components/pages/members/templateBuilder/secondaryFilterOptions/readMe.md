# Secondary Filter Options Folder Overview

This folder contains advanced visual effect components that provide secondary customization options for templates. These components are conditionally rendered based on the selected background type and offer granular control over visual effects like gradients, patterns, particles, and user media.

## Files

- `secondaryFilterOptions.tsx`: Main orchestrator component that conditionally renders secondary filter components based on the selected background option
- `DisplayGradientOptions.js`: Gradient style selector that fetches and displays available gradient configurations from the API
- `DisplayGraphicsOptions.js`: Graphics/noise effects selector for adding texture and visual noise to backgrounds
- `DisplayImageOptions.js`: Image overlay options selector for configuring animation types, directions, overlay styles, and opacity
- `DisplayParticlesOptions.js`: Particle effects selector for adding animated particle systems (snow, confetti, etc.) with customizable properties
- `DisplayPatternOptions.js`: Pattern selector for adding geometric patterns with animation, scale, rotation, and opacity controls
- `DisplayUserGalleryOptions.js`: User media gallery selector that displays uploaded images from the user's account media library

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: None (pure UI components)
- Consumed by: Main template builder container (`TemplateBuilderFilterContainer.js`)

## Dependencies

- Internal:
  - `../../../../Members/Common/utils/Selects`: Custom select component (`FixturaCustomSelect`)
  - `../../../../../Hooks/useCustomizer`: Custom hooks for fetching various template options
  - `../../../../../context/userContext`: User account context for accessing media gallery
- External:
  - React hooks (`useEffect`, `useMemo`)
  - Standard JavaScript array methods for data transformation
