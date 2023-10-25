import { loadStripe } from "@stripe/stripe-js";
import { Wrapper } from "../../../components/Members/Common/Containers";
import { useCreateNewInstanceOfSubscription } from "../../../Hooks/useOrder";
import { useEffect, useState } from "react";

import { FixturaLoading } from "../../../components/Members/Common/Loading";
import { BTN_ONCLICK } from "../../../components/Members/Common/utils/Buttons";
import { useAccountDetails } from "../../../lib/userContext";
import { Group } from "@mantine/core";

export const BTN_SubscribeToFixtura = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const ORDER = userAccount?.attributes?.order?.data?.attributes;
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);
  const [Subscription, CreateSubscription] =
    useCreateNewInstanceOfSubscription();
  const [loading, setLoading] = useState(false);

  const handleBuy = async (productId) => {
    setLoading(true);
    CreateSubscription(productId);
  };

  const CreateStripePromise = async (Subscription) => {
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: Subscription.id });
  };

  useEffect(() => {
    if (Subscription !== null) {
      CreateStripePromise(Subscription);
    }
  }, [Subscription]);

  // ADD LOADING WAITING SCREEN AND PROCESS THIS HOOK!!
  if (ORDER === null) {
    return <FixturaLoading />;
  }
  return (
    <>
      <Wrapper>
        {loading ? (
          <FixturaLoading />
        ) : ORDER === null ? (
          <Group>
            <BTN_ONCLICK
              LABEL={"Purchase Pinch Hitter"}
              HANDLE={() => {
                handleBuy(2);
              }}
              THEME="success"
            />
            <BTN_ONCLICK
              LABEL={"Purchase Opening Batsman"}
              HANDLE={() => {
                handleBuy(3);
              }}
              THEME="success"
            />
            <BTN_ONCLICK
              LABEL={"Purchase Club Captain"}
              HANDLE={() => {
                handleBuy(4);
              }}
              THEME="success"
            />
          </Group>
        ) : (
          false
        )}
      </Wrapper>
    </>
  );
};
export default BTN_SubscribeToFixtura;
