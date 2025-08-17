import React, { useState, useEffect, useMemo } from 'react';
import { useOnboarding } from '../OnboardingProvider';
import {
  Paper,
  Progress,
  Group,
  Text,
  Badge,
  Box,
  Stack,
  Tooltip,
  RingProgress,
  Center,
} from '@mantine/core';
import {
  IconCheck,
  IconClock,
  IconTrophy,
  IconBolt,
} from '@tabler/icons-react';
import { P } from '../../Members/Common/Type';

/**
 * Progress indicator component with animations and detailed information
 * @returns {JSX.Element} The progress indicator component
 */
const ProgressIndicator = () => {
  const { state, progress } = useOnboarding();
  const [isVisible, setIsVisible] = useState(false);
  const [progressAnimation, setProgressAnimation] = useState(0);

  // Calculate progress data
  const progressData = useMemo(() => {
    if (!progress) return null;

    const {
      percentage,
      completedSteps,
      totalSteps,
      completedStepIds,
      remainingStepIds,
      estimatedTimeRemaining,
      stepProgress,
    } = progress;

    return {
      percentage: Math.min(100, Math.max(0, percentage)),
      completedSteps,
      totalSteps,
      completedStepIds,
      remainingStepIds,
      estimatedTimeRemaining,
      stepProgress,
      isComplete: percentage >= 100,
      isStarted: completedSteps > 0,
    };
  }, [progress]);

  // Progress bar animation
  useEffect(() => {
    if (progressData) {
      const targetProgress = progressData.percentage;
      const duration = 1000; // 1 second animation
      const startTime = Date.now();
      const startProgress = progressAnimation;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentProgress =
          startProgress + (targetProgress - startProgress) * easeOutQuart;

        setProgressAnimation(currentProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [progressData?.percentage]);

  // Show/hide animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Format time remaining
  const formatTimeRemaining = minutes => {
    if (minutes < 1) return 'Less than 1 minute';
    if (minutes < 60) return `${Math.round(minutes)} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours}h ${remainingMinutes}m`;
  };

  // Get progress color based on percentage
  const getProgressColor = percentage => {
    if (percentage >= 100) return 'green';
    if (percentage >= 75) return 'blue';
    if (percentage >= 50) return 'yellow';
    if (percentage >= 25) return 'orange';
    return 'red';
  };

  // Get progress status text
  const getProgressStatus = () => {
    if (!progressData) return 'Initializing...';
    if (progressData.isComplete) return 'Setup Complete!';
    if (progressData.isStarted) return 'Setup in Progress';
    return 'Ready to Start';
  };

  if (!progressData) {
    return (
      <Paper p='xl' radius='md' withBorder>
        <Box>
          <Progress value={0} size='lg' radius='xl' color='gray' mb='md' />
          <P color={6}>Loading progress...</P>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      p='xl'
      radius='md'
      withBorder
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Main Progress Section */}
      <Stack spacing='lg'>
        {/* Header */}
        <Group position='apart' align='center'>
          <Box>
            <P Weight={600} size='lg' marginBottom={4}>
              Setup Progress
            </P>
            <P color={6} size='sm'>
              {getProgressStatus()}
            </P>
          </Box>
          <Center>
            <RingProgress
              size={80}
              thickness={8}
              sections={[
                {
                  value: progressAnimation,
                  color: getProgressColor(progressAnimation),
                },
              ]}
              label={
                <Text ta='center' size='xs' fw={700}>
                  {Math.round(progressAnimation)}%
                </Text>
              }
            />
          </Center>
        </Group>

        {/* Progress Bar */}
        <Box>
          <Progress
            value={progressAnimation}
            size='lg'
            radius='xl'
            color={getProgressColor(progressAnimation)}
            label={`${Math.round(progressAnimation)}%`}
            mb='md'
          />

          {/* Progress Stats */}
          <Group position='apart'>
            <Box>
              <P color={6} size='xs' marginBottom={2}>
                Steps Completed
              </P>
              <P Weight={600}>
                {progressData.completedSteps}/{progressData.totalSteps}
              </P>
            </Box>
            <Box>
              <P color={6} size='xs' marginBottom={2}>
                Time Remaining
              </P>
              <P Weight={600}>
                {formatTimeRemaining(progressData.estimatedTimeRemaining)}
              </P>
            </Box>
          </Group>
        </Box>

        {/* Step Indicators */}
        <Box>
          <P Weight={600} marginBottom='md'>
            Steps
          </P>
          <Group spacing='xs'>
            {Object.entries(progressData.stepProgress).map(
              ([stepId, stepData]) => (
                <Tooltip
                  key={stepId}
                  label={`Step ${stepId.replace('step', '')} - ${
                    stepData.percentage
                  }% complete`}
                  withArrow
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: stepData.isCompleted
                        ? 'var(--mantine-color-green-6)'
                        : stepData.isCurrent
                        ? 'var(--mantine-color-blue-6)'
                        : 'var(--mantine-color-gray-3)',
                      color:
                        stepData.isCompleted || stepData.isCurrent
                          ? 'white'
                          : 'var(--mantine-color-gray-6)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  >
                    {stepData.isCompleted ? (
                      <IconCheck size={16} />
                    ) : (
                      <Text size='xs' fw={600}>
                        {stepId.replace('step', '')}
                      </Text>
                    )}
                  </Box>
                </Tooltip>
              )
            )}
          </Group>
        </Box>

        {/* Progress Badges */}
        <Group spacing='xs'>
          {progressData.isComplete && (
            <Badge
              color='green'
              variant='light'
              leftSection={<IconTrophy size={12} />}
            >
              Setup Complete!
            </Badge>
          )}
          {progressData.completedSteps > 0 &&
            progressData.completedSteps < progressData.totalSteps && (
              <Badge
                color='blue'
                variant='light'
                leftSection={<IconBolt size={12} />}
              >
                In Progress
              </Badge>
            )}
          {progressData.estimatedTimeRemaining > 0 && (
            <Badge
              color='yellow'
              variant='light'
              leftSection={<IconClock size={12} />}
            >
              {formatTimeRemaining(progressData.estimatedTimeRemaining)} left
            </Badge>
          )}
        </Group>
      </Stack>
    </Paper>
  );
};

export default ProgressIndicator;
