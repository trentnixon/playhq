import { Stack, Text, Group, Badge, Paper, Button } from '@mantine/core';
import { useRouter } from 'next/router';

export const SubscriptionInformation = ({ user, account }) => {
  const router = useRouter();

  const formatDate = dateString => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const InfoRow = ({ label, value, badge = false, badgeColor = 'blue' }) => (
    <Group position='apart' py='sm'>
      <Text weight={600} size='sm' color='dimmed'>
        {label}:
      </Text>
      {badge ? (
        <Badge size='lg' radius='md' variant='outline' color={badgeColor}>
          {value || 'N/A'}
        </Badge>
      ) : (
        <Text weight={500} size='sm'>
          {value || 'N/A'}
        </Text>
      )}
    </Group>
  );

  const subscriptionTier =
    account?.attributes?.subscription_tier?.data?.attributes;
  const trialStatus = account?.attributes?.trialStatus;
  const trialNotificationStatus = account?.attributes?.trialNotificationStatus;

  // Get active order
  const activeOrder = account?.attributes?.orders?.data?.find(
    order => order.attributes?.isActive
  );
  const activeOrderDetails = activeOrder?.attributes;

  return (
    <Paper p='xs' radius='md'>
      <Stack spacing='xs'>
        <InfoRow
          label='Subscription Plan'
          value={
            subscriptionTier?.Name ||
            activeOrderDetails?.subscription_tier?.data?.attributes?.Name ||
            'No Active Plan'
          }
          badge
          badgeColor={subscriptionTier || activeOrderDetails ? 'green' : 'gray'}
        />

        {activeOrderDetails && (
          <>
            <InfoRow
              label='Order Name'
              value={activeOrderDetails.Name}
              badge
              badgeColor='blue'
            />
            <InfoRow
              label='Order Start'
              value={formatDate(activeOrderDetails.startOrderAt)}
            />
            <InfoRow
              label='Order End'
              value={formatDate(activeOrderDetails.endOrderAt)}
            />
            <InfoRow
              label='Order Status'
              value={activeOrderDetails.OrderPaid ? 'Paid' : 'Unpaid'}
              badge
              badgeColor={activeOrderDetails.OrderPaid ? 'green' : 'red'}
            />
          </>
        )}

        {subscriptionTier && !activeOrderDetails && (
          <>
            <InfoRow
              label='Plan Price'
              value={
                subscriptionTier?.price
                  ? `$${subscriptionTier.price} ${
                      subscriptionTier.currency || 'AUD'
                    }`
                  : 'N/A'
              }
            />
          </>
        )}

        <InfoRow
          label='Trial Status'
          value={
            trialStatus
              ? 'Active Trial'
              : trialNotificationStatus === 'ended_trial'
              ? 'Trial Ended'
              : 'No Trial'
          }
          badge
          badgeColor={
            trialStatus ? 'yellow' : trialNotificationStatus ? 'gray' : 'gray'
          }
        />

        {/*     <Group position='right' mt='md'>
          <Button
            variant='outline'
            onClick={() => router.push('/members/myplan')}
          >
            Manage Subscription
          </Button>
        </Group> */}
      </Stack>
    </Paper>
  );
};
