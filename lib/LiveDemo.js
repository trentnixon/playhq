import { getDominantColors } from '../remotion/utils/colors';

// Utils
export const defineLogo = (accountData, userLogoUrl, defaultLogo) => {
  //console.log("defineLogo", accountData)
  //attributes.Logo.data.attributes.url
  return (
    accountData.attributes.Logo?.data?.attributes?.url ||
    accountData.attributes?.ParentLogo ||
    userLogoUrl ||
    defaultLogo
  );
};

// Colors

export const updateColorTheme = (logoUrl, userColors, updatedData) => {
  return new Promise((resolve, reject) => {
    getDominantColors(logoUrl)
      .then(colors => {
        if (colors && colors.length >= 2) {
          updatedData.VIDEOMETA.Video.Theme.primary = userColors[0]
            ? userColors[0]
            : colors[0];
          updatedData.VIDEOMETA.Video.Theme.secondary = userColors[1]
            ? userColors[1]
            : colors[1];
        }
        resolve(updatedData);
      })
      .catch(error => {
        console.error('Error fetching dominant colors:', error);
        resolve(updatedData); // Continue with the existing data
      });
  });
};

//dataTransformations
export const updateTop5RunScorers = (data, logoUrl, accountName) => {
  data.DATA.forEach(player => {
    player.teamLogo = logoUrl;
    player.playedFor = accountName;
  });
  return data;
};

export const updateUpComingFixtures = (data, logoUrl, name) => {
  data.DATA.forEach(game => {
    game.teamHomeLogo = game.teamHomeLogo || logoUrl;
    game.teamAwayLogo = game.teamAwayLogo || logoUrl;

    game.teamHome = game.teamHomeLogo ? game.teamHome : name;
    game.teamAway = game.teamAwayLogo ? game.teamAway : name;
  });
  return data;
};

export const updateWeekendResults = (data, logoUrl, defaultLogo, name) => {
  data.DATA.forEach(game => {
    game.teamHomeLogo = logoUrl;
    game.teamAwayLogo = defaultLogo;
    game.homeTeam.name = name;
  });
  return data;
};

export const updateTop5Bowlers = (data, logoUrl, accountName) => {
  data.DATA.forEach(player => {
    player.teamLogo = logoUrl;
    player.playedFor = accountName;
  });
  return data;
};

export const updateLadderFirstItem = (data, logoUrl, accountName) => {
  if (data && data.DATA.length > 0) {
    data.DATA[0].League[0].teamName = accountName;
    data.DATA[0].League[0].teamLogo = logoUrl;
    data.DATA[0].bias = accountName;
  }
  return data;
};

export const updateDataWithClubInfo = (
  AccountData,
  initialData,
  defaultLogo
) => {
  const updatedData = { ...initialData };

  // Determine the logo to use: Club Logo > Parent Logo > Default Logo
  const useLOGO = defineLogo(AccountData, defaultLogo);

  updatedData.VIDEOMETA.Club.Name = AccountData.attributes.Name;
  updatedData.VIDEOMETA.Club.Logo = useLOGO;

  return updatedData;
};

/* export  const updateDataColorTheme = (AccountData, updatedData) => {
    //console.log("OVERRIDE COLORS", userColors);
    const logoUrl =
      AccountData.attributes.Logo.data || AccountData.attributes.ParentLogo;
    if (logoUrl) {
      getDominantColors(logoUrl)
        .then((colors) => {
          if (colors && colors.length >= 2) {
            updatedData.VIDEOMETA.Video.Theme.primary = userColors[0]
              ? userColors[0]
              : colors[0];
            updatedData.VIDEOMETA.Video.Theme.secondary = userColors[1]
              ? userColors[1]
              : colors[1];
          }
          setData(updatedData);
        })
        .catch((error) => {
          console.error("Error fetching dominant colors:", error);
          setData(updatedData); // Set data even if color fetching fails
        });
    } else {
      updatedData.VIDEOMETA.Video.Theme.primary = userColors[0];
      updatedData.VIDEOMETA.Video.Theme.secondary = userColors[1];

      setData(updatedData);
    }
  }; */
