import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Group,
  Space,
  Paper,
  Container,
  Box,
  useMantineTheme,
  Avatar,
  Stack,
  Center,
} from '@mantine/core';
import { useAccountDetails } from '../../../context/userContext';
import { useSetAccountTrue } from '../../../Hooks/useAccount';
import { setAccountFromLocalCookie } from '../../../lib/auth';
import {
  IconCheck,
  IconHome2,
  IconMailbox,
  IconSettings2,
  IconShield,
  IconUser,
  IconUsersGroup,
} from '@tabler/icons-react';
import { BTN_ONCLICK } from '../../Members/Common/utils/Buttons';
import { P } from '../../Members/Common/Type';
import { FixturaLoading } from '../../Members/Common/Loading';
import { FindAccountLogo } from '../../../lib/actions';
import { useMediaQuery } from '@mantine/hooks';
import { PaperWithBorder } from '../../Members/Common/Containers';
import { RoundedSectionContainer } from '../../UI/Containers/SectionContainer';
import { StepHeaderandDescription } from '../../pages/members/setup/phases/SetupSteps/Steps/StepHeaderandDescription';
import OnboardingStepWrapper from '../components/OnboardingStepWrapper';
import { useOnboarding } from '../OnboardingProvider';

/**
 * Step 5: Review component for onboarding
 *
 * This component displays a review of all collected data and allows users
 * to complete their onboarding process or make adjustments.
 *
 * @returns {JSX.Element} The review step component
 */
const Step5Review = () => {
  const { state, actions } = useOnboarding();
  const { account, ReRender } = useAccountDetails();
  const [AccountTrue, CreateSetAccountTrue] = useSetAccountTrue();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [stepError, setStepError] = useState(null);
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  // Check if account data is fully loaded
  const isAccountLoaded = !!(account?.id && account?.attributes);

  /**
   * Complete the onboarding process
   */
  const completeOnboarding = async () => {
    setIsLoading(true);
    setStepError(null);

    try {
      // Mark account as fully set up
      await CreateSetAccountTrue(account.id);

      // Complete the current step in onboarding
      await actions.completeCurrentStep();

      // Set account in local storage and redirect to members dashboard
      setAccountFromLocalCookie(account.id);
      router.push('/members/');
    } catch (error) {
      console.error('💥 Step5Review - completeOnboarding error:', error);
      setStepError(
        error.message || 'Failed to complete onboarding. Please try again.'
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
        stepId='step5'
        isLoading={true}
        error={null}
        isValid={true}
        onRetry={() => {}}
        onContinue={() => {}}
        continueLabel='Complete Setup'
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading account data...
        </div>
      </OnboardingStepWrapper>
    );
  }

  return (
    <OnboardingStepWrapper
      stepId='step5'
      stepNumber={5}
      isLoading={isLoading}
      error={stepError}
      isValid={true} // Review step is always valid
      onRetry={retry}
      onContinue={completeOnboarding}
      continueLabel='Complete Setup'
    >
      <RoundedSectionContainer
        headerContent={''}
        topContent={
          <StepHeaderandDescription
            Header={'Review Your Setup'}
            Description={`Let's make sure everything is perfect before we complete your onboarding. Review the details below and make any final adjustments if needed.`}
          />
        }
        bottomContent={
          <>
            <ReviewAccountDetails DATA={account} />

            <Space h={20} />

            <Box
              sx={theme => ({
                padding: theme.spacing.md,
                border: `1px solid ${theme.colors.members[1]}`,
                backgroundColor: theme.colors.members[1],
                borderRadius: '5px',
                textAlign: 'center',
              })}
            >
              <P textAlign='center'>
                Ready to transform your season? Let&apos;s sync and get started!
              </P>
              {/*  {!mobile && (
                <P textAlign='center'>
                  Your custom-made content and insights are just a click away.
                </P>
              )}
              {!mobile && (
                <P textAlign='center'>
                  Ready to transform your season? Let&apos;s sync and get
                  started!
                </P>
              )} */}
            </Box>
          </>
        }
      />
    </OnboardingStepWrapper>
  );
};

/**
 * Review account details component
 */
const ReviewAccountDetails = ({ DATA }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <PaperWithBorder>
      {mobile ? (
        <Center>
          <Avatar src={FindAccountLogo(DATA)} size={120} radius='md' />
        </Center>
      ) : null}

      <Group noWrap position='apart'>
        <div>
          <Group noWrap spacing={10} my={5}>
            <IconUser size='1.5rem' color={'#6699CC'} />
            <P size={'md'} marginBottom={0}>
              {DATA.attributes.FirstName || 'Not set'}
            </P>
          </Group>

          <Group noWrap spacing={10} my={5}>
            <IconMailbox size='1.5rem' color={'#6699CC'} />
            <P size={'md'} marginBottom={0}>
              Email Address: {DATA.attributes.DeliveryAddress || 'Not set'}
            </P>
          </Group>

          <Group noWrap spacing={10} my={5}>
            <IconShield size='1.5rem' color={'#6699CC'} />
            <P size={'md'} marginBottom={0}>
              {DATA.attributes.account_type?.data?.attributes?.Name ||
                'Not set'}
            </P>
          </Group>

          <Group noWrap spacing={10} my={5}>
            <IconUsersGroup size='1.5rem' color={'#6699CC'} />
            <P size={'md'} marginBottom={0}>
              {DATA.attributes.associations?.data?.[0]?.attributes?.Name ||
                'Not set'}
            </P>
          </Group>

          {DATA.attributes.account_type?.data?.attributes?.Name !==
            'Association' && (
            <Group noWrap spacing={10} my={5}>
              <IconHome2 size='1.5rem' color={'#6699CC'} />
              <P size={'md'} marginBottom={0}>
                {DATA.attributes?.clubs?.data?.[0]?.attributes?.Name ||
                  'Not set'}
              </P>
            </Group>
          )}
        </div>

        {!mobile && (
          <Avatar src={FindAccountLogo(DATA)} size={120} radius='md' />
        )}
      </Group>
    </PaperWithBorder>
  );
};

export default Step5Review;
