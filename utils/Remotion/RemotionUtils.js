import {
  FindAccountLabel,
  FindAccountLogo,
  FindAccountLogoObj,
  FindAccountType,
} from '../../lib/actions';

// Import JSDoc types
import './types.js';

// Define the missing update functions
export const updateUpComingFixtures = (data, useLOGO, accountName) => {
  try {
    // Input validation
    if (!data || !Array.isArray(data.DATA)) {
      throw new Error(
        'updateUpComingFixtures: Invalid data structure - DATA must be an array'
      );
    }

    if (!useLOGO) {
      console.warn(
        'updateUpComingFixtures: useLOGO is not provided, using default'
      );
    }

    if (!accountName) {
      console.warn('updateUpComingFixtures: accountName is not provided');
    }

    data.DATA.forEach((game, index) => {
      if (!game) {
        console.warn(
          `updateUpComingFixtures: Game at index ${index} is null or undefined, skipping`
        );
        return;
      }

      game.teamHomeLogo = game.teamHomeLogo || useLOGO;
      game.teamAwayLogo = game.teamAwayLogo || useLOGO;
      game.teamHome = game.teamHomeLogo ? game.teamHome : accountName;
      game.teamAway = game.teamAwayLogo ? game.teamAway : accountName;
    });

    return data;
  } catch (error) {
    console.error('Error in updateUpComingFixtures:', error);
    throw new Error(`Failed to update upcoming fixtures: ${error.message}`);
  }
};

export const updateWeekendResults = (
  data,
  useLOGO,
  defaultLogo,
  accountName
) => {
  try {
    // Input validation
    if (!data || !Array.isArray(data.DATA)) {
      throw new Error(
        'updateWeekendResults: Invalid data structure - DATA must be an array'
      );
    }

    if (!useLOGO) {
      console.warn('updateWeekendResults: useLOGO is not provided');
    }

    if (!defaultLogo) {
      console.warn('updateWeekendResults: defaultLogo is not provided');
    }

    if (!accountName) {
      console.warn('updateWeekendResults: accountName is not provided');
    }

    data.DATA.forEach((game, index) => {
      if (!game) {
        console.warn(
          `updateWeekendResults: Game at index ${index} is null or undefined, skipping`
        );
        return;
      }

      game.teamHomeLogo = useLOGO;
      game.teamAwayLogo = defaultLogo;

      if (!game.homeTeam) {
        game.homeTeam = {};
      }
      game.homeTeam.name = accountName;
    });

    return data;
  } catch (error) {
    console.error('Error in updateWeekendResults:', error);
    throw new Error(`Failed to update weekend results: ${error.message}`);
  }
};

export const updateTop5RunScorers = (data, useLOGO, accountName) => {
  try {
    // Input validation
    if (!data || !Array.isArray(data.DATA)) {
      throw new Error(
        'updateTop5RunScorers: Invalid data structure - DATA must be an array'
      );
    }

    if (!useLOGO) {
      console.warn('updateTop5RunScorers: useLOGO is not provided');
    }

    if (!accountName) {
      console.warn('updateTop5RunScorers: accountName is not provided');
    }

    data.DATA.forEach((player, index) => {
      if (!player) {
        console.warn(
          `updateTop5RunScorers: Player at index ${index} is null or undefined, skipping`
        );
        return;
      }

      player.teamLogo = useLOGO;
      player.playedFor = accountName;
    });

    return data;
  } catch (error) {
    console.error('Error in updateTop5RunScorers:', error);
    throw new Error(`Failed to update top 5 run scorers: ${error.message}`);
  }
};

export const updateTop5Bowlers = (data, useLOGO, accountName) => {
  try {
    // Input validation
    if (!data || !Array.isArray(data.DATA)) {
      throw new Error(
        'updateTop5Bowlers: Invalid data structure - DATA must be an array'
      );
    }

    if (!useLOGO) {
      console.warn('updateTop5Bowlers: useLOGO is not provided');
    }

    if (!accountName) {
      console.warn('updateTop5Bowlers: accountName is not provided');
    }

    data.DATA.forEach((player, index) => {
      if (!player) {
        console.warn(
          `updateTop5Bowlers: Player at index ${index} is null or undefined, skipping`
        );
        return;
      }

      player.teamLogo = useLOGO;
      player.playedFor = accountName;
    });

    return data;
  } catch (error) {
    console.error('Error in updateTop5Bowlers:', error);
    throw new Error(`Failed to update top 5 bowlers: ${error.message}`);
  }
};

