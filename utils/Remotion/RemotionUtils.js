import {
  FindAccountLabel,
  FindAccountLogo,
  FindAccountLogoObj,
  FindAccountType,
} from "../../lib/actions";

// Define the missing update functions
export const updateUpComingFixtures = (data, useLOGO, accountName) => {
  data.DATA.forEach((game) => {
    game.teamHomeLogo = game.teamHomeLogo || useLOGO;
    game.teamAwayLogo = game.teamAwayLogo || useLOGO;
    game.teamHome = game.teamHomeLogo ? game.teamHome : accountName;
    game.teamAway = game.teamAwayLogo ? game.teamAway : accountName;
  });
  return data;
};

export const updateWeekendResults = (
  data,
  useLOGO,
  defaultLogo,
  accountName
) => {
  data.DATA.forEach((game) => {
    game.teamHomeLogo = useLOGO;
    game.teamAwayLogo = defaultLogo;
    game.homeTeam.name = accountName;
  });
  return data;
};

export const updateTop5RunScorers = (data, useLOGO, accountName) => {
  data.DATA.forEach((player) => {
    player.teamLogo = useLOGO;
    player.playedFor = accountName;
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

// Create the preview object based on the user account
export const createPreviewObject = (userAccount) => {
  return {
    theme: userAccount.attributes.theme.data.attributes.Theme,
    template: userAccount.attributes.template.data.attributes,
    sponsors: userAccount.attributes.sponsors.data,
    account_media_libraries:
      userAccount.attributes.account_media_libraries.data,
    Account: {
     
      id: userAccount.id,
      type: FindAccountType(userAccount),
      logo: FindAccountLogoObj(userAccount),
      name: FindAccountLabel(userAccount),
      sport:userAccount.attributes.Sport,
      category:userAccount.attributes.template.data.attributes.Category
    },
  };
};

// Merge the base data with the custom object
// THIS COULD BE OLD NOW!!!
export const mergeData = (baseData, customObj) => {
  const defaultData = {
    VIDEOMETA: {
      Video: {
        Title: "",
        TitleSplit: [],
        CompositionID: "",
        VideoTitle: "",
        HeroImage: null,
        Template: "",
        TemplateVariation: {},
        Theme: {
          primary: "",
          secondary: "",
          dark: "",
          white: "",
        },
        includeSponsors: false,
        audio_option: "",
        ASSETID: 0,
        ASSETTYPEID: 0,
        FRAMES: [],
      },
      Club: {
        Name: "",
        Sport: "",
        Logo: {
          url: "",
          width: 0,
          height: 0,
        },
        Sponsors: {
          default: {
            primary_sponsor: {
              sponsorId: 0,
              name: "",
              logo: {
                url: "",
                width: 0,
                height: 0,
              },
            },
            general_sponsors: [],
          },
        },
      },
    },
    TIMINGS: {
      FPS_INTRO: 0,
      FPS_SCORECARD: 0,
      FPS_OUTRO: 0,
      FPS_MAIN: 0,
    },
    DATA: [],
  };

  // Combine the default data structure with the baseData (which contains only the DATA array)
  const mergedData = { ...defaultData, ...baseData };

  if (customObj.theme) {
    mergedData.VIDEOMETA.Video.Theme = {
      ...mergedData.VIDEOMETA.Video.Theme,
      ...customObj.theme,
    };
  }

  if (customObj.template && customObj.template.TemplateVariation) {
    mergedData.VIDEOMETA.Video.TemplateVariation = {
      ...mergedData.VIDEOMETA.Video.TemplateVariation,
      ...customObj.template.TemplateVariation,
    };
  }

  if (customObj.sponsors && customObj.sponsors.length > 0) {
    const sponsorsArray = customObj.sponsors.map((sponsor) => ({
      Name: sponsor.attributes.Name,
      URL: sponsor.attributes.URL,
      Logo: sponsor.attributes.Logo.data.attributes.url,
      isPrimary: sponsor.attributes.isPrimary,
    }));
    mergedData.VIDEOMETA.Club.Sponsors = sponsorsArray;
  }

  if (customObj.Account) {
    mergedData.VIDEOMETA.Club.Name =
      customObj.Account.name || mergedData.VIDEOMETA.Club.Name;
    mergedData.VIDEOMETA.Club.Logo =
      customObj.Account.logo || mergedData.VIDEOMETA.Club.Logo;
  }

  mergedData.VIDEOMETA.Video.HeroImage = customObj.HeroImage;
  mergedData.VIDEOMETA.Video.audio_option =
    customObj?.audio_option?.attributes?.URL;

  return mergedData;
};

// Update data based on the selected asset type
export const updateDataBasedOnSelected = (
  data,
  selectedAsset,
  useLOGO,
  accountName,
  defaultLogo
) => {
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
};
