/**
 * Error recovery utilities for onboarding system
 * Provides automatic and manual recovery mechanisms
 */

/**
 * Error recovery strategies
 */
export const RecoveryStrategies = {
  RETRY: 'retry',
  RESET: 'reset',
  FALLBACK: 'fallback',
  MANUAL: 'manual',
  IGNORE: 'ignore',
};

/**
 * Error severity levels
 */
export const ErrorSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
};

/**
 * Error recovery manager
 */
export class ErrorRecoveryManager {
  constructor() {
    this.recoveryHistory = [];
    this.automaticRecoveryEnabled = true;
    this.maxRecoveryAttempts = 3;
    this.recoveryCooldown = 5000; // 5 seconds
  }

  /**
   * Attempt automatic error recovery
   * @param {Error} error - Error to recover from
   * @param {Object} context - Recovery context
   * @returns {Promise<Object>} Recovery result
   */
  async attemptAutomaticRecovery(error, context = {}) {
    if (!this.automaticRecoveryEnabled) {
      return { success: false, strategy: RecoveryStrategies.MANUAL };
    }

    const recoveryAttempt = {
      timestamp: new Date().toISOString(),
      error: error.message,
      context,
      strategy: null,
      success: false,
    };

    try {
      // Determine recovery strategy based on error type
      const strategy = this.determineRecoveryStrategy(error, context);
      recoveryAttempt.strategy = strategy;

      switch (strategy) {
        case RecoveryStrategies.RETRY:
          recoveryAttempt.success = await this.retryOperation(context);
          break;

        case RecoveryStrategies.RESET:
          recoveryAttempt.success = await this.resetState(context);
          break;

        case RecoveryStrategies.FALLBACK:
          recoveryAttempt.success = await this.useFallback(context);
          break;

        case RecoveryStrategies.IGNORE:
          recoveryAttempt.success = true; // Ignore the error
          break;

        default:
          recoveryAttempt.success = false;
      }

      // Record recovery attempt
      this.recoveryHistory.push(recoveryAttempt);

      return {
        success: recoveryAttempt.success,
        strategy,
        attempt: recoveryAttempt,
      };
    } catch (recoveryError) {
      recoveryAttempt.success = false;
      recoveryAttempt.error = recoveryError.message;
      this.recoveryHistory.push(recoveryAttempt);

      return {
        success: false,
        strategy: RecoveryStrategies.MANUAL,
        attempt: recoveryAttempt,
      };
    }
  }

  /**
   * Determine the best recovery strategy for an error
   * @param {Error} error - Error to analyze
   * @param {Object} context - Error context
   * @returns {string} Recovery strategy
   */
  determineRecoveryStrategy(error, context) {
    const errorMessage = error.message.toLowerCase();
    const errorStack = error.stack || '';

    // Network errors - retry
    if (
      errorMessage.includes('network') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('timeout')
    ) {
      return RecoveryStrategies.RETRY;
    }

    // Storage errors - reset
    if (
      errorMessage.includes('localstorage') ||
      errorMessage.includes('storage') ||
      errorMessage.includes('quota')
    ) {
      return RecoveryStrategies.RESET;
    }

    // Data corruption - reset
    if (
      errorMessage.includes('json') ||
      errorMessage.includes('parse') ||
      errorMessage.includes('corrupt')
    ) {
      return RecoveryStrategies.RESET;
    }

    // Validation errors - ignore (user should fix)
    if (
      errorMessage.includes('validation') ||
      errorMessage.includes('invalid')
    ) {
      return RecoveryStrategies.IGNORE;
    }

    // Context-specific strategies
    if (context.operation === 'save') {
      return RecoveryStrategies.RETRY;
    }

    if (context.operation === 'load') {
      return RecoveryStrategies.FALLBACK;
    }

    // Default to manual recovery
    return RecoveryStrategies.MANUAL;
  }

