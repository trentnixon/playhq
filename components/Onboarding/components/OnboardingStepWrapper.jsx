import React, { useState, useEffect } from 'react';
import {
  Box,
  Alert,
  Text,
  Loader,
  Overlay,
  Center,
  Stack,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useAccountId, useCanSaveToCMS } from '../../../Hooks/useOnboarding';
import { useAccountDetails } from '../../../context/userContext';
import { BTN_ONCLICK } from '@/components/Members/Common/utils/Buttons';

/**
 * Reusable wrapper for onboarding steps with error handling and validation
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Step content
 * @param {string} props.stepId - Step identifier
 * @param {boolean} props.isLoading - Loading state
 * @param {string|null} props.error - Error message
 * @param {boolean} props.isValid - Validation state
 * @param {Function} props.onRetry - Retry function
 * @param {Function} props.onContinue - Continue function
 * @param {string} props.continueLabel - Custom label for continue button
 * @param {number} [props.stepNumber] - Current step number (optional)
 * @returns {JSX.Element} Wrapped step component
 */
const OnboardingStepWrapper = ({
  children,
  stepId,
  isLoading = false,
  error = null,
  isValid = true,
  onRetry,
  onContinue,
  continueLabel = 'Next Step',
  stepNumber,
}) => {
  const accountId = useAccountId();
  const canSaveToCMS = useCanSaveToCMS();
  const { forceRefresh } = useAccountDetails();
  const [isProcessing, setIsProcessing] = useState(false);

  // Get step display name
  const getStepDisplayName = stepId => {
    const stepNames = {
      step1: 'Organization Setup',
      step2: 'Logo Upload',
      step3: 'Theme Selection',
      step4: 'Contact Information',
      step5: 'Review & Complete',
    };
    return stepNames[stepId] || stepId;
  };

  // Prevent keyboard shortcuts during processing
  useEffect(() => {
    const handleKeyDown = event => {
      if (isProcessing) {
        // Prevent Enter key and other form submission shortcuts
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
        }
      }
    };

    if (isProcessing) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProcessing]);

  // Handle continue with ReRender
  const handleContinue = async () => {
    if (onContinue) {
      setIsProcessing(true);

      try {
        // Force refresh account data first
        forceRefresh();

        // Wait a moment for the account data to be refreshed
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Then execute the step's continue function
        await onContinue();
      } catch (error) {
        console.error('Error during step transition:', error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  // Don't render if account is not ready
  if (!accountId) {
    return (
      <Alert
        icon={<IconAlertTriangle size='1rem' />}
        title='Account Not Ready'
        color='yellow'
        variant='light'
        radius='md'
      >
        <Text size='sm'>
          Please complete the initial setup before proceeding with this step.
        </Text>
      </Alert>
    );
  }

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Preflight/Awaiting Overlay */}

      {isProcessing && (
        <Overlay
          opacity={0.95}
          color='#fff'
          zIndex={1000}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Center>
            <Stack align='center' spacing='xl'>
              <Box sx={{ textAlign: 'center' }}>
                <Loader size='xl' color='black' />
              </Box>

              <Stack align='center' spacing='md'>
                <Text color='black' size='xl' weight={600}>
                  {stepNumber && `Step ${stepNumber}: `}
                  {getStepDisplayName(stepId)}
                </Text>

                <Text
                  color='black'
                  size='md'
                  align='center'
                  sx={{ maxWidth: 400 }}
                >
                  Please wait while we save your progress and prepare the next
                  step.
                </Text>
              </Stack>
            </Stack>
          </Center>
        </Overlay>
      )}

      {/* Loading State */}
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
          }}
        >
          <Loader size='md' />
          <Text ml='md'>Loading step data...</Text>
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Alert
          icon={<IconAlertTriangle size='1rem' />}
          title='Step Error'
          color='red'
          variant='light'
          mb='xl'
          radius='md'
          withCloseButton
        >
          <Text size='sm' mb='md'>
            {error}
          </Text>
          {onRetry && (
            <button
              onClick={() => onRetry()}
              style={{
                background: '#e64980',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          )}
        </Alert>
      )}

      {/* Step Content */}
      {!isLoading && children}

      {/* Continue Button */}
      {isValid && !isLoading && !error && onContinue && (
        <Box mt='xl' sx={{ textAlign: 'center' }}>
          <BTN_ONCLICK
            LABEL={isProcessing ? 'Processing...' : continueLabel}
            THEME={`cta`}
            HANDLE={handleContinue}
            disabled={!canSaveToCMS || isProcessing}
          />
        </Box>
      )}
    </Box>
  );
};

export default OnboardingStepWrapper;
