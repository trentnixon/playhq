# Template Builder Folder Overview

This folder contains the core template builder functionality for the Fixtura platform. It provides a comprehensive UI for users to customize their sports club assets with various design options including templates, branding, backgrounds, and visual effects.

## Files

- `TemplateBuilderFilterContainer.js`: Main container component that orchestrates the template builder UI with three main sections (Designs, Branding, Backgrounds)
- `TemplateBuilderFilters.js`: Legacy filter component (appears to be unused in current implementation)
- `builderFrame.js`: Wrapper component that displays the example gallery preview
- `ExampleGallery.js`: Simple wrapper that renders the ImageRow component for preview
- `ImageRow.js`: Component responsible for displaying template previews
- `ExamplePlayerDialog.js`: Dialog component for previewing templates (likely modal functionality)
- `SaveDesignOptionsButton.js`: Button component that saves user's design choices to their account

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies:
  - `libs/`: Utility functions for data extraction and formatting
  - `primaryFilters/`: Core design option selectors (templates, palettes, modes, backgrounds)
  - `secondaryFilterOptions/`: Advanced visual effect options (gradients, patterns, particles, etc.)
- Consumed by: Main template builder page (`pages/members/templateBuilder/index.js`)

## Dependencies

- Internal:
  - `libs/`: Data processing utilities
  - `primaryFilters/`: Primary design controls
  - `secondaryFilterOptions/`: Secondary visual effects
  - `../../../UI/Containers/SectionContainer`: UI container components
  - `../../../Members/Common/Type`: Typography components
- External:
  - `@mantine/core`: UI components (ActionIcon, Modal, Text, Button, Container)
  - `@tabler/icons-react`: Icon components
  - React hooks (useState, useEffect)
  - PropTypes for type checking
