/**
 * Storage utilities for onboarding process
 */

const STORAGE_KEY = 'fixtura_onboarding_progress';

/**
 * Saves onboarding progress to localStorage
 * @param {Object} data - The data to save
 */
export const saveToLocalStorage = data => {
  try {
    const storageData = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

/**
 * Loads onboarding progress from localStorage
 * @returns {Object|null} The saved data or null if not found
 */
export const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored);
    const isExpired = Date.now() - parsed.timestamp > 24 * 60 * 60 * 1000; // 24 hours

    if (isExpired) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return null;
  }
};

/**
 * Clears onboarding progress from localStorage
 */
export const clearLocalStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear localStorage:', error);
  }
};
