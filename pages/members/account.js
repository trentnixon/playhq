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
import { showNotification } from "@mantine/notifications";
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

const Account = () => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const { user, loading } = useUser();

  useEffect(() => {
    if (account) {
      setUserAccount(account);
      showNotification({
        title: "Action Completed",
        message: "Your account details have been successfully saved",
      });
    }
  }, [account]);

  return (
    <MembersWrapper>
      <SetupCheck>
        <LoadingStateWrapper conditions={[user, userAccount]}>
          <UserSubscription />
          <FixturaDivider />
          <UpcomingInvoicing />
          <Invoicing />
          <Space h="lg" />

          <Container size={"lg"}>
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
          </Container>
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
