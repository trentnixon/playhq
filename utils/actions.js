var tinycolor = require("tinycolor2");

export function findBestImage(imageId, sizeOption) {
    const sizePriority = {
        small: ["thumbnail", "small", "medium", "large"],
        med: ["medium", "small", "large", "thumbnail"],
        large: ["large", "medium", "small", "thumbnail"],
      };
      
  // Navigate to the formats object
  const imageFormats = imageId?.data?.attributes?.formats;

  // Check if formats object and size option are valid
  if (!imageFormats || !sizePriority.hasOwnProperty(sizeOption)) {
    return null;
  }

  // Loop through the sizePriority to find the closest match
  for (let i = 0; i < sizePriority[sizeOption].length; i++) {
    const formatOption = sizePriority[sizeOption][i];
    if (imageFormats.hasOwnProperty(formatOption)) {
      return imageFormats[formatOption].url;
    }
  }

  return null;
}




/* Color functions, move to Actions/Utils */
export function getContrastColor(hexColor,COLORS={white:'#ffffff',dark:'#111111'}) {
    const bgColorObj = tinycolor(hexColor);
    return bgColorObj.isDark() ? COLORS.white : COLORS.dark;
  }

  export const lightenColor = (color) => {
    const darkColor = tinycolor(color).lighten(10); // darken the color by 10%
    return darkColor.toHexString(); // return the color as a hex string
  };

  export const darkenColor = (color) => {
    const darkColor = tinycolor(color).darken(10); // darken the color by 10%
    return darkColor.toHexString(); // return the color as a hex string
  };

  export const setOpacity = (color, opacity) => {
    const colorWithOpacity = tinycolor(color).setAlpha(opacity);
    return colorWithOpacity.toRgbString(); // return the color as an rgba string
  };