/**
 * Helper utilities for onboarding process
 */

/**
 * Calculates the overall setup progress percentage
 * @param {Object} data - The setup data
 * @returns {number} Progress percentage (0-100)
 */
export const calculateProgress = data => {
  if (!data) return 0;

  const steps = [
    // Step 1: Organization (25%)
    {
      weight: 25,
      isComplete: () => {
        return (
          data.accountType &&
          data.association &&
          data.isRightsHolder === true &&
          data.isPermissionGiven === true &&
          (!data.accountType.requiresClub || data.club)
        );
      },
    },
    // Step 2: Branding (25%)
    {
      weight: 25,
      isComplete: () => {
        return (
          data.logo && data.logo.file && data.logo.url && data.logo.preview
        );
      },
    },
    // Step 3: Theme (25%)
    {
      weight: 25,
      isComplete: () => {
        return (
          data.brandColors && data.theme && isValidBrandColors(data.brandColors)
        );
      },
    },
    // Step 4: Contact (25%)
    {
      weight: 25,
      isComplete: () => {
        return (
          data.contactName &&
          data.contactEmail &&
          data.deliveryAddress &&
          isValidEmail(data.contactEmail) &&
          isValidEmail(data.deliveryAddress) &&
          data.contactEmail !== data.deliveryAddress
        );
      },
    },
  ];

  const totalWeight = steps.reduce((sum, step) => sum + step.weight, 0);
  const completedWeight = steps.reduce((sum, step) => {
    return sum + (step.isComplete() ? step.weight : 0);
  }, 0);

  return Math.round((completedWeight / totalWeight) * 100);
};

/**
 * Checks if a step can be accessed based on dependencies
 * @param {string} stepId - The step to check
 * @param {Object} data - Current setup data
 * @param {string[]} completedSteps - Array of completed step IDs
 * @returns {boolean} Whether the step can be accessed
 */
export const canAccessStep = (stepId, data, completedSteps) => {
  const stepDependencies = {
    step1: [], // No dependencies
    step2: ['step1'], // Requires step 1 to be completed
    step3: ['step1', 'step2'], // Requires steps 1 and 2 to be completed
    step4: ['step1', 'step2', 'step3'], // Requires steps 1, 2, and 3 to be completed
  };

  const dependencies = stepDependencies[stepId] || [];

  // Check if all dependencies are completed
  return dependencies.every(dep => completedSteps.includes(dep));
};

/**
 * Formats a date for display
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = date => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Formats a relative time (e.g., "2 minutes ago")
 * @param {Date} date - The date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = date => {
  if (!date) return '';

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = email => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates brand colors object
 * @param {Object} colors - Brand colors object
 * @returns {boolean} True if valid brand colors
 */
export const isValidBrandColors = colors => {
  if (!colors) return false;

  const hexColorRegex = /^#[0-9A-F]{6}$/i;
  const requiredColors = [
    'primary',
    'secondary',
    'accent',
    'background',
    'text',
  ];

  return requiredColors.every(
    color => colors[color] && hexColorRegex.test(colors[color])
  );
};

/**
 * Generates a preview URL for a file
 * @param {File} file - File to generate preview for
 * @returns {Promise<string>} Preview URL
 */
export const generateFilePreview = file => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Throttles a function call
 * @param {Function} func - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(null, args);
    }
  };
};

/**
 * Deep clones an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = obj => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }

  if (typeof obj === 'object') {
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]);
      }
    }
    return cloned;
  }

  return obj;
};

/**
 * Merges two objects deeply
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
export const deepMerge = (target, source) => {
  const result = deepClone(target);

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        source[key] &&
        typeof source[key] === 'object' &&
        !Array.isArray(source[key])
      ) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
};
