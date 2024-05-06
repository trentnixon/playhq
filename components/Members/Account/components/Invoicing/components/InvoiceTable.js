import { Paper, Table } from "@mantine/core";
import { convertUnixTimestamp } from "../../../../../../lib/actions";
import { IconReceipt2, IconCalendarDue, IconStatusChange } from "@tabler/icons";
import { DisplayItem } from "./helper";
import { ProductDetails } from "./ProductDetails";

export const InvoiceTable = (props) => {
  const { invoice_number, isActive, total, currency, invoice_due_date } = props.order.attributes;

  return (
    <Paper p={20}>
      <Table>
        <tbody>
          <tr>
            <td>
              <DisplayItem
                icon={false}
                label={`Invoice number: ${invoice_number}`}
              />
            </td>
            <td>
              <DisplayItem
                icon={<IconStatusChange size={20} stroke={1} />}
                label={`${isActive ? "Paid" : "Pending"}`}
                position="right"
              />
            </td>
          </tr>
          <ProductDetails {...props} />
          <tr>
            <td>
              <DisplayItem
                icon={false}
                label={`Due Date: ${convertUnixTimestamp(invoice_due_date)}`}
              />
            </td>
            <td>
              <DisplayItem
                icon={<IconReceipt2 size={20} stroke={1} />}
                label={`$${parseInt(total / 100).toFixed(2)}(${currency})`}
                position="right"
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Paper>
  );
};
