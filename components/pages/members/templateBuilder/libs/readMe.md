# Libs Folder Overview

This folder contains utility functions and data processing logic for the template builder. These functions handle data transformation, extraction, and mutation operations required for the template customization system.

## Files

- `extractDesignOptions.js`: Extracts and normalizes design options from template data structures, providing default values and data transformation utilities
- `formatSponsors.js`: Transforms sponsor data from Strapi CMS format to the structure expected by template compositions and test datasets
- `mutateDataSet.js`: Applies user design choices and account settings to template datasets, creating customized data for video generation

## Relations

- Parent folder: [../readMe.md](../readMe.md)
- Key dependencies: None (pure utility functions)
- Consumed by: Template builder components and video generation system

## Dependencies

- Internal: None
- External:
  - JSON parsing/stringifying for deep cloning
  - Console logging for debugging
  - Standard JavaScript array methods and object manipulation
