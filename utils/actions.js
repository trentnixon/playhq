
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