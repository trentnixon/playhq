/**
 * Mutates a dataset with design options and account settings
 * @param {Object} selectedDataset - The base dataset to mutate
 * @param {Object} selectedDesignOptions - User's selected design options
 * @param {Object} userAccountSettings - User's account settings (theme, etc.)
 * @param {Object} AccountTypeDetails - Account type details (club/association info)
 * @param {Object} formattedSponsors - Formatted sponsor data (optional)
 * @returns {Object} Mutated dataset with applied settings
 */
export const mutateDataSet = (
  selectedDataset,
  selectedDesignOptions,
  userAccountSettings,
  AccountTypeDetails,
  formattedSponsors = null
) => {
  // Deep clone the dataset to avoid mutating the original
  const datasetData = JSON.parse(JSON.stringify(selectedDataset));

  console.log('[AccountTypeDetails]', AccountTypeDetails.Name);
  console.log('[datasetData]', datasetData);
  // Adjust for User Account Settings
  datasetData.videoMeta.club.logo = {
    url: AccountTypeDetails.Logo.data.attributes.url,
    width: AccountTypeDetails.Logo.data.attributes.width,
    height: AccountTypeDetails.Logo.data.attributes.height,
  };

  datasetData.videoMeta.club.name = AccountTypeDetails.Name;

  // Apply sponsor data if provided
  if (formattedSponsors) {
    datasetData.videoMeta.club.sponsors = formattedSponsors;

    // Update video metadata to include sponsors
    if (datasetData.videoMeta.video.metadata) {
      datasetData.videoMeta.video.metadata.includeSponsors = true;
    }
  }

  // Apply template variation settings
  // Handle special case for textures - useBackground should be "Texture" not "Textures"
  const useBackgroundValue = selectedDesignOptions.selectedBackgroundOptions;

  datasetData.videoMeta.video.templateVariation.useBackground =
    useBackgroundValue || null;
  datasetData.videoMeta.video.templateVariation.palette =
    selectedDesignOptions.selectedTemplatePalette.value || null;
  datasetData.videoMeta.video.appearance.theme = userAccountSettings.theme;
  datasetData.videoMeta.video.appearance.template =
    selectedDesignOptions?.selectedCategory?.value || 'Basic';
  datasetData.videoMeta.video.templateVariation.mode =
    selectedDesignOptions?.mode?.value || 'light';

  // Apply secondary filter options
  datasetData.videoMeta.video.templateVariation.noise =
    selectedDesignOptions.selectedSecondaryFilterOptions?.noise || null;

  datasetData.videoMeta.video.templateVariation.gradient =
    selectedDesignOptions.selectedSecondaryFilterOptions?.gradient || null;

  datasetData.videoMeta.video.templateVariation.pattern =
    selectedDesignOptions.selectedSecondaryFilterOptions?.pattern || null;

  datasetData.videoMeta.video.templateVariation.particle =
    selectedDesignOptions.selectedSecondaryFilterOptions?.particle || null;

  // Apply texture settings
  if (selectedDesignOptions.selectedSecondaryFilterOptions?.texture) {
    const textureData =
      selectedDesignOptions.selectedSecondaryFilterOptions.texture;
    console.log('[mutateDataSet] Texture data received:', textureData);
    datasetData.videoMeta.video.templateVariation.texture = {
      name: textureData.name || null,
      url: textureData.url || null,
      repeat: 'cover',
      scale: '100%',
      overlay: {
        opacity: textureData.opacity,
        blendMode: textureData.blendMode || 'multiply',
      },
    };
  } else {
    datasetData.videoMeta.video.templateVariation.texture = null;
  }

  // Apply image settings with user media gallery
  datasetData.videoMeta.video.templateVariation.image = {
    url: selectedDesignOptions.user_media_gallery?.url || null,
    width: selectedDesignOptions.user_media_gallery?.width || null,
    height: selectedDesignOptions.user_media_gallery?.height || null,
    ratio: selectedDesignOptions.user_media_gallery?.ratio || null,
    direction:
      selectedDesignOptions.selectedSecondaryFilterOptions?.image?.direction ||
      null,
    gradientType:
      selectedDesignOptions.selectedSecondaryFilterOptions?.image
        ?.gradientType || null,
    id: selectedDesignOptions.selectedSecondaryFilterOptions?.image?.id || null,
    overlayOpacity:
      selectedDesignOptions.selectedSecondaryFilterOptions?.image
        ?.overlayOpacity || null,
    overlayStyle:
      selectedDesignOptions.selectedSecondaryFilterOptions?.image
        ?.overlayStyle || null,
    type:
      selectedDesignOptions.selectedSecondaryFilterOptions?.image?.type || null,
  };

  console.log(
    '[datasetData.videoMeta.video.templateVariation]',
    datasetData.videoMeta.video.templateVariation
  );

  return datasetData;
};
