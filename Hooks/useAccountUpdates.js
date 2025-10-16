import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import Cookies from 'js-cookie';
import { fetcher } from '../lib/api';

/**
 * Hook for changing user password
 * Requires current password for security
 */
export const useChangePassword = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const validate = () => {
    if (!currentPassword || currentPassword.trim() === '') {
      setError('Current password is required');
      return false;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return false;
    }

    if (currentPassword === newPassword) {
      setError('New password must be different from current password');
      return false;
    }

    return true;
  };

  const save = async () => {
    if (!validate()) {
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const jwt = Cookies.get('jwt');
      if (!jwt) {
        throw new Error('Authentication required');
      }

      console.log('[useChangePassword] Attempting password change...');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/change-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            currentPassword: currentPassword,
            password: newPassword,
            passwordConfirmation: confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error?.message || 'Failed to change password');
      }

      console.log('[useChangePassword] Password changed successfully');

      notifications.show({
        title: 'Success',
        message: 'Password changed successfully',
        color: 'green',
      });

      // Clear all fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsEditing(false);
    } catch (err) {
      console.error('[useChangePassword] Error:', err);
      notifications.show({
        title: 'Error',
        message: err.message || 'Failed to change password',
        color: 'red',
      });
      setError(err.message || 'Failed to change password');
    } finally {
      setIsSaving(false);
    }
  };

  const cancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    isSaving,
    save,
    cancel,
  };
};

/**
 * Hook for updating delivery email address
 * @param {number} accountId - Account ID
 * @param {Function} onSuccess - Callback after successful update
 */
export const useUpdateDeliveryEmail = (accountId, onSuccess) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const save = async () => {
    if (!accountId) {
      setError('Account ID not found');
      return;
    }

    if (!validateEmail(value)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const jwt = Cookies.get('jwt');
      if (!jwt) {
        throw new Error('Authentication required');
      }

      await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${accountId}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: { DeliveryAddress: value },
          }),
        }
      );

      notifications.show({
        title: 'Success',
        message: 'Delivery email updated successfully',
        color: 'green',
      });

      setIsEditing(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error updating delivery email:', err);
      notifications.show({
        title: 'Error',
        message: 'Failed to update delivery email',
        color: 'red',
      });
      setError('Failed to update email');
    } finally {
      setIsSaving(false);
    }
  };

  const cancel = initialValue => {
    setValue(initialValue || '');
    setError('');
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    value,
    setValue,
    error,
    setError,
    isSaving,
    save,
    cancel,
  };
};

/**
 * Hook for updating username
 * @param {number} userId - User ID
 * @param {Function} onSuccess - Callback after successful update
 */
export const useUpdateUsername = (userId, onSuccess) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const save = async () => {
    if (!userId) {
      setError('User ID not found');
      return;
    }

    if (!value || value.trim() === '') {
      setError('Username cannot be empty');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const jwt = Cookies.get('jwt');
      if (!jwt) {
        throw new Error('Authentication required');
      }

      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${userId}`;
      console.log('[useUpdateUsername] API call to:', url);

      await fetcher(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          username: value,
        }),
      });

      console.log('[useUpdateUsername] API call successful');

      notifications.show({
        title: 'Success',
        message: 'Username updated successfully',
        color: 'green',
      });

      setIsEditing(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('[useUpdateUsername] Error:', err);
      notifications.show({
        title: 'Error',
        message: 'Failed to update username',
        color: 'red',
      });
      setError('Failed to update username');
    } finally {
      setIsSaving(false);
    }
  };

  const cancel = initialValue => {
    setValue(initialValue || '');
    setError('');
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    value,
    setValue,
    error,
    setError,
    isSaving,
    save,
    cancel,
  };
};

/**
 * Hook for updating login email address
 * @param {number} userId - User ID
 * @param {Function} onSuccess - Callback after successful update
 */
export const useUpdateLoginEmail = (userId, onSuccess) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const save = async () => {
    console.log('[useUpdateLoginEmail] save called with:', { value, userId });

    if (!userId) {
      setError('User ID not found');
      return;
    }

    if (!validateEmail(value)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const jwt = Cookies.get('jwt');
      if (!jwt) {
        throw new Error('Authentication required');
      }

      const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${userId}`;
      console.log('[useUpdateLoginEmail] API call to:', url);

      await fetcher(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          email: value,
        }),
      });

      console.log('[useUpdateLoginEmail] API call successful');

      notifications.show({
        title: 'Success',
        message: 'Login email updated successfully',
        color: 'green',
      });

      setIsEditing(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('[useUpdateLoginEmail] Error:', err);
      notifications.show({
        title: 'Error',
        message: 'Failed to update login email',
        color: 'red',
      });
      setError('Failed to update email');
    } finally {
      setIsSaving(false);
    }
  };

  const cancel = initialValue => {
    setValue(initialValue || '');
    setError('');
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    value,
    setValue,
    error,
    setError,
    isSaving,
    save,
    cancel,
  };
};

/**
 * Hook for updating first name / bundle addressed to
 * @param {number} accountId - Account ID
 * @param {Function} onSuccess - Callback after successful update
 */
export const useUpdateFirstName = (accountId, onSuccess) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const save = async () => {
    if (!accountId) {
      setError('Account ID not found');
      return;
    }

    if (!value || value.trim() === '') {
      setError('Name cannot be empty');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const jwt = Cookies.get('jwt');
      if (!jwt) {
        throw new Error('Authentication required');
      }

      await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${accountId}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify({
            data: { FirstName: value },
          }),
        }
      );

      notifications.show({
        title: 'Success',
        message: 'Name updated successfully',
        color: 'green',
      });

      setIsEditing(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error updating first name:', err);
      notifications.show({
        title: 'Error',
        message: 'Failed to update name',
        color: 'red',
      });
      setError('Failed to update name');
    } finally {
      setIsSaving(false);
    }
  };

  const cancel = initialValue => {
    setValue(initialValue || '');
    setError('');
    setIsEditing(false);
  };

  return {
    isEditing,
    setIsEditing,
    value,
    setValue,
    error,
    setError,
    isSaving,
    save,
    cancel,
  };
};
