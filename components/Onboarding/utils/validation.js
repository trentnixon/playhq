/**
 * Validation utilities for onboarding process
 * Uses Joi for schema validation with clear error messages
 */

// Note: Joi needs to be installed: npm install joi
// For now, we'll create the structure and add a note about installation

/**
 * Validation schemas for each onboarding step
 * Note: Install Joi with: npm install joi
 */

/**
 * Step 1: Organization validation schema
 * @type {Object}
 */
export const step1Schema = {
  validate: data => {
    const errors = {};
    const warnings = {};

    // Account Type validation - handle both string and object formats
    if (!data.accountType) {
      errors.accountType = ['Please select an account type'];
    } else if (
      typeof data.accountType === 'object' &&
      (!data.accountType.id || !data.accountType.name)
    ) {
      errors.accountType = ['Invalid account type selection'];
    }

    // Association validation - handle both string and object formats
    if (!data.association) {
      errors.association = ['Please select an association'];
    } else if (
      typeof data.association === 'object' &&
      (!data.association.id || !data.association.name)
    ) {
      errors.association = ['Invalid association selection'];
    }

    // Club validation (conditional based on account type) - handle both string and object formats
    if (
      data.accountType &&
      data.accountType !== 'Association' &&
      data.association &&
      !data.club
    ) {
      if (!data.club) {
        errors.club = ['Please select a club'];
      } else if (
        typeof data.club === 'object' &&
        (!data.club.id || !data.club.name)
      ) {
        errors.club = ['Invalid club selection'];
      }
    }

    // Rights holder validation
    if (data.isRightsHolder !== true) {
      errors.isRightsHolder = [
        'You must confirm that you hold the rights or have permission',
      ];
    }

    // Permission validation
    if (data.isPermissionGiven !== true) {
      errors.isPermissionGiven = ['You must grant permission for data access'];
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Step 2: Logo validation schema
 * @type {Object}
 */
export const step2Schema = {
  validate: data => {
    const errors = {};
    const warnings = {};

    // Logo file validation
    if (!data.logo || !data.logo.file) {
      errors.logo = ['Please upload a logo'];
    } else {
      const file = data.logo.file;

      // File size validation (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        errors.logo = ['Logo file size must be less than 5MB'];
      }

      // File type validation
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        errors.logo = ['Logo must be a JPEG, PNG, or WebP image'];
      }
    }

    // Logo URL validation
    if (!data.logo || !data.logo.url) {
      errors.logoUrl = ['Logo URL is required'];
    } else if (!isValidUrl(data.logo.url)) {
      errors.logoUrl = ['Invalid logo URL'];
    }

    // Logo preview validation
    if (!data.logo || !data.logo.preview) {
      errors.logoPreview = ['Logo preview is required'];
    } else if (!isValidUrl(data.logo.preview)) {
      errors.logoPreview = ['Invalid preview URL'];
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Step 3: Theme validation schema
 * @type {Object}
 */
export const step3Schema = {
  validate: data => {
    const errors = {};
    const warnings = {};

    // Theme selection validation
    if (!data.themeSelected) {
      errors.themeSelected = ['Please select a theme'];
    }

    // Theme ID validation
    if (!data.themeId) {
      errors.themeId = ['Invalid theme selection'];
    }

    // Theme name validation
    if (!data.themeName) {
      errors.themeName = ['Theme name is required'];
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Step 4: Contact validation schema
 * @type {Object}
 */
export const step4Schema = {
  validate: data => {
    const errors = {};
    const warnings = {};

    // Contact name validation (maps to FirstName in account)
    if (!data.contactName) {
      errors.contactName = ['Contact name is required'];
    } else if (data.contactName.length < 2) {
      errors.contactName = ['Name must be at least 2 characters'];
    } else if (data.contactName.length > 100) {
      errors.contactName = ['Name must be less than 100 characters'];
    } else if (!/^[a-zA-Z\s]+$/.test(data.contactName)) {
      errors.contactName = ['Name can only contain letters and spaces'];
    }

    // Delivery email validation (maps to DeliveryAddress in account)
    if (!data.deliveryAddress) {
      errors.deliveryAddress = ['Delivery email is required'];
    } else if (!isValidEmail(data.deliveryAddress)) {
      errors.deliveryAddress = ['Please enter a valid delivery email address'];
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
      warnings,
    };
  },
};

/**
 * Step 5: Review validation schema
 * @type {Object}
 */
export const step5Schema = {
  validate: data => {
    const errors = {};
    const warnings = {};

    // Review step doesn't require validation as it's just a review
    // All validation should have been done in previous steps
    // This schema exists for consistency and potential future requirements

    return {
      isValid: true, // Review step is always valid
      errors,
      warnings,
    };
  },
};

/**
 * Combined validation for all steps
 * @type {Object}
 */
export const fullSetupSchema = {
  validate: data => {
    const step1Result = step1Schema.validate(data);
    const step2Result = step2Schema.validate(data);
    const step3Result = step3Schema.validate(data);
    const step4Result = step4Schema.validate(data);

    // Combine all errors and warnings
    const allErrors = {
      ...step1Result.errors,
      ...step2Result.errors,
      ...step3Result.errors,
      ...step4Result.errors,
    };

    const allWarnings = {
      ...step1Result.warnings,
      ...step2Result.warnings,
      ...step3Result.warnings,
      ...step4Result.warnings,
    };

    return {
      isValid: Object.keys(allErrors).length === 0,
      errors: allErrors,
      warnings: allWarnings,
    };
  },
};

/**
 * Validates a step's data against its schema
 * @param {string} stepId - The step identifier
 * @param {Object} data - The data to validate
 * @returns {Object} Validation result with errors and warnings
 */
export const validateStep = (stepId, data) => {
  const schemas = {
    step1: step1Schema,
    step2: step2Schema,
    step3: step3Schema,
    step4: step4Schema,
  };

  const schema = schemas[stepId];
  if (!schema) {
    return {
      isValid: false,
      errors: { general: ['Invalid step ID'] },
      warnings: {},
    };
  }

  return schema.validate(data);
};

/**
 * Validates the entire setup data
 * @param {Object} data - The complete setup data
 * @returns {Object} Validation result
 */
export const validateFullSetup = data => {
  return fullSetupSchema.validate(data);
};

/**
 * Utility function to validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Utility function to validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
const isValidUrl = url => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates file upload
 * @param {File} file - File to validate
 * @param {Object} options - Validation options
 * @param {number} options.maxSize - Maximum file size in bytes
 * @param {string[]} options.allowedTypes - Allowed MIME types
 * @returns {Object} Validation result
 */
export const validateFile = (
  file,
  options = {
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  }
) => {
  const { maxSize, allowedTypes } = options;

  const errors = [];

  if (!file) {
    errors.push('File is required');
  } else {
    if (file.size > maxSize) {
      errors.push(
        `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
      );
    }

    if (!allowedTypes.includes(file.type)) {
      errors.push(`File type must be one of: ${allowedTypes.join(', ')}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates hex color format
 * @param {string} color - Color to validate
 * @returns {boolean} True if valid hex color
 */
export const isValidHexColor = color => {
  const hexColorRegex = /^#[0-9A-F]{6}$/i;
  return hexColorRegex.test(color);
};
