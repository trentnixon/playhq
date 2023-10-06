// react
import { useEffect, useState } from "react";
/* import { useRouter } from "next/router"; */
import { useUser } from "../../lib/authContext";
import Link from "next/link";
// UTILS
/* import { fetcher } from "../../lib/api";
import Cookies from "js-cookie"; */
// PACK
import { Container, Paper, Space } from "@mantine/core";
// Components
import { MembersWrapper } from "../../components/Members/Common/Containers";
//import { showNotification } from "@mantine/notifications";
// HOC
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";
import SetupCheck from "../../components/Members/Account/HOC/SetupCheck";

import {
  Invoicing,
  UpcomingInvoicing,
} from "../../components/Members/stripe/Invoicing";
import { useAccountDetails } from "../../lib/userContext";
import { FixturaDivider } from "../../components/Members/Common/Divider";
import { UserSubscription } from "../../components/Members/Account/userSubscription";

import { getIdFromLocalCookie } from "../../lib/auth";
import Adminfetcher from "../../lib/Adminfetcher";
import { getTrialNotificationStatus } from "../../lib/actions";
import { IsFreeTrialFeedback } from "../../components/Members/Account/userIsFreeTrial";
import { FreeTrialActive } from "../../components/Members/Account/userFreeTrialActive";
import { CreateFreeTrial } from "../../components/Members/Account/userCreateFreeTrial";

const Account = () => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const { user, loading } = useUser();
  const trialNotificationStatus = getTrialNotificationStatus(account);

  console.log("trialNotificationStatus", trialNotificationStatus);
  // epping account order 92
  useEffect(() => {
    if (account) {
      setUserAccount(account);
    }
  }, [account]);

  return (
    <MembersWrapper>
      <SetupCheck>
        <LoadingStateWrapper conditions={[user, userAccount]}>
          {trialNotificationStatus === "available_trial" && (
            <CreateFreeTrial account={account} />
          )} 

          {trialNotificationStatus === "active_trial" && (
            <FreeTrialActive account={account} />
          )}

          {trialNotificationStatus === "ended_trial" && <UserSubscription />}

          {trialNotificationStatus === "subscribed" && (
            <>
              <UserSubscription />
              <FixturaDivider />
              <UpcomingInvoicing />
              <Invoicing />
              <Space h="lg" />
            </>
          )}
          <Space h="lg" />

          <IsFreeTrialFeedback />

          <FixturaDivider />
        </LoadingStateWrapper>
      </SetupCheck>
    </MembersWrapper>
  );
};

Account.getInitialProps = async (ctx) => {
  const ID = await getIdFromLocalCookie();

  const fixtureDateRange = await Adminfetcher(
    `/account/fixtureDateRange/${ID}`
  );
  return {
    fixtureDateRange: fixtureDateRange,
  };
};

export default Account;

/*  <UserSubscription />
          <FixturaDivider />
          <UpcomingInvoicing />
          <Invoicing /> */
/*  <Container size={"lg"}>
            <Paper
              withBorder
              p="lg"
              sx={(theme) => ({
                backgroundColor: theme.white,
              })}
            >
              Have any questions about Fixturas Subscriptions please contact our
              support team{" "}
              <Link href="/members/support">
                <a>Customer Support</a>
              </Link>
            </Paper>
          </Container> */
