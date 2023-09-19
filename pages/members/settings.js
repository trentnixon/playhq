import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";

import Cookies from "js-cookie";

import { fetcher } from "../../lib/api";
// components



import {
  MembersWrapper,
  PageCopyWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";

import { P, PageTitle } from "../../components/Members/Common/Type";
import { Paper, Group, Box, Tooltip } from "@mantine/core";
import { SelectFixturaSetting } from "../../components/Members/Common/formelements/Select_FixturaSettings";
import { IconAlertTriangle, IconHome } from "@tabler/icons";
import { useAccount } from "../../Hooks/useAccount";
import { showNotification } from "@mantine/notifications";
import { useAccountDetails } from "../../lib/userContext";
import { FixturaLoading } from "../../components/Members/Common/Loading";
import { FixturaSettings } from "../../components/Members/Account/userFixturaSettings";
const qs = require("qs");

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

const Overview = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);

  /* is User Auth */
  const { user, loading } = useUser();
/*   const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []); */
  /* End User Check*/

  /* fetch user account data */

  useEffect(() => {
    if (account !== null) {
      showNotification({
        title: "Action Completed",
        message: "Your account details have been successfully saved",
      });
    }
  }, [userAccount]);

  useEffect(() => {
    if (account !== null) {
      setUserAccount(account);
    }
  }, [account]);

  if (!user) return <FixturaLoading />;
  if (Response === null) return <FixturaLoading />;
  if (userAccount === null) {
    return <FixturaLoading />;
  }
  return (
    <MembersWrapper>
      <PageTitle Copy={"Overview"} ICON={<IconHome size={40} />} />
      <Wrapper>
        <Group position="apart">
          <PageCopyWrapper>
            <P
              Copy={`The overview page allows subscribed users to view their account type, selected association and club, delivery schedule, and selected assets all in one place. This page makes it easy to manage and customize your subscription, ensuring that you have access to the personalized digital assets you need to enhance your club's social media presence.`}
            />
          </PageCopyWrapper>
          <Paper
            shadow="lg"
            p="md"
            withBorder
            radius="md"
            sx={(theme) => ({
              backgroundColor: theme.colors[theme.primaryColor][2],
            })}
          >
            <Group position="apart">
              <SelectFixturaSetting
                CollectionFrom={"days-of-the-weeks"}
                CollectionSaveTo={"schedulers"}
                RelationProperty={"days_of_the_week"}
                SelectedBaseValueObject={{ ID: null, Name: null }}
                SelectLabel={`Delivered on : ${userAccount.attributes.scheduler.data.attributes.days_of_the_week.data.attributes.Name}`}
                SelectPlaceholder={"Select a day of the week"}
                user={userAccount}
                setHasUpdated={ReRender}
                COLLECTIONID={userAccount.attributes.scheduler.data.id}
                WithIcon={true}
              />

              {!userAccount.attributes.order.data?.attributes.Status ? (
                <Tooltip label="An Active Subscription Required">
                  <IconAlertTriangle size={25} color="yellow" />
                </Tooltip>
              ) : (
                true
              )}
            </Group>
          </Paper>
        </Group>
      </Wrapper>

      <FixturaSettings user={userAccount} setHasUpdated={ReRender} />
    </MembersWrapper>
  );
};

Overview.getInitialProps = async (ctx) => {
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
  let Response = response.data;
  return {
    Response,
  };
};

export default Overview;
