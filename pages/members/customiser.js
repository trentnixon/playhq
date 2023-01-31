import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import { showNotification } from "@mantine/notifications";
import Cookies from "js-cookie";

import { fetcher } from "../../lib/api";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
// components

import { FixturaCustomiser } from "../../components/Members/userFixturaCustomiser";
import { FixturaAIsettings } from "../../components/Members/userFixturaAIsettings";
import {
  Box,
  Container,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Space,
} from "@mantine/core";
import {
  MembersWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { IconColorPicker } from "@tabler/icons";
import { useGetAIExample } from "../../Hooks/useAI";
import { FixturaLoading } from "../../components/Members/Common/Loading";
import RemotionPreview from "./Remotion/ThemePreviewer";
import { useAccountDetails } from "../../lib/userContext";
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

  if (!user) return false;

  return (
    <MembersWrapper>
      <PageTitle Copy={"Customiser"} ICON={<IconColorPicker size={40} />} />

      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "60%",
            })}
          >
            <P
              Copy={
                "Customize the appearance of your assets by selecting from a range of colors and templates, including the option to add your brand colors. You can also use the music options to set the tone of your videos."
              }
            />
          </Box>
        </Group>
      </Wrapper>

      <SubHeaders Copy={"Logo"} />
      <Container size={"lg"} mb={40}>
        <SubHeaders Copy={"Design Settings"} />
        <Wrapper>
          <Group position="apart">
            <Box
              sx={(theme) => ({
                width: "60%",
              })}
            >
              <P
                Copy={`To change your design settings, simply select the desired theme and layout from the options provided. You can also choose an audio track to accompany your assets. The preview area will update to reflect your changes, so you can see how your assets will look and sound before you save them.`}
              />
            </Box>
          </Group>
        </Wrapper>
        <Space h={20} />
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: "md" }]}
        >
          <Paper
            radius="md"
            shadow="0"
            p="lg"
            sx={(theme) => ({
              backgroundColor: theme.white,
            })}
          >
            <FixturaCustomiser user={userAccount} setHasUpdated={ReRender} />
          </Paper>
          <Paper
            radius="md"
            shadow="md"
            withBorder
            p={0}
            sx={(theme) => ({
              backgroundColor: theme.white,
              width: parseInt(1440) * 0.25,
              height: parseInt(1920) * 0.25,
            })}
          >
            <RemotionPreview
              THEME={userAccount.attributes?.theme?.data?.attributes}
              TEMPLATE={userAccount.attributes?.template?.data?.attributes}
              AUDIO={userAccount.attributes?.audio_option?.data?.attributes}
            />
          </Paper>
        </SimpleGrid>
      </Container>

      <Wrapper>
        <Space h={50} />
        <Divider size={10} color={"#f1f1f1"} />
        <Space h={50} />
      </Wrapper>

      <Container size={"lg"} mb={40}>
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
        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: "md" }]}
        >
          <Paper
            radius="md"
            shadow="0"
            p="lg"
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

      {/* <AssetSwitchGroup user={userAccount} /> */}

      <SubHeaders Copy={"Sponsors"} />
      <SubHeaders Copy={"Partners"} />
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

const AIEXAMPLE = ({ AISETTINGS }) => {
  const [AIExample, CreateAIExample] = useGetAIExample();
  const [prompt, setPrompt] = useState(false);

  const CreateSentence = (AISETTINGS) => {
    const Sentence = `Write a ${AISETTINGS.ai_writting_tone}, 
    1 paragraph article about world cricket in 2022, that is ${AISETTINGS.ai_writting_style} for 
    ${AISETTINGS.ai_publication}`;
    //setPrompt(Sentence)
    return Sentence;
  };

  useEffect(() => {
    if (AIExample === null) {
      CreateAIExample(CreateSentence(AISETTINGS));
    }
  }, []);

  useEffect(() => {
    CreateAIExample(CreateSentence(AISETTINGS));
  }, [
    AISETTINGS.ai_writting_tone,
    AISETTINGS.ai_publication,
    AISETTINGS.ai_writting_style,
  ]);

  return (
    <Paper
      radius="0"
      shadow="0"
      sx={(theme) => ({
        backgroundColor: theme.white,
      })}
    >
      <P fontStyle="italic" Copy={`Example`} />
      <P
        Weight={600}
        textTransform={"uppercase"}
        lineHeight={"1em"}
        Copy={CreateSentence(AISETTINGS)}
      />
      <P fontStyle="italic" Copy={`Response`} />
      <Paper
        radius="md"
        shadow="md"
        withBorder
        p="lg"
        sx={(theme) => ({
          backgroundColor: theme.white,
        })}
      >
        {typeof AIExample !== "string" ? (
          <FixturaLoading />
        ) : (
          <P lineHeight={"1.4em"} Copy={AIExample} />
        )}
      </Paper>
    </Paper>
  );
};
