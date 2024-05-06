// Import necessary dependencies

import { useAccountDetails } from "../../../../../lib/userContext";
import { FixturaDivider } from "../../../Common/Divider";
import { P, PageTitle } from "../../../Common/Type";
import { Invoicing } from "../../../stripe/Invoicing";
import { Space } from "@mantine/core";
import { IconFileInvoice } from "@tabler/icons";
import { InvoiceDisplay } from "../../components/Invoicing/InvoiceTemplate";

// Main component for handling the subscription pending state
export const UserSubscriptionPending = () => {
  const { account } = useAccountDetails();
  const pendingInvoice = findPendingInvoice(account.attributes.orders.data);
  //console.log("pendingInvoice ", pendingInvoice)
  // Improved error handling with fallback UI
  if (!pendingInvoice) {
    return (
      <>
        <PageTitle
          Copy={"No Pending Order"}
          ICON={<IconFileInvoice size={40} />}
        />
        <P>There are no pending invoices to display at this time.</P>
      </>
    );
  }

  return (
    <>
      <PageTitle
        Copy={"You are Almost Ready!"}
        ICON={<IconFileInvoice size={40} />}
      />

      <P color={7}>
        Please review your invoice below and complete the payment to activate
        your Season Pass.
      </P>
      <InvoiceDisplay order={pendingInvoice} />
      <FixturaDivider />
      <Invoicing />
      <Space h="lg" />
    </>
  );
};

// Enhanced error handling in utility function
const findPendingInvoice = (orders) => {
  if (!Array.isArray(orders) || orders.length === 0) {
    console.error("No orders available");
    return null;
  }
  const pendingInvoice = orders.find(
    (order) =>
      order.attributes.Status === true && order.attributes.isActive === false
  );
  return pendingInvoice || null; // Return null if no pending invoice is found
};
