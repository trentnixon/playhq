import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";

import Cookies from "js-cookie";

import { fetcher } from "../../lib/api";
// components
import {
  MembersWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";

import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import { Paper, Group, Space, Box } from "@mantine/core";
import { SwitchAssets } from "../../components/Members/Common/Switch_Assets";
import { IconHome } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
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

const Overview = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);

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

  useEffect(() => {
    // do something with the userAccount prop
    //console.log(userAccount.attributes.order.data.attributes.Status);
  }, [userAccount]);

  if (!user) return <>Loading</>;
  if (Response === null) return <>Loading</>;
  return (
    <MembersWrapper>
      <PageTitle Copy={"Assets"} ICON={<IconHome size={40} />} />

      <SubHeaders Copy={"Choose Your Customized Digital Assets"} />

      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "60%",
            })}
          >
            <P
              Copy={
                "Please feel free to select any and all assets that you would like to have included in your download. There is no limit to the number of assets that you can choose."
              }
            />
          </Box>
          <Paper
            shadow="lg"
            p="md"
            withBorder
            radius="md"
            sx={(theme) => ({
              backgroundColor: theme.colors[theme.primaryColor][4],
            })}
          >
            <Group position="apart">
              <P
                color={0}
                marginBottom={0}
                Copy={`${userAccount.attributes.assets.data.length} Assets Selected`}
              />
            </Group>
          </Paper>
        </Group>
      </Wrapper>
      <Space h={30} />

      <SwitchAssets
        USERASSETS={userAccount.attributes.assets.data}
        COLLECTIONID={userAccount.id}
      />
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