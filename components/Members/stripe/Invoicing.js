import React, { useState } from "react";
import { useEffect } from "react";
import { Table, ActionIcon, useMantineTheme, Tooltip } from "@mantine/core";
import {
  useGetInvoice,
  useGetUpcomingInvoice,
} from "../../../Hooks/useInvoicing";
import { ShadowWrapper } from "../Common/Containers";
import { P, PageTitle } from "../Common/Type";
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
import { useAccountDetails } from "../../../lib/userContext";
import { LoadingStateWrapper } from "../Account/HOC/LoadingStateWrapper";
import { convertUnixTimestamp } from "../../../lib/actions";



export const Invoicing = () => {
  const [invoice, getInvoice, loading] = useGetInvoice();

  console.log("invoice ", invoice)
  const theme = useMantineTheme();
  useEffect(() => {
    getInvoice();
  }, []);

  useEffect(() => {}, [invoice]);

  if (!invoice || invoice === null || invoice.length === 0) {
    return (
      <LoadingStateWrapper conditions={[!loading]}>
        <ShadowWrapper>
          <P
            marginBottom={0}
            textAlign={"center"}
            Copy={`Sorry, but there are no invoices available at the moment. `}
          />
        </ShadowWrapper>
      </LoadingStateWrapper>
    );
  }

  return (
    <LoadingStateWrapper conditions={[!loading]}>
      <PageTitle
        Copy={"Invoice History"}
        ICON={<IconFileInvoice size={40} />}
      />
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
            {Array.isArray(invoice) &&
              invoice.map((inv, index) => (
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
    </LoadingStateWrapper>
  );
};

export const UpcomingInvoicing = () => {
  const [invoice, getInvoice, loading] = useGetUpcomingInvoice();
  const { account, ReRender } = useAccountDetails();
  const [ORDER, setOrder] = useState(
    account?.attributes?.orders?.data?.attributes
  );
  const isPaused = ORDER?.isPaused;

  const theme = useMantineTheme();
  useEffect(() => {
    getInvoice();
  }, []);

  useEffect(() => {}, [invoice, loading]);

  if (isPaused) return true;

  if (!invoice || invoice === null || invoice.length === 0) {
    return (
      <LoadingStateWrapper conditions={[!loading]}>
        <ShadowWrapper>
          <P
            marginBottom={0}
            textAlign={"center"}
            Copy={`Sorry, but there are no invoices available at the moment. `}
          />
        </ShadowWrapper>
      </LoadingStateWrapper>
    );
  }

  return (
    <LoadingStateWrapper conditions={[!loading]}>
      <PageTitle
        Copy={"Upcoming Invoice"}
        ICON={<IconFileInvoice size={40} />}
      />
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
            </tr>
          </thead>
          <tbody>
            {Array.isArray([invoice]) &&
              [invoice].map((inv, index) => (
                <tr key={index}>
                  <td>{inv.account_name}</td>
                  <td>{convertUnixTimestamp(inv.period_start)}</td>
                  <td>{convertUnixTimestamp(inv.period_end)}</td>
                  <td>${parseInt(inv.subtotal / 100).toFixed(2)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </ShadowWrapper>
    </LoadingStateWrapper>
  );
};
