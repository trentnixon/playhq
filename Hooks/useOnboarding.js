import { useState, useEffect, useCallback, useRef } from 'react';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from '../components/Onboarding/utils/storage';
import { validateStep } from '../components/Onboarding/utils/validation';
import { calculateProgress } from '../components/Onboarding/utils/helpers';
import { checkUserAccount, loadOnboardingProgress } from '../lib/onboardingApi';
import { useAccountDetails } from '../context/userContext';

/**
 * Custom hook for managing onboarding state
 * @returns {Object} Onboarding state and actions
 */
export const useOnboarding = () => {
  const [state, setState] = useState({
    currentStep: 0,
    completedSteps: [],
    data: {},
    errors: {},
    warnings: {},
    isDirty: false,
    isSaving: false,
    isSubmitting: false,
    lastAutoSave: null,
    setupProgress: 0,
    hasAccount: false,
    isLoading: true,
  });

  // Use ref to track previous data to prevent unnecessary auto-saves
  const prevDataRef = useRef({});
  const { ReRender } = useAccountDetails();

  // Function to initialize onboarding state
  const initializeOnboarding = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));

      // Check if user has an account
      const accountData = await checkUserAccount();

      if (accountData) {
        // User has account, load onboarding progress
        const savedProgress = await loadOnboardingProgress();
        const savedData = savedProgress || loadFromLocalStorage();

        setState(prev => ({
          ...prev,
          hasAccount: true,
          data: savedData || {},
          setupProgress: calculateProgress(savedData || {}),
          isLoading: false,
        }));

        if (savedData) {
          prevDataRef.current = savedData;
        }

        // Trigger account context refresh to ensure account data is loaded
        ReRender();

        // Add a small delay to allow account context to load
        setTimeout(() => {
          // Account context refresh delay completed
        }, 1000);
      } else {
        // User doesn't have account, show initial setup
        setState(prev => ({
          ...prev,
          hasAccount: false,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('💥 initializeOnboarding - Error:', error);
      setState(prev => ({
        ...prev,
        hasAccount: false,
        isLoading: false,
      }));
    }
  }, [ReRender]);

  // Check user account status and load initial data
  useEffect(() => {
    initializeOnboarding();
  }, [initializeOnboarding]);

  // Auto-save effect
  useEffect(() => {
    // Only auto-save if data has actually changed and we're not already saving
    if (
      state.isDirty &&
      !state.isSaving &&
      JSON.stringify(state.data) !== JSON.stringify(prevDataRef.current)
    ) {
      const timeoutId = setTimeout(() => {
        setState(prev => ({ ...prev, isSaving: true }));
        saveToLocalStorage(state.data);
        prevDataRef.current = state.data;
        setState(prev => ({
          ...prev,
          isSaving: false,
          isDirty: false,
          lastAutoSave: new Date(),
        }));
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [state.isDirty, state.isSaving, state.data]);

  const updateData = useCallback(updates => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...updates },
      isDirty: true,
      setupProgress: calculateProgress({ ...prev.data, ...updates }),
    }));
  }, []);

  const setStep = useCallback(step => {
    setState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const setErrors = useCallback(errors => {
    setState(prev => ({ ...prev, errors }));
  }, []);

  const setWarnings = useCallback(warnings => {
    setState(prev => ({ ...prev, warnings }));
  }, []);

  const markComplete = useCallback(stepId => {
    setState(prev => ({
      ...prev,
      completedSteps: prev.completedSteps.includes(stepId)
        ? prev.completedSteps
        : [...prev.completedSteps, stepId],
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      currentStep: 0,
      completedSteps: [],
      data: {},
      errors: {},
      warnings: {},
      isDirty: false,
      isSaving: false,
      isSubmitting: false,
      lastAutoSave: null,
      setupProgress: 0,
      hasAccount: false,
      isLoading: false,
    });
    prevDataRef.current = {};
  }, []);

  const setSubmitting = useCallback(isSubmitting => {
    setState(prev => ({ ...prev, isSubmitting }));
  }, []);

  const setHasAccount = useCallback(hasAccount => {
    setState(prev => ({ ...prev, hasAccount }));
  }, []);

  // Function to complete current step and move to next
  const completeCurrentStep = useCallback(() => {
    setState(prev => {
      const stepIds = ['step1', 'step2', 'step3', 'step4', 'step5'];
      const currentStepId = stepIds[prev.currentStep];
      const newCompletedSteps = prev.completedSteps.includes(currentStepId)
        ? prev.completedSteps
        : [...prev.completedSteps, currentStepId];
      const newCurrentStep =
        prev.currentStep < stepIds.length - 1
          ? prev.currentStep + 1
          : prev.currentStep;
      return {
        ...prev,
        currentStep: newCurrentStep,
        completedSteps: newCompletedSteps,
      };
    });
  }, []);

  // Function to refresh account status
  const refreshAccount = useCallback(async () => {
    await initializeOnboarding();
  }, [initializeOnboarding]);

  return {
    state,
    actions: {
      updateData,
      setErrors,
      setWarnings,
      markComplete,
      reset,
      setSubmitting,
      setHasAccount,
      setStep,
      completeCurrentStep,
      refreshAccount,
    },
  };
};

/**
 * Comprehensive user status hook that combines onboarding state with account details
 * @returns {Object} Complete user status information
 */
export const useUserStatus = () => {
  const { state } = useOnboarding();
  const { account } = useAccountDetails();

  // Helper functions for easy access
  const getAccountId = () => account?.id || null;
  const getAccountType = () =>
    account?.attributes?.account_type?.data?.attributes?.Name || null;
  const getAssociation = () =>
    account?.attributes?.associations?.data?.attributes?.Name || null;
  const getClub = () =>
    account?.attributes?.clubs?.data?.attributes?.Name || null;
  const isAccountReady = () => !!(account?.id && account?.attributes?.isActive);
  const canSaveToCMS = () => !!(account?.id && account?.id !== 'temp-id');

  return {
    // Onboarding Status
    hasAccount: state.hasAccount,
    isLoading: state.isLoading,
    currentStep: state.currentStep,
    completedSteps: state.completedSteps,

    // Account Details
    accountExists: !!account,
    accountId: account?.id || null,
    accountType:
      account?.attributes?.account_type?.data?.attributes?.Name || null,
    association:
      account?.attributes?.associations?.data?.attributes?.Name || null,
    club: account?.attributes?.clubs?.data?.attributes?.Name || null,

    // Account Status
    isActive: account?.attributes?.isActive || false,
    hasCompletedStartSequence:
      account?.attributes?.hasCompletedStartSequence || false,
    onboardingCompleted: account?.attributes?.onboarding_completed || false,

    // Trial Status
    trialStatus: account?.attributes?.trialStatus || null,
    trialNotificationStatus:
      account?.attributes?.trialNotificationStatus || null,

    // Raw Data
    account,
    onboardingState: state,

    // Helper Functions
    getAccountId,
    getAccountType,
    getAssociation,
    getClub,
    isAccountReady,
    canSaveToCMS,
  };
};

/**
 * Simple hook to get the current account ID
 * @returns {string|null} The account ID or null if not available
 */
export const useAccountId = () => {
  const { accountId } = useUserStatus();
  return accountId;
};

/**
 * Hook to check if we can save to CMS (has real account ID)
 * @returns {boolean} True if we can save to CMS
 */
export const useCanSaveToCMS = () => {
  const { canSaveToCMS } = useUserStatus();
  return canSaveToCMS();
};
