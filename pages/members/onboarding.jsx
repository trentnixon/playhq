import OnboardingProvider from '../../components/Onboarding/OnboardingProvider';
import SetupErrorBoundary from '../../components/Onboarding/ErrorBoundary/SetupErrorBoundary';
import InitialSetupScreen from '../../components/Onboarding/components/InitialSetupScreen';
import Step1Organization from '../../components/Onboarding/steps/Step1Organization';
import Step2OrganisationLogo from '../../components/Onboarding/steps/Step2OrganisationLogo';
import Step3Theme from '../../components/Onboarding/steps/Step3Theme';
import Step4Contact from '../../components/Onboarding/steps/Step4Contact';
import Step5Review from '../../components/Onboarding/steps/Step5Review';
import { useUserStatus } from '../../Hooks/useOnboarding';
import { useOnboarding } from '../../components/Onboarding/OnboardingProvider';
import { PageTitle } from '../../components/Members/Common/Type';
import { MembersWrapper } from '../../components/Members/Common/Containers';
import { Space, Container, Box } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import Meta from '../../components/Layouts/Meta';

// Map step IDs to components for easy extension
const stepComponents = {
  step1: Step1Organization,
  step2: Step2OrganisationLogo,
  step3: Step3Theme,
  step4: Step4Contact,
  step5: Step5Review,
  // Add more steps here as they're created
};

/**
 * Main onboarding content component
 * @returns {JSX.Element} The onboarding content
 */
const OnboardingContent = () => {
  const { state } = useOnboarding();
  const userStatus = useUserStatus();

  return (
    <Container size='lg' py='xl'>
      {/* Show loading state while checking account status */}
      {userStatus.isLoading ? (
        <FetchingAccount />
      ) : (
        <>
          {/* Show initial setup screen if user doesn't have an account */}
          {!userStatus.account && !userStatus.accountId && (
            <InitialSetupScreen />
          )}

          {/* Show onboarding steps if user has account */}
          {userStatus.account && userStatus.accountId && (
            <>
              {/* Main onboarding content */}
              <Box>
                {(() => {
                  const stepKey = `step${state.currentStep + 1}`;
                  const StepComponent =
                    stepComponents[stepKey] || Step1Organization;
                  return <StepComponent />;
                })()}
              </Box>
            </>
          )}
        </>
      )}
    </Container>
  );
};

/**
 * Onboarding page component
 * @returns {JSX.Element} The onboarding page
 */
const OnboardingPage = () => (
  <OnboardingProvider>
    <SetupErrorBoundary>
      <MembersWrapper>
        <OnboardingMetaData />
        <PageTitle Copy='Onboarding' ICON={<IconSettings size={40} />} />
        <Space h={20} />
        <OnboardingContent />
      </MembersWrapper>
    </SetupErrorBoundary>
  </OnboardingProvider>
);

const OnboardingMetaData = () => {
  return (
    <Meta
      title='Onboarding Setup - Fixtura: Complete Your Organization Setup'
      description='Complete your Fixtura onboarding process. Set up your organization details, branding, and preferences to get started with automated sports content creation.'
      keywords='Fixtura onboarding, organization setup, sports content automation, club branding setup, digital media onboarding'
    />
  );
};

export default OnboardingPage;

const FetchingAccount = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '50vh',
      }}
    >
      <div>Fetching your account...</div>
    </Box>
  );
};
