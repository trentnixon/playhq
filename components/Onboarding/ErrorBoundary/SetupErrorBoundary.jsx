import React, { Component } from 'react';
import { useRouter } from 'next/router';

/**
 * Error boundary component for onboarding setup
 * Provides comprehensive error catching and recovery mechanisms
 */
class SetupErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
      isRecovering: false,
      recoveryAttempts: 0,
    };
  }

  /**
   * Generate unique error ID for tracking
   */
  generateErrorId() {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Catch JavaScript errors anywhere in the child component tree
   */
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  /**
   * Log error information
   */
  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo,
      errorId: this.generateErrorId(),
    });

    // Log error to console for debugging
    console.error('SetupErrorBoundary caught an error:', error, errorInfo);

    // Log to external service (if available)
    this.logErrorToService(error, errorInfo);

    // Track error analytics
    this.trackErrorAnalytics(error, errorInfo);
  }

  /**
   * Log error to external service
   */
  logErrorToService(error, errorInfo) {
    try {
      // This would typically send to a service like Sentry, LogRocket, etc.
      const errorData = {
        errorId: this.state.errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        onboardingStep: this.getCurrentStep(),
        retryCount: this.state.retryCount,
      };

      // Example: Send to API endpoint
      fetch('/api/errors/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData),
      }).catch(console.error);
    } catch (loggingError) {
      console.error('Failed to log error to service:', loggingError);
    }
  }

  /**
   * Track error analytics
   */
  trackErrorAnalytics(error, errorInfo) {
    try {
      // Track error for analytics purposes
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: error.message,
          fatal: false,
          custom_map: {
            error_id: this.state.errorId,
            component_stack: errorInfo.componentStack,
          },
        });
      }
    } catch (analyticsError) {
      console.error('Failed to track error analytics:', analyticsError);
    }
  }

  /**
   * Get current onboarding step
   */
  getCurrentStep() {
    try {
      // Try to get current step from localStorage or context
      const savedData = localStorage.getItem('onboarding_data');
      if (savedData) {
        const data = JSON.parse(savedData);
        return data.currentStep || 'unknown';
      }
      return 'unknown';
    } catch {
      return 'unknown';
    }
  }

  /**
   * Handle retry attempt
   */
  handleRetry = () => {
    this.setState(prevState => ({
      retryCount: prevState.retryCount + 1,
      isRecovering: true,
    }));

    // Attempt to recover by resetting error state
    setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        isRecovering: false,
      });
    }, 1000);
  };

  /**
   * Handle reset to initial state
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
      isRecovering: false,
    });

    // Clear any corrupted state from localStorage
    try {
      localStorage.removeItem('onboarding_data');
      localStorage.removeItem('onboarding_errors');
    } catch (clearError) {
      console.error('Failed to clear localStorage:', clearError);
    }
  };

  /**
   * Handle navigation to home
   */
  handleGoHome = () => {
    try {
      window.location.href = '/';
    } catch (navError) {
      console.error('Failed to navigate home:', navError);
      // Fallback to simple redirect
      window.location.replace('/');
    }
  };

  /**
   * Handle manual recovery
   */
  handleManualRecovery = () => {
    this.setState(prevState => ({
      recoveryAttempts: prevState.recoveryAttempts + 1,
      isRecovering: true,
    }));

    // Attempt more aggressive recovery
    setTimeout(() => {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        isRecovering: false,
      });
    }, 2000);
  };

  /**
   * Get user-friendly error message
   */
  getUserFriendlyMessage() {
    const { error, retryCount } = this.state;

    if (!error) return 'An unexpected error occurred.';

    // Provide specific messages based on error type
    if (
      error.message.includes('NetworkError') ||
      error.message.includes('fetch')
    ) {
      return 'Connection error. Please check your internet connection and try again.';
    }

    if (
      error.message.includes('localStorage') ||
      error.message.includes('storage')
    ) {
      return 'Storage error. Please clear your browser cache and try again.';
    }

    if (error.message.includes('JSON') || error.message.includes('parse')) {
      return 'Data format error. Your saved data may be corrupted.';
    }

    if (retryCount > 2) {
      return 'Multiple errors detected. Please try refreshing the page or contact support.';
    }

    return 'Something went wrong. Please try again.';
  }

  /**
   * Get recovery suggestions
   */
  getRecoverySuggestions() {
    const { retryCount, recoveryAttempts } = this.state;

    const suggestions = [];

    if (retryCount === 0) {
      suggestions.push('Try clicking "Retry" to attempt recovery');
    } else if (retryCount === 1) {
      suggestions.push('Try refreshing the page');
      suggestions.push('Check your internet connection');
    } else if (retryCount === 2) {
      suggestions.push('Clear your browser cache');
      suggestions.push('Try a different browser');
    } else {
      suggestions.push('Contact support with error ID: ' + this.state.errorId);
      suggestions.push('Try accessing the setup later');
    }

    return suggestions;
  }

  render() {
    const {
      hasError,
      error,
      errorInfo,
      errorId,
      retryCount,
      isRecovering,
      recoveryAttempts,
    } = this.state;

    if (hasError) {
      return (
        <div
          className='error-boundary'
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backgroundColor: '#f9fafb',
          }}
        >
          <div
            className='error-container'
            style={{
              maxWidth: '600px',
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
            }}
          >
            {/* Error Icon */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div
                style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                }}
              >
                🛠️
              </div>
              <h1
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  marginBottom: '0.5rem',
                }}
              >
                Setup Error
              </h1>
              <p
                style={{
                  color: '#6b7280',
                  fontSize: '1rem',
                }}
              >
                {this.getUserFriendlyMessage()}
              </p>
            </div>

            {/* Error Details (for debugging) */}
            {process.env.NODE_ENV === 'development' && (
              <details
                style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Error Details (Development)
                </summary>
                <div style={{ marginTop: '0.5rem' }}>
                  <p>
                    <strong>Error ID:</strong> {errorId}
                  </p>
                  <p>
                    <strong>Message:</strong> {error?.message}
                  </p>
                  <p>
                    <strong>Retry Count:</strong> {retryCount}
                  </p>
                  <p>
                    <strong>Recovery Attempts:</strong> {recoveryAttempts}
                  </p>
                  {errorInfo && (
                    <pre
                      style={{
                        backgroundColor: '#1f2937',
                        color: '#f9fafb',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        overflow: 'auto',
                        fontSize: '0.75rem',
                      }}
                    >
                      {errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            {/* Recovery Suggestions */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: '#374151',
                }}
              >
                Try these solutions:
              </h3>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}
              >
                {this.getRecoverySuggestions().map((suggestion, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '0.25rem 0',
                      color: '#6b7280',
                      fontSize: '0.875rem',
                    }}
                  >
                    • {suggestion}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '0.75rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={this.handleRetry}
                disabled={isRecovering}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: isRecovering ? 'not-allowed' : 'pointer',
                  opacity: isRecovering ? 0.6 : 1,
                  transition: 'all 0.2s ease',
                }}
              >
                {isRecovering ? 'Recovering...' : 'Retry'}
              </button>

              <button
                onClick={this.handleReset}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Reset Setup
              </button>

              <button
                onClick={this.handleGoHome}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                Go Home
              </button>

              {retryCount > 1 && (
                <button
                  onClick={this.handleManualRecovery}
                  disabled={isRecovering}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: isRecovering ? 'not-allowed' : 'pointer',
                    opacity: isRecovering ? 0.6 : 1,
                    transition: 'all 0.2s ease',
                  }}
                >
                  Advanced Recovery
                </button>
              )}
            </div>

            {/* Error ID for support */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '0.75rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: '#6b7280',
              }}
            >
              <strong>Error ID:</strong> {errorId}
              <br />
              Please include this ID when contacting support.
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SetupErrorBoundary;
