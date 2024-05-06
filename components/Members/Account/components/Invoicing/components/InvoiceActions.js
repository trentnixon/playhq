import { useState } from "react";
import { Group, Text, Dialog } from "@mantine/core";
import {
  BTN_ONCLICK,
  BTN_TOINTERALLINK,
} from "../../../../Common/utils/Buttons";
import useCancelInvoice from "../../../../../../Hooks/useCancelInvoice";
import { FixturaLoading } from "../../../../Common/Loading";
import { useRouter } from "next/navigation";
import { useAccountDetails } from "../../../../../../lib/userContext";
export const InvoiceActions = (props) => {
  const { invoice_pdf, hosted_invoice_url, orderID } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);

  const router = useRouter();
  const handlePaymentRedirect = () => {
    setPendingPayment(true);
    window.open(hosted_invoice_url, "_blank");
  };

  const confirmPayment = () => {
    router.refresh();
  };

  return (
    <Group position="center">
      {confirmOpen ? (
        false
      ) : (
        <>
          {pendingPayment ? (
            <BTN_ONCLICK
              LABEL="Confirm Payment"
              HANDLE={confirmPayment}
              THEME="success"
            />
          ) : (
            <>
              <BTN_TOINTERALLINK
                LABEL="Download Invoice"
                URL={invoice_pdf}
                idDisabled={confirmOpen}
              />
              <BTN_ONCLICK
                LABEL="Pay Online"
                HANDLE={handlePaymentRedirect}
                THEME="primary"
              />
            </>
          )}
        </>
      )}

      {pendingPayment ? (
        false
      ) : (
        <CancelInvoiceButton
          orderID={orderID}
          confirmOpen={confirmOpen}
          setConfirmOpen={setConfirmOpen}
        />
      )}
    </Group>
  );
};

const CancelInvoiceButton = ({ orderID, confirmOpen, setConfirmOpen }) => {
  const { loading, cancelInvoice } = useCancelInvoice();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [countdown, setCountdown] = useState(3);
  const { ReRender } = useAccountDetails();

  const handleCancel = async () => {
    try {
      const result = await cancelInvoice(orderID);
      setDialogMessage(result.message);
      setDialogOpen(true);
      const interval = setInterval(() => {
        setCountdown((prevCount) => {
          if (prevCount <= 1) {
            clearInterval(interval);
            ReRender(); // Or navigate, etc.
            setDialogOpen(false);
            return 0;
          }
          return prevCount - 1;
        });
      }, 1000);
    } catch (error) {
      setDialogMessage(`Failed to cancel the invoice: ${error.message}`);
      setDialogOpen(true);
    }
  };

  const undoCancel = () => {
    setConfirmOpen(false);
  };

  return (
    <>
      {loading ? (
        <FixturaLoading />
      ) : confirmOpen ? (
        <>
          <BTN_ONCLICK LABEL="Back" HANDLE={undoCancel} THEME="success" />
          <BTN_ONCLICK
            LABEL="Confirm Cancellation"
            HANDLE={handleCancel}
            THEME="error"
          />
        </>
      ) : (
        <BTN_ONCLICK
          LABEL="Cancel Invoice"
          HANDLE={() => setConfirmOpen(true)}
          THEME="error"
        />
      )}
      <Dialog
        opened={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Cancellation Status"
        shadow="xl"
        radius="sm"
        sx={(theme) => ({
          backgroundColor: theme.colors.dark[5],
          padding: theme.spacing.sm,
          color: "white",
          borderBottom: `3px solid ${theme.colors.blue[7]}`,
        })}
      >
        <Text>{dialogMessage}</Text>
        <Text>Redirecting in {countdown} seconds...</Text>
      </Dialog>
    </>
  );
};