  /**
   * Retry the failed operation
   * @param {Object} context - Operation context
   * @returns {Promise<boolean>} Success status
   */
  async retryOperation(context) {
    const { operation, maxRetries = 3, delay = 1000 } = context;

    if (!operation || typeof operation !== 'function') {
      return false;
    }

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await operation();
        return true;
      } catch (error) {
        if (attempt === maxRetries) {
          throw error;
        }

        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, delay * attempt));
      }
    }

    return false;
  }

  /**
   * Reset application state
   * @param {Object} context - Reset context
   * @returns {Promise<boolean>} Success status
   */
  async resetState(context) {
    try {
      // Clear localStorage
      if (context.clearStorage !== false) {
        this.clearLocalStorage();
      }

      // Reset onboarding state
      if (context.resetOnboarding !== false) {
        this.resetOnboardingState();
      }

      // Reload page if specified
      if (context.reloadPage) {
        window.location.reload();
        return true;
      }

      return true;
    } catch (error) {
      console.error('Failed to reset state:', error);
      return false;
    }
  }

  /**
   * Use fallback mechanism
   * @param {Object} context - Fallback context
   * @returns {Promise<boolean>} Success status
   */
  async useFallback(context) {
    try {
      const { fallbackData, fallbackOperation } = context;

      if (fallbackData) {
        // Use fallback data
        localStorage.setItem('onboarding_data', JSON.stringify(fallbackData));
        return true;
      }

      if (fallbackOperation && typeof fallbackOperation === 'function') {
        // Execute fallback operation
        await fallbackOperation();
        return true;
      }

      return false;
    } catch (error) {
      console.error('Failed to use fallback:', error);
      return false;
    }
  }

  /**
   * Clear localStorage safely
   */
  clearLocalStorage() {
    try {
      const keysToRemove = [
        'onboarding_data',
        'onboarding_errors',
        'onboarding_progress',
      ];

      keysToRemove.forEach(key => {
        try {
          localStorage.removeItem(key);
        } catch (error) {
          console.warn(`Failed to remove ${key} from localStorage:`, error);
        }
      });
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }

  /**
   * Reset onboarding state
   */
  resetOnboardingState() {
    try {
      // Reset to initial state
      const initialState = {
        currentStep: 0,
        completedSteps: [],
        data: {},
        errors: {},
        warnings: {},
        isDirty: false,
        isSaving: false,
      };

      localStorage.setItem('onboarding_data', JSON.stringify(initialState));
    } catch (error) {
      console.error('Failed to reset onboarding state:', error);
    }
  }

  /**
   * Get recovery history
   * @returns {Array} Recovery history
   */
  getRecoveryHistory() {
    return [...this.recoveryHistory];
  }

  /**
   * Get recovery statistics
   * @returns {Object} Recovery statistics
   */
  getRecoveryStats() {
    const totalAttempts = this.recoveryHistory.length;
    const successfulRecoveries = this.recoveryHistory.filter(
      attempt => attempt.success
    ).length;
    const strategyStats = this.recoveryHistory.reduce((acc, attempt) => {
      acc[attempt.strategy] = (acc[attempt.strategy] || 0) + 1;
      return acc;
    }, {});

    return {
      totalAttempts,
      successfulRecoveries,
      successRate:
        totalAttempts > 0 ? (successfulRecoveries / totalAttempts) * 100 : 0,
      strategyStats,
      lastRecovery:
        this.recoveryHistory[this.recoveryHistory.length - 1] || null,
    };
  }

  /**
   * Enable/disable automatic recovery
   * @param {boolean} enabled - Whether to enable automatic recovery
   */
  setAutomaticRecovery(enabled) {
    this.automaticRecoveryEnabled = enabled;
  }

  /**
   * Clear recovery history
   */
  clearRecoveryHistory() {
    this.recoveryHistory = [];
  }
}

/**
 * Error state persistence utilities
 */
export class ErrorStatePersistence {
  constructor() {
    this.storageKey = 'onboarding_error_state';
    this.maxStoredErrors = 100;
  }

  /**
   * Save error state
   * @param {Object} errorState - Error state to save
   */
  saveErrorState(errorState) {
    try {
      const existingErrors = this.loadErrorState();
      const newErrorState = {
        ...errorState,
        timestamp: new Date().toISOString(),
        id: `error_state_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`,
      };

      existingErrors.push(newErrorState);

      // Keep only recent errors
      if (existingErrors.length > this.maxStoredErrors) {
        existingErrors.splice(0, existingErrors.length - this.maxStoredErrors);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(existingErrors));
    } catch (error) {
      console.error('Failed to save error state:', error);
    }
  }

  /**
   * Load error state
   * @returns {Array} Stored error states
   */
  loadErrorState() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to load error state:', error);
      return [];
    }
  }

  /**
   * Clear error state
   */
  clearErrorState() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Failed to clear error state:', error);
    }
  }

  /**
   * Get error state statistics
   * @returns {Object} Error state statistics
   */
  getErrorStateStats() {
    const errorStates = this.loadErrorState();
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentErrors = errorStates.filter(
      error => new Date(error.timestamp) > oneDayAgo
    );

    const weeklyErrors = errorStates.filter(
      error => new Date(error.timestamp) > oneWeekAgo
    );

    return {
      total: errorStates.length,
      recent: recentErrors.length,
      weekly: weeklyErrors.length,
      oldest: errorStates[0]?.timestamp || null,
      newest: errorStates[errorStates.length - 1]?.timestamp || null,
    };
  }
}

/**
 * Error reporting utilities
 */
export class ErrorReporter {
  constructor() {
    this.reportingEndpoint = '/api/errors/report';
    this.batchSize = 10;
    this.reportQueue = [];
  }

  /**
   * Queue error for reporting
   * @param {Object} errorData - Error data to report
   */
  queueErrorReport(errorData) {
    this.reportQueue.push({
      ...errorData,
      queuedAt: new Date().toISOString(),
    });

    // Report if queue is full
    if (this.reportQueue.length >= this.batchSize) {
      this.flushReportQueue();
    }
  }

  /**
   * Flush the report queue
   */
  async flushReportQueue() {
    if (this.reportQueue.length === 0) return;

    const reports = [...this.reportQueue];
    this.reportQueue = [];

    try {
      await fetch(this.reportingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reports }),
      });
    } catch (error) {
      console.error('Failed to report errors:', error);
      // Re-queue failed reports
      this.reportQueue.unshift(...reports);
    }
  }

  /**
   * Report error immediately
   * @param {Object} errorData - Error data to report
   */
  async reportError(errorData) {
    try {
      await fetch(this.reportingEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reports: [errorData] }),
      });
    } catch (error) {
      console.error('Failed to report error:', error);
      // Queue for later reporting
      this.queueErrorReport(errorData);
    }
  }
}

// Export singleton instances
export const errorRecoveryManager = new ErrorRecoveryManager();
export const errorStatePersistence = new ErrorStatePersistence();
export const errorReporter = new ErrorReporter();
