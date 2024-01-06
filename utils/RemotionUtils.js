// RemotionUtils.js

import {
  FindAccountLabel,
  FindAccountLogo,
  FindAccountType,
} from "../lib/actions";

export const createPreviewObject = (
  userAccount,
  selectedAsset,
  selectedHeroImage
) => {
  const audioOptions =
    userAccount.attributes.template.data.attributes.bundle_audio.data.attributes
      .audio_options.data;
  const filteredAudioOptions = audioOptions.filter(
    (option) => option.attributes.CompositionID === selectedAsset
  );

  return {
    theme: userAccount.attributes.theme.data.attributes.Theme,
    template: userAccount.attributes.template.data.attributes,
    sponsors: userAccount.attributes.sponsors.data,
    account_media_libraries:
      userAccount.attributes.account_media_libraries.data,
    Account: {
      type: FindAccountType(userAccount),
      logo: FindAccountLogo(userAccount),
      name: FindAccountLabel(userAccount),
    },
    HeroImage: selectedHeroImage,
    audio_option:
      filteredAudioOptions.length > 0 ? filteredAudioOptions[0] : null,
  };
};

export const updateTop5RunScorers = (data, useLOGO, accountName) => {
  data.DATA.forEach((player) => {
    player.teamLogo = useLOGO;
    player.playedFor = accountName;
  });
  return data;
};

export const updateUpComingFixtures = (data, useLOGO, NAME) => {
  data.DATA.forEach((game) => {
    game.teamHomeLogo = game.teamHomeLogo || useLOGO;
    game.teamAwayLogo = game.teamAwayLogo || useLOGO;

    game.teamHome = game.teamHomeLogo ? game.teamHome : NAME;
    game.teamAway = game.teamAwayLogo ? game.teamAway : NAME;
  });
  return data;
};

export const updateWeekendResults = (data, useLOGO, DEFUALT, NAME) => {
  data.DATA.forEach((game) => {
    game.teamHomeLogo = useLOGO;
    game.teamAwayLogo = DEFUALT;
    game.homeTeam.name = NAME;
  });
  return data;
};

export const updateTop5Bowlers = (data, useLOGO, accountName) => {
  data.DATA.forEach((player) => {
    player.teamLogo = useLOGO;
    player.playedFor = accountName;
  });
  return data;
};

export const updateLadderFirstItem = (data, useLOGO, accountName) => {

  if (data && data.DATA.length > 0) {
    data.DATA[0].League[0].teamName = accountName;
    data.DATA[0].League[0].teamLogo = useLOGO;
    data.DATA[0].bias = accountName;
  }

  return data;
};

export const mergeData = (useData, customObj) => {
  //console.log(useData.VIDEOMETA.Video.HeroImage);
  //console.log(customObj.HeroImage);

  if (customObj.theme) {
    useData.VIDEOMETA.Video.Theme = {
      ...useData.VIDEOMETA.Video.Theme,
      ...customObj.theme,
    };
  }

  // Template Replacement
  if (customObj.template && customObj.template.TemplateVariation) {
    useData.VIDEOMETA.Video.TemplateVariation = {
      ...useData.VIDEOMETA.Video.TemplateVariation,
      ...customObj.template.TemplateVariation,
    };
  }

  // Sponsors Replacement
  if (customObj.sponsors && customObj.sponsors.length > 0) {
    const ARR = customObj.sponsors.map((sponsor) => ({
      Name: sponsor.attributes.Name,
      URL: sponsor.attributes.URL,
      Logo: sponsor.attributes.Logo.data.attributes.url,
      isPrimary: sponsor.attributes.isPrimary,
    }));
    useData.VIDEOMETA.Club.Sponsors = ARR;
  }

  // Account Data Replacement
  if (customObj.Account) {
    useData.VIDEOMETA.Club.Name =
      customObj.Account.name || useData.VIDEOMETA.Club.Name;
    useData.VIDEOMETA.Club.Logo =
      customObj.Account.logo || useData.VIDEOMETA.Club.Logo;
  }

  // Hero Image Replacement
  useData.VIDEOMETA.Video.HeroImage = customObj.HeroImage;
  //console.log(useData);

  // Hero Image Replacement
  //console.log(customObj);
  useData.VIDEOMETA.Video.audio_option = customObj?.audio_option?.attributes?.URL;
  //console.log(useData);

  return useData;
};

export function updateDataBasedOnSelected(
  data,
  selectedAsset,
  useLOGO,
  accountName,
  defaultLogo
) {
  switch (selectedAsset) {
    case "UpComingFixtures":
      return updateUpComingFixtures(data, useLOGO, accountName);
    case "WeekendResults":
      return updateWeekendResults(data, useLOGO, defaultLogo, accountName);
    case "Top5BattingList":
      return updateTop5RunScorers(data, useLOGO, accountName);
    case "Top5BowlingList":
      return updateTop5Bowlers(data, useLOGO, accountName);
    case "Ladder":
      return updateLadderFirstItem(data, useLOGO, accountName);
    default:
      return data;
  }
}
