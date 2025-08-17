import { useState, useEffect } from 'react';
import { useOnboarding } from '../OnboardingProvider';
import { useAccountDetails } from '../../../context/userContext';
import {
  useAccountId,
  useCanSaveToCMS,
  useUserStatus,
} from '../../../Hooks/useOnboarding';
import { saveOnboardingProgress } from '../../../lib/onboardingApi';
import { Group, Container, Text, Alert, Stack } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { SelectFixturaSetting } from '../../Members/Common/formelements/Select_FixturaSettings';
import { AutoCompleteSelectAssociation } from '../../Members/Common/formelements/AutoComplete_Assoications';
import { AutoCompleteSelectClub } from '../../Members/Common/formelements/AutoComplete_Clubs';
import DBCheckbox from '../../Members/Common/formelements/CheckBox_FixturaSettings';
import { PaperWithBorder, Wrapper } from '../../Members/Common/Containers';
import { P } from '../../Members/Common/Type';
import { RoundedSectionContainer } from '@/components/UI/Containers/SectionContainer';
import { StepHeaderandDescription } from '@/components/pages/members/setup/phases/SetupSteps/Steps/StepHeaderandDescription';

import OnboardingStepWrapper from '../components/OnboardingStepWrapper';

/**
 * Step 1: Organization Setup component
 *
 * This component handles organization setup for the onboarding process.
 * It manages account type, association, club selection, and permissions.
 * Uses progressive disclosure to show relevant fields based on selections.
 *
 * Key Features:
 * - Progressive form disclosure (Association/Club sections hidden until Account Type selected)
 * - Database field pre-filling from account data
 * - Form validation and auto-save
 * - Integration with account context
 * - Step validation and progression
 *
 * @returns {JSX.Element} The organization setup step
 */
