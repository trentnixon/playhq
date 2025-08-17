/**
 * Analytics configuration
 * @typedef {Object} AnalyticsConfig
 * @property {boolean} enableGoogleAnalytics - Enable Google Analytics tracking
 * @property {boolean} enableCustomAnalytics - Enable custom analytics endpoint
 * @property {string} customEndpoint - Custom analytics endpoint URL
 * @property {boolean} enableDebug - Enable debug logging
 * @property {number} batchSize - Number of events to batch before sending
 * @property {number} flushInterval - Interval to flush events in ms
 */

/**
 * Analytics event types
 * @typedef {'step_started' | 'step_completed' | 'step_failed' | 'setup_started' | 'setup_completed' | 'setup_abandoned' | 'field_changed' | 'validation_error' | 'auto_save' | 'manual_save' | 'error_occurred' | 'help_accessed' | 'timeout_warning'} AnalyticsEventType
 */

/**
 * Analytics event data
 * @typedef {Object} AnalyticsEvent
 * @property {AnalyticsEventType} type - Event type
 * @property {string} stepId - Step identifier
 * @property {number} timestamp - Event timestamp
 * @property {Object} metadata - Additional event data
 * @property {string} sessionId - Session identifier
 * @property {string} userId - User identifier
 */

/**
 * Analytics session data
 * @typedef {Object} AnalyticsSession
 * @property {string} sessionId - Session identifier
 * @property {number} startTime - Session start time
 * @property {number} lastActivity - Last activity time
 * @property {string} userId - User identifier
 * @property {Object} setupData - Setup data snapshot
 * @property {number} progress - Current progress percentage
 */

/**
 * Default analytics configuration
 */
const DEFAULT_CONFIG = {
  enableGoogleAnalytics: true,
  enableCustomAnalytics: false,
  customEndpoint: process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT || '',
  enableDebug: process.env.NODE_ENV === 'development',
  batchSize: 10,
  flushInterval: 30000, // 30 seconds
};

/**
 * Check if code is running in browser environment
 * @returns {boolean} True if in browser
 */
const isBrowser = () => {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
};

/**
 * Safe localStorage wrapper
 */
const safeLocalStorage = {
  getItem: key => {
    if (!isBrowser()) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.warn('localStorage.getItem failed:', error);
      return null;
    }
  },
  setItem: (key, value) => {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('localStorage.setItem failed:', error);
    }
  },
};

/**
 * Analytics manager class
 */
