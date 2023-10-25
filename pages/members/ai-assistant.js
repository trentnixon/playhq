// Core
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// UTILS
import { useAccountDetails } from "../../lib/userContext";
import { useUser } from "../../lib/authContext";
import { showNotification } from "@mantine/notifications";
import { fetcher } from "../../lib/api";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import {
  MembersWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { FixturaLoading } from "../../components/Members/Common/Loading";
// PACK
import Cookies from "js-cookie";
import {
  Box,
  Container,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Space,
} from "@mantine/core";
import { IconColorPicker } from "@tabler/icons";

// components
import { FixturaAIsettings } from "../../components/Members/userFixturaAIsettings";
import { AIEXAMPLE } from "../../components/Members/AIASSISTANT/AIEXAMPLE";

const qs = require("qs");

const query = qs.stringify(
  {
    populate: [
      "template",
      "theme",
      "audio_option",
      "ai_publication",
      "ai_writting_tone",
      "ai_writting_style",
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
/*   const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []); */
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

  if (!user) return false;
  if (userAccount === null) return <FixturaLoading />;
  return (
    <MembersWrapper>
      <PageTitle Copy={"AI Assistant"} ICON={<IconColorPicker size={40} />} />
      <SubHeaders Copy={"AI Article Settings"} />
      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "60%",
            })}
          >
            <P
              Copy={`To change your AI writing settings, simply select the desired publication, style, and tone from the dropdown menus on the settings page. These settings will determine the style and tone of the AI-generated articles and writeups that you receive. You can preview the changes to your writing settings by looking at the example text next to the dropdown menus.`}
            />
          </Box>
        </Group>
      </Wrapper>
      <Space h={20} />
      <Container size={"md"} mb={40}>
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: "md" }]}
        >
          <Paper
            radius="md" 
            shadow="0"
           
            sx={(theme) => ({
              backgroundColor: theme.white,
            })}
          >
            <FixturaAIsettings
              user={userAccount}
              setHasUpdated={ReRender}
              showDayOfWeek={false}
            />
          </Paper>

          <AIEXAMPLE
            AISETTINGS={{
              ai_writting_tone:
                userAccount?.attributes.ai_writting_tone.data.attributes.Name,
              ai_writting_style:
                userAccount?.attributes.ai_writting_style.data.attributes.Name,
              ai_publication:
                userAccount?.attributes.ai_publication.data.attributes.Name,
            }}
          />
        </SimpleGrid>
      </Container>
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
  let Response = response.data;
  return {
    Response,
  };
};
export default Account;
