// react
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import Link from "next/link";
// UTILS
import { fetcher } from "../../lib/api";
import Cookies from "js-cookie";
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

import qs from "qs";


const query = qs.stringify(
  {
    populate: [
      "scheduler",
      "scheduler.days_of_the_week",
      "account_type",
      "associations",
      "clubs",
      "renders",
      "renders.downloads",
      "assets",
      "order",
    ],
  },
  {
    encodeValuesOnly: true,
  }
);

const Account = () => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  /* is User Auth */
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, [user]);

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
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${Cookies.get(
      "LinkedAccount"
    )}?${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("jwt")}`,
      },
    }
  );
  return {
    Response: response.data,
  };
};

export default Account;
