const findBestImage = (imageObj) => {
    if (
      !imageObj ||
      !imageObj.attributes ||
      !imageObj.attributes.imageId ||
      !imageObj.attributes.imageId.data ||
      !imageObj.attributes.imageId.data.attributes
    ) {
      return {};
    }
  
    const {
      url,
      width,
      height,
      AgeGroup,
      AssetType,
      markerPosition,
    } = imageObj.attributes.imageId.data.attributes;
  
    const ratio = width / height;
  
    let aspectRatio = "square";
    if (ratio > 1) {
      aspectRatio = "landscape";
    } else if (ratio < 1) {
      aspectRatio = "portrait";
    }
  
    return {
      url,
      width,
      height,
      ratio: aspectRatio,
      AgeGroup: imageObj.attributes.AgeGroup,
      AssetType: imageObj.attributes.AssetType,
      markerPosition: imageObj.attributes.markerPosition,
    };
  };
  
  /**
   * Finds a random best image from a gallery array based on the given CompositionID.
   *
   * @param {Array} galleryArray - The array of images to choose from.
   * @param {string} CompositionID - The ID of the composition.
   * @return {Object|null} The randomly selected image object or null if no images are available.
   */
  const findHeroImageForAsset = (galleryArray, CompositionID) => {
    const AssetCategory = {
      UpComingFixtures: "UpComing Fixtures",
      WeekendResults: "Weekend Results",
      Top5BattingList: "Top 5 Run Scorers",
      Top5BowlingList: "Top 5 Bowlers",
      Top5: "Top 5",
      Ladder: "League Tables",
      RosterPoster: "Team List",
    };
  
    const compositionIDToAssetType = {
      UpComingFixtures: AssetCategory.UpComingFixtures,
      UpComingAFLFixtures: AssetCategory.UpComingFixtures,
      UpComingNetBallFixtures: AssetCategory.UpComingFixtures,
      WeekendResults: AssetCategory.WeekendResults,
      WeekendResultsAFL: AssetCategory.WeekendResults,
      WeekendResultsNetball: AssetCategory.WeekendResults,
      WeekendSingleGameResult: AssetCategory.WeekendResults,
      WeekendSingleGameResultAFL: AssetCategory.WeekendResults,
      WeekendSingleGameResultNetball: AssetCategory.WeekendResults,
      Top5BattingList: AssetCategory.Top5BattingList,
      Top5BowlingList: AssetCategory.Top5BowlingList,
      Top5AFLScorers: AssetCategory.Top5,
      Top5NetballScorers: AssetCategory.Top5,
      Ladder: AssetCategory.Ladder,
      AFLLadder: AssetCategory.Ladder,
      NetballLadder: AssetCategory.Ladder,
      RosterPoster: AssetCategory.RosterPoster,
    };
  
    const assetTypeForComposition =
      compositionIDToAssetType[CompositionID] || "ALL";
  
    // Filter by AssetType
    let filteredByAssetType = [];
    if (assetTypeForComposition !== "ALL") {
      filteredByAssetType = galleryArray.filter(
        (item) =>
          item?.attributes?.AssetType === assetTypeForComposition ||
          item?.attributes?.AssetType === "ALL"
      );
    }
  
    if (filteredByAssetType.length === 0) {
      filteredByAssetType = galleryArray; // Use any image if no specific asset type is found
    }
  
    // Find the best image for each item in the filtered array
    const bestImages = filteredByAssetType
      .map((item) => findBestImage(item))
      .filter((item) => Object.keys(item).length !== 0); // Filter out empty objects
  
    if (bestImages.length === 0) {
      const anyImage = galleryArray
        .map((item) => findBestImage(item))
        .filter((item) => Object.keys(item).length !== 0);
      if (anyImage.length === 0) return null; // In case there are no images at all
      return anyImage[Math.floor(Math.random() * anyImage.length)];
    }
  
    // Randomly select an image object from the list of best images
    const randomIndex = Math.floor(Math.random() * bestImages.length);
   
    return bestImages[randomIndex];
  };
  
  export default findHeroImageForAsset;
  