import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
} from 'react';
import { useOnboarding as useOnboardingHook } from '../../Hooks/useOnboarding';
import { validateStep, validateFullSetup } from './utils/validation';
import { createPartialSetupData } from './types/onboarding';
import { useAutoSave } from '../../Hooks/useAutoSave';
import { dependencyManager } from './utils/dependencyManager';
import { useErrorHandler } from '../../Hooks/useErrorHandler';
import {
  errorRecoveryManager,
  errorStatePersistence,
  errorReporter,
} from './utils/errorRecovery';
import { useProgressTracking } from '../../Hooks/useProgressTracking';
import {
  trackEvent,
  trackStepCompletion,
  trackFieldChange,
  trackValidationError,
  getAnalyticsSummary,
} from './utils/analytics';

/**
 * Onboarding context
 */
const OnboardingContext = createContext(null);

/**
 * Onboarding provider component with enhanced state management
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} The onboarding provider
 */
const OnboardingProvider = ({ children }) => {
  const { state, actions } = useOnboardingHook();

  // Initialize auto-save system
  const autoSave = useAutoSave();

  // Initialize error handling system
  const errorHandler = useErrorHandler();

  // Initialize progress tracking system
  const progressTracking = useProgressTracking({
    config: {
      stepWeight: 25,
      enableAnalytics: true,
      enablePersistence: true,
      saveInterval: 30000,
    },
    onboardingState: state,
  });

  // Scroll to top when step changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [state.currentStep]);

  /**
   * Enhanced update data function with validation
   * @param {Object} updates - Data updates
   * @param {string} stepId - Current step ID for validation
   */
  const updateDataWithValidation = useCallback(
    (updates, stepId = null) => {
      // Validate the updates using type guards
      const validatedUpdates = createPartialSetupData(updates);

      // Update the data
      actions.updateData(validatedUpdates);

      // Clear previous errors for updated fields
      const updatedFields = Object.keys(validatedUpdates);
      const newErrors = { ...state.errors };
      updatedFields.forEach(field => {
        delete newErrors[field];
      });
      actions.setErrors(newErrors);

      // Validate the current step if stepId is provided
      if (stepId) {
        const validationResult = validateStep(stepId, {
          ...state.data,
          ...validatedUpdates,
        });
        if (!validationResult.isValid) {
          actions.setErrors(validationResult.errors);
        }
        if (Object.keys(validationResult.warnings).length > 0) {
          actions.setWarnings(validationResult.warnings);
        }
      }
    },
    [state.data, state.errors, actions]
  );

  /**
   * Validate current step
   * @param {string} stepId - Step ID to validate
   * @returns {boolean} Whether validation passed
   */
  const validateCurrentStep = useCallback(
    stepId => {
      const stepData = getStepData(stepId, state.data);
      console.log(`[OnboardingProvider] Validating ${stepId}:`, {
        stepData,
        fullData: state.data,
      });

      const validationResult = validateStep(stepId, stepData);
      console.log(
        `[OnboardingProvider] Validation result for ${stepId}:`,
        validationResult
      );

      actions.setErrors(validationResult.errors);
      actions.setWarnings(validationResult.warnings);

      return validationResult.isValid;
    },
    [state.data, actions]
  );

  /**
   * Validate entire setup
   * @returns {boolean} Whether validation passed
   */
  const validateFullSetupData = useCallback(() => {
    const validationResult = validateFullSetup(state.data);

    actions.setErrors(validationResult.errors);
    actions.setWarnings(validationResult.warnings);

    return validationResult.isValid;
  }, [state.data, actions]);

  /**
   * Get data for a specific step
   * @param {string} stepId - Step ID
   * @param {Object} data - Full setup data
   * @returns {Object} Step-specific data
   */
  const getStepData = useCallback((stepId, data) => {
    // The data is stored in step-specific keys like data.step1, data.step2, etc.
    // Return the step data directly if it exists
    if (data[stepId]) {
      return data[stepId];
    }

    // Fallback to the old structure for backward compatibility
    const stepDataMap = {
      step1: {
        accountType: data.accountType,
        association: data.association,
        club: data.club,
        isRightsHolder: data.isRightsHolder,
        isPermissionGiven: data.isPermissionGiven,
      },
      step2: {
        logo: data.logo,
      },
      step3: {
        themeSelected: data.themeSelected,
        themeId: data.themeId,
        themeName: data.themeName,
        customTheme: data.customTheme,
      },
      step4: {
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        deliveryAddress: data.deliveryAddress,
      },
    };

    return stepDataMap[stepId] || {};
  }, []);

  /**
   * Check if a step can be accessed using dependency manager
   * @param {string} stepId - Step ID to check
   * @returns {Object} Access result with details
   */
  const canAccessStep = useCallback(
    stepId => {
      const completedStepsSet = new Set(state.completedSteps);
      return dependencyManager.canAccessStep(
        stepId,
        completedStepsSet,
        state.data
      );
    },
    [state.completedSteps, state.data]
  );

  /**
   * Navigate to a specific step
   * @param {number} stepIndex - Step index to navigate to
   */
  const navigateToStep = useCallback(
    stepIndex => {
      const stepIds = ['step1', 'step2', 'step3', 'step4'];
      const targetStepId = stepIds[stepIndex];

      if (targetStepId && canAccessStep(targetStepId)) {
        actions.setStep(stepIndex);
      }
    },
    [canAccessStep, actions]
  );

  /**
   * Reset all onboarding data
   */
  const resetOnboarding = useCallback(() => {
    actions.reset();
  }, [actions]);

  /**
   * Get dependency information for a step
   * @param {string} stepId - Step ID
   * @returns {Object} Dependency information
   */
  const getStepDependencies = useCallback(stepId => {
    return dependencyManager.getDependencyChain(stepId);
  }, []);

  /**
   * Get blocking steps for a specific step
   * @param {string} stepId - Step ID
   * @returns {string[]} Array of blocking step IDs
   */
  const getBlockingSteps = useCallback(
    stepId => {
      const completedStepsSet = new Set(state.completedSteps);
      return dependencyManager.getBlockingSteps(stepId, completedStepsSet);
    },
    [state.completedSteps]
  );

  /**
   * Get next available steps
   * @returns {string[]} Array of available step IDs
   */
  const getAvailableSteps = useCallback(() => {
    const completedStepsSet = new Set(state.completedSteps);
    return dependencyManager.getAvailableSteps(completedStepsSet, state.data);
  }, [state.completedSteps, state.data]);

  /**
   * Validate dependency graph
   * @returns {Object} Validation result
   */
  const validateDependencyGraph = useCallback(() => {
    return dependencyManager.validateDependencyGraph();
  }, []);

  /**
   * Handle error with automatic recovery
   * @param {Error} error - Error to handle
   * @param {Object} context - Error context
   */
  const handleError = useCallback(
    async (error, context = {}) => {
      try {
        // Log error
        await errorHandler.logError(error, context, 'onboarding');

        // Attempt automatic recovery
        const recoveryResult =
          await errorRecoveryManager.attemptAutomaticRecovery(error, {
            ...context,
            operation: context.operation || 'unknown',
          });

        // Save error state
        errorStatePersistence.saveErrorState({
          error: error.message,
          context,
          recoveryResult,
          timestamp: new Date().toISOString(),
        });

        // Report error
        errorReporter.queueErrorReport({
          error: error.message,
          stack: error.stack,
          context,
          recoveryResult,
        });

        return recoveryResult;
      } catch (handlingError) {
        console.error('Failed to handle error:', handlingError);
        return { success: false, strategy: 'manual' };
      }
    },
    [errorHandler]
  );

  /**
   * Get error statistics
   * @returns {Object} Error statistics
   */
  const getErrorStats = useCallback(() => {
    return {
      handler: errorHandler.getErrorStats(),
      recovery: errorRecoveryManager.getRecoveryStats(),
      persistence: errorStatePersistence.getErrorStateStats(),
    };
  }, [errorHandler]);

  /**
   * Track analytics event
   * @param {string} type - Event type
   * @param {string} stepId - Step identifier
   * @param {Object} metadata - Additional event data
   */
  const trackAnalyticsEvent = useCallback((type, stepId, metadata = {}) => {
    trackEvent(type, stepId, metadata);
  }, []);

  /**
   * Track step completion with analytics
   * @param {string} stepId - Step identifier
   * @param {Object} stepData - Step data
   * @param {number} duration - Step duration in ms
   */
  const trackStepCompletionAnalytics = useCallback(
    (stepId, stepData, duration) => {
      trackStepCompletion(stepId, stepData, duration);
    },
    []
  );

  /**
   * Track field changes with analytics
   * @param {string} stepId - Step identifier
   * @param {string} fieldName - Field name
   * @param {any} oldValue - Previous value
   * @param {any} newValue - New value
   */
  const trackFieldChangeAnalytics = useCallback(
    (stepId, fieldName, oldValue, newValue) => {
      trackFieldChange(stepId, fieldName, oldValue, newValue);
    },
    []
  );

  /**
   * Track validation errors with analytics
   * @param {string} stepId - Step identifier
   * @param {Object} errors - Validation errors
   * @param {Object} warnings - Validation warnings
   */
  const trackValidationErrorAnalytics = useCallback(
    (stepId, errors, warnings) => {
      trackValidationError(stepId, errors, warnings);
    },
    []
  );

  /**
   * Get analytics summary
   * @returns {Object} Analytics summary
   */
  const getAnalyticsSummaryData = useCallback(() => {
    return getAnalyticsSummary();
  }, []);

  // Enhanced context value with additional functionality
  const contextValue = {
    state,
    actions: {
      ...actions,
      setHasAccount: actions.setHasAccount,
      setStep: actions.setStep,
      updateDataWithValidation,
      validateCurrentStep,
      validateFullSetupData,
      canAccessStep,
      navigateToStep,
      completeCurrentStep: actions.completeCurrentStep,
      resetOnboarding,
      getStepData,
      // Dependency management functions
      getStepDependencies,
      getBlockingSteps,
      getAvailableSteps,
      validateDependencyGraph,
      // Error handling functions
      handleError,
      getErrorStats,
      // Progress tracking functions
      startStep: progressTracking.startStep,
      failStep: progressTracking.failStep,
      completeSetup: progressTracking.completeSetup,
      abandonSetup: progressTracking.abandonSetup,
      saveProgress: progressTracking.saveProgress,
      loadProgress: progressTracking.loadProgress,
      calculateProgress: progressTracking.calculateProgress,
      calculateStepProgress: progressTracking.calculateStepProgress,
      getAnalytics: progressTracking.getAnalytics,
      // Analytics tracking functions
      trackAnalyticsEvent,
      trackStepCompletion: trackStepCompletionAnalytics,
      trackFieldChange: trackFieldChangeAnalytics,
      trackValidationError: trackValidationErrorAnalytics,
      getAnalyticsSummary: getAnalyticsSummaryData,
    },
    autoSave, // Include auto-save functionality
    errorHandler, // Include error handling functionality
    progress: progressTracking.progress, // Include progress data
    progressState: progressTracking.state, // Include progress state
    analytics: progressTracking.analytics, // Include analytics data
  };

  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
};

/**
 * Custom hook to use onboarding context
 * @returns {Object} Onboarding context value
 */
export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
};

export default OnboardingProvider;