export const updateLadderFirstItem = (data, useLOGO, accountName) => {
  try {
    // Input validation
    if (!data) {
      throw new Error('updateLadderFirstItem: Data is required');
    }

    if (!Array.isArray(data.DATA)) {
      throw new Error('updateLadderFirstItem: DATA must be an array');
    }

    if (data.DATA.length === 0) {
      console.warn(
        'updateLadderFirstItem: DATA array is empty, no items to update'
      );
      return data;
    }

    if (!useLOGO) {
      console.warn('updateLadderFirstItem: useLOGO is not provided');
    }

    if (!accountName) {
      console.warn('updateLadderFirstItem: accountName is not provided');
    }

    const firstItem = data.DATA[0];
    if (!firstItem) {
      console.warn(
        'updateLadderFirstItem: First item in DATA is null or undefined'
      );
      return data;
    }

    if (
      !firstItem.League ||
      !Array.isArray(firstItem.League) ||
      firstItem.League.length === 0
    ) {
      console.warn(
        'updateLadderFirstItem: League array is missing or empty in first item'
      );
      return data;
    }

    firstItem.League[0].teamName = accountName;
    firstItem.League[0].teamLogo = useLOGO;
    firstItem.bias = accountName;

    return data;
  } catch (error) {
    console.error('Error in updateLadderFirstItem:', error);
    throw new Error(`Failed to update ladder first item: ${error.message}`);
  }
};

/**
 * Create the preview object based on the user account
 * @param {any} userAccount - The user account object
 * @returns {any} The preview object with account data
 * @throws {Error} If userAccount is invalid or required functions are missing
 */
export const createPreviewObject = userAccount => {
  try {
    // Input validation
    if (!userAccount) {
      throw new Error('createPreviewObject: userAccount is required');
    }

    if (!userAccount.attributes) {
      throw new Error(
        'createPreviewObject: userAccount.attributes is required'
      );
    }

    console.log('[userAccount]', userAccount);
    // Safely access nested properties with fallbacks
    const theme =
      userAccount?.attributes?.theme?.data?.attributes?.Theme || null;
    const template_option =
      userAccount?.attributes?.template_option?.data?.attributes || null;
    const sponsors = userAccount?.attributes?.sponsors?.data || [];
    const accountMediaLibraries =
      userAccount?.attributes?.account_media_libraries?.data || [];

    console.log('[createPreviewObject] template_option:', template_option);
    console.log(
      '[createPreviewObject] template_option?.Category:',
      template_option?.Category
    );
    console.log(
      '[createPreviewObject] userAccount.attributes.template_option?.data?.attributes?.Category:',
      userAccount.attributes.template_option?.data?.attributes?.Category
    );
    console.log(
      '[createPreviewObject] template_option keys:',
      template_option ? Object.keys(template_option) : 'template_option is null'
    );

    // Check for template_category in template_option
    if (template_option?.template_category) {
      console.log(
        '[createPreviewObject] template_option.template_category:',
        template_option.template_category
      );
      console.log(
        '[createPreviewObject] template_option.template_category.data:',
        template_option.template_category.data
      );
      console.log(
        '[createPreviewObject] template_option.template_category.data?.attributes:',
        template_option.template_category.data?.attributes
      );
      console.log(
        '[createPreviewObject] template_option.template_category.data?.attributes?.slug:',
        template_option.template_category.data?.attributes?.slug
      );
    }

    // Validate required functions exist
    if (typeof FindAccountType !== 'function') {
      throw new Error(
        'createPreviewObject: FindAccountType function is not available'
      );
    }
    if (typeof FindAccountLogoObj !== 'function') {
      throw new Error(
        'createPreviewObject: FindAccountLogoObj function is not available'
      );
    }
    if (typeof FindAccountLabel !== 'function') {
      throw new Error(
        'createPreviewObject: FindAccountLabel function is not available'
      );
    }

    console.log('[userAccount]', userAccount);

    const result = {
      theme,
      template_option,
      sponsors,
      account_media_libraries: accountMediaLibraries,
      Account: {
        id: userAccount.id || null,
        type: FindAccountType(userAccount),
        logo: FindAccountLogoObj(userAccount),
        name: FindAccountLabel(userAccount),
        sport: userAccount.attributes.Sport || null,
        category:
          template_option?.template_category?.data?.attributes?.slug || 'Basic', // Default to "Basic" if no category is found
      },
    };

    console.log('[createPreviewObject] final result:', result);
    return result;
  } catch (error) {
    console.error('Error in createPreviewObject:', error);
    throw new Error(`Failed to create preview object: ${error.message}`);
  }
};

