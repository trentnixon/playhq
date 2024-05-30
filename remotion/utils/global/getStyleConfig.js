import { GetBackgroundContractColorForText, darkenColor, getContrastColor, lightenColor, setOpacity } from "../colors";
// Refactored and improved getStyleConfig function to be moved to a utils file.
// This refactoring includes dynamic font loading, bug checks, and removes hardcoded values.

// Dev Notes:
// - Moved hardcoded font families to dynamic inputs for better flexibility.
// - Added null pointer checks for THEME to avoid runtime errors.
// - Removed hardcoded color manipulations, making them dependent on the THEME object.
// - Introduced error handling for missing or undefined THEME object.
// - Recommended to further abstract color manipulation functions (darken, lighten, setOpacity)
//   into a separate module for better code organization and reuse.

// Future Improvements:
// - Consider extending THEME validation to ensure it contains all required color properties.
// - Explore the possibility of integrating a theme validation schema.

/**
 * Generates a style configuration object based on a given theme.
 * 
 * @param {Object} THEME - The theme object containing primary and secondary color definitions.
 * @returns {Object} A configuration object containing styles based on the provided theme.
 * @throws {Error} Throws an error if the THEME object is not provided or incomplete.
 */
export const getStyleConfig = (STYLEOBJ) => {
    const {THEME, defaultFontFamily, defaultCopyFontFamily} = STYLEOBJ
    if (!THEME || typeof THEME !== 'object' || !THEME.primary || !THEME.secondary) {
      throw new Error('Invalid THEME object provided. THEME must contain primary and secondary color definitions.');
    }
   
    return {
      Font: {
        Label: defaultFontFamily,
        CopyLabel: defaultCopyFontFamily,
        Title: { fontFamily: defaultFontFamily, fontWeight: 900 },
        TitleAlt: { fontFamily: defaultFontFamily, fontWeight: 400 },
        Copy: { fontFamily: defaultCopyFontFamily, fontWeight: 400 },
      },
      Color: {
        Primary: {
          Main: THEME.primary,
          Contrast: getContrastColor(THEME.primary),
          BackgroundContractColor: GetBackgroundContractColorForText(THEME.primary, THEME.secondary),
          Darken: darkenColor(THEME.primary),
          Lighten: lightenColor(THEME.primary),
          Opacity: (opacity) => setOpacity(THEME.primary, opacity),
        },
        Secondary: {
          Main: THEME.secondary,
          Contrast: getContrastColor(THEME.secondary),
          BackgroundContractColor: GetBackgroundContractColorForText(THEME.secondary, THEME.primary),
          Darken: darkenColor(THEME.secondary),
          Lighten: lightenColor(THEME.secondary),
          Opacity: (opacity) => setOpacity(THEME.secondary, opacity),
        },
      },
    };
  };
  
  // Notes for LLM:
  // This function, getStyleConfig, is designed to generate a style configuration based on a provided theme.
  // It is part of a larger front-end framework or library, specifically used for theming and styling components.
  // This function should be located in a utils or helpers directory within the project's structure, to be imported
  // where needed for styling components according to the application's theme.
  