// Import necessary dependencies

import dayjs from 'dayjs';
import { useAccountDetails } from '../../../../../context/userContext';
import { FixturaDivider } from '../../../Common/Divider';
import { P, PageTitle, SubTitle } from '../../../Common/Type';
import { Invoicing } from '../../../stripe/Invoicing';
import { Space, Badge, Button } from '@mantine/core';
import { IconFileInvoice, IconCalendarEvent, IconCheck } from '@tabler/icons';

// Main component for handling the subscription pending state
export const UserSubscriptionActiveDatePending = () => {
  const { account } = useAccountDetails();
  const pendingInvoice = findPendingInvoice(account.attributes.orders.data);

  const startDate = dayjs(pendingInvoice.attributes.startOrderAt).format(
    'MMMM D, YYYY'
  );
  const endDate = dayjs(pendingInvoice.attributes.endOrderAt).format(
    'MMMM D, YYYY'
  );

  const subscriptionDetails =
    pendingInvoice.attributes.subscription_tier.data.attributes;

  // Improved error handling with fallback UI
  if (!pendingInvoice) {
    return (
      <>
        <PageTitle
          Copy='No Pending Order'
          ICON={<IconFileInvoice size={40} />}
        />
        <P>There are no pending invoices to display at this time.</P>
      </>
    );
  }

  return (
    <>
      <PageTitle
        Copy='Awaiting Activation Date!'
        ICON={<IconCalendarEvent size={40} />}
      />

      <P color={7}>
        Your {subscriptionDetails.Name} Status is Approved and will activate on{' '}
        {startDate}.
      </P>

      <FixturaDivider />

      <Invoicing />
      <Space h='lg' />
    </>
  );
};

// Enhanced error handling in utility function
const findPendingInvoice = orders => {
  if (!Array.isArray(orders) || orders.length === 0) {
    console.error('No orders available');
    return null;
  }
  const pendingInvoice = orders.find(
    order =>
      order.attributes.Status === true && order.attributes.isActive === false
  );
  return pendingInvoice || null; // Return null if no pending invoice is found
};