// Merge the base data with the custom object
// THIS COULD BE OLD NOW!!!
export const mergeData = (baseData, customObj) => {
  try {
    // Input validation
    if (!baseData) {
      throw new Error('mergeData: baseData is required');
    }

    if (!customObj) {
      throw new Error('mergeData: customObj is required');
    }

    const defaultData = {
      VIDEOMETA: {
        Video: {
          Title: '',
          TitleSplit: [],
          CompositionID: '',
          VideoTitle: '',
          HeroImage: null,
          Template: '',
          TemplateVariation: {},
          Theme: {
            primary: '',
            secondary: '',
            dark: '',
            white: '',
          },
          includeSponsors: false,
          audio_option: '',
          ASSETID: 0,
          ASSETTYPEID: 0,
          FRAMES: [],
        },
        Club: {
          Name: '',
          Sport: '',
          Logo: {
            url: '',
            width: 0,
            height: 0,
          },
          Sponsors: {
            default: {
              primary_sponsor: {
                sponsorId: 0,
                name: '',
                logo: {
                  url: '',
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

    // Safely merge theme
    if (customObj.theme && typeof customObj.theme === 'object') {
      mergedData.VIDEOMETA.Video.Theme = {
        ...mergedData.VIDEOMETA.Video.Theme,
        ...customObj.theme,
      };
    }

    // Safely merge template option variation
    if (
      customObj.template_option &&
      customObj.template_option.TemplateVariation &&
      typeof customObj.template_option.TemplateVariation === 'object'
    ) {
      mergedData.VIDEOMETA.Video.TemplateVariation = {
        ...mergedData.VIDEOMETA.Video.TemplateVariation,
        ...customObj.template_option.TemplateVariation,
      };
    }

    // Safely merge sponsors
    if (
      customObj.sponsors &&
      Array.isArray(customObj.sponsors) &&
      customObj.sponsors.length > 0
    ) {
      try {
        const sponsorsArray = customObj.sponsors
          .map((sponsor, index) => {
            if (!sponsor || !sponsor.attributes) {
              console.warn(
                `mergeData: Invalid sponsor at index ${index}, skipping`
              );
              return null;
            }

            return {
              Name: sponsor.attributes.Name || '',
              URL: sponsor.attributes.URL || '',
              Logo: sponsor.attributes.Logo?.data?.attributes?.url || '',
              isPrimary: sponsor.attributes.isPrimary || false,
            };
          })
          .filter(sponsor => sponsor !== null);

        if (sponsorsArray.length > 0) {
          mergedData.VIDEOMETA.Club.Sponsors = sponsorsArray;
        }
      } catch (sponsorError) {
        console.warn('mergeData: Error processing sponsors:', sponsorError);
      }
    }

    // Safely merge account information
    if (customObj.Account && typeof customObj.Account === 'object') {
      if (customObj.Account.name) {
        mergedData.VIDEOMETA.Club.Name = customObj.Account.name;
      }
      if (customObj.Account.logo) {
        mergedData.VIDEOMETA.Club.Logo = customObj.Account.logo;
      }
    }

    // Safely set hero image and audio option
    if (customObj.HeroImage) {
      mergedData.VIDEOMETA.Video.HeroImage = customObj.HeroImage;
    }

    if (customObj?.audio_option?.attributes?.URL) {
      mergedData.VIDEOMETA.Video.audio_option =
        customObj.audio_option.attributes.URL;
    }

    return mergedData;
  } catch (error) {
    console.error('Error in mergeData:', error);
    throw new Error(`Failed to merge data: ${error.message}`);
  }
};

// Update data based on the selected asset type
export const updateDataBasedOnSelected = (
  data,
  selectedAsset,
  useLOGO,
  accountName,
  defaultLogo
) => {
  try {
    // Input validation
    if (!data) {
      throw new Error('updateDataBasedOnSelected: data is required');
    }

    if (!selectedAsset) {
      throw new Error('updateDataBasedOnSelected: selectedAsset is required');
    }

    if (!useLOGO) {
      console.warn('updateDataBasedOnSelected: useLOGO is not provided');
    }

    if (!accountName) {
      console.warn('updateDataBasedOnSelected: accountName is not provided');
    }

    switch (selectedAsset) {
      case 'UpComingFixtures':
        return updateUpComingFixtures(data, useLOGO, accountName);
      case 'WeekendResults':
        return updateWeekendResults(data, useLOGO, defaultLogo, accountName);
      case 'Top5BattingList':
        return updateTop5RunScorers(data, useLOGO, accountName);
      case 'Top5BowlingList':
        return updateTop5Bowlers(data, useLOGO, accountName);
      case 'Ladder':
        return updateLadderFirstItem(data, useLOGO, accountName);
      default:
        console.warn(
          `updateDataBasedOnSelected: Unknown asset type "${selectedAsset}", returning original data`
        );
        return data;
    }
  } catch (error) {
    console.error('Error in updateDataBasedOnSelected:', error);
    throw new Error(
      `Failed to update data based on selected asset: ${error.message}`
    );
  }
};
