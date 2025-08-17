// prepareMockData.js

import { ASSETS } from './RemotionAssets';
import { createPreviewObject } from './RemotionUtils';

// Import JSDoc types
import './types.js';
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
} from './RemotionCreateDataObj';
export const DEFAULTLOGO =
  'https://fixtura.s3.ap-southeast-2.amazonaws.com/Logo_On_Plus_67bd326044.png';

/**
 * Prepare mock data for video previews based on account information
 * @param {any} account - The user account object
 * @returns {Array<any>} Array of mock data items for different asset types
 */
export const prepareMockData = account => {
  // Create Basic Account data obj
  const accountCustomDataOBJ = createPreviewObject(account);
  const { Account } = accountCustomDataOBJ;
  const sport = Account.sport;
  const category = Account.category;

  if (ASSETS[sport]) {
    console.log(
      '[prepareMockData] ASSETS[sport] keys:',
      Object.keys(ASSETS[sport])
    );
  }

  if (!ASSETS[sport] || !ASSETS[sport][category]) {
    console.log(
      'ERROR: It is likely that a template or theme is not set go to  [RemotionAssets] and check for the template you have selected'
    );

    console.error(
      `No assets found for sport: ${sport} and category: ${category}`
    );
    return [];
  }

  return Object.keys(ASSETS[sport][category]).map(assetType => {
    const asset = ASSETS[sport][category][assetType];

    const finalData = {
      RENDER: createRender(), // Completed
      ACCOUNT: createAccount(accountCustomDataOBJ.id), // Completed
      ASSET: createAsset(), // need to do
      VIDEOMETA: {
        grouping_category: createFixtureCategory(), // fine for demo
        Video: createVideo(accountCustomDataOBJ, asset.ASSET), // Completed
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
