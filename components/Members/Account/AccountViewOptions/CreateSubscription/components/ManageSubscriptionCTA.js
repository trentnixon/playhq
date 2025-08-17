// ManageSubscriptionCTA.js
import { useMantineTheme, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import BTN_ManageSubscription from '../../../../stripe/BTN_ManageAccount';
import BTN_ChangePlan from '../../../../stripe/BTN_ChangePlan';

const ManageSubscriptionCTA = ({ ORDER, setChangePlan, changePlan }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const isActive =
    ORDER?.isActive && ORDER?.Status && !ORDER?.cancel_at_period_end;
  const isCancelling =
    ORDER?.cancel_at_period_end && ORDER?.isActive && ORDER?.Status;
  const isCancelled = !ORDER?.isActive || !ORDER?.Status;
  const isPaused = ORDER?.isPaused;

  return (
    <Group position={mobile ? 'center' : 'right'} my={10}>
      {isActive && (
        <>
          <BTN_ChangePlan
            setChangePlan={setChangePlan}
            changePlan={changePlan}
          />
          {!isPaused && <BTN_ManageSubscription Label='Manage' />}
          <BTN_ManageSubscription Label='Cancel' theme='error' />
        </>
      )}
      {isCancelling && <BTN_ManageSubscription Label='Renew' theme='cta' />}
      {isCancelled && <></>}
    </Group>
  );
};

export default ManageSubscriptionCTA;

/* const ManageSubscriptionCTA = ({ ORDER, setChangePlan, changePlan }) => {
  const isActive =
    ORDER?.isActive && ORDER?.Status && !ORDER?.cancel_at_period_end;
  const isCancelling =
    ORDER?.cancel_at_period_end && ORDER?.isActive && ORDER?.Status;
  const isCancelled = !ORDER?.isActive || !ORDER?.Status;
  const isPaused = ORDER?.isPaused;
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Group position={mobile ? "center" : "right"} my={10}>
      {isActive && (
        <>
          <BTN_ChangePlan
            setChangePlan={setChangePlan}
            changePlan={changePlan}
          />
          {!isPaused ? <BTN_ManageSubscription Label="Manage" /> : false}
          <BTN_ManageSubscription Label="Cancel" theme="error" />
        </>
      )}
      {isCancelling && <BTN_ManageSubscription Label="Renew" theme="cta" />}

      {isCancelled && <></>}
    </Group>
  );
}; */
