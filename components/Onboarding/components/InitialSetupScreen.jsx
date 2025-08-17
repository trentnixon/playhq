import { useState } from 'react';
import { useOnboarding as useOnboardingHook } from '../../../Hooks/useOnboarding';
import { createUserAccount } from '../../../lib/onboardingApi';
import { Container, Group, Paper, List, Box, Alert, Text } from '@mantine/core';
import {
  IconMail,
  IconUser,
  IconBuilding,
  IconPalette,
  IconBrandStripe,
  IconShield,
  IconUsers,
  IconInfoCircle,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { RoundedSectionContainer } from '../../UI/Containers/SectionContainer';
import { P } from '../../Members/Common/Type';
import { BTN_ONCLICK } from '../../Members/Common/utils/Buttons';
import { FixturaLoading } from '../../Members/Common/Loading';
import { useAccountDetails } from '../../../context/userContext';
import Cookies from 'js-cookie';

/**
 * Initial setup screen component that displays required items for onboarding
 * @returns {JSX.Element} The initial setup screen
 */
const InitialSetupScreen = () => {
  const { actions } = useOnboardingHook();
  const { ReRender, forceRefresh } = useAccountDetails();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const matches = useMediaQuery('(min-width: 48em)');

  /**
   * Handle starting the onboarding process by creating user account
   */
  const handleStartOnboarding = async () => {
    setLoading(true);
    setError(null);

    try {
      const accountData = await createUserAccount();
      if (accountData) {
        // Set the LinkedAccount cookie so subsequent API calls can find the account
        Cookies.set('LinkedAccount', accountData.id);

        // Update onboarding state
        actions.updateData({
          onboardingStarted: true,
          accountCreated: true,
          accountId: accountData.id,
        });
        actions.setHasAccount(true);
        actions.setStep(1);

        // Force refresh account data to ensure new account is loaded
        forceRefresh();

        // Also trigger a regular refresh as backup
        /*  setTimeout(() => {
          ReRender();
        }, 500); */
      } else {
        throw new Error('Failed to create account - no data returned');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setError(
        error.message || 'Failed to create your account. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Retry account creation
   */
  const handleRetry = () => {
    setError(null);
    handleStartOnboarding();
  };

  const requiredItems = [
    {
      icon: <IconMail stroke={1.5} size='2rem' color='#6699CC' />,
      title: 'Email Delivery',
      description: 'Email of the person to receive the asset email each week.',
    },
    {
      icon: <IconUser stroke={1.5} size='2rem' color='#6699CC' />,
      title: "Recipient's Name",
      description: 'Name of the person the email should be addressed to.',
    },
    {
      icon: <IconBuilding stroke={1.5} size='2rem' color='#6699CC' />,
      title: 'Organization Type',
      description: 'Select the type of organization you represent.',
    },
    {
      icon: <IconUsers stroke={1.5} size='2rem' color='#6699CC' />,
      title: 'Association',
      description:
        'Choose the appropriate association, if multiple are applicable.',
    },
    {
      icon: <IconShield stroke={1.5} size='2rem' color='#6699CC' />,
      title: 'Club Name',
      description: 'Provide the club name if applicable to your organization.',
    },
    {
      icon: <IconBrandStripe stroke={1.5} size='2rem' color='#6699CC' />,
      title: 'Organization Logo',
      description: 'Upload the logo that represents your organization.',
    },
    {
      icon: <IconPalette stroke={1.5} size='2rem' color='#6699CC' />,
      title: 'Brand Colors',
      description:
        "Select the color scheme that aligns with your organization's branding.",
    },
  ];

  return (
    <RoundedSectionContainer
      headerContent=''
      topContent={
        <Group position='apart'>
          <P Weight={600} marginBottom={0}>
            Items needed to complete the setup:
          </P>
          <Box>
            {loading ? (
              <FixturaLoading />
            ) : (
              <BTN_ONCLICK
                LABEL="Let's Get Started"
                HANDLE={handleStartOnboarding}
                THEME='success'
              />
            )}
          </Box>
        </Group>
      }
      bottomContent={
        <Box>
          {/* Error Display */}
          {error && (
            <Alert
              icon={<IconAlertTriangle size='1rem' />}
              title='Setup Error'
              color='red'
              variant='light'
              mb='xl'
              radius='md'
              withCloseButton
              onClose={() => setError(null)}
            >
              <Text size='sm' mb='md'>
                {error}
              </Text>
              <BTN_ONCLICK
                LABEL='Try Again'
                HANDLE={handleRetry}
                THEME='danger'
              />
            </Alert>
          )}

          <Paper p='0'>
            <List spacing='xs' size='sm' center>
              {requiredItems.map((item, index) => (
                <List.Item key={index} icon={item.icon}>
                  <P Weight={600} marginBottom={0} color={7}>
                    {item.title}
                  </P>
                  {matches && <P>{item.description}</P>}
                </List.Item>
              ))}
            </List>
          </Paper>

          <Alert
            icon={<IconInfoCircle size='1rem' />}
            title='Note'
            color='blue'
            variant='light'
            mt='xl'
            radius='md'
          >
            <Text size='sm'>
              Your progress will be automatically saved as you complete each
              step. You can return to this process at any time.
            </Text>
          </Alert>
        </Box>
      }
    />
  );
};

export default InitialSetupScreen;
