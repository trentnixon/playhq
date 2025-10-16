import {
  Stack,
  Text,
  Group,
  Badge,
  Paper,
  Divider,
  Button,
  TextInput,
  ActionIcon,
  PasswordInput,
  Anchor,
  Modal,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  useUpdateDeliveryEmail,
  useUpdateLoginEmail,
  useUpdateFirstName,
  useUpdateUsername,
  useChangePassword,
} from '../../../../../../Hooks/useAccountUpdates';
import { P } from '../../../../../Members/Common/Type';

/**
 * @typedef {Object} User
 * @property {number} id - User ID
 * @property {string} username - Username for login
 * @property {string} email - User email address
 * @property {string} provider - Authentication provider (e.g., 'local')
 * @property {boolean} confirmed - Whether email is confirmed
 * @property {boolean} blocked - Whether account is blocked
 * @property {string} createdAt - Account creation timestamp
 * @property {string} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} AccountAttributes
 * @property {string} updatedAt - Last update timestamp
 * @property {string} publishedAt - Publication timestamp
 * @property {boolean} isActive - Whether account is active
 * @property {string} FirstName - First name or primary contact
 * @property {string|null} LastName - Last name
 * @property {string} DeliveryAddress - Email address for asset delivery
 * @property {boolean} isSetup - Whether initial setup is complete
 * @property {boolean} hasCompletedStartSequence - Whether onboarding is complete
 * @property {boolean} isRightsHolder - Rights holder status
 * @property {boolean} isPermissionGiven - Permission granted status
 * @property {boolean|string} group_assets_by - How to group assets (e.g., 'template', 'grade', 'team')
 * @property {string} Sport - Sport type (e.g., 'Cricket')
 * @property {boolean} hasCustomTemplate - Whether custom template exists
 * @property {boolean} include_junior_surnames - Show surnames for juniors
 * @property {Object} scheduler - Scheduler configuration with days_of_the_week
 * @property {Object} account_type - Account type (Club, Association, etc.)
 * @property {Object} associations - Related associations
 * @property {Object} clubs - Related clubs
 * @property {Object} theme - Custom theme settings
 * @property {Object} orders - Order history and subscriptions
 * @property {Object} sponsors - Sponsor relationships
 * @property {Object} subscription_tier - Current subscription plan
 * @property {Object} account_media_libraries - Media library items
 * @property {Object} data_collections - Data collection records
 * @property {Object} template_option - Template customization options
 * @property {boolean|string} trialStatus - Trial status
 * @property {string} trialNotificationStatus - Trial notification state
 */

/**
 * @typedef {Object} Account
 * @property {number} id - Account ID
 * @property {AccountAttributes} attributes - Account attributes and relations
 */

/**
 * Account Information Component - Displays auth and request details
 * @param {Object} props
 * @param {User} props.user - User authentication data
 * @param {Account} props.account - Account details and settings
 * @param {Function} props.onUpdate - Callback to refresh account data
 * @param {Function} props.onUserUpdate - Callback to refresh user data
 */
