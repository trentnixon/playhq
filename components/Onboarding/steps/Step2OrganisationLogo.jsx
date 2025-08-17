import { useState, useEffect } from 'react';
import { useOnboarding } from '../OnboardingProvider';
import { useAccountDetails } from '../../../context/userContext';
import {
  useAccountId,
  useCanSaveToCMS,
  useUserStatus,
} from '../../../Hooks/useOnboarding';
import { saveOnboardingProgress } from '../../../lib/onboardingApi';
import { Group, Text, Box, Center, Image, Paper } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { BTN_ONCLICK } from '../../Members/Common/utils/Buttons';
import { useSetLogo } from '../../../Hooks/useOrganisationLogo';
import StrapiImageUploader from '../../pages/members/sponsors/Form/ImageUploader';
import { RoundedSectionContainer } from '../../UI/Containers/SectionContainer';
import { StepHeaderandDescription } from '../../pages/members/setup/phases/SetupSteps/Steps/StepHeaderandDescription';
import OnboardingStepWrapper from '../components/OnboardingStepWrapper';
import {
  FindAccountLogo,
  FindAccountTypeOBJ,
  FindAccountTypeAPI,
} from '../../../lib/actions';

/**
 * Step 2: Organization Logo component
 * Handles logo upload and storage for the onboarding process
 */
