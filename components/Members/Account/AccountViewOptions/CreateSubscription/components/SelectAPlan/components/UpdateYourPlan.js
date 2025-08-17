import { useState } from 'react';

import { P } from '../../Common/Type';

import { FindAccountType } from '../../../../lib/actions';

import { ChangePlanBtn } from './ChangePlanBtn';
import { CreateCards } from '../SelectAPlan';

export const UpdateYourPlan = ({ user, setHasUpdated }) => {
  const { products, loading } = useFetchSubscriptionTiers();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [planState, setPlanState] = useState(null);

  const accountType = FindAccountType(user); // Assuming user contains account details
  const isClub = accountType === 'Club';
  //

  if (loading)
    return (
      <>
        <P
          color={6}
          textAlign={'center'}
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
          textAlign={'center'}
          marginBottom={0}
          Weight={600}
          Copy={`Error loading Subscriptions Options`}
        />

        <P
          Copy={`Oops! We encountered an error while loading your subscription options. Please try again later or contact our support team for assistance. We apologize for any inconvenience caused.`}
        />
      </>
    );

  const onConfirm = productId => {
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
          textAlign={'center'}
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
        <div className='row justify-content-center'>
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
