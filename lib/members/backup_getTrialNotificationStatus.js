export const getTrialNotificationStatus = user => {
  if (!user) {
    console.log('No user object provided');
    return 'no_user';
  }

  const checkOrderStatus = user?.attributes;
  const usersOrders = checkOrderStatus?.orders?.data ?? [];
  const trialStatus = checkOrderStatus.trialStatus;

  if (!usersOrders.length) {
    console.log('No orders found for user');
    return determineTrialStatus(trialStatus);
  }

  // Map each order to a priority value
  const priorities = usersOrders.map(order => {
    const { isActive, Status } = order.attributes;

    if (Status && isActive) {
      return 1; // Subscribed
    } else if (Status && !isActive) {
      return 0; // Pending subscriber
    } else if (!Status && !isActive) {
      return -1; // Ended trial
    }
    return -1; // Default to ended trial if no conditions match
  });

  // Determine the highest priority found
  const highestPriority = Math.max(...priorities);

  // Return the status based on the highest priority
  if (highestPriority === 1) {
    console.log("Returning 'subscribed'");
    return 'subscribed';
  } else if (highestPriority === 0) {
    console.log("Returning 'pending_subscriber'");
    return 'pending_subscriber';
  }

  console.log("Returning 'ended_trial'");
  return 'ended_trial'; // Return 'ended_trial' if no high priority statuses are found
};

function determineTrialStatus(trialStatus) {
  if (trialStatus === true) {
    console.log("Returning 'active_trial' based on trialStatus");
    return 'active_trial';
  } else if (trialStatus === false) {
    console.log("Returning 'ended_trial' based on trialStatus");
    return 'ended_trial';
  }
  console.log("Returning default 'available_trial'");
  return 'available_trial';
}
