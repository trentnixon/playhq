import { InvoiceTable } from "./components/InvoiceTable";
import { InvoiceHeader } from "./components/InvoiceHeader";
import { StyledPaper } from "./components/helper";
import { InvoiceActions } from "./components/InvoiceActions";
import { Space } from "@mantine/core";
import { InvoiceTitle } from "./components/InvoiceTitle";
export const InvoiceDisplay = (props) => {
  const { order } = props;
  const {
    invoice_pdf,
    hosted_invoice_url,
    invoice_number,
    isActive,
    total,
    currency,
    invoice_due_date,
    payment_status,
    subscription_tier,
  } = order.attributes;

  return (
    <div>
      <Space h="xl" />
      <InvoiceHeader payment_status={payment_status} />
      <StyledPaper>
        <InvoiceTitle order={order?.attributes} />
        <InvoiceTable {...props} />
      </StyledPaper>
      <InvoiceActions
        invoice_pdf={invoice_pdf}
        hosted_invoice_url={hosted_invoice_url}
        orderID={order.id}
      />
      <Space h="xl" />
    </div>
  );
};
