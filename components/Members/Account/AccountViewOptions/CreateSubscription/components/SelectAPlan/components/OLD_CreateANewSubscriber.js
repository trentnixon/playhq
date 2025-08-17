import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { BTN_ONCLICK } from '../../../../../../Common/utils/Buttons';
import { useCreateNewInstanceOfSubscription } from '../../../../../../../../Hooks/useCreateInvoice';
import { Group } from '@mantine/core';

export const CreateNewSubscriber = ({ productId, selected, onConfirm }) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK);
  const [Subscription, CreateSubscription] =
    useCreateNewInstanceOfSubscription();
  const [loading, setLoading] = useState(false);
  const [confirmState, setConfirmState] = useState(false);

  const handleBuy = async productId => {
    setLoading(true);
    await CreateSubscription(productId)
      .then(() => setLoading(false))
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const CreateStripePromise = async Subscription => {
    //console.log(Subscription);
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: Subscription.id });
  };

  useEffect(() => {
    if (Subscription !== null) {
      CreateStripePromise(Subscription)
        .then(() => setLoading(false))
        .catch(err => {
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
    <Group position='apart'>
      <BTN_ONCLICK
        LABEL={
          loading ? 'Processing...' : confirmState ? 'Confirm' : 'Purchase'
        }
        HANDLE={handleClick}
        THEME='success'
        DISABLED={loading || !selected}
      />
      {confirmState && (
        <BTN_ONCLICK LABEL='Cancel' HANDLE={resetConfirmState} THEME='error' />
      )}
    </Group>
  );
};
