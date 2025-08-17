import React, { useState, useCallback } from 'react';
import { useOnboarding } from '../OnboardingProvider';
import { dependencyManager } from '../utils/dependencyManager';
import { Group, Box, Text, Tooltip, Progress, Paper } from '@mantine/core';
import {
  IconBuilding,
  IconPalette,
  IconTarget,
  IconPhone,
  IconCheck,
} from '@tabler/icons-react';
import { P } from '../../Members/Common/Type';

/**
 * Enhanced step navigation component with dependency management
 * @returns {JSX.Element} The step navigation component
 */
const StepNavigation = () => {
  const { state, actions } = useOnboarding();
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    { id: 'step1', title: 'Organization', icon: <IconBuilding size={20} /> },
    { id: 'step2', title: 'Branding', icon: <IconPalette size={20} /> },
    { id: 'step3', title: 'Theme', icon: <IconTarget size={20} /> },
    { id: 'step4', title: 'Contact', icon: <IconPhone size={20} /> },
  ];

  /**
   * Check if a step can be accessed
   * @param {string} stepId - Step to check
   * @returns {Object} Access result
   */
  const getStepAccess = useCallback(
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
   * Handle step navigation
   * @param {string} stepId - Step to navigate to
   * @param {number} stepIndex - Step index
   */
  const handleStepClick = useCallback(
    (stepId, stepIndex) => {
      const accessResult = getStepAccess(stepId);

      if (accessResult.canAccess) {
        actions.navigateToStep(stepIndex);
      }
    },
    [getStepAccess, actions]
  );

  /**
   * Get step status and styling
   * @param {Object} step - Step object
   * @param {number} index - Step index
   * @returns {Object} Step status and styling
   */
  const getStepStatus = useCallback(
    (step, index) => {
      const isCurrentStep = state.currentStep === index;
      const isCompleted = state.completedSteps.includes(step.id);
      const accessResult = getStepAccess(step.id);
      const isBlocked = !accessResult.canAccess;

      let status = 'pending';
      let statusColor = 'gray';
      let statusText = 'Pending';

      if (isCompleted) {
        status = 'completed';
        statusColor = 'green';
        statusText = 'Completed';
      } else if (isCurrentStep) {
        status = 'current';
        statusColor = 'blue';
        statusText = 'Current';
      } else if (isBlocked) {
        status = 'blocked';
        statusColor = 'red';
        statusText = 'Blocked';
      } else if (accessResult.canAccess) {
        status = 'available';
        statusColor = 'gray';
        statusText = 'Available';
      }

      return {
        status,
        statusColor,
        statusText,
        isCurrentStep,
        isCompleted,
        isBlocked,
        accessResult,
      };
    },
    [state.currentStep, state.completedSteps, getStepAccess]
  );

  return (
    <Paper p='xl' radius='md' withBorder mb='xl'>
      <Box>
        {/* Progress bar */}
        <Progress
          value={(state.completedSteps.length / steps.length) * 100}
          size='sm'
          radius='xl'
          color='green'
          mb='lg'
        />

        {/* Step indicators */}
        <Group position='apart' spacing='xs'>
          {steps.map((step, index) => {
            const stepStatus = getStepStatus(step, index);
            const isClickable = stepStatus.status !== 'blocked';

            return (
              <Tooltip
                key={step.id}
                label={
                  stepStatus.isBlocked
                    ? `${stepStatus.accessResult.reason}${
                        stepStatus.accessResult.missingSteps.length > 0
                          ? ` - Complete: ${stepStatus.accessResult.missingSteps.join(
                              ', '
                            )}`
                          : ''
                      }`
                    : step.title
                }
                disabled={!stepStatus.isBlocked}
                withArrow
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: isClickable ? 'pointer' : 'not-allowed',
                    opacity: stepStatus.isBlocked ? 0.5 : 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: isClickable ? 'translateY(-2px)' : 'none',
                    },
                  }}
                  onClick={() => handleStepClick(step.id, index)}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step circle */}
                  <Box
                    sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      backgroundColor: `var(--mantine-color-${stepStatus.statusColor}-6)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      border: stepStatus.isCurrentStep
                        ? '3px solid var(--mantine-color-blue-6)'
                        : '2px solid white',
                      boxShadow: stepStatus.isCurrentStep
                        ? '0 0 0 2px var(--mantine-color-blue-6)'
                        : '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease',
                      marginBottom: 8,
                    }}
                  >
                    {stepStatus.isCompleted ? (
                      <IconCheck size={20} />
                    ) : (
                      step.icon
                    )}
                  </Box>

                  {/* Step title */}
                  <P
                    Weight={stepStatus.isCurrentStep ? 600 : 400}
                    size='xs'
                    color={stepStatus.isBlocked ? 6 : 8}
                    textAlign='center'
                    marginBottom={2}
                    sx={{ maxWidth: 80 }}
                  >
                    {step.title}
                  </P>

                  {/* Step status */}
                  <P
                    size='xs'
                    color={
                      stepStatus.statusColor === 'gray'
                        ? 6
                        : stepStatus.statusColor
                    }
                    Weight={500}
                    marginBottom={0}
                  >
                    {stepStatus.statusText}
                  </P>
                </Box>
              </Tooltip>
            );
          })}
        </Group>
      </Box>
    </Paper>
  );
};

export default StepNavigation;
