import { useEffect, useState } from "react";
import { Group } from "@mantine/core";
import { useCreateInvoice } from "../../../../../../../../Hooks/useCreateInvoice";
import { BTN_ONCLICK } from "../../../../../../Common/utils/Buttons";
import { useAccountDetails } from "../../../../../../../../context/userContext";
import { useCouponContext } from "../../../../../../../../context/CouponContext";

//import { loadStripe } from "@stripe/stripe-js";

export const CreateNewInvoice = (props) => {
  const { productId, onConfirm, startDate, endDate } = props;
  const { coupon } = useCouponContext();
  const [invoice, createInvoice] = useCreateInvoice();
  const [loading, setLoading] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  const { ReRender } = useAccountDetails();

  const handleBuy = async (productId) => {
    setLoading(true);
    //console.log("handleBuy ", productId, startDate, endDate);
    await createInvoice(productId, startDate, endDate,coupon ? coupon.APIID : null).catch((err) => {
      console.error(err);
    });
  };

  useEffect(() => {
    //console.log("invoice ", invoice);
    ReRender();
    setLoading(false);
  }, [invoice]);

  const handleClick = () => {
    //window.scrollTo(0, 0);
    if (confirmState) {
      handleBuy(productId);
    } else {
      setConfirmState(true);
      onConfirm(productId);
    }
  };
  const resetConfirmState = () => {
    setConfirmState(false);
    onConfirm(null);
  };


  return (
    <Group position="apart">
      <BTN_ONCLICK
        LABEL={
          loading ? "Processing..." : confirmState ? "Confirm" : "Select Plan"
        }
        HANDLE={handleClick}
        THEME="success"
        idDisabled={loading}
      />
      {confirmState && (
        <BTN_ONCLICK LABEL="Cancel" HANDLE={resetConfirmState} THEME="error" />
      )}
    </Group>
  );
};

// Old way to crete a subscription
/* await CreateSubscription(productId) */
/* const CreateStripePromise = async (Subscription) => {
    //console.log(Subscription);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: Subscription.id });
  }; */
/*
  useEffect(() => {
    if (Subscription !== null) {
      CreateStripePromise(Subscription)
        .then(() => setLoading(false))
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [Subscription]); */
