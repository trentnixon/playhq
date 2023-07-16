// react
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
// UTILS
import { fetcher } from "../../lib/api";
import Cookies from "js-cookie";
// PACK
import { Space } from "@mantine/core";
// Components
import { MembersWrapper } from "../../components/Members/Common/Containers";
import { showNotification } from "@mantine/notifications";
import { Invoicing } from "../../components/Members/stripe/Invoicing";
import { FixturaLoading } from "../../components/Members/Common/Loading";
import { useAccountDetails } from "../../lib/userContext";
import { FixturaDivider } from "../../components/Members/Common/Divider";
import { UserSubscription } from "../../components/Members/Account/userSubscription";

import qs from 'qs';

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
  const { account, ReRender } = useAccountDetails();
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

  if (!user || !userAccount) return <FixturaLoading />;

  return (
    <MembersWrapper>
      <UserSubscription />
      <FixturaDivider />
      <Invoicing />
      <Space h="lg" />
      <FixturaDivider />
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