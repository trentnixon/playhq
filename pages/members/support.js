// react
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
// UTILS
import { fetcher } from "../../lib/api";
import Cookies from "js-cookie";
// PACK
import { Container, Paper } from "@mantine/core";
// Components
import { MembersWrapper } from "../../components/Members/Common/Containers";
import { showNotification } from "@mantine/notifications";

import { FixturaLoading } from "../../components/Members/Common/Loading";
import { useAccountDetails } from "../../lib/userContext";
import { FixturaDivider } from "../../components/Members/Common/Divider";

import qs from "qs";
import { PageTitle } from "../../components/Members/Common/Type";
import { IconAddressBook } from "@tabler/icons-react";
import Meta from "../../components/Layouts/Meta";

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

const Support = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  /* is User Auth */
  const { user, loading } = useUser();
  /*   const router = useRouter();
  const currentRoute = router.pathname;

  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, [user]);
 */
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
      <Meta
        title="Member Support - Fixtura: We're Here to Help"
        description="Get the support you need as a Fixtura member. We're dedicated to assisting you in maximizing your sports club's digital media."
        keywords="Member support, Fixtura assistance, sports media help, club content support, digital media aid"
      />
      <PageTitle Copy={"Support"} ICON={<IconAddressBook size={40} />} />

      <Container size={"lg"}>
        <Paper
          withBorder
          p="lg"
          sx={(theme) => ({
            backgroundColor: theme.white,
          })}
        ></Paper>
      </Container>
      <FixturaDivider />
    </MembersWrapper>
  );
};

Support.getInitialProps = async (ctx) => {
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

export default Support;
