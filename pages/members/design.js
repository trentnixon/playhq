import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import Cookies from "js-cookie";
import { fetcher } from "../../lib/api";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import {
  Box,
  Container,
  Flex,
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
import RemotionPreview from "./Remotion/ThemePreviewer";

import { Tabs } from "@mantine/core";
import { IconTemplate, IconBadgeTm, IconMusic } from "@tabler/icons";
import { SelectATemplate } from "../../components/Members/Common/Customiser/Design/SelectATemplate";
import { SelectATheme } from "../../components/Members/Common/Customiser/Design/SelectATheme";
import { SelectAudio } from "../../components/Members/Common/Customiser/Design/SelectAudio";
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

const Design = () => {
  const { account, ReRender } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);

  const [isPlaying, setIsPlaying] = useState(false);

  /* is User Auth */
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []);
  /* End User Check*/

  useEffect(() => {
    console.log("userAccount ", userAccount);
  }, [userAccount]);

  if (!user || !userAccount) return false;

  return (
    <MembersWrapper>
      <PageTitle Copy={"Asset Design"} ICON={<IconColorPicker size={40} />} />

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

        <DesignTabs
          isPlaying={isPlaying}
          userAccount={userAccount}
          setIsPlaying={setIsPlaying}
        />

        <SimpleGrid
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: "md" }]}
        ></SimpleGrid>
      </Container>
    </MembersWrapper>
  );
};

Design.getInitialProps = async (ctx) => {
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
export default Design;

/*
This component renders a set of tabs, each with its own icon and label. 
It uses the "useState" hook to manage the active tab state and it also renders additional UI 
elements and other functional components that are being passed the props from the parent component.
It also uses some props such as variant, color and position, these are used to style the tab and
 other elements as per the requirements.
*/
function DesignTabs(props) {
  const [activeTab, setActiveTab] = useState("Templates");

  return (
    <Tabs 
      value={activeTab}
      onTabChange={setActiveTab}
      variant="pills"
      color="blue.8"
    >
      <Tabs.List position="center" grow={true}>
        <Tabs.Tab value="Templates" icon={<IconTemplate size={14} />}>
          <P
            marginBottom={0}
            color={activeTab === "Templates" ? 0 : 2}
            Weight={400}
            Copy={`Templates`}
          />
        </Tabs.Tab>
        <Tabs.Tab value="Branding" icon={<IconBadgeTm size={14} />}>
          <P
            marginBottom={0}
            color={activeTab === "Branding" ? 0 : 2}
            Weight={400}
            Copy={`Branding`}
          />
        </Tabs.Tab>
        <Tabs.Tab value="Audio options" icon={<IconMusic size={14} />}>
          <P
            marginBottom={0}
            color={activeTab === "Audio options" ? 0 : 2}
            Weight={400}
            Copy={`Audio options`}
          />
        </Tabs.Tab>
      </Tabs.List>

      <Space h={20} />
      <P
        Copy={`Customize your assets to match your club's unique style by selecting an option from the template, theme, and audio list. Make sure your assets stand out and effectively promote your club or association.`}
      />

      <Flex wrap="wrap">
        <TABCONTENT {...props} />
        <RemotionPlayerContainer {...props} />
      </Flex>
    </Tabs>
  );
}

const RemotionPlayerContainer = (props) => {
  const { isPlaying, userAccount, setIsPlaying } = props;
  return (
    <Paper>
      <RemotionPreview
        THEME={userAccount.attributes?.theme?.data?.attributes}
        TEMPLATE={userAccount.attributes?.template?.data?.attributes}
        AUDIO={userAccount.attributes?.audio_option?.data?.attributes}
        setIsPlaying={setIsPlaying}
      />
    </Paper>
  );
};

const TABCONTENT = (props) => {
  const { isPlaying } = props;
  //const [activeTab, setActiveTab] = useState("Templates");
  const [width, setWidth] = useState(0);
  function getContainerWidth() {
    if (width < 890) {
      return "100%";
    } else if (width >= 890 && width < 980) {
      return "450px";
    } else if (width >= 980 && width < 1124) {
      return "550px";
    } else if (width >= 1124) {
      return "700px";
    }
  }
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    if (width === 0) {
      handleResize();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Paper
      radius="md"
      shadow="0"
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.white,
        width: getContainerWidth(),
      })}
    >
      <Tabs.Panel value="Templates" pt="xs">
        <SelectATemplate />
      </Tabs.Panel>

      <Tabs.Panel value="Branding" pt="xs">
        <SelectATheme />
      </Tabs.Panel>

      <Tabs.Panel value="Audio options" pt="xs">
        <SelectAudio isPlaying={isPlaying} />
      </Tabs.Panel>
    </Paper>
  );
};
