// prepareMockData.js

import { ASSETS } from "./RemotionAssets";
import {
  createPreviewObject,
  updateDataBasedOnSelected,
} from "./RemotionUtils";
import {
  createRender,
  createAccount,
  createAsset,
  createVideo,
  createTheme,
  createClub,
  createFixtureCategory,
  createTimings,
  createData,
  createPrompt,
} from "./RemotionCreateDataObj";
export const DEFAULTLOGO =
  "https://fixtura.s3.ap-southeast-2.amazonaws.com/Logo_Blue_on_transparent_0e86187b28.png";

export const prepareMockData = (account) => {
  // Create Basic Account data obj
  const accountCustomDataOBJ = createPreviewObject(account); 
  const { Account } = accountCustomDataOBJ;
  const sport = Account.sport;
  const category = Account.category;

  if (!ASSETS[sport] || !ASSETS[sport][category]) {
    console.error(
      `No assets found for sport: ${sport} and category: ${category}`
    );
    return [];
  }

  return Object.keys(ASSETS[sport][category]).map((assetType) => {
    const asset = ASSETS[sport][category][assetType];

    const finalData = {
      RENDER: createRender(), // Completed
      ACCOUNT: createAccount(accountCustomDataOBJ.id), // Completed
      ASSET: createAsset(), // need to do 
      VIDEOMETA: {
        grouping_category: createFixtureCategory(accountCustomDataOBJ), // fine for demo
        Video: createVideo(accountCustomDataOBJ, asset.ASSET),  // Completed
        THEME: createTheme(accountCustomDataOBJ), // Completed
        Club: createClub(accountCustomDataOBJ), // Completed
      },
      TIMINGS: createTimings(), // Need to do
      DATA: createData(asset.DATA),
      PROMPT: createPrompt(), // Need to do
    };

    return {
      component: asset.component,
      data: finalData,
    };
  });
};
