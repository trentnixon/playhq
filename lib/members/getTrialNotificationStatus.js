export const getTrialNotificationStatus = (user) => {
  if (!user) {
    console.log("No user object provided");
    return "no_user";
  }

  console.log("user.attributes ", user.attributes);

  const { orders, trialStatus } = user.attributes;
  const usersOrders = orders?.data ?? [];

  let hasActiveSubscription = false;
  let hasActiveFreeTrial = false;
  let hasPendingSubscription = false;
  let hasAccountActivePending = false; // New state
  let endedTrials = [];
  let endedPaidSubscriptions = [];

  usersOrders.forEach((order) => {
    const { isActive, Status, OrderPaid, Name } = order.attributes;

    // Checking for active free trial
    if (Name === "Free Trial" && isActive && Status) {
      hasActiveFreeTrial = true;
    }

    // Checking for active and paid subscription
    if (isActive && Status && OrderPaid && Name !== "Free Trial") {
      hasActiveSubscription = true;
    }

    // New condition for Account Active Pending
    if (Status && !isActive && OrderPaid && Name !== "Free Trial") {
      hasAccountActivePending = true;
    }

    // Checking for pending subscription status
    if (Status && !isActive && !OrderPaid) {
      hasPendingSubscription = true;
    }

    // Collecting ended free trials
    if (Name === "Free Trial" && !isActive && !Status) {
      endedTrials.push(order);
    }

    // Collecting ended paid subscriptions
    if (Name !== "Free Trial" && !isActive && OrderPaid) {
      endedPaidSubscriptions.push(order);
    }
  });

  if (hasActiveFreeTrial) {
    return "active_trial";
  } else if (hasActiveSubscription) {
    return "subscribed";
  } else if (hasAccountActivePending) {
    return "account_active_pending"; // Return new state
  } else if (hasPendingSubscription) {
    return "pending_subscriber";
  } else if (endedPaidSubscriptions.length > 0) {
    return "ended_paid_subscription";
  } else if (endedTrials.length > 0) {
    return "ended_trial";
  }

  return determineTrialStatus(trialStatus);
};

function determineTrialStatus(trialStatus) {
  return trialStatus === null || trialStatus === undefined
    ? "available_trial"
    : trialStatus
    ? "active_trial"
    : "ended_trial";
}
