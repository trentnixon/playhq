import { Button, Loader } from "@mantine/core";
import { loadStripe } from "@stripe/stripe-js";
import { Wrapper } from "../../../components/Members/Common/Containers";
import { useCreateNewInstanceOfSubscription } from "../../../Hooks/useOrder";
import { useEffect, useState } from "react";

import { FixturaLoading } from "../../../components/Members/Common/Loading";
import { BTN_ONCLICK } from "../../../components/Members/Common/utils/Buttons";
import { useAccountDetails } from "../../../lib/userContext";

export const BTN_SubscribeToFixtura = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);
  const [Subscription, CreateSubscription] =
    useCreateNewInstanceOfSubscription();
  const [loading, setLoading] = useState(false);

  const handleBuy = async () => {
    setLoading(true);
    CreateSubscription();
  };

  const CreateStripePromise = async (Subscription) => {
    console.log(Subscription);
    const stripe = await stripePromise;

    await stripe.redirectToCheckout({ sessionId: Subscription.id });
  };

  useEffect(() => {
    if (Subscription !== null) {
      CreateStripePromise(Subscription);
    }
  }, [Subscription]);

  // ADD LOADING WAITING SCREEN AND PROCESS THIS HOOK!!
  if (userAccount === null) {
    return <FixturaLoading />;
  }
  return (
    <>
      <Wrapper>
        {loading ? (
          <FixturaLoading />
        ) : userAccount?.attributes?.order.data === null ? (
          <BTN_ONCLICK
            LABEL={"Purchase Subscription"}
            HANDLE={handleBuy}
            THEME="success"
          />
        ) : (
          false
        )}
      </Wrapper>
    </>
  );
};
