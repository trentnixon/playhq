import Step1Organization from '../steps/Step1Organization';
import Step2OrganisationLogo from '../steps/Step2OrganisationLogo';
import Step3Theme from '../steps/Step3Theme';
import Step4Contact from '../steps/Step4Contact';
import Step5Review from '../steps/Step5Review';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
} from '../utils/validation';

/**
 * Configuration for all onboarding steps
 * @type {Array<Object>}
 */
export const setupSteps = [
  {
    id: 'step1',
    title: 'Organization',
    description: 'Set up your account type and organization details',
    icon: null, // Will be replaced with actual icon component
    isRequired: true,
    dependencies: [],
    validationSchema: step1Schema,
    component: Step1Organization,
    dataKey: 'organization',
    estimatedTime: 5,
    dataFields: [
      'accountType',
      'association',
      'club',
      'isRightsHolder',
      'isPermissionGiven',
    ],
  },
  {
    id: 'step2',
    title: 'Branding',
    description: 'Upload your logo and set brand identity',
    icon: null,
    isRequired: true,
    dependencies: ['step1'],
    validationSchema: step2Schema,
    component: Step2OrganisationLogo,
    dataKey: 'branding',
    estimatedTime: 3,
    dataFields: ['logo'],
  },
  {
    id: 'step3',
    title: 'Theme',
    description: 'Choose your brand colors and theme',
    icon: null,
    isRequired: true,
    dependencies: ['step1', 'step2'],
    validationSchema: step3Schema,
    component: Step3Theme,
    dataKey: 'theme',
    estimatedTime: 4,
    dataFields: ['brandColors', 'theme'],
  },
  {
    id: 'step4',
    title: 'Contact',
    description: 'Provide contact and delivery information',
    icon: null,
    isRequired: true,
    dependencies: ['step1', 'step2', 'step3'],
    validationSchema: step4Schema,
    component: Step4Contact,
    dataKey: 'contact',
    estimatedTime: 3,
    dataFields: ['contactName', 'deliveryAddress'], // Maps to FirstName and DeliveryAddress in account
  },
  {
    id: 'step5',
    title: 'Review',
    description: 'Review your setup and complete onboarding',
    icon: null,
    isRequired: true,
    dependencies: ['step1', 'step2', 'step3', 'step4'],
    validationSchema: step5Schema,
    component: Step5Review,
    dataKey: 'review',
    estimatedTime: 2,
    dataFields: [], // No data fields for review step
  },
];

/**
 * Gets a step by its ID
 * @param {string} stepId - The step ID
 * @returns {Object|null} The step configuration or null if not found
 */
export const getStepById = stepId => {
  return setupSteps.find(step => step.id === stepId) || null;
};

/**
 * Gets a step by its index
 * @param {number} index - The step index
 * @returns {Object|null} The step configuration or null if not found
 */
export const getStepByIndex = index => {
  return setupSteps[index] || null;
};

/**
 * Gets the current step configuration
 * @param {number} currentStep - Current step index
 * @returns {Object|null} Current step configuration
 */
export const getCurrentStep = currentStep => {
  return getStepByIndex(currentStep);
};

/**
 * Gets the next step configuration
 * @param {number} currentStep - Current step index
 * @returns {Object|null} Next step configuration
 */
export const getNextStep = currentStep => {
  return getStepByIndex(currentStep + 1);
};

/**
 * Gets the previous step configuration
 * @param {number} currentStep - Current step index
 * @returns {Object|null} Previous step configuration
 */
export const getPreviousStep = currentStep => {
  return getStepByIndex(currentStep - 1);
};

/**
 * Checks if there's a next step available
 * @param {number} currentStep - Current step index
 * @returns {boolean} True if next step exists
 */
export const hasNextStep = currentStep => {
  return currentStep < setupSteps.length - 1;
};

/**
 * Checks if there's a previous step available
 * @param {number} currentStep - Current step index
 * @returns {boolean} True if previous step exists
 */
export const hasPreviousStep = currentStep => {
  return currentStep > 0;
};

/**
 * Gets the total number of steps
 * @returns {number} Total number of steps
 */
export const getTotalSteps = () => {
  return setupSteps.length;
};

/**
 * Gets step data for a specific step
 * @param {string} stepId - Step ID
 * @param {Object} fullData - Full setup data
 * @returns {Object} Step-specific data
 */
export const getStepData = (stepId, fullData) => {
  const step = getStepById(stepId);
  if (!step || !fullData) return {};

  const stepData = {};
  step.dataFields.forEach(field => {
    if (fullData.hasOwnProperty(field)) {
      stepData[field] = fullData[field];
    }
  });

  return stepData;
};

/**
 * Validates if a step can be accessed based on dependencies
 * @param {string} stepId - Step ID to check
 * @param {string[]} completedSteps - Array of completed step IDs
 * @returns {boolean} Whether step can be accessed
 */
export const canAccessStep = (stepId, completedSteps) => {
  const step = getStepById(stepId);
  if (!step) return false;

  return step.dependencies.every(dep => completedSteps.includes(dep));
};

/**
 * Gets all accessible steps based on completed steps
 * @param {string[]} completedSteps - Array of completed step IDs
 * @returns {string[]} Array of accessible step IDs
 */
export const getAccessibleSteps = completedSteps => {
  return setupSteps
    .filter(step => canAccessStep(step.id, completedSteps))
    .map(step => step.id);
};
