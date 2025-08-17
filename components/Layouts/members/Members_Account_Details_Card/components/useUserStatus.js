import {
  IconAlertTriangle,
  IconCheck,
  IconClockPause,
  IconX,
} from '@tabler/icons-react';

// Helper to calculate status based on order attributes
function getStatus(orderAttributes) {
  const { isActive, Status, OrderPaid, isExpiringSoon } = orderAttributes;

  if (!Status) {
    return {
      statusMessage: 'Renew Season Pass',
      statusColor: 'gray.6',
      StatusIcon: IconX,
    };
  }

  if (isActive) {
    if (OrderPaid) {
      if (isExpiringSoon) {
        return {
          statusMessage: 'Expiring Soon',
          statusColor: 'yellow.6',
          StatusIcon: IconClockPause,
        };
      }
      return {
        statusMessage: 'Active',
        statusColor: 'green.6',
        StatusIcon: IconCheck,
      };
    }
    return {
      statusMessage: 'Awaiting Payment',
      statusColor: 'blue.6',
      StatusIcon: IconAlertTriangle,
    };
  }
  if (OrderPaid && !isActive) {
    return {
      statusMessage: 'Scheduled',
      statusColor: 'yellow.6',
      StatusIcon: IconX,
    };
  }
  return {
    statusMessage: 'Not Active',
    statusColor: 'red.6',
    StatusIcon: IconX,
  };
}

// Helper to calculate days left
function calculateDaysLeft(endOrderAt) {
  const today = new Date();
  const endDate = new Date(endOrderAt);
  return Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
}

export function useUserStatus(user) {
  const orders = user.attributes.orders?.data ?? [];

  if (orders.length === 0) {
    return {
      statusMessage: 'No Orders Found',
      statusColor: 'gray.4',
      StatusIcon: IconX, // Assuming IconX is an appropriate icon for "no orders"
      daysLeft: null,
    };
  }

  // Find the most recent order by the highest ID value
  const mostRecentOrder = orders.reduce((latest, order) => {
    return parseInt(order.id) > parseInt(latest.id) ? order : latest;
  }, orders[0]);

  try {
    const { createdAt, endOrderAt, startOrderAt, subscription_tier } =
      mostRecentOrder.attributes;
    const { statusMessage, statusColor, StatusIcon } = getStatus(
      mostRecentOrder.attributes
    );
    const { Title, DaysInPass, includeSponsors } =
      subscription_tier?.data?.attributes || {};
    const daysLeft = calculateDaysLeft(endOrderAt);

    return {
      createdAt: new Date(createdAt),
      statusMessage,
      statusColor,
      StatusIcon,
      Title,
      DaysInPass,
      includeSponsors,
      daysLeft,
      endOrderAt,
      startOrderAt,
    };
  } catch (error) {
    console.error('Failed to process the most recent order:', error);
    return {
      statusMessage: 'Error processing the order',
      statusColor: 'error',
      StatusIcon: IconError, // Assume IconError is defined elsewhere
      daysLeft: null,
    };
  }
}
