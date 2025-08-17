import { useEffect, useRef, useCallback, useState } from 'react';
import { useOnboarding } from '../hooks/useOnboarding';
import { saveOnboardingProgress } from '../lib/onboardingApi';
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from '../components/Onboarding/utils/storage';

/**
 * Enhanced auto-save hook with debouncing, conflict resolution, and retry logic
 * @returns {Object} Auto-save state and functions
 */
export const useAutoSave = () => {
  const { state, actions } = useOnboarding();
  const autoSaveTimeoutRef = useRef(null);
  const lastSavedDataRef = useRef({});
  const retryCountRef = useRef(0);
  const isOnlineRef = useRef(navigator.onLine);

  const [saveStatus, setSaveStatus] = useState({
    isSaving: false,
    lastSaved: null,
    lastError: null,
    retryCount: 0,
  });

  /**
   * Debounced save function with retry logic
   */
  const debouncedSave = useCallback(
    async (data, isRetry = false) => {
      if (saveStatus.isSaving && !isRetry) return;

      try {
        setSaveStatus(prev => ({ ...prev, isSaving: true, lastError: null }));

        // Always save to localStorage first (immediate backup)
        saveToLocalStorage(data);

        // Try to save to server if online
        if (isOnlineRef.current) {
          await saveOnboardingProgress(data);
          lastSavedDataRef.current = data;
          retryCountRef.current = 0;

          setSaveStatus(prev => ({
            ...prev,
            isSaving: false,
            lastSaved: new Date(),
            retryCount: 0,
          }));
        } else {
          // If offline, just save to localStorage
          setSaveStatus(prev => ({
            ...prev,
            isSaving: false,
            lastSaved: new Date(),
            retryCount: 0,
          }));
        }

        // Clear dirty state
        actions.setSaving(false);
      } catch (error) {
        console.error('Auto-save failed:', error);

        // Implement retry logic with exponential backoff
        if (retryCountRef.current < 3) {
          retryCountRef.current++;
          const retryDelay = Math.pow(2, retryCountRef.current) * 1000; // 2s, 4s, 8s

          setSaveStatus(prev => ({
            ...prev,
            isSaving: false,
            lastError: error.message,
            retryCount: retryCountRef.current,
          }));

          // Retry after delay
          setTimeout(() => {
            debouncedSave(data, true);
          }, retryDelay);
        } else {
          // Max retries reached
          setSaveStatus(prev => ({
            ...prev,
            isSaving: false,
            lastError: error.message,
            retryCount: retryCountRef.current,
          }));

          // Show user notification about save failure
          console.warn(
            'Auto-save failed after 3 retries. Data saved locally only.'
          );
        }
      }
    },
    [saveStatus.isSaving, actions]
  );

  // Create ref after debouncedSave is defined
  const debouncedSaveRef = useRef(debouncedSave);

  // Update ref when debouncedSave changes
  useEffect(() => {
    debouncedSaveRef.current = debouncedSave;
  }, [debouncedSave]);

  /**
   * Force save function for manual saves
   */
  const forceSave = useCallback(async () => {
    if (state.isDirty) {
      retryCountRef.current = 0; // Reset retry count for manual saves
      await debouncedSave(state.data);
    }
  }, [state.isDirty, state.data, debouncedSave]);

  /**
   * Check for conflicts between local and server data
   */
  const checkForConflicts = useCallback(async () => {
    try {
      // This would typically fetch the latest server data
      // and compare with local data to detect conflicts
      const serverData = await loadOnboardingProgress(); // This would be a server call

      if (
        serverData &&
        JSON.stringify(serverData) !== JSON.stringify(lastSavedDataRef.current)
      ) {
        // Conflict detected - could show user dialog to choose which version to keep
        console.warn(
          'Data conflict detected between local and server versions'
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error checking for conflicts:', error);
      return false;
    }
  }, []);

  /**
   * Auto-save effect with debouncing
   */
  useEffect(() => {
    if (state.isDirty && !state.isSaving) {
      // Clear existing timeout
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      // Set new timeout for debounced save
      autoSaveTimeoutRef.current = setTimeout(() => {
        debouncedSaveRef.current(state.data);
      }, 2000); // 2 second delay
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [state.isDirty, state.data, state.isSaving]);

  /**
   * Beforeunload warning for unsaved changes
   */
  useEffect(() => {
    const handleBeforeUnload = event => {
      if (state.isDirty) {
        event.preventDefault();
        event.returnValue =
          'You have unsaved changes. Are you sure you want to leave?';
        return event.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.isDirty]);

  /**
   * Online/offline state handling
   */
  useEffect(() => {
    const handleOnline = () => {
      isOnlineRef.current = true;
      console.log('Back online - attempting to sync data');

      // Try to sync any pending changes when coming back online
      if (state.isDirty) {
        forceSave();
      }
    };

    const handleOffline = () => {
      isOnlineRef.current = false;
      console.log('Gone offline - saving to localStorage only');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [state.isDirty, forceSave]);

  /**
   * Sync data on mount if there are unsaved changes
   */
  useEffect(() => {
    if (state.isDirty && isOnlineRef.current) {
      // Small delay to ensure everything is loaded
      const syncTimeout = setTimeout(() => {
        forceSave();
      }, 1000);

      return () => clearTimeout(syncTimeout);
    }
  }, []); // Only run on mount

  return {
    // State
    isSaving: saveStatus.isSaving,
    lastSaved: saveStatus.lastSaved,
    lastError: saveStatus.lastError,
    retryCount: saveStatus.retryCount,
    isOnline: isOnlineRef.current,

    // Actions
    forceSave,
    checkForConflicts,

    // Utilities
    hasUnsavedChanges: state.isDirty,
    canSave: state.isDirty && !saveStatus.isSaving,
  };
};
