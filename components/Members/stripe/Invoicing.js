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
  Table,
  ActionIcon,
  useMantineTheme,
  Tooltip,
} from "@mantine/core";
import { useGetInvoice } from "../../../Hooks/useInvoicing";
import { ShadowWrapper } from "../Common/Containers";
import { P, PageTitle, SubHeaders } from "../Common/Type";
import { FixturaLoading } from "../Common/Loading";
import { BTN_TOEXTLINK } from "../Common/utils/Buttons";
import {
  IconAppWindowFilled,
  IconCalendarDue,
  IconCalendarStats,
  IconDownload,
  IconExternalLink,
  IconFileInvoice,
  IconFileTypePdf,
  IconReceipt2,
  IconStatusChange,
} from "@tabler/icons-react";
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
  const [invoice, getInvoice, loading] = useGetInvoice();

  const theme = useMantineTheme();
  useEffect(() => {
    getInvoice();
  }, []);

  useEffect(() => {
    console.log("invoice", invoice)
  }, [invoice]);

  if (loading) {
    return <FixturaLoading />;
  }

  if (invoice === null || invoice.length === 0) {
    return <ShadowWrapper><P marginBottom={0} textAlign={'center'} Copy={`Sorry, but there are no invoices available at the moment. `}/></ShadowWrapper>;
  }

  return (
    <>
      <PageTitle Copy={"Invoicing"} ICON={<IconFileInvoice size={40} />} />
      <ShadowWrapper>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>
                <Tooltip
                  label="From"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconCalendarStats
                    size="1.5rem"
                    color={theme.colors.cyan[5]}
                  />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label="To"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconCalendarDue size="1.5rem" color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label="Total"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconReceipt2 size="1.5rem" color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label="Status"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconStatusChange
                    size="1.5rem"
                    color={theme.colors.cyan[5]}
                  />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label="View Invoice"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconAppWindowFilled
                    size="1.5rem"
                    color={theme.colors.cyan[5]}
                  />
                </Tooltip>
              </th>
              <th>
                <Tooltip
                  label="Download Invoice"
                  color={theme.colors.cyan[3]}
                  position="bottom-start"
                  withArrow
                >
                  <IconDownload size="1.5rem" color={theme.colors.cyan[5]} />
                </Tooltip>
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.map((inv, index) => (
              <tr key={index}>
                <td>{inv.account_name}</td>
                <td>{convertUnixTimestamp(inv.period_start)}</td>
                <td>{convertUnixTimestamp(inv.period_end)}</td>
                <td>${parseInt(inv.subtotal / 100).toFixed(2)}</td>
                <td>{inv.status}</td>
                <td>
                  <Tooltip
                    label="View Invoice of Stripe"
                    color={theme.colors.blue[3]}
                    position="bottom-start"
                    withArrow
                  >
                    <ActionIcon
                      component="a"
                      target="_blank"
                      href={inv.hosted_invoice_url}
                    >
                      <IconExternalLink
                        size="1.5rem"
                        color={theme.colors.blue[5]}
                      />
                    </ActionIcon>
                  </Tooltip>
                </td>
                <td>
                  <Tooltip
                    label="Download PDF"
                    color={theme.colors.blue[3]}
                    position="bottom-start"
                    withArrow
                  >
                    <ActionIcon component="a" href={inv.invoice_pdf}>
                      <IconFileTypePdf
                        size="1.5rem"
                        color={theme.colors.blue[5]}
                      />
                    </ActionIcon>
                  </Tooltip>
                </td>
                {/* Add more data cells as per your requirement */}
              </tr>
            ))}
          </tbody>
        </Table>
      </ShadowWrapper>
    </>
  );
};

//<StatsRingCard invoice={invoice} />
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
            <BTN_TOEXTLINK
              LABEL="Stripe Webviewer"
              URL={hosted_invoice_url}
              THEME="cta"
            />
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
export default StatsRingCard;
