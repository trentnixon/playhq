import React from "react";
import { useEffect, useState } from "react";
import {
  createStyles,
  Text,
  Card,
  RingProgress,
  Group,
  Loader,
  Button,
} from "@mantine/core";
import { useGetInvoice } from "../../../Hooks/useInvoicing";
import { ShadowWrapper } from "../../../components/Members/Common/Containers";
import { SubHeaders } from "../../../components/Members/Common/Type";
import { FixturaLoading } from "../../../components/Members/Common/Loading";
import { BTN_TOEXTLINK } from "../../../components/Members/Common/utils/Buttons";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan(350)]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

function convertUnixTimestamp(timestamp) {
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds
  const date = new Date(timestamp * 1000);

  // Get the year, month and day from the date object
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
  const day = date.getDate();

  // Return the formatted date string
  return `${day}-${month}-${year}`;
}

 export const Invoicing = () => {
  const [invoice, Getinvoice] = useGetInvoice();

  useEffect(() => {
    if (invoice === null) {
      Getinvoice();
    }
  }, []);

  useEffect(() => {
    console.log(invoice?.data);
  }, [invoice]);
  if (invoice === null) {
    return <FixturaLoading />;
  }
  if (invoice.data === null) {
    return false;
  }
  return (
    <>
      <SubHeaders Copy={"Invoicing"} />
      <ShadowWrapper>
        <StatsRingCard invoice={invoice} />
      </ShadowWrapper>
    </>
  );
};

export function StatsRingCard({ invoice }) {
  const {
    customer_name,
    customer_email,
    account_name,
    created,
    hosted_invoice_url,
    invoice_pdf,
    status,
    subtotal,
  } = invoice;
  const { classes, theme } = useStyles();

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text size="xl" className={classes.label}>
            {account_name}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {customer_name}
            </Text>
            <Text size="xs" color="dimmed">
              Customer Name
            </Text>
          </div>
          <div>
            <Text className={classes.lead} mt={30}>
              {convertUnixTimestamp(created)}
            </Text>
            <Text size="xs" color="dimmed">
              Created
            </Text>
          </div>

          <div>
            <Text className={classes.lead} mt={30}>
              {customer_email}
            </Text>
            <Text size="xs" color="dimmed">
              Customer Email
            </Text>
          </div>
          <Group position="apart">
            <BTN_TOEXTLINK LABEL="Download PDF" URL={invoice_pdf} THEME="cta" />
            <BTN_TOEXTLINK LABEL="Stripe Webviewer" URL={hosted_invoice_url} THEME="cta" />
          </Group>
        </div>

        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[
              { value: (subtotal / subtotal) * 100, color: theme.primaryColor },
            ]}
            label={
              <div>
                <Text
                  align="center"
                  size="lg"
                  className={classes.label}
                  sx={{ fontSize: 22 }}
                >
                  {((subtotal / subtotal) * 100).toFixed(0)}%
                </Text>
                <Text align="center" size="xs" color="dimmed">
                  Completed
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
}
export default StatsRingCard