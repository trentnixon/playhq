// MockDataHelpers.js

import { sponsorsFormatted } from "./RemotionFormatSponsors";
import findHeroImageForAsset from "./RemotionfindHeroImage";

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
    ASSETSLINKID: "000000",
  };
}
export function filterAudioOptions(previewObj, ASSET) {
  const audioOptions =
    previewObj.template.bundle_audio.data.attributes.audio_options.data;

  return audioOptions.filter(
    (option) => option.attributes.CompositionID === ASSET.CompositionID
  );
}

export function createVideo(previewObj, ASSET) {
  const filteredAudioOptions = filterAudioOptions(previewObj, ASSET);

  const HeroImage = findHeroImageForAsset(
    previewObj.account_media_libraries,
    ASSET.CompositionID
  );

  return {
    // from FIXTURA
    Title: ASSET.title || "Title",
    TitleSplit: ASSET.TitleSplit || ["Title"],
    CompositionID: ASSET.CompositionID || false,
    VideoTitle: ASSET.VideoTitle || false,

    // From User
    Template: previewObj.template.Category || "Basic",
    TemplateVariation: previewObj.template.TemplateVariation || {},
    Theme: previewObj.theme || {
      primary: "#79001f",
      secondary: "#fdbc2c",
      dark: "#111",
      white: "#FFF",
    },
    includeSponsors: true,
    HeroImage: HeroImage || {},

    audio_option: filteredAudioOptions[0]?.attributes.URL || false,
    FRAMES: [450],
  };
}

export function createTheme(previewObj) {
  return {
    Template: previewObj.template.Category || "Basic",
    TemplateVariation: previewObj.template.TemplateVariation || {},
    Theme: previewObj.theme || {
      primary: "#79001f",
      secondary: "#fdbc2c",
      dark: "#111",
      white: "#FFF",
    },
  };
}

export function createClub(accountCustomDataOBJ) {
  const { Account, sponsors } = accountCustomDataOBJ;

  return {
    Name: Account.name || "International Cricket",
    Sport: "Cricket",
    Logo: Account.logo || {
      url: "https://fixtura.s3.ap-southeast-2.amazonaws.com/logo_21_4a9066b25c.png",
      width: 132,
      height: 176,
    },
    Sponsors: sponsorsFormatted(sponsors),
  };
}

export function createFixtureCategory() {
  return "International";
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
