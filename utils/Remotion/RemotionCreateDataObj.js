// MockDataHelpers.js

import { sponsorsFormatted } from './RemotionFormatSponsors';
import findHeroImageForAsset from './RemotionfindHeroImage';

// JSDoc types are globally available
// @ts-check

export function createRender() {
  return {
    SchedulerID: 0,
    RenderID: 0,
  };
}

export function createAccount(id) {
  if (id === undefined || id === null) {
    return {
      accountId: 0,
    };
  }

  return {
    accountId: id,
  };
}

export function createAsset() {
  return {
    ASSETID: 2,
    ASSETTYPEID: 1,
    ASSETCATEGORYID: 2,
    ASSETSLINKID: '000000',
  };
}
/**
 * Filter audio options based on the preview object and asset
 * @param {any} previewObj - The preview object containing template options
 * @param {any} ASSET - The asset object with composition ID
 * @returns {Array<any>} Filtered audio options array
 */
export function filterAudioOptions(previewObj, ASSET) {
  console.log('[filterAudioOptions] previewObj:', previewObj);
  console.log(
    '[filterAudioOptions] template_option:',
    previewObj.template_option
  );

  // Try the new template_option structure first
  let audioOptions =
    previewObj.template_option?.template_category?.data?.attributes
      ?.bundle_audio?.data?.attributes?.audio_options?.data;

  console.log(
    '[filterAudioOptions] audioOptions from new structure:',
    audioOptions
  );

  // Fallback to the old structure if not found
  if (!audioOptions) {
    audioOptions =
      previewObj.template_option?.bundle_audio?.data?.attributes?.audio_options
        ?.data;
    console.log(
      '[filterAudioOptions] audioOptions from old structure:',
      audioOptions
    );
  }

  // Add null check and fallback
  if (!audioOptions || !Array.isArray(audioOptions)) {
    console.warn(
      'filterAudioOptions: audioOptions is not available or not an array'
    );
    return [];
  }

  return audioOptions.filter(
    option => option.attributes.CompositionID === ASSET.CompositionID
  );
}

/**
 * Create video data object from preview object and asset
 * @param {any} previewObj - The preview object containing account and template data
 * @param {any} ASSET - The asset object with video metadata
 * @returns {any} The video data object
 */
export function createVideo(previewObj, ASSET) {
  const filteredAudioOptions = filterAudioOptions(previewObj, ASSET);

  const HeroImage = findHeroImageForAsset(
    previewObj.account_media_libraries,
    ASSET.CompositionID
  );

  return {
    // from FIXTURA
    Title: ASSET.Title || 'Title',
    TitleSplit: ASSET.TitleSplit || ['Title'],
    CompositionID: ASSET.CompositionID || false,
    VideoTitle: ASSET.VideoTitle || false,

    // From User - Updated to use template_option
    Template:
      previewObj.template_option?.template_category?.data?.attributes?.slug ||
      'Basic',
    TemplateVariation: previewObj.template_option?.TemplateVariation || {},
    Theme: previewObj.theme || {
      primary: '#79001f',
      secondary: '#fdbc2c',
      dark: '#111',
      white: '#FFF',
    },
    includeSponsors: true,
    HeroImage: HeroImage || {},

    audio_option: filteredAudioOptions[0]?.attributes.URL || false,
    FRAMES: [450],
  };
}

/**
 * Create theme data object from preview object
 * @param {any} previewObj - The preview object containing template and theme data
 * @returns {Object} Theme data object with template and color information
 */
export function createTheme(previewObj) {
  return {
    Template:
      previewObj.template_option?.template_category?.data?.attributes?.slug ||
      'Basic',
    TemplateVariation: previewObj.template_option?.TemplateVariation || {},
    Theme: previewObj.theme || {
      primary: '#79001f',
      secondary: '#fdbc2c',
      dark: '#111',
      white: '#FFF',
    },
  };
}

/**
 * Create club data object from account custom data
 * @param {any} accountCustomDataOBJ - The preview object containing account and sponsor data
 * @returns {any} Club data object with name, sport, logo, and sponsors
 */
export function createClub(accountCustomDataOBJ) {
  const { Account, sponsors } = accountCustomDataOBJ;
  return {
    Name: Account.name || 'International Cricket',
    Sport: 'Cricket',
    Logo: Account.logo || {
      url: 'https://fixtura.s3.ap-southeast-2.amazonaws.com/Logo_On_Plus_67bd326044.png',
      width: 132,
      height: 176,
    },
    Sponsors: sponsorsFormatted(sponsors),
  };
}

export function createFixtureCategory() {
  return 'International';
}

export function createTimings() {
  return {
    FPS_INTRO: 90,
    FPS_SCORECARD: 210,
    FPS_OUTRO: 120,
    FPS_MAIN: 540,
    FPS_LADDER: 300,
  };
}

export function createData(assetData) {
  return assetData;
}

export function createPrompt() {
  return [];
}
