import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Comprehensive error handling hook with logging, retry mechanisms, and notifications
 * @returns {Object} Error handling functions and state
 */
export const useErrorHandler = () => {
  const [errors, setErrors] = useState([]);
  const [isLogging, setIsLogging] = useState(false);
  const retryQueue = useRef(new Map());
  const errorCount = useRef(0);
  const maxRetries = 3;

  /**
   * Log error to external service
   * @param {Error} error - Error object
   * @param {Object} context - Additional context
   * @param {string} category - Error category
   */
  const logError = useCallback(
    async (error, context = {}, category = 'general') => {
      const errorId = `error_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      const errorData = {
        id: errorId,
        message: error.message,
        stack: error.stack,
        category,
        context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        errorCount: ++errorCount.current,
      };

      // Add to local errors state
      setErrors(prev => [...prev, { ...errorData, severity: 'error' }]);

      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.error('Error logged:', errorData);
      }

      // Send to external service
      try {
        setIsLogging(true);

        // Example: Send to API endpoint
        const response = await fetch('/api/errors/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(errorData),
        });

        if (!response.ok) {
          throw new Error(`Failed to log error: ${response.status}`);
        }

        // Track analytics
        trackErrorAnalytics(errorData);
      } catch (loggingError) {
        console.error('Failed to log error to service:', loggingError);

        // Store locally if external logging fails
        storeErrorLocally(errorData);
      } finally {
        setIsLogging(false);
      }

      return errorId;
    },
    []
  );

  /**
   * Track error analytics
   * @param {Object} errorData - Error data
   */
  const trackErrorAnalytics = useCallback(errorData => {
    try {
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: errorData.message,
          fatal: false,
          custom_map: {
            error_id: errorData.id,
            category: errorData.category,
            error_count: errorData.errorCount,
          },
        });
      }
    } catch (analyticsError) {
      console.error('Failed to track error analytics:', analyticsError);
    }
  }, []);

  /**
   * Store error locally if external logging fails
   * @param {Object} errorData - Error data
   */
  const storeErrorLocally = useCallback(errorData => {
    try {
      const storedErrors = JSON.parse(
        localStorage.getItem('onboarding_errors') || '[]'
      );
      storedErrors.push({
        ...errorData,
        storedAt: new Date().toISOString(),
      });

      // Keep only last 50 errors
      if (storedErrors.length > 50) {
        storedErrors.splice(0, storedErrors.length - 50);
      }

      localStorage.setItem('onboarding_errors', JSON.stringify(storedErrors));
    } catch (storageError) {
      console.error('Failed to store error locally:', storageError);
    }
  }, []);

  /**
   * Retry mechanism with exponential backoff
   * @param {Function} operation - Operation to retry
   * @param {Object} options - Retry options
   * @returns {Promise} Operation result
   */
  const retryOperation = useCallback(
    async (operation, options = {}) => {
      const {
        maxAttempts = maxRetries,
        baseDelay = 1000,
        maxDelay = 10000,
        backoffMultiplier = 2,
        retryCondition = null,
      } = options;

      let lastError;

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const result = await operation();
          return result;
        } catch (error) {
          lastError = error;

          // Check if we should retry based on condition
          if (retryCondition && !retryCondition(error)) {
            throw error;
          }

          // Don't retry on last attempt
          if (attempt === maxAttempts) {
            break;
          }

          // Calculate delay with exponential backoff
          const delay = Math.min(
            baseDelay * Math.pow(backoffMultiplier, attempt - 1),
            maxDelay
          );

          // Log retry attempt
          await logError(
            error,
            {
              attempt,
              maxAttempts,
              delay,
              operation: operation.name || 'unknown',
            },
            'retry'
          );

          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }

      throw lastError;
    },
    [logError]
  );

  /**
   * Show error notification
   * @param {string} message - Error message
   * @param {string} type - Notification type
   * @param {number} duration - Duration in milliseconds
   */
  const showErrorNotification = useCallback(
    (message, type = 'error', duration = 5000) => {
      // Create notification element
      const notification = document.createElement('div');
      notification.className = `error-notification ${type}`;
      notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      ${type === 'error' ? 'background-color: #dc2626;' : ''}
      ${type === 'warning' ? 'background-color: #f59e0b;' : ''}
      ${type === 'info' ? 'background-color: #3b82f6;' : ''}
    `;

      notification.textContent = message;

      // Add to DOM
      document.body.appendChild(notification);

      // Animate in
      setTimeout(() => {
        notification.style.transform = 'translateX(0)';
      }, 100);

      // Auto remove
      setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }, duration);

      return notification;
    },
    []
  );

  /**
   * Handle async operation with error handling
   * @param {Function} operation - Async operation
   * @param {Object} options - Error handling options
   * @returns {Promise} Operation result
   */
  const handleAsyncOperation = useCallback(
    async (operation, options = {}) => {
      const {
        showNotification = true,
        retry = false,
        retryOptions = {},
        category = 'operation',
        context = {},
      } = options;

      try {
        let result;

        if (retry) {
          result = await retryOperation(operation, retryOptions);
        } else {
          result = await operation();
        }

        return result;
      } catch (error) {
        // Log error
        await logError(error, context, category);

        // Show notification
        if (showNotification) {
          const message =
            options.errorMessage || error.message || 'An error occurred';
          showErrorNotification(message, 'error');
        }

        throw error;
      }
    },
    [logError, retryOperation, showErrorNotification]
  );

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setErrors([]);
    errorCount.current = 0;
  }, []);

  /**
   * Get error statistics
   */
  const getErrorStats = useCallback(() => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentErrors = errors.filter(
      error => new Date(error.timestamp) > oneHourAgo
    );

    const dailyErrors = errors.filter(
      error => new Date(error.timestamp) > oneDayAgo
    );

    const errorCategories = errors.reduce((acc, error) => {
      acc[error.category] = (acc[error.category] || 0) + 1;
      return acc;
    }, {});

    return {
      total: errors.length,
      recent: recentErrors.length,
      daily: dailyErrors.length,
      categories: errorCategories,
      isLogging,
    };
  }, [errors, isLogging]);

  /**
   * Sync stored errors on mount
   */
  useEffect(() => {
    try {
      const storedErrors = JSON.parse(
        localStorage.getItem('onboarding_errors') || '[]'
      );
      if (storedErrors.length > 0) {
        // Sync stored errors to external service
        storedErrors.forEach(async errorData => {
          try {
            await fetch('/api/errors/log', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(errorData),
            });
          } catch (syncError) {
            console.error('Failed to sync stored error:', syncError);
          }
        });

        // Clear stored errors after sync attempt
        localStorage.removeItem('onboarding_errors');
      }
    } catch (syncError) {
      console.error('Failed to sync stored errors:', syncError);
    }
  }, []);

  return {
    // State
    errors,
    isLogging,

    // Functions
    logError,
    retryOperation,
    showErrorNotification,
    handleAsyncOperation,
    clearErrors,
    getErrorStats,

    // Utilities
    errorCount: errorCount.current,
  };
};
