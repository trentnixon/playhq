/**
 * Type definitions for the onboarding system
 * All types are defined using JSDoc for better IDE support and documentation
 */

/**
 * @typedef {Object} BaseEntity
 * @property {string} id - Unique identifier
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} AccountType
 * @property {string} id - Unique identifier
 * @property {string} name - Display name (e.g., "Club", "Association", "League")
 * @property {string} description - Description text
 * @property {boolean} requiresClub - Whether club selection is required
 * @property {boolean} requiresAssociation - Whether association selection is required
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} Association
 * @property {string} id - Unique identifier
 * @property {string} name - Association name
 * @property {string} code - Association code (e.g., "AFL", "CRICKET")
 * @property {string} region - Geographic region
 * @property {string[]} sports - Array of supported sports
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} Club
 * @property {string} id - Unique identifier
 * @property {string} name - Club name
 * @property {string} code - Club code
 * @property {string} associationId - Parent association ID
 * @property {string} region - Geographic region
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} BrandColors
 * @property {string} primary - Primary brand color (hex format, e.g., "#FF0000")
 * @property {string} secondary - Secondary brand color (hex format)
 * @property {string} accent - Accent color (hex format)
 * @property {string} background - Background color (hex format)
 * @property {string} text - Text color (hex format)
 */

/**
 * @typedef {Object} Theme
 * @property {string} id - Unique identifier
 * @property {string} name - Theme name
 * @property {BrandColors} colors - Theme color scheme
 * @property {Object} fonts - Font configuration
 * @property {string} fonts.heading - Heading font family
 * @property {string} fonts.body - Body font family
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} LogoData
 * @property {File|null} file - Logo file object
 * @property {string|null} url - Logo URL
 * @property {string|null} preview - Logo preview URL
 */

/**
 * @typedef {Object} SetupData
 * @property {AccountType|null} accountType - Selected account type
 * @property {Association|null} association - Selected association
 * @property {Club|null} club - Selected club
 * @property {boolean} isRightsHolder - Rights holder confirmation
 * @property {boolean} isPermissionGiven - Permission granted
 * @property {LogoData} logo - Logo configuration
 * @property {BrandColors|null} brandColors - Brand color scheme
 * @property {Theme|null} theme - Selected theme
 * @property {string} contactName - Contact person name
 * @property {string} contactEmail - Contact email
 * @property {string} deliveryAddress - Delivery email address
 * @property {Date|null} setupStartedAt - Setup start timestamp
 * @property {Date|null} setupCompletedAt - Setup completion timestamp
 * @property {Date|null} lastSavedAt - Last save timestamp
 */

/**
 * @typedef {Object} SetupState
 * @property {number} currentStep - Current step index (0-3)
 * @property {string[]} completedSteps - Array of completed step IDs
 * @property {Partial<SetupData>} data - Current setup data
 * @property {Object.<string, string[]>} errors - Validation errors by field
 * @property {Object.<string, string[]>} warnings - Validation warnings by field
 * @property {boolean} isDirty - Whether data has unsaved changes
 * @property {boolean} isSaving - Whether currently saving
 * @property {boolean} isSubmitting - Whether submitting final setup
 * @property {Date|null} lastAutoSave - Last auto-save timestamp
 * @property {number} setupProgress - Overall progress percentage (0-100)
 */

/**
 * @typedef {Object} SetupStep
 * @property {string} id - Unique step identifier
 * @property {string} title - Step title
 * @property {string} description - Step description
 * @property {React.ComponentType|null} icon - Step icon component
 * @property {boolean} isRequired - Whether step is required
 * @property {string[]} dependencies - Array of step IDs this step depends on
 * @property {Object|null} validationSchema - Joi validation schema
 * @property {React.ComponentType} component - Step component
 * @property {string} dataKey - Key in SetupData for this step's data
 * @property {number} estimatedTime - Estimated completion time in minutes
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether validation passed
 * @property {Object.<string, string[]>} errors - Validation errors by field
 * @property {Object.<string, string[]>} warnings - Validation warnings by field
 */

/**
 * @typedef {Object} SetupActions
 * @property {function(Partial<SetupData>): void} updateData - Update setup data
 * @property {function(number): void} setStep - Set current step
 * @property {function(Object.<string, string[]>): void} setErrors - Set validation errors
 * @property {function(Object.<string, string[]>): void} setWarnings - Set validation warnings
 * @property {function(string): void} markComplete - Mark step as completed
 * @property {function(): void} reset - Reset all setup data
 */

/**
 * @typedef {Object} SetupContext
 * @property {SetupState} state - Current setup state
 * @property {SetupActions} actions - Setup actions
 */

