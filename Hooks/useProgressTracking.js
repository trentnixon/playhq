import { useState, useEffect, useCallback, useRef } from 'react';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from '../components/Onboarding/utils/storage';

/**
 * Progress tracking states
 * @typedef {'idle' | 'calculating' | 'saving' | 'error'} ProgressState
 */

/**
 * Progress analytics event types
 * @typedef {'step_started' | 'step_completed' | 'step_failed' | 'setup_started' | 'setup_completed' | 'setup_abandoned'} AnalyticsEventType
 */

/**
 * Progress analytics event
 * @typedef {Object} AnalyticsEvent
 * @property {AnalyticsEventType} type - Event type
 * @property {string} stepId - Step identifier
 * @property {number} timestamp - Event timestamp
 * @property {Object} metadata - Additional event data
 */

/**
 * Progress tracking configuration
 * @typedef {Object} ProgressConfig
 * @property {number} stepWeight - Weight of each step (default: 25)
 * @property {boolean} enableAnalytics - Enable analytics tracking
 * @property {boolean} enablePersistence - Enable progress persistence
 * @property {number} saveInterval - Auto-save interval in ms
 */

/**
 * Progress tracking result
 * @typedef {Object} ProgressResult
 * @property {number} percentage - Overall completion percentage
 * @property {number} completedSteps - Number of completed steps
 * @property {number} totalSteps - Total number of steps
 * @property {string[]} completedStepIds - Array of completed step IDs
 * @property {string[]} remainingStepIds - Array of remaining step IDs
 * @property {number} estimatedTimeRemaining - Estimated time to completion in minutes
 * @property {Object} stepProgress - Individual step progress details
 */

/**
 * Custom hook for comprehensive progress tracking
 * @param {Object} options - Configuration options
 * @param {ProgressConfig} options.config - Progress configuration
 * @param {Object} options.onboardingState - Current onboarding state
 * @returns {Object} Progress tracking state and actions
 */
