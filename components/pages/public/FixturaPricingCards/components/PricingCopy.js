import dayjs from "dayjs";
import { H, P } from "../../../../Members/Common/Type";
import { Box, Center, Divider, Group, Table } from "@mantine/core";
import CouponInput from "./CouponInput";
import { useCouponContext } from "../../../../../context/CouponContext";
import { useState } from "react";

export const PricingHeader = ({ product }) => {
  return (
    <div className="pricing-header">
      <Center>
        <H size={"h1"} color={"white"} mb={7}>
          {product.Title}
        </H>
      </Center>
      <H size={"h4"} color={"white"} weight={400} mb={0}>
        <span>
          <sup>$</sup>
          {product.PriceByWeekInPass}/Week
        </span>
      </H>
    </div>
  );
};

export const PricingSubtitle = ({ product }) => {
  return (
    <Center>
      <H size={"h4"} weight={800} color={"gray.7"} mb={0}>
        {product.SubTitle}
      </H>
    </Center>
  );
};

export const PricingDescription = (props) => {
  const { product, selected } = props;
  const { coupon } = useCouponContext();
  const [hasCoupon, setHasCoupon] = useState(false);

  let totalCost = product?.price;
  if (coupon) {
    if (coupon.DiscountType === "percentage") {
      totalCost -= (totalCost * coupon.DiscountValue) / 100;
    } else if (coupon.DiscountType === "fixed_amount") {
      totalCost -= coupon.DiscountValue;
    }

    hasCoupon ? false : setHasCoupon(true);
  }

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: "white",
        padding: theme.spacing.sm,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
      })}
    >
      <P textAlign="center"> {product?.DaysInPass} Days Covered</P>
      <P>{product.description}</P>
      {selected ? <ShowAdditionalInformation {...props} /> : false}
      {selected ? <CouponInput /> : false}

      <Divider mb={10} />
      <Group position="apart">
        <P marginBottom={0}>
          Total Cost: {hasCoupon ? "(Coupon Applied)" : false}
        </P>
        <P Weight={900} marginBottom={0}>
          <sup>$</sup>
          {totalCost.toFixed(2)}
        </P>
      </Group>

      <Divider my={10} />
    </Box>
  );
};

const ShowAdditionalInformation = (props) => {
  const { product, selectedEndDate, startDate } = props;
  const { DaysInPass, PriceByWeekInPass } = product;

  const formatDate = (date) => dayjs(date).format("MMMM DD, YYYY");
  return (
    <>
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
              <P marginBottom={0}>From</P>
            </td>
            <td>
              <P Weight={600} marginBottom={0} textAlign="right">
                {formatDate(startDate)}
              </P>
            </td>
          </tr>
          <tr>
            <td>
              <P marginBottom={0}>To</P>
            </td>
            <td>
              <P Weight={600} marginBottom={0} textAlign="right">
                {formatDate(selectedEndDate)}
              </P>
            </td>
          </tr>
          <tr>
            <td>
              <P marginBottom={0}>Days</P>
            </td>
            <td>
              <P Weight={600} marginBottom={0} textAlign="right">
                {DaysInPass}
              </P>
            </td>
          </tr>
          <tr>
            <td>
              <P marginBottom={0}>Weekly Cost</P>
            </td>
            <td>
              <P Weight={600} marginBottom={0} textAlign="right">
                ${PriceByWeekInPass}
              </P>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