/**
 * Runtime type guards for validation
 */

/**
 * Checks if an object is a valid AccountType
 * @param {any} obj - Object to check
 * @returns {boolean} True if valid AccountType
 */
export const isAccountType = obj => {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.requiresClub === 'boolean' &&
    typeof obj.requiresAssociation === 'boolean'
  );
};

/**
 * Checks if an object is a valid Association
 * @param {any} obj - Object to check
 * @returns {boolean} True if valid Association
 */
export const isAssociation = obj => {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.code === 'string' &&
    typeof obj.region === 'string' &&
    Array.isArray(obj.sports)
  );
};

/**
 * Checks if an object is a valid Club
 * @param {any} obj - Object to check
 * @returns {boolean} True if valid Club
 */
export const isClub = obj => {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.code === 'string' &&
    typeof obj.associationId === 'string' &&
    typeof obj.region === 'string'
  );
};

/**
 * Checks if an object is a valid BrandColors
 * @param {any} obj - Object to check
 * @returns {boolean} True if valid BrandColors
 */
export const isBrandColors = obj => {
  if (!obj) return false;

  const hexColorRegex = /^#[0-9A-F]{6}$/i;
  const requiredColors = [
    'primary',
    'secondary',
    'accent',
    'background',
    'text',
  ];

  return requiredColors.every(
    color => typeof obj[color] === 'string' && hexColorRegex.test(obj[color])
  );
};

/**
 * Checks if an object is a valid Theme
 * @param {any} obj - Object to check
 * @returns {boolean} True if valid Theme
 */
export const isTheme = obj => {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    isBrandColors(obj.colors) &&
    obj.fonts &&
    typeof obj.fonts.heading === 'string' &&
    typeof obj.fonts.body === 'string'
  );
};

/**
 * Checks if an object is a valid SetupData
 * @param {any} obj - Object to check
 * @returns {boolean} True if valid SetupData
 */
export const isSetupData = obj => {
  if (!obj) return false;

  // Check required string fields
  const stringFields = ['contactName', 'contactEmail', 'deliveryAddress'];
  const stringFieldsValid = stringFields.every(
    field => typeof obj[field] === 'string'
  );

  // Check boolean fields
  const booleanFields = ['isRightsHolder', 'isPermissionGiven'];
  const booleanFieldsValid = booleanFields.every(
    field => typeof obj[field] === 'boolean'
  );

  // Check optional object fields
  const optionalObjectFields = [
    'accountType',
    'association',
    'club',
    'brandColors',
    'theme',
  ];
  const optionalFieldsValid = optionalObjectFields.every(
    field =>
      obj[field] === null ||
      (field === 'accountType' && isAccountType(obj[field])) ||
      (field === 'association' && isAssociation(obj[field])) ||
      (field === 'club' && isClub(obj[field])) ||
      (field === 'brandColors' && isBrandColors(obj[field])) ||
      (field === 'theme' && isTheme(obj[field]))
  );

  return stringFieldsValid && booleanFieldsValid && optionalFieldsValid;
};

/**
 * Utility function to create a partial SetupData object
 * @param {Partial<SetupData>} data - Partial setup data
 * @returns {Partial<SetupData>} Validated partial setup data
 */
export const createPartialSetupData = data => {
  const validData = {};

  // Only include valid fields
  if (data.accountType && isAccountType(data.accountType)) {
    validData.accountType = data.accountType;
  }

  if (data.association && isAssociation(data.association)) {
    validData.association = data.association;
  }

  if (data.club && isClub(data.club)) {
    validData.club = data.club;
  }

  if (typeof data.isRightsHolder === 'boolean') {
    validData.isRightsHolder = data.isRightsHolder;
  }

  if (typeof data.isPermissionGiven === 'boolean') {
    validData.isPermissionGiven = data.isPermissionGiven;
  }

  if (data.logo && typeof data.logo === 'object') {
    validData.logo = {
      file: data.logo.file || null,
      url: data.logo.url || null,
      preview: data.logo.preview || null,
    };
  }

  if (data.brandColors && isBrandColors(data.brandColors)) {
    validData.brandColors = data.brandColors;
  }

  if (data.theme && isTheme(data.theme)) {
    validData.theme = data.theme;
  }

  if (typeof data.contactName === 'string') {
    validData.contactName = data.contactName;
  }

  if (typeof data.contactEmail === 'string') {
    validData.contactEmail = data.contactEmail;
  }

  if (typeof data.deliveryAddress === 'string') {
    validData.deliveryAddress = data.deliveryAddress;
  }

  return validData;
};
