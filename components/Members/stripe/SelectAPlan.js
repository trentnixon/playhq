import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useGetSubscriptionTiers } from "../../../Hooks/useSubscriptionTiers";

import { ShadowWrapper } from "../Common/Containers";
import { ProductCard } from "../../Pricing/ProductCard";
import { BTN_ONCLICK } from "../Common/utils/Buttons";
import {
  useChangeSubscription,
  useCreateNewInstanceOfSubscription,
} from "../../../Hooks/useOrder";
import { useAccountDetails } from "../../../lib/userContext";
import { P } from "../Common/Type";
import { Group } from "@mantine/core";
import { FindAccountLabel, FindAccountType } from "../../../lib/actions";

// Custom hook to handle fetching of subscription tiers
const useFetchSubscriptionTiers = () => {
  const [products, getSetSubscriptionTiers] = useGetSubscriptionTiers();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products === null) {
      getSetSubscriptionTiers()
        .then(() => setLoading(false))
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [products, getSetSubscriptionTiers]);

  return { products, loading };
};

// Shared component for creating cards
const CreateCards = ({
  product,
  signUp,
  BTN,
  selected,
  timing = 1,
  isActive = false,
}) => {
  return (
    <ProductCard
      product={product}
      signUp={signUp}
      BTN={BTN}
      className={selected ? "" : "opacity-5"}
      timing={timing}
      isActive={isActive}
      withTool={false}
    />
  );
};

export const SelectAPlan = () => {
  const { products, loading } = useFetchSubscriptionTiers();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { account } = useAccountDetails();

  if (loading) return <>Loading Subscriptions Options...</>;
  if (!products) return <>Error loading Subscriptions Options</>;

  const accountType = FindAccountType(account);
  const isClub = accountType === "Club"; // This will be true if the account type is Club

  const onConfirm = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <>
      <div className="row justify-content-center">
        {products.map((product, i) => {
          const { isActive, isClub: productIsClub } = product.attributes;
          if (
            (selectedProductId === null || product.id === selectedProductId) &&
            isActive &&
            productIsClub === isClub
          ) {
            return (
              <CreateCards
                key={i}
                product={product.attributes}
                signUp={false}
                timing={i}
                BTN={
                  <Group position="center" px={10}>
                    <NewSubscriber
                      productId={product.id}
                      selected={product.id === selectedProductId}
                      onConfirm={onConfirm}
                    />
                  </Group>
                }
                selected={product.id === selectedProductId}
              />
            );
          }
          return null; // Return null for items that shouldn't be rendered
        })}
      </div>
    </>
  );
};

export const UpdateYourPlan = ({ user, setHasUpdated }) => {
  const { products, loading } = useFetchSubscriptionTiers();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [planState, setPlanState] = useState(null);

  const accountType = FindAccountType(user); // Assuming user contains account details
  const isClub = accountType === "Club";
  //

  if (loading)
    return (
      <>
        <P
          color={2}
          textAlign={"center"}
          marginBottom={0}
          Weight={600}
          Copy={`Loading Subscriptions Options...`}
        />
        <P
          Copy={`Please wait while we load your subscription options. We are retrieving the available plans and features for you to choose from. Thank you for your patience. If you have any questions or need help selecting the right subscription for you, our support team is here to assist you.`}
        />
      </>
    );
  if (!products)
    return (
      <>
        <P
          color={8}
          textAlign={"center"}
          marginBottom={0}
          Weight={600}
          Copy={`Error loading Subscriptions Options`}
        />

        <P
          Copy={`Oops! We encountered an error while loading your subscription options. Please try again later or contact our support team for assistance. We apologize for any inconvenience caused.`}
        />
      </>
    );

  const onConfirm = (productId) => {
    setSelectedProductId(productId);
  };

  if (
    planState?.subscriptionUpdated !== undefined &&
    planState.subscriptionUpdated === true
  )
    return (
      <>
        <P
          color={4}
          textAlign={"center"}
          Weight={600}
          Copy={`Subscription Updated`}
        />
        <P
          Copy={`Your subscription settings have been successfully updated.`}
        />
        <P
          Copy={`You can now enjoy the benefits of your new subscription plan. If you have any further questions or need assistance, please don't hesitate to contact our support team`}
        />
      </>
    );
  return (
    <>
      <>
        <div className="row justify-content-center">
          {products.map((product, i) => {
            const { isActive, isClub: productIsClub } = product.attributes;
            if (
              (selectedProductId === null ||
                product.id === selectedProductId) &&
              isActive &&
              productIsClub === isClub
            ) {
              return (
                <CreateCards
                  key={i}
                  product={product.attributes}
                  signUp={false}
                  timing={i}
                  isActive={
                    product.id === user.attributes.subscription_tier.data.id
                  }
                  BTN={
                    <ChangePlanBtn
                      productId={product.id}
                      selected={product.id === selectedProductId}
                      onConfirm={onConfirm}
                      setPlanState={setPlanState}
                    />
                  }
                  selected={product.id === selectedProductId}
                />
              );
            }
            return null;
          })}
        </div>
      </>
    </>
  );
};

// Create a New Subscriber BTN
const NewSubscriber = ({ productId, selected, onConfirm }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);
  const [Subscription, CreateSubscription] =
    useCreateNewInstanceOfSubscription();
  const [loading, setLoading] = useState(false);
  const [confirmState, setConfirmState] = useState(false);

  const handleBuy = async (productId) => {
    setLoading(true);
    await CreateSubscription(productId)
      .then(() => setLoading(false))
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const CreateStripePromise = async (Subscription) => {
    //console.log(Subscription);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: Subscription.id }); 
  };

  useEffect(() => {
    if (Subscription !== null) {
      CreateStripePromise(Subscription)
        .then(() => setLoading(false))
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [Subscription]);

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
          loading ? "Processing..." : confirmState ? "Confirm" : "Purchase"
        }
        HANDLE={handleClick}
        THEME="success"
        DISABLED={loading || !selected}
      />
      {confirmState && (
        <BTN_ONCLICK LABEL="Cancel" HANDLE={resetConfirmState} THEME="error" />
      )}
    </Group>
  );
};

// Change a Subscriber PLAN BTN
const ChangePlanBtn = ({ productId, selected, onConfirm, setPlanState }) => {
  const [plan, confirmPlan] = useChangeSubscription();
  const [loading, setLoading] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  // check if this works
  const { account, ReRender } = useAccountDetails();
  const changeSubscriptionPlan = async (PlanID) => {
    setLoading(true);
    await confirmPlan(PlanID);
  };

  const resetConfirmState = () => {
    setConfirmState(false);
    onConfirm(null);
  };

  const handleClick = () => {
    window.scrollTo(0, 0);
    if (confirmState) {
      changeSubscriptionPlan(productId);
    } else {
      setConfirmState(true);
      onConfirm(productId);
    }
  };

  useEffect(() => {
    setPlanState(plan);
    ReRender();
  }, [plan]);

  return (
    <Group position="center" px={10}>
      <BTN_ONCLICK
        LABEL={
          loading
            ? "Processing..."
            : confirmState
            ? "Confirm Switch"
            : "Switch Plan"
        }
        HANDLE={handleClick}
        THEME="success"
        DISABLED={loading || !selected}
      />
      {confirmState && (
        <BTN_ONCLICK LABEL="Cancel" HANDLE={resetConfirmState} THEME="error" />
      )}
    </Group>
  );
};