class AnalyticsManager {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.eventQueue = [];
    this.sessionId = null;
    this.userId = null;
    this.sessionStartTime = null;
    this.lastActivity = null;
    this.isInitialized = false;
    this.flushTimer = null;
  }

  /**
   * Initialize analytics
   */
  initialize() {
    if (this.isInitialized || !isBrowser()) return;

    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.sessionStartTime = Date.now();
    this.lastActivity = Date.now();

    // Initialize Google Analytics if enabled
    if (this.config.enableGoogleAnalytics && typeof gtag !== 'undefined') {
      this.log('Google Analytics initialized');
    }

    // Start flush timer
    this.startFlushTimer();

    // Track session start (without calling trackEvent to avoid recursion)
    this._trackSessionStart();

    this.isInitialized = true;
  }

  /**
   * Track session start (internal method to avoid recursion)
   * @private
   */
  _trackSessionStart() {
    const event = {
      type: 'setup_started',
      stepId: 'session',
      timestamp: this.sessionStartTime,
      metadata: {
        sessionId: this.sessionId,
        userId: this.userId,
        timestamp: this.sessionStartTime,
      },
      sessionId: this.sessionId,
      userId: this.userId,
    };

    this.eventQueue.push(event);
    this.lastActivity = Date.now();

    // Log event if debug is enabled
    this.log(`Event tracked: setup_started`, event);

    // Send to Google Analytics
    this.sendToGoogleAnalytics(event);
  }

  /**
   * Generate unique session ID
   * @returns {string} Session ID
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get user ID from various sources
   * @returns {string} User ID
   */
  getUserId() {
    if (!isBrowser()) {
      return `user_ssr_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;
    }

    // Try to get from localStorage
    const savedUserId = safeLocalStorage.getItem('onboarding_user_id');
    if (savedUserId) return savedUserId;

    // Generate new user ID
    const userId = `user_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    safeLocalStorage.setItem('onboarding_user_id', userId);
    return userId;
  }

  /**
   * Track analytics event
   * @param {AnalyticsEventType} type - Event type
   * @param {string} stepId - Step identifier
   * @param {Object} metadata - Additional event data
   */
  trackEvent(type, stepId, metadata = {}) {
    // Initialize if not already done
    if (!this.isInitialized) {
      this.initialize();
    }

    // Don't track events if not in browser
    if (!isBrowser()) {
      this.log(`Event skipped (SSR): ${type}`);
      return;
    }

    const event = {
      type,
      stepId,
      timestamp: Date.now(),
      metadata: {
        ...metadata,
        sessionId: this.sessionId,
        userId: this.userId,
        userAgent: isBrowser() ? navigator.userAgent : 'SSR',
        screenResolution: isBrowser()
          ? `${screen.width}x${screen.height}`
          : 'SSR',
        timezone: isBrowser()
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : 'UTC',
      },
      sessionId: this.sessionId,
      userId: this.userId,
    };

    this.eventQueue.push(event);
    this.lastActivity = Date.now();

    // Log event if debug is enabled
    this.log(`Event tracked: ${type}`, event);

    // Send to Google Analytics
    this.sendToGoogleAnalytics(event);

    // Flush if queue is full
    if (this.eventQueue.length >= this.config.batchSize) {
      this.flush();
    }
  }

  /**
   * Send event to Google Analytics
   * @param {AnalyticsEvent} event - Analytics event
   */
  sendToGoogleAnalytics(event) {
    if (!this.config.enableGoogleAnalytics || typeof gtag === 'undefined')
      return;

    try {
      const { type, stepId, metadata } = event;

      // Map event types to GA4 events
      const eventMapping = {
        step_started: 'begin_checkout',
        step_completed: 'add_to_cart',
        step_failed: 'exception',
        setup_started: 'page_view',
        setup_completed: 'purchase',
        setup_abandoned: 'remove_from_cart',
        field_changed: 'custom_event',
        validation_error: 'exception',
        auto_save: 'custom_event',
        manual_save: 'custom_event',
        error_occurred: 'exception',
        help_accessed: 'custom_event',
        timeout_warning: 'custom_event',
      };

      const gaEventName = eventMapping[type] || 'custom_event';

      gtag('event', gaEventName, {
        event_category: 'onboarding',
        event_label: type,
        value: metadata.progress || 0,
        custom_parameters: {
          step_id: stepId,
          session_id: this.sessionId,
          user_id: this.userId,
          step_number: stepId.replace('step', ''),
          setup_duration: this.getSetupDuration(),
          ...metadata,
        },
      });

      this.log(`GA event sent: ${gaEventName}`);
    } catch (error) {
      this.log('Failed to send GA event:', error);
    }
  }

  /**
   * Track step completion
   * @param {string} stepId - Step identifier
   * @param {Object} stepData - Step data
   * @param {number} duration - Step duration in ms
   */
  trackStepCompletion(stepId, stepData, duration) {
    this.trackEvent('step_completed', stepId, {
      stepNumber: stepId.replace('step', ''),
      duration,
      dataFields: Object.keys(stepData),
      dataCompleteness: this.calculateDataCompleteness(stepData),
      timestamp: Date.now(),
    });
  }

  /**
   * Track step failure
   * @param {string} stepId - Step identifier
   * @param {string} reason - Failure reason
   * @param {Object} errors - Validation errors
   */
  trackStepFailure(stepId, reason, errors) {
    this.trackEvent('step_failed', stepId, {
      stepNumber: stepId.replace('step', ''),
      reason,
      errors: Object.keys(errors || {}),
      errorCount: Object.keys(errors || {}).length,
      timestamp: Date.now(),
    });
  }

  /**
   * Track field changes
   * @param {string} stepId - Step identifier
   * @param {string} fieldName - Field name
   * @param {any} oldValue - Previous value
   * @param {any} newValue - New value
   */
  trackFieldChange(stepId, fieldName, oldValue, newValue) {
    this.trackEvent('field_changed', stepId, {
      fieldName,
      oldValue: this.sanitizeValue(oldValue),
      newValue: this.sanitizeValue(newValue),
      valueType: typeof newValue,
      timestamp: Date.now(),
    });
  }

  /**
   * Track validation errors
   * @param {string} stepId - Step identifier
   * @param {Object} errors - Validation errors
   * @param {Object} warnings - Validation warnings
   */
  trackValidationError(stepId, errors, warnings) {
    this.trackEvent('validation_error', stepId, {
      errorCount: Object.keys(errors || {}).length,
      warningCount: Object.keys(warnings || {}).length,
      errorFields: Object.keys(errors || {}),
      warningFields: Object.keys(warnings || {}),
      timestamp: Date.now(),
    });
  }

  /**
   * Track auto-save events
   * @param {string} status - Save status
   * @param {Object} data - Saved data
   * @param {number} duration - Save duration
   */
  trackAutoSave(status, data, duration) {
    this.trackEvent('auto_save', 'system', {
      status,
      dataSize: JSON.stringify(data).length,
      duration,
      timestamp: Date.now(),
    });
  }

  /**
   * Track setup completion
   * @param {Object} finalData - Final setup data
   * @param {number} totalDuration - Total setup duration
   */
  trackSetupCompletion(finalData, totalDuration) {
    this.trackEvent('setup_completed', 'final', {
      totalDuration,
      finalDataFields: Object.keys(finalData),
      dataCompleteness: this.calculateDataCompleteness(finalData),
      timestamp: Date.now(),
    });

    // Track conversion
    this.trackConversion(finalData, totalDuration);
  }

  /**
   * Track setup abandonment
   * @param {string} reason - Abandonment reason
   * @param {number} progress - Progress at abandonment
   * @param {Object} lastData - Last saved data
   */
  trackSetupAbandonment(reason, progress, lastData) {
    this.trackEvent('setup_abandoned', 'final', {
      reason,
      progress,
      lastStep: this.getLastCompletedStep(),
      dataCompleteness: this.calculateDataCompleteness(lastData),
      timestamp: Date.now(),
    });
  }

  /**
   * Track conversion
   * @param {Object} finalData - Final setup data
   * @param {number} totalDuration - Total setup duration
   */
  trackConversion(finalData, totalDuration) {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {
        send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
        value: 1.0,
        currency: 'USD',
        custom_parameters: {
          setup_duration: totalDuration,
          data_completeness: this.calculateDataCompleteness(finalData),
          user_id: this.userId,
        },
      });
    }
  }

  /**
   * Track user behavior patterns
   * @param {string} behavior - Behavior type
   * @param {Object} details - Behavior details
   */
  trackUserBehavior(behavior, details) {
    this.trackEvent('custom_event', 'behavior', {
      behavior,
      ...details,
      timestamp: Date.now(),
    });
  }

  /**
   * Calculate data completeness percentage
   * @param {Object} data - Data object
   * @returns {number} Completeness percentage
   */
  calculateDataCompleteness(data) {
    if (!data || typeof data !== 'object') return 0;

    const fields = Object.keys(data);
    if (fields.length === 0) return 0;

    const filledFields = fields.filter(field => {
      const value = data[field];
      return value !== undefined && value !== null && value !== '';
    });

    return Math.round((filledFields.length / fields.length) * 100);
  }

  /**
   * Get setup duration in minutes
   * @returns {number} Setup duration in minutes
   */
  getSetupDuration() {
    if (!this.sessionStartTime) return 0;
    return Math.round((Date.now() - this.sessionStartTime) / (1000 * 60));
  }

  /**
   * Get last completed step
   * @returns {string} Last completed step ID
   */
  getLastCompletedStep() {
    const completedEvents = this.eventQueue.filter(
      e => e.type === 'step_completed'
    );
    if (completedEvents.length === 0) return null;

    return completedEvents[completedEvents.length - 1].stepId;
  }

  /**
   * Sanitize value for analytics
   * @param {any} value - Value to sanitize
   * @returns {any} Sanitized value
   */
  sanitizeValue(value) {
    if (typeof value === 'string' && value.length > 50) {
      return value.substring(0, 50) + '...';
    }
    return value;
  }

  /**
   * Start flush timer
   */
  startFlushTimer() {
    if (!isBrowser()) return;

    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.config.flushInterval);
  }

  /**
   * Flush events to custom endpoint
   */
  async flush() {
    if (this.eventQueue.length === 0) return;

    const events = [...this.eventQueue];
    this.eventQueue = [];

    if (!this.config.enableCustomAnalytics || !this.config.customEndpoint)
      return;

    try {
      const response = await fetch(this.config.customEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: this.sessionId,
          userId: this.userId,
          events,
          timestamp: Date.now(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      this.log(`Flushed ${events.length} events`);
    } catch (error) {
      this.log('Failed to flush events:', error);
      // Re-queue events for retry
      this.eventQueue.unshift(...events);
    }
  }

  /**
   * Get analytics summary
   * @returns {Object} Analytics summary
   */
  getAnalyticsSummary() {
    const events = this.eventQueue;

    return {
      sessionId: this.sessionId,
      userId: this.userId,
      sessionDuration: this.getSetupDuration(),
      totalEvents: events.length,
      eventsByType: events.reduce((acc, event) => {
        acc[event.type] = (acc[event.type] || 0) + 1;
        return acc;
      }, {}),
      lastActivity: this.lastActivity,
      isActive: this.lastActivity
        ? Date.now() - this.lastActivity < 300000
        : false, // 5 minutes
    };
  }

  /**
   * Log message if debug is enabled
   * @param {string} message - Log message
   * @param {any} data - Additional data
   */
  log(message, data) {
    if (this.config.enableDebug) {
      console.log(`[Analytics] ${message}`, data || '');
    }
  }

  /**
   * Cleanup analytics
   */
  cleanup() {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }

    // Flush remaining events
    this.flush();
  }
}