const Step1Organization = () => {
  const { state, actions } = useOnboarding();
  const { account } = useAccountDetails();
  const userStatus = useUserStatus();
  const accountId = useAccountId();
  const canSaveToCMS = useCanSaveToCMS();

  // Step management - using direct actions like Step 2
  const [stepData, setStepData] = useState({
    accountType: '',
    association: '',
    club: '',
    isRightsHolder: false,
    isPermissionGiven: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stepError, setStepError] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [associationId, setAssociationId] = useState(null);

  /**
   * Get selected value object for form components
   */
  const getSelectedValue = value => {
    if (!value) return null;

    // If it's already an object with ID and Name, return as is
    if (typeof value === 'object' && value?.ID && value?.Name) {
      return value;
    }

    // If it's a string, create the expected object structure
    if (typeof value === 'string' && value) {
      return { ID: null, Name: value };
    }

    return null;
  };

  // Load existing data on component mount
  useEffect(() => {
    // First, try to load from onboarding state
    if (state.data?.step1) {
      setStepData(prev => ({ ...prev, ...state.data.step1 }));
    }

    // Also load from account context as fallback
    if (account?.attributes) {
      // Handle associations and clubs as arrays
      const associationData = account.attributes.associations?.data;
      const clubData = account.attributes.clubs?.data;

      const accountData = {
        accountType:
          account.attributes.account_type?.data?.attributes?.Name || '',
        association:
          // Handle as array - get first item
          Array.isArray(associationData) && associationData.length > 0
            ? associationData[0].attributes.Name
            : associationData?.attributes?.Name || '',
        club:
          // Handle as array - get first item
          Array.isArray(clubData) && clubData.length > 0
            ? clubData[0].attributes.Name
            : clubData?.attributes?.Name || '',
        isRightsHolder: account.attributes.isRightsHolder === true,
        isPermissionGiven: account.attributes.isPermissionGiven === true,
      };

      // Set association ID if we have association data
      if (Array.isArray(associationData) && associationData.length > 0) {
        setAssociationId(associationData[0].id);
      } else if (associationData?.id) {
        setAssociationId(associationData.id);
      }

      // Only update if we have actual data and it's different from current step data
      const hasNewData = Object.values(accountData).some(
        value => value !== '' && value !== false
      );

      if (hasNewData) {
        setStepData(prev => ({ ...prev, ...accountData }));
      }
    }
  }, [state.data?.step1, account?.attributes]);

  // Update validation state when step data changes
  useEffect(() => {
    const newIsValid = !!(
      stepData.accountType &&
      stepData.association &&
      (stepData.accountType === 'Association' || stepData.club) &&
      stepData.isRightsHolder &&
      stepData.isPermissionGiven
    );

    if (isValid !== newIsValid) {
      console.log('[Step1] Validation state changed:', {
        isValid: newIsValid,
        accountType: stepData.accountType,
        association: stepData.association,
        club: stepData.club,
        isRightsHolder: stepData.isRightsHolder,
        isPermissionGiven: stepData.isPermissionGiven,
      });
      setIsValid(newIsValid);
    }
  }, [stepData, isValid]);

  /**
   * Handle form field changes
   */
  const handleFieldChange = (field, value) => {
    // Extract the Name from the value object if it's an object
    const fieldValue =
      typeof value === 'object' && value?.Name ? value.Name : value;

    setStepData(prev => ({ ...prev, [field]: fieldValue }));

    // Clear step error
    if (stepError) {
      setStepError(null);
    }
  };

  /**
   * Validate step data
   */
  const validateStep = () => {
    if (!stepData.accountType) {
      setStepError('Please select an account type');
      return false;
    }

    // Only validate association if account type is selected
    if (stepData.accountType && !stepData.association) {
      setStepError('Please select an association');
      return false;
    }

    // Only validate club if account type is not "Association" and both account type and association are selected
    if (
      stepData.accountType &&
      stepData.accountType !== 'Association' &&
      stepData.association &&
      !stepData.club
    ) {
      setStepError('Please select a club');
      return false;
    }

    if (!stepData.isRightsHolder) {
      setStepError('You must confirm you are the rights holder');
      return false;
    }

    if (!stepData.isPermissionGiven) {
      setStepError('You must give permission to proceed');
      return false;
    }

    return true;
  };

  /**
   * Handle continue to next step
   *
   * This function handles the step completion process. It validates that all
   * required fields are filled, saves the onboarding progress, and advances to the next step.
   */
  const handleContinue = async () => {
    if (!validateStep()) {
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
      console.log('[Step1] Completing step, current step:', state.currentStep);

      // Update onboarding data in local state
      const updatedData = { ...state.data, step1: stepData };
      actions.updateData({ step1: stepData });

      // Save to database
      await saveOnboardingProgress(updatedData);

      // Mark step as complete and automatically advance to next step
      await actions.completeCurrentStep();

      console.log('[Step1] Step completed successfully');
    } catch (error) {
      console.error('[Step1] Error submitting step:', error);
      setStepError(
        error.message ||
          'Failed to save your organization details. Please try again.'
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
      stepId='step1'
      stepNumber={1}
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
            Header={
              'Tell Us About Your Organization – We Want to Get It Right!'
            }
            Description={
              'Tell us about your organization so we can ensure accuracy and tailor your experience accordingly.'
            }
          />
        }
        bottomContent={
          <>
            <Container size='lg' py={0}>
              {/* Check for valid account ID */}
              {!accountId ? (
                <Alert
                  icon={<IconAlertTriangle size={16} />}
                  title='Account Not Ready'
                  color='red'
                >
                  <Text size='sm'>
                    Your account is not ready yet. Please ensure your account
                    has been created before proceeding.
                  </Text>
                </Alert>
              ) : (
                /* Form Fields */
                <Stack spacing='sm'>
                  {/* Account Type */}
                  <div>
                    <LabelMe label='We are a ...' />

                    <PaperWithBorder mb={0}>
                      <SelectFixturaSetting
                        RelationProperty='account_type'
                        setHasUpdated={() => {}}
                        CollectionFrom='account-types'
                        CollectionSaveTo='accounts'
                        SelectedBaseValueObject={getSelectedValue(
                          stepData.accountType
                        )}
                        SelectLabel='Select Account Type'
                        SelectPlaceholder='Select Account Type'
                        COLLECTIONID={accountId}
                        showSelectInit={!stepData.accountType}
                        onSelectionChange={value =>
                          handleFieldChange('accountType', value)
                        }
                      />
                    </PaperWithBorder>
                  </div>

                  {/* Association */}
                  {stepData.accountType && (
                    <div>
                      <LabelMe label='Select Your Association' />

                      <PaperWithBorder mb={0}>
                        <AutoCompleteSelectAssociation
                          COLLECTIONID={accountId}
                          SelectedBaseValueObject={getSelectedValue(
                            stepData.association
                          )}
                          setAssociationID={setAssociationId}
                          onSelectionChange={value =>
                            handleFieldChange('association', value)
                          }
                        />
                      </PaperWithBorder>
                    </div>
                  )}

                  {/* Club (conditional) */}
                  {stepData.accountType &&
                    stepData.accountType !== 'Association' && (
                      <div>
                        <LabelMe label='Select Your Club' />

                        <PaperWithBorder mb={0}>
                          {!stepData.association ? (
                            <Text
                              color='dimmed'
                              size='sm'
                              p='md'
                              style={{ fontStyle: 'italic' }}
                            >
                              ⏳ Please select an association first
                            </Text>
                          ) : associationId === null ? (
                            'Awaiting Association Selection'
                          ) : (
                            <AutoCompleteSelectClub
                              COLLECTIONID={accountId}
                              SelectedBaseValueObject={getSelectedValue(
                                stepData.club
                              )}
                              AssociationID={associationId}
                              onSelectionChange={value =>
                                handleFieldChange('club', value)
                              }
                            />
                          )}
                        </PaperWithBorder>
                      </div>
                    )}

                  {/* Permissions */}
                  <div>
                    <LabelMe label='Permissions' />

                    <PaperWithBorder mb={0}>
                      <DBCheckbox
                        label='You hold the rights or have permission from the rights holder for the specified organization.'
                        name='isRightsHolder'
                        collectionId={accountId}
                        CollectionSaveTo='accounts'
                        setHasUpdated={() => {}}
                        currentValue={stepData.isRightsHolder}
                        onSelectionChange={value =>
                          handleFieldChange('isRightsHolder', value)
                        }
                      />

                      <DBCheckbox
                        label="By checking this box, you authorize Fixtura to access and utilize PlayHQ data to create digital assets for your organization on a weekly basis. You also grant Fixtura permission to contact PlayHQ on your behalf to retrieve your organization's weekly results, fixtures, and player performances."
                        name='isPermissionGiven'
                        collectionId={accountId}
                        CollectionSaveTo='accounts'
                        setHasUpdated={() => {}}
                        currentValue={stepData.isPermissionGiven}
                        onSelectionChange={value =>
                          handleFieldChange('isPermissionGiven', value)
                        }
                      />
                    </PaperWithBorder>
                  </div>

                  {/* Important Note */}
                  <Alert icon={<IconAlertTriangle size={16} />} color='yellow'>
                    <Text size='sm' weight={500}>
                      <strong>Important:</strong> These settings CANNOT be
                      changed in your admin panel after setup is complete.
                    </Text>
                  </Alert>
                </Stack>
              )}
            </Container>
          </>
        }
      />
    </OnboardingStepWrapper>
  );
};

const LabelMe = ({ label }) => {
  return (
    <Wrapper>
      <P color={6} Weight={900} marginBottom={0} textTransform='uppercase'>
        {label}
      </P>
    </Wrapper>
  );
};

export default Step1Organization;
