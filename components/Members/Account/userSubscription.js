// hooks and context
import { useAccountDetails } from "../../../lib/userContext";
import { UserDetails } from "../UserDetails";
// packages
import { Box, Container, Group, Paper, useMantineTheme } from "@mantine/core";
import { IconBrandStripe } from "@tabler/icons";
//components
import { P, PageTitle } from "../Common/Type";
import BTN_ManageSubscription from "../stripe/BTN_ManageAccount";
import BTN_ChangePlan from "../stripe/BTN_ChangePlan";
import { useState, useEffect } from "react";
import { SelectAPlan, UpdateYourPlan } from "../stripe/SelectAPlan";
import {
  IconAccessible,
  IconAlertTriangle,
  IconCheck,
  IconClock,
  IconX,
  IconClockPause,
} from "@tabler/icons-react";
//import { getReadableDate } from "../../../lib/actions";
import { useMediaQuery } from "@mantine/hooks";

export const UserSubscription = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [changePlan, setChangePlan] = useState(false);
  const [ORDER, setOrder] = useState(
    userAccount?.attributes?.order?.data?.attributes
  );
  const [subscriptionTier, setSubscriptionTier] = useState(
    userAccount.attributes.subscription_tier?.data?.attributes
  );

  useEffect(() => {
    setUserAccount(account);
    setOrder(account?.attributes?.order?.data?.attributes);
    setSubscriptionTier(account.attributes.subscription_tier?.data?.attributes);
  }, [account]);

  // Derive status from ORDER
  const isActive =
    ORDER?.isActive && ORDER?.Status && !ORDER?.cancel_at_period_end;
  const isCancelling =
    ORDER?.cancel_at_period_end && ORDER?.isActive && ORDER?.Status;
  const isCancelled = !ORDER?.isActive || !ORDER?.Status;
  const isPaused = ORDER?.isPaused;

  // Decide what to display based on the status
  let statusDisplay;
  //${getReadableDate(ORDER.Fixture_start)}
  if (ORDER === undefined) {
    statusDisplay = <SelectAPlan />;
  } else if (isCancelling) {
    statusDisplay = (
      <>
        <UserDetails
          user={userAccount}
          setHasUpdated={ReRender}
          subscriptionTier={subscriptionTier}
          Value={`Your subscription is cancelling...`}
        />
        <P color={3} size="sm" Weight={400} textAlign="center">
          By cancelling your plan, you will no longer receive automated assets
          from Fixtura. This change will take effect from the date of
          cancellation. To continue enjoying our services, please consider
          renewing or changing your plan.
        </P>
        <SubscriptionActiveFrom ORDER={ORDER} />
      </>
    );
  } else if (isPaused) {
    statusDisplay = (
      <>
        <UserDetails
          user={userAccount}
          setHasUpdated={ReRender}
          subscriptionTier={subscriptionTier}
          Value={`Paused until one weeks before the next fixture. `}
        />
        <P
          color={3}
          size="sm"
          Weight={400}
          textAlign="center"
         >{`Your subscription is on hold and billing will resume one week prior to next season's first fixture.`}</P>
        <SubscriptionActiveFrom ORDER={ORDER} />
      </>
    );
  } else if (isActive) {
    statusDisplay = (
      <>
        {changePlan ? (
          <UpdateYourPlan user={userAccount} />
        ) : (
          <>
            <UserDetails
              user={userAccount}
              setHasUpdated={ReRender}
              subscriptionTier={subscriptionTier}
              Value={`$${subscriptionTier.price}/w ${subscriptionTier.currency}`}
            />
          </>
        )}

        <SubscriptionActiveFrom ORDER={ORDER} /> 
      </>
    );
  } else if (isCancelled) {
    statusDisplay = (
      <>
        <Box
          sx={(theme) => ({
            padding: theme.spacing.md,
            border: `1px solid ${theme.colors.members[1]}`,
            marginBottom: "10px",
            background: theme.fn.linearGradient(
              45,
              theme.colors.blue[5],
              theme.colors.cyan[5]
            ),
            borderRadius: "5px",
            textAlign: "right",
          })}
        >
          <P
            color={0}
            Weight={400}
            marginBottom={0}
            textTransform={"uppercase"}
           >Your subscription has been cancelled.</P>
        </Box>
        <SelectAPlan />
      </>
    );
  }

  return (
    <>
      <PageTitle Copy={"Subscription"} ICON={<IconBrandStripe size={40} />} />

      <Container size={"lg"} px={0}>
        <ManageSubscriptionCTA
          ORDER={ORDER}
          setChangePlan={setChangePlan}
          changePlan={changePlan}
        />
        <Paper
          
          p="xs"
          sx={(theme) => ({
            backgroundColor: theme.white,
          })}
        >
          {statusDisplay}
        </Paper>
      </Container>
    </>
  );
};

