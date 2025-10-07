// Default options for when no template options are available
const DefaultPrimaryOptions = {
  selectedCategory: { id: null, value: 'Basic' },
  selectedBackgroundOptions: 'Solid',
  selectedTemplatePalette: { value: 'primary', id: null },
  mode: { id: 1, value: 'light' },
  selectedSecondaryFilterOptions: {
    gradient: null,
    image: null,
    noise: null,
    particle: null,
    pattern: null,
    texture: null,
  },
  user_media_gallery: {
    url: null,
    width: null,
    height: null,
    ratio: null,
    label: null,
  },
};

/**
 * Extracts design options from template options data
 * @param {Object} options - Template options object
 * @returns {Object} Extracted design options
 */
const extractDesignOptionsFromTemplate = options => {
  const attrs = options?.attributes ?? {};
  const {
    template_category,
    template_palette,
    useBackground,
    template_gradient,
    template_image,
    template_noise,
    template_particle,
    template_pattern,
    template_texture,
    template_mode,
  } = attrs;

  console.log('[extractDesignOptionsFromTemplate] All attributes:', attrs);
  console.log(
    '[extractDesignOptionsFromTemplate] template_texture from CMS:',
    template_texture
  );
  console.log(
    '[extractDesignOptionsFromTemplate] template_texture.data:',
    template_texture?.data
  );
  console.log(
    '[extractDesignOptionsFromTemplate] template_texture.data.attributes:',
    template_texture?.data?.attributes
  );
  return {
    template_category: {
      value: template_category?.data?.attributes?.slug ?? 'Basic',
      id: template_category?.data?.id ?? null,
    },
    template_palette: {
      value: template_palette?.data?.attributes?.value ?? 'primary',
      id: template_palette?.data?.id ?? null,
    },
    useBackground: useBackground,
    mode: {
      id: template_mode?.data?.id ?? 1,
      value: template_mode?.data?.attributes?.slug ?? 'light',
    },
    template_gradient: {
      type: template_gradient?.data?.attributes?.type ?? null,
      direction: template_gradient?.data?.attributes?.direction ?? null,
      id: template_gradient?.data?.id ?? null,
    },
    template_image: {
      id: template_image?.data?.id ?? null,
      type: template_image?.data?.attributes?.animationType ?? null,
      direction: template_image?.data?.attributes?.animationDirection ?? null,
      overlayStyle: template_image?.data?.attributes?.overlayStyle ?? null,
      gradientType: template_image?.data?.attributes?.gradientType ?? null,
      overlayOpacity: template_image?.data?.attributes?.overlayOpacity ?? null,
    },
    template_noise: {
      id: template_noise?.data?.id ?? null,
      type: template_noise?.data?.attributes?.noiseType ?? null,
    },
    template_particle: {
      id: template_particle?.data?.id ?? null,
      type: template_particle?.data?.attributes?.particleType ?? 'snow',
      particleCount:
        template_particle?.data?.attributes?.particleCount ?? '150',
      speed: template_particle?.data?.attributes?.speed ?? 1,
      direction: template_particle?.data?.attributes?.direction ?? 'down',
      animation: template_particle?.data?.attributes?.animationType ?? 'fade',
    },
    template_pattern: {
      id: template_pattern?.data?.id ?? null,
      type: template_pattern?.data?.attributes?.patternType ?? 'dots',
      animation: template_pattern?.data?.attributes?.animation ?? 'rotate',
      scale: template_pattern?.data?.attributes?.scale ?? 0.5,
      rotation: template_pattern?.data?.attributes?.rotation ?? null,
      opacity: template_pattern?.data?.attributes?.opacity ?? 0.3,
      animationDuration:
        template_pattern?.data?.attributes?.animationDuration ?? 1500,
      animationSpeed: template_pattern?.data?.attributes?.animationSpeed ?? 0.5,
    },
    template_texture: (() => {
      const textureData = {
        id: template_texture?.data?.id ?? null,
        name: template_texture?.data?.attributes?.Name ?? null,
        opacity: template_texture?.data?.attributes?.opacity ?? 50,
        blendMode: template_texture?.data?.attributes?.blendMode ?? 'multiply',
        url: template_texture?.data?.attributes?.url ?? null,
      };
      console.log(
        '[extractDesignOptions] Extracted texture data:',
        textureData
      );
      return textureData;
    })(),
    user_media_gallery: {
      url: null,
      width: null,
      height: null,
      ratio: null,
      label: null,
    },
  };
};

/**
 * Gets initial design options from template options
 * @param {Object} options - Template options object
 * @returns {Object} Initial design options
 */
const getInitialDesignOptions = options => {
  if (!options || !options.attributes) return DefaultPrimaryOptions;
  const designOptions = extractDesignOptionsFromTemplate(options);
  return {
    selectedCategory: designOptions.template_category,
    selectedBackgroundOptions: designOptions.useBackground || 'Solid',
    selectedTemplatePalette: designOptions.template_palette,
    mode: designOptions.mode,
    user_media_gallery: designOptions.user_media_gallery,
    selectedSecondaryFilterOptions: {
      gradient: designOptions.template_gradient,
      image: designOptions.template_image,
      noise: designOptions.template_noise,
      particle: designOptions.template_particle,
      pattern: designOptions.template_pattern,
      texture: designOptions.template_texture,
    },
  };
};

/**
 * Main function to extract design options from an account object
 * @param {Object} account - Account object with template options
 * @returns {Object} Design options object
 */
export const extractDesignOptions = account => {
  if (!account) return DefaultPrimaryOptions;

  const templateOptions = account?.attributes?.template_option?.data;
  return getInitialDesignOptions(templateOptions);
};

// Export individual functions for more granular use
export {
  DefaultPrimaryOptions,
  extractDesignOptionsFromTemplate,
  getInitialDesignOptions,
};
