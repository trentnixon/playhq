import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccountDetails } from "../../lib/userContext";
import { useUser } from "../../lib/authContext";
import Cookies from "js-cookie";
import { fetcher } from "../../lib/api";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import {
  MembersWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";
import { Box, Container, Group, Space } from "@mantine/core";
import { IconColorPicker } from "@tabler/icons";
import { DesignTabs } from "../../components/Members/Design/DesignTabs";
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
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  const [isPlaying, setIsPlaying] = useState(false);

  /* is User Auth */
  const { user } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []);
  /* End User Check*/

  useEffect(() => {
    console.log("userAccount ", userAccount);
  }, [userAccount]);

  if (!user || !userAccount) return null;

  return (
    <MembersWrapper>
      <PageTitle Copy={"Asset Design"} ICON={<IconColorPicker size={40} />} />
      <SubHeaders Copy={"Design Settings"} />

      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "80%",
            })}
          >
            <P
              Copy={`To change your design settings, simply select the desired theme and layout from the options provided. You can also choose an audio track to accompany your assets. The preview area will update to reflect your changes, so you can see how your assets will look and sound before you save them.`}
            />
          </Box>
        </Group>
      </Wrapper>
      <Space h={20} />
      <Container fluid mb={40}>
        <DesignTabs
          isPlaying={isPlaying}
          userAccount={userAccount}
          setIsPlaying={setIsPlaying}
        />
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
