import { useState, useEffect } from 'react';
import { useOnboarding } from '../OnboardingProvider';
import { useAccountDetails } from '../../../context/userContext';
import { useAccountId, useCanSaveToCMS } from '../../../Hooks/useOnboarding';
import { saveOnboardingProgress } from '../../../lib/onboardingApi';
import { SelectATheme } from '../../Members/Common/Customiser/Design/SelectATheme';
import OnboardingStepWrapper from '../components/OnboardingStepWrapper';

/**
 * Step 3: Theme/Branding component
 *
 * This component handles theme and branding selection for the onboarding process.
 * It integrates with the existing theme selection system and provides a streamlined
 * UX for users to choose predefined themes or create custom ones.
 *
 * Key Features:
 * - Theme selection from predefined options
 * - Custom theme creation
 * - Integration with account context
 * - Step validation and progression
 *
 * @returns {JSX.Element} The theme/branding step
 */
const Step3Theme = () => {
  const { account, ReRender } = useAccountDetails();
  const accountId = useAccountId();
  const canSaveToCMS = useCanSaveToCMS();

  // Step management - using direct actions like Step 1 and Step 2
  const { state, actions } = useOnboarding();
  const [stepData, setStepData] = useState({
    themeSelected: false,
    themeId: null,
    themeName: null,
    customTheme: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stepError, setStepError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  // Load existing data on component mount
  useEffect(() => {
    // First, try to load from onboarding state
    if (state.data?.step3) {
      setStepData(prev => ({ ...prev, ...state.data.step3 }));
    }

    // Also load from account context as fallback
    if (account?.attributes?.theme?.data) {
      const themeData = {
        themeSelected: true,
        themeId: account.attributes.theme.data.id,
        themeName: account.attributes.theme.data.attributes.Name,
        customTheme: account.attributes.theme.data.attributes.isCustom || false,
      };

      // Only update if we have actual data and it's different from current step data
      const hasNewData = Object.values(themeData).some(
        value => value !== '' && value !== false
      );

      if (hasNewData) {
        setStepData(prev => ({ ...prev, ...themeData }));
      }
    }
  }, [state.data?.step3, account?.attributes?.theme?.data]);

  // Check if account data is fully loaded and ready for operations
  // Since we have associations/clubs data, we can proceed even if account_type is not fully loaded
  const isAccountLoaded = !!(
    account?.id &&
    (account?.attributes?.associations?.data ||
      account?.attributes?.clubs?.data)
  );

  // Update validation state when step data changes
  useEffect(() => {
    const newIsValid = !!(stepData.themeSelected && stepData.themeId);

    if (isValid !== newIsValid) {
      setIsValid(newIsValid);
    }
  }, [stepData, isValid, isAccountLoaded]);

  // Show loading state if account data isn't loaded yet
  if (!isAccountLoaded) {
    return (
      <OnboardingStepWrapper
        stepId='step3'
        isLoading={true}
        error={null}
        isValid={false}
        onRetry={() => {}}
        onContinue={() => {}}
        continueLabel='Next Step'
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading account data...
        </div>
      </OnboardingStepWrapper>
    );
  }

  /**
   * Handle theme selection
   *
   * This function is called when a user selects a theme from the SelectATheme component
   *
   * @param {Object} theme - The selected theme object
   */
  const handleThemeSelection = theme => {
    const newStepData = {
      themeSelected: true,
      themeId: theme.id,
      themeName: theme.attributes.Name,
      customTheme: theme.attributes.isCustom || false,
    };

    setStepData(newStepData);

    // Update global state
    actions.updateData({
      step3: newStepData,
    });
  };

  /**
   * Handle continue to next step
   *
   * This function handles the step completion process. It validates that a theme
   * has been selected, saves the onboarding progress, and advances to the next step.
   */
  const handleContinue = async () => {
    if (!isValid) {
      setStepError('Please select a theme first');
      return;
    }

    // Check if user has an account and can save to CMS
    if (!accountId) {
      setStepError(
        'No account ID found. Please ensure account is created first.'
      );
      return;
    }

    if (!canSaveToCMS) {
      setStepError('Cannot save to CMS - account not ready or using temp ID.');
      return;
    }

    setIsLoading(true);
    setStepError(null);

    try {
      // Update onboarding data in local state
      const updatedData = { ...state.data, step3: stepData };
      actions.updateData({ step3: stepData });

      // Save to database
      await saveOnboardingProgress(updatedData);

      // Mark step as complete and automatically advance to next step
      await actions.completeCurrentStep();
    } catch (error) {
      setStepError(
        error.message ||
          'Failed to save your theme selection. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Retry function for error handling
   * Resets error state and loading state to allow user to try again
   */
  const retry = () => {
    setStepError(null);
    setIsLoading(false);
  };

  return (
    <OnboardingStepWrapper
      stepId='step3'
      stepNumber={3}
      isLoading={isLoading}
      error={stepError}
      isValid={isValid}
      onRetry={retry}
      onContinue={handleContinue}
      continueLabel='Next Step'
    >
      <SelectATheme isOnboarding={true} onThemeSelect={handleThemeSelection} />
    </OnboardingStepWrapper>
  );
};

export default Step3Theme;