const ManageSubscriptionCTA = ({ ORDER, setChangePlan, changePlan }) => {
  const isActive =
    ORDER?.isActive && ORDER?.Status && !ORDER?.cancel_at_period_end;
  const isCancelling =
    ORDER?.cancel_at_period_end && ORDER?.isActive && ORDER?.Status;
  const isCancelled = !ORDER?.isActive || !ORDER?.Status;
  const isPaused = ORDER?.isPaused;
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  return (
    <Group position={mobile ?"center":"right"} my={10}>
      {isActive && (
        <>
          <BTN_ChangePlan
            setChangePlan={setChangePlan}
            changePlan={changePlan}
          />
          {!isPaused ? (
            <BTN_ManageSubscription Label="Manage" />
          ) : (
            false
          )}
          <BTN_ManageSubscription Label="Cancel" theme="error" />
        </>
      )}
      {isCancelling && (
        <BTN_ManageSubscription Label="Renew" theme="cta" />
      )}

      {isCancelled && <></>}
    </Group>
  );
};


const SubscriptionActiveFrom = ({ ORDER }) => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  let formattedDate = "Waiting Subscription";
  let statusMessage = "Unknown status";
  let statusColor = theme.colors.blue[4]; // default color
  let PColor = 8;
  let StatusIcon = IconCheck; // default icon
  const isPaused = ORDER?.isPaused;
  const isCancelling =
    ORDER?.cancel_at_period_end && ORDER?.isActive && ORDER?.Status;
  const isActive =
    ORDER?.isActive && ORDER?.Status && !ORDER?.cancel_at_period_end;
  const isCancelled = !ORDER?.isActive || !ORDER?.Status;

  if (ORDER?.strapi_created) {
    try {
      const date = new Date(ORDER.strapi_created * 1000);
      formattedDate = date.toLocaleDateString("en-AU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (err) {
      console.error("Error formatting date: ", err);
    }
  }

  if (isCancelling) {
    const cancelDate = new Date(ORDER.cancel_at * 1000);
    statusMessage = `Subscription will be cancelled after ${cancelDate.toLocaleDateString(
      "en-AU",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    )}`;
    statusColor = theme.colors.red[9];
    PColor = 8;
    StatusIcon = IconClock;
  } else if (isPaused) {
    statusMessage = "Subscription is paused";
    statusColor = theme.colors.yellow[9];
    PColor = 8;
    StatusIcon = IconClockPause;
  } else if (isActive) {
    statusMessage = "Subscription is active";
    statusColor = theme.colors.green[5];
    PColor = 6;
    StatusIcon = IconCheck;
  } else if (isCancelled) {
    statusMessage = "Subscription is cancelled";
    statusColor = theme.colors.red[9];
    PColor = 8;
    StatusIcon = IconX;
  }

  return ( 
    <Group  position={mobile ? "center" : "apart"} >
      <Group position="left" spacing="xs" align="center">
        <StatusIcon size={`1.4em`} color={statusColor} />
        <P
          size={`sm`}
          color={PColor}
          Weight={600}
          marginBottom={0}
          Copy={`${statusMessage}. `}
        />
      </Group>

      <Group position="left" spacing="xs" align="center">
        <P
          size={`xs`}
          color={4}
          marginBottom={0}
         >{`Active since: ${formattedDate}`}</P>
        <IconAccessible size={`1.4em`} color={theme.colors.blue[5]} />
      </Group>
    </Group>
  );
};
