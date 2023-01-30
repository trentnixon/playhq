import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import Cookies from "js-cookie";
import { fetcher } from "../../lib/api";
// components
import { UserDetails } from "../../components/Members/UserDetails";
import {
  Container,
  Space,
  Group,
  Paper,
  Avatar,
  useMantineTheme,
  Tooltip,
  Box,
  Divider,
} from "@mantine/core";
import {
  MembersWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { P, PageTitle } from "../../components/Members/Common/Type";
import { BTN_SubscribeToFixtura } from "./stripe/BTN_SubscribeToFixtura";
import { BTN_ManageSubscription } from "./stripe/BTN_ManageAccount";
import { UI_SubscriptionStatus_TEXT } from "./stripe/UI_SubscriptionStatus";
import { showNotification } from "@mantine/notifications";
import { Invoicing } from "./stripe/Invoicing";
import {  IconAlertTriangle, IconUser } from "@tabler/icons";
import { FixturaLoading } from "../../components/Members/Common/Loading";
import { BTN_TOINTERALLINK } from "../../components/Members/Common/utils/Buttons";
import { SelectFixturaSetting } from "../../components/Members/Common/formelements/Select_FixturaSettings";
import { FixturaSettings } from "../../components/Members/userFixturaSettings";
import { useAccountDetails } from "../../lib/userContext";

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

const Account = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const theme = useMantineTheme();

  /* is User Auth */
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []);
  /* End User Check*/

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

  if (!user) return <></>;
  if (account === null) {
    return <FixturaLoading />;
  }
  return (
    <MembersWrapper>
      <PageTitle Copy={"Account Settings"} ICON={<IconUser size={40} />} />
      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "60%",
            })}
          >
            <P
              Copy={`The overview page allows subscribed users to view their account type, selected association and club, delivery schedule, and selected assets all in one place. This page makes it easy to manage and customize your subscription, ensuring that you have access to the personalized digital assets you need to enhance your club's social media presence.`}
            />
          </Box>
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

      <Wrapper>
        <Space h={50} />
        <Divider size={10} color={"#f1f1f1"} />
        <Space h={50} />
      </Wrapper>

      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "60%",
            })}
          >
            <P
              Copy={`Here you can update your name and email address, as well as change your subscription status. You can also view when you joined Fixtura, your current subscription status, and any invoices associated with your account. By regularly updating your account settings, you can ensure that your information is accurate and up-to-date. Simply make any desired changes and click "Save" to apply them to your account.`}
            />
          </Box>
          <BTN_TOINTERALLINK
            LABEL="What is in the Subscription"
            URL="/members/settings/"
            THEME="cta"
          />
        </Group>
      </Wrapper>

      <Space h="lg" />
      <Container size={"sm"}>
        <Paper
          radius="md"
          shadow="md"
          withBorder
          p="lg"
          sx={(theme) => ({
            backgroundColor: theme.white,
          })}
        >
          <Avatar src={"s"} color="blue" size={120} radius={120} mx="auto">
            {user.substring(0, 1)}
          </Avatar>

          <SubscriptionHeader user={userAccount} />
          <UserDetails user={userAccount} setHasUpdated={ReRender} />
          <Group pos={"center"}>
            <BTN_SubscribeToFixtura />
            <BTN_ManageSubscription />
          </Group>
        </Paper>
      </Container>

      <Invoicing />
      <Space h="lg" />
    </MembersWrapper>
  );
};

Account.getInitialProps = async (ctx) => {
  console.log(`${Cookies.get("id")}`);

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

export default Account;

const SubscriptionHeader = ({ user }) => {
  const GetStartDate = () => {
    const dateString = user?.attributes.createdAt;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    });
  };

  return (
    <Container size={"xs"}>
      <Group position="apart">
        <P Copy={`Activated : ${GetStartDate()}`} />
        <UI_SubscriptionStatus_TEXT />
      </Group>
    </Container>
  );
};
