import { fetcher } from './api';
import {
  getAccountIDFromServer,
  getIdFromLocalCookie,
  getTokenFromLocalCookie,
  setAccountFromLocalCookie,
} from './auth';
import Cookies from 'js-cookie';

/**
 * Check if user has an account profile
 * @returns {Promise<Object|null>} User account data or null if no account
 */
export const checkUserAccount = async () => {
  try {
    const accountData = await getAccountIDFromServer();

    // If user has an account, return the account data
    if (accountData && accountData.account && accountData.account.id) {
      return accountData;
    }

    return null;
  } catch (error) {
    console.error('💥 checkUserAccount - Error:', error);
    return null;
  }
};

/**
 * Create a new account for the user
 * @returns {Promise<Object>} Created account data
 */
export const createUserAccount = async () => {
  try {
    const userId = await getIdFromLocalCookie();
    const jwt = getTokenFromLocalCookie();

    if (!userId || !jwt) {
      throw new Error('User not authenticated');
    }

    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/account/createAccount`,
      {
        method: 'POST',
        body: JSON.stringify({
          data: {
            user: [userId],
            theme: [7],
            template: [1],
            audio_option: [1],
          },
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    setAccountFromLocalCookie(response.data.id);

    return response;
  } catch (error) {
    console.error('Error creating user account:', error);
    throw error;
  }
};

/**
 * Get user account details with full population
 * @returns {Promise<Object>} User account data
 */
export const getUserAccountDetails = async () => {
  try {
    const accountData = await getAccountIDFromServer();
    const jwt = getTokenFromLocalCookie();

    if (!accountData || !accountData.account || !accountData.account.id) {
      throw new Error('No account found');
    }

    const query = new URLSearchParams({
      populate: [
        'user',
        'theme',
        'template',
        'audio_option',
        'branding',
        'contact_info',
      ].join(','),
    });

    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${accountData.account.id}?${query}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching user account details:', error);
    throw error;
  }
};

/**
 * Save onboarding progress to the server
 * @param {Object} onboardingData - Onboarding data to save
 * @returns {Promise<Object>} Save response
 */
export const saveOnboardingProgress = async onboardingData => {
  try {
    const accountData = await getAccountIDFromServer();
    const jwt = getTokenFromLocalCookie();

    if (!accountData || !accountData.account || !accountData.account.id) {
      throw new Error('No account found');
    }

    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${accountData.account.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          data: {
            onboarding_progress: onboardingData,
            onboarding_completed: false,
          },
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error saving onboarding progress:', error);
    throw error;
  }
};

/**
 * Load onboarding progress from the server
 * @returns {Promise<Object|null>} Onboarding progress data or null
 */
export const loadOnboardingProgress = async () => {
  try {
    const accountData = await getAccountIDFromServer();
    const jwt = getTokenFromLocalCookie();

    if (!accountData || !accountData.account || !accountData.account.id) {
      return null;
    }

    // Get the full account data with all populated fields
    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${accountData.account.id}?populate[0]=account_type&populate[1]=associations&populate[2]=clubs&populate[3]=theme&populate[4]=template_option&populate[5]=audio_option`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const account = response.data;
    if (!account || !account.attributes) {
      return null;
    }

    // Extract the saved data from account fields
    const savedData = {
      step1: {
        accountType:
          account.attributes.account_type?.data?.attributes?.Name || '',
        association:
          // Handle as array - get first item
          Array.isArray(account.attributes.associations?.data) &&
          account.attributes.associations.data.length > 0
            ? account.attributes.associations.data[0].attributes.Name
            : account.attributes.associations?.data?.attributes?.Name || '',
        club:
          // Handle as array - get first item
          Array.isArray(account.attributes.clubs?.data) &&
          account.attributes.clubs.data.length > 0
            ? account.attributes.clubs.data[0].attributes.Name
            : account.attributes.clubs?.data?.attributes?.Name || '',
        isRightsHolder: account.attributes.isRightsHolder === true,
        isPermissionGiven: account.attributes.isPermissionGiven === true,
      },
      step4: {
        contactName: account.attributes.FirstName || '',
        deliveryAddress: account.attributes.DeliveryAddress || '',
      },
      // Add other steps as they're implemented
      // step2: { ... },
      // step3: { ... },
    };

    return savedData;
  } catch (error) {
    console.error('Error loading onboarding progress:', error);
    return null;
  }
};

/**
 * Complete onboarding and mark as finished
 * @param {Object} finalData - Final onboarding data
 * @returns {Promise<Object>} Completion response
 */
export const completeOnboarding = async finalData => {
  try {
    const accountData = await getAccountIDFromServer();
    const jwt = getTokenFromLocalCookie();

    if (!accountData || !accountData.account || !accountData.account.id) {
      throw new Error('No account found');
    }

    const response = await fetcher(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${accountData.account.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          data: {
            ...finalData,
            onboarding_completed: true,
            onboarding_completed_at: new Date().toISOString(),
          },
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error('Error completing onboarding:', error);
    throw error;
  }
};

/**
 * Uploads a logo file
 * @param {File} file - The logo file to upload
 * @returns {Promise<Object>} Upload response with URL
 */
export const uploadLogo = async file => {
  try {
    const formData = new FormData();
    formData.append('logo', file);

    const response = await fetch('/api/onboarding/upload-logo', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload logo');
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading logo:', error);
    throw error;
  }
};
