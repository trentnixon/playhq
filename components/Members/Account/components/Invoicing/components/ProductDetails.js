import { P } from "../../../../Common/Type";
import { Table } from "@mantine/core";
import { IconArticle, IconCalendar } from "@tabler/icons";
import { IconBarcode } from "@tabler/icons-react";
import { DisplayItem } from "./helper";

import { FormatReadableDateMDY } from "../../../../../../lib/actions";
export const ProductDetails = (props) => {
  const { order } = props;
  const { endOrderAt, startOrderAt, subscription_tier } = order.attributes;
  const { Title, SubTitle, DaysInPass, PriceByWeekInPass } =
    subscription_tier.data.attributes;

  return (
    <tr>
      <td>
        <P marginBottom={0} color={7} textAlign="left">
          Product Details:
        </P>
      </td>
      <td>
        <Table
          striped
          highlightOnHover
          my={10}
          withBorder
          horizontalSpacing="xl"
          verticalSpacing="xs"
          withColumnBorders
        >
          <tbody>
            <tr>
              <td>
                <DisplayItem
                  icon={<IconBarcode size={20} stroke={1} />}
                  label={`${Title}`}
                  position="right"
                />
              </td>
            </tr>
            <tr>
              <td>
                <DisplayItem
                  icon={<IconArticle size={20} stroke={1} />}
                  label={`${SubTitle}`}
                  position="right"
                />
              </td>
            </tr>

            <tr>
              <td>
                <DisplayItem
                  icon={<IconCalendar size={20} stroke={1} />}
                  label={`Starting : ${FormatReadableDateMDY(startOrderAt)}`}
                  position="right"
                />
              </td>
            </tr>
            <tr>
              <td>
                <DisplayItem
                  icon={<IconCalendar size={20} stroke={1} />}
                  label={`Finishing : ${FormatReadableDateMDY(endOrderAt)}`}
                  position="right"
                />
              </td>
            </tr>
            <tr>
              <td>
                <DisplayItem
                  icon={<IconCalendar size={20} stroke={1} />}
                  label={`Covering ${DaysInPass} days`}
                  position="right"
                />
              </td>
            </tr>

            <tr>
              <td>
                <DisplayItem
                  icon={<IconCalendar size={20} stroke={1} />}
                  label={`$${PriceByWeekInPass} / week`}
                  position="right"
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </td>
    </tr>
  );
};