export const AccountInformation = ({
  user,
  account,
  onUpdate,
  onUserUpdate,
}) => {
  const deliveryEmail = useUpdateDeliveryEmail(account?.id, onUpdate);
  const loginEmail = useUpdateLoginEmail(user?.id, onUserUpdate);
  const firstName = useUpdateFirstName(account?.id, onUpdate);
  const username = useUpdateUsername(user?.id, onUserUpdate);
  const password = useChangePassword();

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: null,
    action: null,
  });

  const handleConfirmSave = (type, action) => {
    setConfirmModal({ isOpen: true, type, action });
  };

  const confirmAndSave = () => {
    if (confirmModal.action) {
      confirmModal.action();
    }
    setConfirmModal({ isOpen: false, type: null, action: null });
  };

  const cancelConfirm = () => {
    setConfirmModal({ isOpen: false, type: null, action: null });
  };

  // Initialize values when data loads
  useEffect(() => {
    if (account?.attributes?.DeliveryAddress) {
      deliveryEmail.setValue(account.attributes.DeliveryAddress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.attributes?.DeliveryAddress]);

  useEffect(() => {
    if (user?.email) {
      loginEmail.setValue(user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  useEffect(() => {
    if (account?.attributes?.FirstName) {
      firstName.setValue(account.attributes.FirstName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account?.attributes?.FirstName]);

  useEffect(() => {
    if (user?.username) {
      username.setValue(user.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.username]);

  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getOrganizations = () => {
    const clubs = account?.attributes?.clubs?.data;
    const associations = account?.attributes?.associations?.data;

    const allOrgs = [];

    if (Array.isArray(clubs) && clubs.length > 0) {
      allOrgs.push(...clubs.map(club => club.attributes?.Name));
    } else if (clubs?.attributes?.Name) {
      allOrgs.push(clubs.attributes.Name);
    }

    if (Array.isArray(associations) && associations.length > 0) {
      allOrgs.push(...associations.map(assoc => assoc.attributes?.Name));
    } else if (associations?.attributes?.Name) {
      allOrgs.push(associations.attributes.Name);
    }

    return allOrgs.filter(Boolean).join(', ') || 'N/A';
  };

  const router = useRouter();

  const InfoRow = ({ label, value, badge = false, link = null }) => (
    <Group position='apart' py='sm'>
      <Text weight={600} size='sm' color='dimmed'>
        {label}:
      </Text>
      <Group spacing='xs'>
        {badge ? (
          <Badge size='lg' radius='md' variant='outline'>
            {value || 'N/A'}
          </Badge>
        ) : (
          <Text weight={500} size='sm'>
            {value || 'N/A'}
          </Text>
        )}
        {link && (
          <Button
            size='xs'
            variant='outline'
            color='members.4'
            compact
            onClick={() => router.push(link)}
          >
            Edit
          </Button>
        )}
      </Group>
    </Group>
  );

  return (
    <Stack spacing='md'>
      <Group position='right' spacing='xl'>
        <Group spacing='xs'>
          <Text size='sm' color='dimmed'>
            isSetup:
          </Text>
          <Badge
            size='md'
            radius='md'
            variant='outline'
            color={account?.attributes?.isSetup ? 'green' : 'red'}
          >
            {account?.attributes?.isSetup ? 'Yes' : 'No'}
          </Badge>
        </Group>
        <Group spacing='xs'>
          <Text size='sm' color='dimmed'>
            isRightsHolder:
          </Text>
          <Badge
            size='md'
            radius='md'
            variant='outline'
            color={account?.attributes?.isRightsHolder ? 'green' : 'red'}
          >
            {account?.attributes?.isRightsHolder ? 'Yes' : 'No'}
          </Badge>
        </Group>
        <Group spacing='xs'>
          <Text size='sm' color='dimmed'>
            isPermissionGiven:
          </Text>
          <Badge
            size='md'
            radius='md'
            variant='outline'
            color={account?.attributes?.isPermissionGiven ? 'green' : 'red'}
          >
            {account?.attributes?.isPermissionGiven ? 'Yes' : 'No'}
          </Badge>
        </Group>
      </Group>
      <Paper p='xs' radius='md'>
        <Text weight={700} size='md' mb='md'>
          Authentication Details
        </Text>
        <Stack spacing='xs'>
          <InfoRow
            label='Status'
            value={account?.attributes?.isActive ? 'Active' : 'Inactive'}
            badge
          />
          {username.isEditing ? (
            <Group
              position='apart'
              py='sm'
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleConfirmSave('username', username.save);
                } else if (e.key === 'Escape') {
                  username.cancel(user?.username);
                }
              }}
            >
              <Text weight={600} size='sm' color='dimmed'>
                User Name:
              </Text>
              <Group spacing='xs' style={{ flex: 1, maxWidth: '60%' }}>
                <TextInput
                  value={username.value}
                  onChange={e => {
                    username.setValue(e.target.value);
                    username.setError('');
                  }}
                  error={username.error}
                  placeholder='Enter username'
                  style={{ flex: 1 }}
                  size='xs'
                />
                <ActionIcon
                  color='green'
                  onClick={() => handleConfirmSave('username', username.save)}
                  loading={username.isSaving}
                  disabled={username.isSaving}
                >
                  <IconCheck size={16} />
                </ActionIcon>
                <ActionIcon
                  color='red'
                  onClick={() => username.cancel(user?.username)}
                  disabled={username.isSaving}
                >
                  <IconX size={16} />
                </ActionIcon>
              </Group>
            </Group>
          ) : (
            <Group position='apart' py='sm'>
              <Text weight={600} size='sm' color='dimmed'>
                User Name:
              </Text>
              <Group spacing='xs'>
                <Text weight={500} size='sm'>
                  {user?.username || 'N/A'}
                </Text>
                <Button
                  size='xs'
                  variant='outline'
                  color='members.4'
                  compact
                  onClick={() => username.setIsEditing(true)}
                >
                  Edit
                </Button>
              </Group>
            </Group>
          )}
          {loginEmail.isEditing ? (
            <Group
              position='apart'
              py='sm'
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleConfirmSave('loginEmail', loginEmail.save);
                } else if (e.key === 'Escape') {
                  loginEmail.cancel(user?.email);
                }
              }}
            >
              <Text weight={600} size='sm' color='dimmed'>
                Login Email:
              </Text>
              <Group spacing='xs' style={{ flex: 1, maxWidth: '60%' }}>
                <TextInput
                  value={loginEmail.value}
                  onChange={e => {
                    loginEmail.setValue(e.target.value);
                    loginEmail.setError('');
                  }}
                  error={loginEmail.error}
                  placeholder='Enter login email'
                  style={{ flex: 1 }}
                  size='xs'
                />
                <ActionIcon
                  color='green'
                  onClick={() =>
                    handleConfirmSave('loginEmail', loginEmail.save)
                  }
                  loading={loginEmail.isSaving}
                  disabled={loginEmail.isSaving}
                >
                  <IconCheck size={16} />
                </ActionIcon>
                <ActionIcon
                  color='red'
                  onClick={() => loginEmail.cancel(user?.email)}
                  disabled={loginEmail.isSaving}
                >
                  <IconX size={16} />
                </ActionIcon>
              </Group>
            </Group>
          ) : (
            <Group position='apart' py='sm'>
              <Text weight={600} size='sm' color='dimmed'>
                Login Email:
              </Text>
              <Group spacing='xs'>
                <Text weight={500} size='sm'>
                  {user?.email || 'N/A'}
                </Text>
                <Button
                  size='xs'
                  variant='outline'
                  color='members.4'
                  compact
                  onClick={() => loginEmail.setIsEditing(true)}
                >
                  Edit
                </Button>
              </Group>
            </Group>
          )}
          {password.isEditing ? (
            <Stack
              spacing='xs'
              py='sm'
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleConfirmSave('password', password.save);
                } else if (e.key === 'Escape') {
                  password.cancel();
                }
              }}
            >
              <Group position='apart'>
                <Text weight={600} size='sm' color='dimmed'>
                  Change Password:
                </Text>
                <Group spacing='xs'>
                  <ActionIcon
                    color='green'
                    onClick={() => handleConfirmSave('password', password.save)}
                    loading={password.isSaving}
                    disabled={password.isSaving}
                    size='lg'
                  >
                    <IconCheck size={18} />
                  </ActionIcon>
                  <ActionIcon
                    color='red'
                    onClick={password.cancel}
                    disabled={password.isSaving}
                    size='lg'
                  >
                    <IconX size={18} />
                  </ActionIcon>
                </Group>
              </Group>
              <PasswordInput
                value={password.currentPassword}
                onChange={e => {
                  password.setCurrentPassword(e.target.value);
                  password.setError('');
                }}
                placeholder='Current password'
                size='xs'
                label='Current Password'
                required
              />
              <PasswordInput
                value={password.newPassword}
                onChange={e => {
                  password.setNewPassword(e.target.value);
                  password.setError('');
                }}
                placeholder='New password (min 8 characters)'
                size='xs'
                label='New Password'
                required
              />
              <PasswordInput
                value={password.confirmPassword}
                onChange={e => {
                  password.setConfirmPassword(e.target.value);
                  password.setError('');
                }}
                placeholder='Confirm new password'
                size='xs'
                label='Confirm New Password'
                required
              />
              {password.error && (
                <Text size='xs' color='red'>
                  {password.error}
                </Text>
              )}
              <Group position='right' mt='xs'>
                <Anchor
                  size='xs'
                  onClick={() => {
                    password.cancel();
                    router.push('/password-request');
                  }}
                >
                  Forgot your password?
                </Anchor>
              </Group>
            </Stack>
          ) : (
            <Group position='apart' py='sm'>
              <Text weight={600} size='sm' color='dimmed'>
                Password:
              </Text>
              <Group spacing='xs'>
                <Text weight={500} size='sm'>
                  ••••••••
                </Text>
                <Button
                  size='xs'
                  variant='outline'
                  color='members.4'
                  compact
                  onClick={() => password.setIsEditing(true)}
                >
                  Change
                </Button>
              </Group>
            </Group>
          )}
        </Stack>
      </Paper>
      <Group position='right' spacing='xl'>
        <Text size='sm' color='dimmed'>
          Member Since: {formatDate(account?.attributes?.publishedAt)}
        </Text>
        <Text size='sm' color='dimmed'>
          Last Updated: {formatDate(account?.attributes?.updatedAt)}
        </Text>
      </Group>

      <Divider my='md' />

      <Paper p='xs' radius='md'>
        <Text weight={700} size='md' mb='md'>
          Bundle Details
        </Text>
        <Stack spacing='xs'>
          <InfoRow label='Sport' value={account?.attributes?.Sport} badge />
          <InfoRow
            label='Account Type'
            value={account?.attributes?.account_type?.data?.attributes?.Name}
          />
          <InfoRow label='Organization(s)' value={getOrganizations()} />

          {firstName.isEditing ? (
            <Group
              position='apart'
              py='sm'
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleConfirmSave('firstName', firstName.save);
                } else if (e.key === 'Escape') {
                  firstName.cancel(account?.attributes?.FirstName);
                }
              }}
            >
              <Text weight={600} size='sm' color='dimmed'>
                Bundle Addressed To:
              </Text>
              <Group spacing='xs' style={{ flex: 1, maxWidth: '60%' }}>
                <TextInput
                  value={firstName.value}
                  onChange={e => {
                    firstName.setValue(e.target.value);
                    firstName.setError('');
                  }}
                  error={firstName.error}
                  placeholder='Enter name'
                  style={{ flex: 1 }}
                  size='xs'
                />
                <ActionIcon
                  color='green'
                  onClick={() => handleConfirmSave('firstName', firstName.save)}
                  loading={firstName.isSaving}
                  disabled={firstName.isSaving}
                >
                  <IconCheck size={16} />
                </ActionIcon>
                <ActionIcon
                  color='red'
                  onClick={() =>
                    firstName.cancel(account?.attributes?.FirstName)
                  }
                  disabled={firstName.isSaving}
                >
                  <IconX size={16} />
                </ActionIcon>
              </Group>
            </Group>
          ) : (
            <Group position='apart' py='sm'>
              <Text weight={600} size='sm' color='dimmed'>
                Bundle Addressed To:
              </Text>
              <Group spacing='xs'>
                <Text weight={500} size='sm'>
                  {account?.attributes?.FirstName || 'N/A'}
                </Text>
                <Button
                  size='xs'
                  variant='outline'
                  color='members.4'
                  compact
                  onClick={() => firstName.setIsEditing(true)}
                >
                  Edit
                </Button>
              </Group>
            </Group>
          )}
          {deliveryEmail.isEditing ? (
            <Group
              position='apart'
              py='sm'
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleConfirmSave('deliveryEmail', deliveryEmail.save);
                } else if (e.key === 'Escape') {
                  deliveryEmail.cancel(account?.attributes?.DeliveryAddress);
                }
              }}
            >
              <Text weight={600} size='sm' color='dimmed'>
                Delivery Email:
              </Text>
              <Group spacing='xs' style={{ flex: 1, maxWidth: '60%' }}>
                <TextInput
                  value={deliveryEmail.value}
                  onChange={e => {
                    deliveryEmail.setValue(e.target.value);
                    deliveryEmail.setError('');
                  }}
                  error={deliveryEmail.error}
                  placeholder='Enter delivery email'
                  style={{ flex: 1 }}
                  size='xs'
                />
                <ActionIcon
                  color='green'
                  onClick={() =>
                    handleConfirmSave('deliveryEmail', deliveryEmail.save)
                  }
                  loading={deliveryEmail.isSaving}
                  disabled={deliveryEmail.isSaving}
                >
                  <IconCheck size={16} />
                </ActionIcon>
                <ActionIcon
                  color='red'
                  onClick={() =>
                    deliveryEmail.cancel(account?.attributes?.DeliveryAddress)
                  }
                  disabled={deliveryEmail.isSaving}
                >
                  <IconX size={16} />
                </ActionIcon>
              </Group>
            </Group>
          ) : (
            <Group position='apart' py='sm'>
              <Text weight={600} size='sm' color='dimmed'>
                Delivery Email:
              </Text>
              <Group spacing='xs'>
                <Text weight={500} size='sm'>
                  {account?.attributes?.DeliveryAddress || 'N/A'}
                </Text>
                <Button
                  size='xs'
                  variant='outline'
                  color='members.4'
                  compact
                  onClick={() => deliveryEmail.setIsEditing(true)}
                >
                  Edit
                </Button>
              </Group>
            </Group>
          )}
          <InfoRow
            label='Asset Delivery Day'
            value={
              account?.attributes?.scheduler?.data?.attributes?.days_of_the_week
                ?.data?.attributes?.Name || 'Not Set'
            }
            link='/members/settings/change-day-bundle-arrives/'
          />
        </Stack>
      </Paper>

      {/* Confirmation Modal */}
      <Modal
        opened={confirmModal.isOpen}
        onClose={cancelConfirm}
        title='Confirm Changes'
        centered
      >
        <Stack spacing='md'>
          <Text size='sm'>
            {confirmModal.type === 'password' &&
              'Are you sure you want to change your password? You will need to use your new password on your next login.'}
            {confirmModal.type === 'loginEmail' &&
              'Are you sure you want to change your login email? This will affect how you sign in to your account.'}
            {confirmModal.type === 'username' &&
              'Are you sure you want to change your username? This will update how your name appears in the system.'}
            {confirmModal.type === 'firstName' &&
              'Are you sure you want to change the bundle addressed to name? This will affect how bundles are labeled.'}
            {confirmModal.type === 'deliveryEmail' &&
              'Are you sure you want to change your delivery email? All future asset bundles will be sent to this new email address.'}
          </Text>
          <Group position='right' spacing='sm'>
            <Button variant='subtle' onClick={cancelConfirm}>
              Cancel
            </Button>
            <Button onClick={confirmAndSave} color='members.4'>
              Confirm
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};