export const useProgressTracking = ({
  config = {},
  onboardingState = {},
} = {}) => {
  const {
    stepWeight = 25,
    enableAnalytics = true,
    enablePersistence = true,
    saveInterval = 30000, // 30 seconds
  } = config;

  // State
  const [progress, setProgress] = useState({
    percentage: 0,
    completedSteps: 0,
    totalSteps: 4, // Default to 4 steps
    completedStepIds: [],
    remainingStepIds: [],
    estimatedTimeRemaining: 0,
    stepProgress: {},
  });

  const [state, setState] = useState(/** @type {ProgressState} */ ('idle'));
  const [analytics, setAnalytics] = useState(
    /** @type {AnalyticsEvent[]} */ ([])
  );
  const [startTime, setStartTime] = useState(null);
  const [lastStepTime, setLastStepTime] = useState(null);

  // Refs
  const saveTimeoutRef = useRef(null);
  const analyticsQueueRef = useRef([]);

  /**
   * Calculate step progress based on completion status and data
   * @param {string} stepId - Step identifier
   * @param {Object} stepData - Step data
   * @param {boolean} isCompleted - Step completion status
   * @returns {number} Step progress percentage (0-100)
   */
  const calculateStepProgress = useCallback((stepId, stepData, isCompleted) => {
    if (isCompleted) return 100;

    // Calculate partial progress based on data completeness
    const stepConfig = {
      step1: {
        requiredFields: ['organizationName', 'accountType'],
        optionalFields: ['description', 'website'],
        weight: 1,
      },
      step2: {
        requiredFields: ['primaryColor', 'secondaryColor'],
        optionalFields: ['accentColor', 'logo'],
        weight: 1,
      },
      step3: {
        requiredFields: ['sportType', 'competitionLevel'],
        optionalFields: ['season', 'sponsors'],
        weight: 1,
      },
      step4: {
        requiredFields: ['contactEmail', 'contactPhone'],
        optionalFields: ['socialMedia', 'preferences'],
        weight: 1,
      },
    };

    const config = stepConfig[stepId];
    if (!config) return 0;

    const { requiredFields, optionalFields, weight } = config;

    // Calculate required field completion
    const requiredCompleted = requiredFields.filter(field => {
      const value = stepData[field];
      return value !== undefined && value !== null && value !== '';
    }).length;

    const requiredProgress = requiredCompleted / requiredFields.length;

    // Calculate optional field completion (weighted less)
    const optionalCompleted = optionalFields.filter(field => {
      const value = stepData[field];
      return value !== undefined && value !== null && value !== '';
    }).length;

    const optionalProgress =
      optionalFields.length > 0 ? optionalCompleted / optionalFields.length : 0;

    // Weighted progress (required fields count more)
    const totalProgress = requiredProgress * 0.8 + optionalProgress * 0.2;

    return Math.round(totalProgress * 100);
  }, []);

  /**
   * Calculate overall progress
   * @param {Object} onboardingState - Current onboarding state
   * @returns {ProgressResult} Progress calculation result
   */
  const calculateProgress = useCallback(
    onboardingState => {
      const {
        completedSteps = [],
        data = {},
        currentStep = 'step1',
      } = onboardingState;
      const totalSteps = 4; // This could be dynamic based on configuration

      // Calculate individual step progress
      const stepProgress = {};
      let totalStepProgress = 0;

      for (let i = 1; i <= totalSteps; i++) {
        const stepId = `step${i}`;
        const stepData = data[stepId] || {};
        const isCompleted = completedSteps.includes(stepId);
        const stepPercentage = calculateStepProgress(
          stepId,
          stepData,
          isCompleted
        );

        stepProgress[stepId] = {
          percentage: stepPercentage,
          isCompleted,
          isCurrent: currentStep === stepId,
          data: stepData,
        };

        totalStepProgress += stepPercentage;
      }

      // Calculate overall percentage
      const percentage = Math.round(totalStepProgress / totalSteps);

      // Determine completed and remaining steps
      const completedStepIds = completedSteps;
      const remainingStepIds = Array.from(
        { length: totalSteps },
        (_, i) => `step${i + 1}`
      ).filter(stepId => !completedSteps.includes(stepId));

      // Calculate estimated time remaining
      const estimatedTimeRemaining = calculateEstimatedTimeRemaining(
        completedSteps.length,
        totalSteps,
        startTime,
        lastStepTime
      );

      return {
        percentage,
        completedSteps: completedSteps.length,
        totalSteps,
        completedStepIds,
        remainingStepIds,
        estimatedTimeRemaining,
        stepProgress,
      };
    },
    [calculateStepProgress, startTime, lastStepTime]
  );

  /**
   * Calculate estimated time to completion
   * @param {number} completedCount - Number of completed steps
   * @param {number} totalSteps - Total number of steps
   * @param {number} startTime - Setup start time
   * @param {number} lastStepTime - Last step completion time
   * @returns {number} Estimated time in minutes
   */
  const calculateEstimatedTimeRemaining = useCallback(
    (completedCount, totalSteps, startTime, lastStepTime) => {
      if (!startTime || completedCount === 0) {
        // Default estimate: 10 minutes per step
        return (totalSteps - completedCount) * 10;
      }

      const now = Date.now();
      const elapsed = (now - startTime) / (1000 * 60); // Convert to minutes

      if (completedCount === 0) return elapsed * totalSteps;

      const averageTimePerStep = elapsed / completedCount;
      const remainingSteps = totalSteps - completedCount;

      return Math.round(averageTimePerStep * remainingSteps);
    },
    []
  );

  /**
   * Track analytics event
   * @param {AnalyticsEventType} type - Event type
   * @param {string} stepId - Step identifier
   * @param {Object} metadata - Additional event data
   */
  const trackEvent = useCallback(
    (type, stepId, metadata = {}) => {
      if (!enableAnalytics) return;

      const event = {
        type,
        stepId,
        timestamp: Date.now(),
        metadata: {
          ...metadata,
          progress: progress.percentage,
          completedSteps: progress.completedSteps,
        },
      };

      // Add to analytics queue
      analyticsQueueRef.current.push(event);
      setAnalytics(prev => [...prev, event]);

      // Send to analytics service (if configured)
      sendAnalyticsEvent(event);
    },
    [enableAnalytics, progress]
  );

  /**
   * Send analytics event to external service
   * @param {AnalyticsEvent} event - Analytics event
   */
  const sendAnalyticsEvent = useCallback(async event => {
    try {
      // Google Analytics 4 event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'onboarding_progress', {
          event_category: 'onboarding',
          event_label: event.type,
          value: event.metadata.progress,
          custom_parameters: {
            step_id: event.stepId,
            completed_steps: event.metadata.completedSteps,
            ...event.metadata,
          },
        });
      }

      // Custom analytics endpoint (if configured)
      if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
        await fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        });
      }
    } catch (error) {
      console.warn('Failed to send analytics event:', error);
    }
  }, []);

  /**
   * Save progress to persistent storage
   * @param {ProgressResult} progressData - Progress data to save
   */
  const saveProgress = useCallback(
    async progressData => {
      if (!enablePersistence) return;

      try {
        setState('saving');

        const progressDataToSave = {
          ...progressData,
          timestamp: Date.now(),
          analytics: analyticsQueueRef.current,
        };

        await saveToLocalStorage('onboarding_progress', progressDataToSave);

        // Clear analytics queue after successful save
        analyticsQueueRef.current = [];

        setState('idle');
      } catch (error) {
        console.error('Failed to save progress:', error);
        setState('error');
      }
    },
    [enablePersistence]
  );

  /**
   * Load progress from persistent storage
   * @returns {ProgressResult|null} Loaded progress data
   */
  const loadProgress = useCallback(async () => {
    if (!enablePersistence) return null;

    try {
      const savedProgress = await loadFromLocalStorage('onboarding_progress');

      if (savedProgress && savedProgress.timestamp) {
        // Check if saved progress is still valid (within 24 hours)
        const isValid =
          Date.now() - savedProgress.timestamp < 24 * 60 * 60 * 1000;

        if (isValid) {
          // Restore analytics queue
          if (savedProgress.analytics) {
            analyticsQueueRef.current = savedProgress.analytics;
            setAnalytics(savedProgress.analytics);
          }

          return savedProgress;
        }
      }

      return null;
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  }, [enablePersistence]);

  /**
   * Initialize progress tracking
   * @param {Object} onboardingState - Initial onboarding state
   */
  const initializeProgress = useCallback(
    async onboardingState => {
      setState('calculating');

      // Set start time if not already set
      if (!startTime) {
        setStartTime(Date.now());
      }

      // Load saved progress
      const savedProgress = await loadProgress();

      if (savedProgress) {
        setProgress(savedProgress);
        trackEvent('setup_started', 'initial', {
          restored: true,
          savedProgress: savedProgress.percentage,
        });
      } else {
        // Calculate initial progress
        const initialProgress = calculateProgress(onboardingState);
        setProgress(initialProgress);
        trackEvent('setup_started', 'initial', {
          restored: false,
          initialProgress: initialProgress.percentage,
        });
      }

      setState('idle');
    },
    [startTime, loadProgress, calculateProgress, trackEvent]
  );

  /**
   * Update progress when onboarding state changes
   * @param {Object} onboardingState - Updated onboarding state
   */
  const updateProgress = useCallback(
    async onboardingState => {
      setState('calculating');

      const newProgress = calculateProgress(onboardingState);
      setProgress(newProgress);

      // Track step completion
      const { completedSteps, currentStep } = onboardingState;
      const previousCompleted = progress.completedSteps;

      if (completedSteps.length > previousCompleted) {
        const newlyCompleted = completedSteps.filter(
          step => !progress.completedStepIds.includes(step)
        );

        newlyCompleted.forEach(stepId => {
          trackEvent('step_completed', stepId, {
            stepNumber: stepId.replace('step', ''),
            completionTime: Date.now(),
          });
          setLastStepTime(Date.now());
        });
      }

      // Schedule auto-save
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        saveProgress(newProgress);
      }, saveInterval);

      setState('idle');
    },
    [calculateProgress, progress, trackEvent, saveProgress, saveInterval]
  );

  /**
   * Mark step as started
   * @param {string} stepId - Step identifier
   */
  const startStep = useCallback(
    stepId => {
      trackEvent('step_started', stepId, {
        stepNumber: stepId.replace('step', ''),
        startTime: Date.now(),
      });
    },
    [trackEvent]
  );

  /**
   * Mark step as failed
   * @param {string} stepId - Step identifier
   * @param {string} reason - Failure reason
   */
  const failStep = useCallback(
    (stepId, reason) => {
      trackEvent('step_failed', stepId, {
        stepNumber: stepId.replace('step', ''),
        reason,
        failTime: Date.now(),
      });
    },
    [trackEvent]
  );

  /**
   * Complete setup
   * @param {Object} finalData - Final setup data
   */
  const completeSetup = useCallback(
    finalData => {
      const setupDuration = startTime
        ? (Date.now() - startTime) / (1000 * 60)
        : 0;

      trackEvent('setup_completed', 'final', {
        setupDuration: Math.round(setupDuration),
        finalProgress: 100,
        totalSteps: progress.totalSteps,
        finalData: Object.keys(finalData),
      });

      // Clear saved progress
      if (enablePersistence) {
        localStorage.removeItem('onboarding_progress');
      }
    },
    [startTime, progress, trackEvent, enablePersistence]
  );

  /**
   * Abandon setup
   * @param {string} reason - Abandonment reason
   */
  const abandonSetup = useCallback(
    reason => {
      const setupDuration = startTime
        ? (Date.now() - startTime) / (1000 * 60)
        : 0;

      trackEvent('setup_abandoned', 'final', {
        setupDuration: Math.round(setupDuration),
        finalProgress: progress.percentage,
        reason,
        completedSteps: progress.completedSteps,
      });

      // Clear saved progress
      if (enablePersistence) {
        localStorage.removeItem('onboarding_progress');
      }
    },
    [startTime, progress, trackEvent, enablePersistence]
  );

  /**
   * Get progress analytics
   * @returns {Object} Analytics summary
   */
  const getAnalytics = useCallback(() => {
    const events = analyticsQueueRef.current;

    return {
      totalEvents: events.length,
      eventsByType: events.reduce((acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
      }, {}),
      averageStepTime: calculateAverageStepTime(events),
      completionRate: calculateCompletionRate(events),
      events,
    };
  }, []);

  /**
   * Calculate average time per step
   * @param {AnalyticsEvent[]} events - Analytics events
   * @returns {number} Average time in minutes
   */
  const calculateAverageStepTime = useCallback(events => {
    const stepEvents = events.filter(e => e.type === 'step_completed');
    if (stepEvents.length === 0) return 0;

    const totalTime = stepEvents.reduce((sum, event) => {
      const startEvent = events.find(
        e => e.type === 'step_started' && e.stepId === event.stepId
      );
      return (
        sum + (event.timestamp - (startEvent?.timestamp || event.timestamp))
      );
    }, 0);

    return Math.round(totalTime / stepEvents.length / (1000 * 60));
  }, []);

  /**
   * Calculate completion rate
   * @param {AnalyticsEvent[]} events - Analytics events
   * @returns {number} Completion rate percentage
   */
  const calculateCompletionRate = useCallback(events => {
    const started = events.filter(e => e.type === 'step_started').length;
    const completed = events.filter(e => e.type === 'step_completed').length;

    return started > 0 ? Math.round((completed / started) * 100) : 0;
  }, []);

  // Effects
  useEffect(() => {
    if (onboardingState && Object.keys(onboardingState).length > 0) {
      initializeProgress(onboardingState);
    }
  }, []); // Only run once on mount

  // Disabled to prevent infinite loop - auto-save functionality disabled
  // useEffect(() => {
  //   if (onboardingState && Object.keys(onboardingState).length > 0) {
  //     updateProgress(onboardingState);
  //   }
  // }, [onboardingState, updateProgress]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    progress,
    state,
    analytics: getAnalytics(),

    // Actions
    startStep,
    failStep,
    completeSetup,
    abandonSetup,
    saveProgress,
    loadProgress,

    // Utilities
    calculateProgress,
    calculateStepProgress,
    getAnalytics,
  };
};