const Step2OrganisationLogo = () => {
  const { account, ReRender } = useAccountDetails();
  const accountId = useAccountId();
  const userStatus = useUserStatus();

  // Logo upload states
  const [uploadLogo, setUploadLogo] = useState(false);
  const [Logo, setLogo] = useState(null);
  const [LogoPath, setLogoPath] = useState(null);
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [setLogoToAccount, loading, error] = useSetLogo();

  // Step management
  const { state, actions } = useOnboarding();
  const [stepData, setStepData] = useState({
    logo: null,
    logoUrl: null,
    logoUploaded: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [stepError, setStepError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  // Close upload interface when logo is selected
  useEffect(() => {
    if (LogoPath) {
      setUploadLogo(false);
    }
  }, [LogoPath]);

  /**
   * Save logo to account
   */
  const saveLogoToAccount = async () => {
    if (!accountId || !Logo) {
      setStepError('No account ID or logo available');
      return false;
    }

    try {
      const OBJ = {
        data: { Logo: [Logo] },
      };

      const accountTypeObj = FindAccountTypeOBJ(account);
      const accountTypeAPI = FindAccountTypeAPI(account);

      if (!accountTypeObj || !accountTypeAPI) {
        throw new Error('Account type information not available');
      }

      await setLogoToAccount(accountTypeObj.id, OBJ, accountTypeAPI);

      const logoUrl = LogoPath[0]?.url;
      setUploadedLogo(logoUrl);

      // Update step data
      const newStepData = {
        logo: {
          file: Logo,
          url: logoUrl,
          preview: logoUrl,
        },
        logoUrl: logoUrl,
        logoUploaded: true,
      };
      setStepData(newStepData);
      setIsValid(true);
      ReRender();

      // Update global state
      actions.updateData({
        step2: newStepData,
      });

      setLogoPath(null);
      setUploadLogo(false);
      return true;
    } catch (err) {
      setStepError('Failed to save logo to account');
      return false;
    }
  };

  /**
   * Handle continue to next step
   */
  const handleContinue = async () => {
    if (!isValid) {
      setStepError('Please upload a logo first');
      return;
    }

    setIsLoading(true);
    setStepError(null);

    try {
      // Update onboarding data in local state
      actions.updateData({ step2: stepData });

      // Save to database
      await saveOnboardingProgress({ ...state.data, step2: stepData });

      // Mark step as complete and advance to next step
      await actions.completeCurrentStep();
    } catch (error) {
      setStepError('Failed to save your logo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Retry function for error handling
   */
  const retry = () => {
    setStepError(null);
    setIsLoading(false);
  };

  // Check if logo exists
  const hasLogo = uploadedLogo || FindAccountLogo(account) || stepData.logo;

  // Update validation state when step data changes
  useEffect(() => {
    const newIsValid = !!hasLogo;
    if (isValid !== newIsValid) {
      setIsValid(newIsValid);
    }
  }, [hasLogo, isValid]);

  return (
    <OnboardingStepWrapper
      stepId='step2'
      stepNumber={2}
      isLoading={isLoading || loading}
      error={stepError || error}
      isValid={isValid}
      onRetry={retry}
      onContinue={handleContinue}
      continueLabel='Next Step'
    >
      <RoundedSectionContainer
        headerContent={''}
        topContent={
          <StepHeaderandDescription
            Header='Organization Logo'
            Description='Upload a high-resolution image of your logo to ensure the best quality representation for your organization.'
          />
        }
        bottomContent={
          <>
            <Paper
              radius='md'
              mb={0}
              p='0'
              sx={theme => ({ backgroundColor: theme.white })}
            >
              <Group position='right' mb={20}>
                <BTN_ONCLICK
                  LABEL={uploadLogo ? `Close` : `Upload a Logo`}
                  THEME={`cta`}
                  HANDLE={() => {
                    setUploadLogo(!uploadLogo);
                  }}
                />
              </Group>

              {uploadLogo && (
                <StrapiImageUploader
                  setLogo={setLogo}
                  setLogoPath={setLogoPath}
                  SAVEDLOGO={false}
                />
              )}

              {LogoPath ? (
                <NewLogoImageAndStore
                  image={LogoPath[0]?.url}
                  saveLogoToAccount={saveLogoToAccount}
                  setLogoPath={setLogoPath}
                />
              ) : (
                !uploadLogo && (
                  <>
                    {uploadedLogo ? (
                      <CurrentLogo LOGO={uploadedLogo} />
                    ) : FindAccountLogo(account) ? (
                      <CurrentLogo LOGO={FindAccountLogo(account)} />
                    ) : (
                      <NewLogoCopy />
                    )}
                  </>
                )
              )}
            </Paper>
          </>
        }
      />
    </OnboardingStepWrapper>
  );
};

/**
 * Display current logo
 */
const CurrentLogo = ({ LOGO }) => {
  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.colors.gray[3],
        textAlign: 'center',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        margin: '20px auto',
      })}
    >
      <Center>
        <Image src={LOGO} width={200} />
      </Center>
    </Box>
  );
};

/**
 * Display new logo with save/cancel options
 */
const NewLogoImageAndStore = ({ image, saveLogoToAccount, setLogoPath }) => {
  return (
    <Box
      sx={theme => ({
        backgroundColor: theme.colors.gray[0],
        textAlign: 'center',
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: 'pointer',
        width: '60%',
        margin: '20px auto',
        '&:hover': {
          backgroundColor: theme.colors.gray[1],
        },
      })}
    >
      <Center mb={20}>
        <Image src={image} width={200} alt='Uploaded Logo' />
      </Center>
      <Group position='center'>
        <BTN_ONCLICK
          LABEL={`Save Logo...`}
          THEME={`cta`}
          HANDLE={saveLogoToAccount}
        />
        <BTN_ONCLICK
          LABEL={`Cancel`}
          THEME={`error`}
          HANDLE={() => {
            setLogoPath(false);
          }}
        />
      </Group>
    </Box>
  );
};

/**
 * Display upload prompt when no logo exists
 */
const NewLogoCopy = () => {
  return (
    <Group position='center'>
      <IconUpload size={'4em'} color='#228be6' />
      <Box
        sx={theme => ({
          backgroundColor: theme.colors.gray[0],
          textAlign: 'center',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: 'pointer',
          width: '60%',
          margin: '20px',
          '&:hover': {
            backgroundColor: theme.colors.gray[1],
          },
        })}
      >
        <Text align='center' size='md' weight={500} mb='sm'>
          Let&apos;s get started by uploading a logo for your organization.
        </Text>
        <Text align='center' size='sm' color='dimmed'>
          This logo will be used in the digital assets we create for you, making
          them unique and personalized. Click the &apos;upload a logo&apos;
          button to select a logo from your device.
        </Text>
      </Box>
    </Group>
  );
};

export default Step2OrganisationLogo;
