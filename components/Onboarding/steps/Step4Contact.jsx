import { useState, useEffect } from 'react';
import { useOnboarding } from '../OnboardingProvider';
import { useAccountDetails } from '../../../context/userContext';
import { useAccountId, useCanSaveToCMS } from '../../../Hooks/useOnboarding';
import { saveOnboardingProgress } from '../../../lib/onboardingApi';
import { Input_FixturaSetting } from '../../Members/Common/formelements/Input_FixtruaSettings';
import { RoundedSectionContainer } from '../../UI/Containers/SectionContainer';
import { StepHeaderandDescription } from '../../pages/members/setup/phases/SetupSteps/Steps/StepHeaderandDescription';
import OnboardingStepWrapper from '../components/OnboardingStepWrapper';

/**
 * Step 4: Contact Information component
 *
 * This component handles contact and delivery information setup for the onboarding process.
 * It manages contact name and delivery email fields, following the original UserDetails pattern.
 * The registered account email is not changed as it's used for account communications.
 *
 * Key Features:
 * - Contact name for content delivery
 * - Delivery email address setup
 * - Integration with account context
 * - Form validation and auto-save
 * - Step validation and progression
 *
 * @returns {JSX.Element} The contact information step
 */
const Step4Contact = () => {
  const { state, actions } = useOnboarding();
  const { account, ReRender } = useAccountDetails();
  const accountId = useAccountId();
  const canSaveToCMS = useCanSaveToCMS();

  // Step management - using direct actions like other steps
  const [stepData, setStepData] = useState({
    contactName: '',
    deliveryAddress: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stepError, setStepError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  // Form field configuration following original UserDetails pattern
  const INPUTS = [
    {
      Name: 'Name',
      Label: 'Who would you like the Content email addressed to?',
      Field: 'FirstName',
      Validators: [
        value => value.length > 0 || 'Name is required',
        value => value.length >= 2 || 'Name must be at least 2 characters',
        value =>
          /^[a-zA-Z\s]+$/.test(value) ||
          'Name can only contain letters and spaces',
      ],
    },
    {
      Name: 'Email',
      Label: 'Email address for delivery',
      Field: 'DeliveryAddress',
      Validators: [
        value => value.length > 0 || 'Email is required',
        value => value.includes('@') || 'Email must contain @',
        value =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
          'Please enter a valid email address',
      ],
    },
  ];

  // Load existing data on component mount and when account data changes
  useEffect(() => {
    // First, try to load from onboarding state
    if (state.data?.step4) {
      setStepData(prev => ({ ...prev, ...state.data.step4 }));
    }

    // Also load from account context as fallback
    if (account?.attributes) {
      const accountData = {
        contactName: account.attributes.FirstName || '',
        deliveryAddress: account.attributes.DeliveryAddress || '',
      };

      // Always update step data with account data to ensure UI reflects saved values
      setStepData(prev => ({ ...prev, ...accountData }));
    }
  }, [state.data?.step4, account?.attributes]);

  // Force re-render when account data changes to update Input_FixturaSetting components
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    // Increment forceUpdate when account data changes to trigger re-render
    console.log('[Step4] Account data changed - triggering force update:', {
      FirstName: account?.attributes?.FirstName,
      DeliveryAddress: account?.attributes?.DeliveryAddress,
      currentForceUpdate: forceUpdate,
    });
    setForceUpdate(prev => prev + 1);
  }, [account?.attributes?.FirstName, account?.attributes?.DeliveryAddress]);

  // Check if account data is fully loaded and ready for operations
  const isAccountLoaded = !!(account?.id && account?.attributes);

  // Update validation state when step data changes
  useEffect(() => {
    const newIsValid = !!(
      stepData.contactName &&
      stepData.contactName.length >= 2 &&
      /^[a-zA-Z\s]+$/.test(stepData.contactName) &&
      stepData.deliveryAddress &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData.deliveryAddress)
    );

    if (isValid !== newIsValid) {
      setIsValid(newIsValid);
    }
  }, [stepData, isValid, isAccountLoaded]);

  /**
   * Handle field changes from Input_FixturaSetting components
   */
  const handleFieldChange = (field, value) => {
    console.log('[Step4] Field change:', field, value);

    // Update local state
    setStepData(prev => ({ ...prev, [field]: value }));

    // Update onboarding state
    actions.updateData({
      step4: { ...stepData, [field]: value },
    });
  };

  /**
   * Validate current step data
   * @returns {boolean} Whether validation passed
   */
  const validateStep = () => {
    const errors = {};

    // Contact name validation
    if (!stepData.contactName) {
      errors.contactName = ['Contact name is required'];
    } else if (stepData.contactName.length < 2) {
      errors.contactName = ['Name must be at least 2 characters'];
    } else if (!/^[a-zA-Z\s]+$/.test(stepData.contactName)) {
      errors.contactName = ['Name can only contain letters and spaces'];
    }

    // Delivery email validation
    if (!stepData.deliveryAddress) {
      errors.deliveryAddress = ['Delivery email is required'];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData.deliveryAddress)) {
      errors.deliveryAddress = ['Please enter a valid delivery email address'];
    }

    // Update errors in onboarding state
    actions.setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  /**
   * Handle continue button click
   */
  const handleContinue = async () => {
    if (!isValid) {
      setStepError('Please complete all required fields');
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
      // Validate step data
      if (!validateStep()) {
        setStepError('Please fix the validation errors');
        setIsLoading(false);
        return;
      }

      // Update onboarding state with step completion data
      const updatedData = { ...state.data, step4: stepData };
      actions.updateData({ step4: stepData });

      // Save step progress to database (not the actual field data - that's handled by Input_FixturaSetting)
      await saveOnboardingProgress(updatedData);

      // Force refresh account data to ensure UI updates
      ReRender();

      // Complete step and advance
      await actions.completeCurrentStep();
    } catch (error) {
      console.error('💥 Step4Contact - handleContinue error:', error);
      setStepError(
        error.message || 'Failed to save contact information. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle retry
   */
  const retry = () => {
    setStepError(null);
    setIsLoading(false);
  };

  // Show loading state if account data isn't loaded yet
  if (!isAccountLoaded) {
    return (
      <OnboardingStepWrapper
        stepId='step4'
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

  return (
    <OnboardingStepWrapper
      stepId='step4'
      stepNumber={4}
      isLoading={isLoading}
      error={stepError}
      isValid={isValid}
      onRetry={retry}
      onContinue={handleContinue}
      continueLabel='Next Step'
    >
      <RoundedSectionContainer
        headerContent={''}
        topContent={
          <StepHeaderandDescription
            Header={'Contact & Delivery Information'}
            Description={`Let's set up who will receive your content and where to deliver it.`}
          />
        }
        bottomContent={
          <>
            {INPUTS.map((Input, i) => {
              const fieldValue =
                account?.attributes?.[Input.Field] ||
                stepData[
                  Input.Field === 'FirstName'
                    ? 'contactName'
                    : 'deliveryAddress'
                ] ||
                null;

              console.log(`[Step4] Rendering ${Input.Field}:`, {
                fieldValue,
                accountValue: account?.attributes?.[Input.Field],
                stepDataValue:
                  stepData[
                    Input.Field === 'FirstName'
                      ? 'contactName'
                      : 'deliveryAddress'
                  ],
                forceUpdate,
              });

              return (
                <Input_FixturaSetting
                  key={`${Input.Field}-${account?.id}-${
                    fieldValue || 'empty'
                  }-${forceUpdate}-${i}`}
                  Input={Input}
                  user={{
                    id: account?.id,
                    attributes: {
                      ...account?.attributes,
                      // Use account data if available, otherwise use step data as fallback
                      [Input.Field]: fieldValue,
                    },
                  }}
                  setHasUpdated={() => {}} // Not needed for onboarding
                  editingState={true}
                  canCancel={false}
                  onSelectionChange={value =>
                    handleFieldChange(
                      Input.Field === 'FirstName'
                        ? 'contactName'
                        : 'deliveryAddress',
                      value
                    )
                  }
                />
              );
            })}
          </>
        }
      />
    </OnboardingStepWrapper>
  );
};

export default Step4Contact;