// Lazy initialization - only create instance when needed
let analyticsManagerInstance = null;

const getAnalyticsManager = () => {
  if (!analyticsManagerInstance) {
    analyticsManagerInstance = new AnalyticsManager();
  }
  return analyticsManagerInstance;
};

// Export utility functions with lazy initialization
export const trackEvent = (type, stepId, metadata) =>
  getAnalyticsManager().trackEvent(type, stepId, metadata);
export const trackStepCompletion = (stepId, stepData, duration) =>
  getAnalyticsManager().trackStepCompletion(stepId, stepData, duration);
export const trackStepFailure = (stepId, reason, errors) =>
  getAnalyticsManager().trackStepFailure(stepId, reason, errors);
export const trackFieldChange = (stepId, fieldName, oldValue, newValue) =>
  getAnalyticsManager().trackFieldChange(stepId, fieldName, oldValue, newValue);
export const trackValidationError = (stepId, errors, warnings) =>
  getAnalyticsManager().trackValidationError(stepId, errors, warnings);
export const trackAutoSave = (status, data, duration) =>
  getAnalyticsManager().trackAutoSave(status, data, duration);
export const trackSetupCompletion = (finalData, totalDuration) =>
  getAnalyticsManager().trackSetupCompletion(finalData, totalDuration);
export const trackSetupAbandonment = (reason, progress, lastData) =>
  getAnalyticsManager().trackSetupAbandonment(reason, progress, lastData);
export const trackUserBehavior = (behavior, details) =>
  getAnalyticsManager().trackUserBehavior(behavior, details);
export const getAnalyticsSummary = () =>
  getAnalyticsManager().getAnalyticsSummary();

// Export the manager instance getter for direct access if needed
export const analyticsManager = {
  get instance() {
    return getAnalyticsManager();
  },
};
