import { useEffect, useState } from 'react';

import { BTN_ONCLICK } from '../../Common/utils/Buttons';
import { useChangeSubscription } from '../../../../Hooks/useOrder';
import { useAccountDetails } from '../../../../context/userContext';

import { Group } from '@mantine/core';

export const ChangePlanBtn = ({
  productId,
  selected,
  onConfirm,
  setPlanState,
}) => {
  const [plan, confirmPlan] = useChangeSubscription();
  const [loading, setLoading] = useState(false);
  const [confirmState, setConfirmState] = useState(false);
  // check if this works
  const { account, ReRender } = useAccountDetails();
  const changeSubscriptionPlan = async PlanID => {
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
    <Group position='center' px={10}>
      <BTN_ONCLICK
        LABEL={
          loading
            ? 'Processing...'
            : confirmState
            ? 'Confirm Switch'
            : 'Switch Plan'
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
