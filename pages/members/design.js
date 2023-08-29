import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccountDetails } from "../../lib/userContext";
import { useUser } from "../../lib/authContext";
import Cookies from "js-cookie";
import { fetcher } from "../../lib/api";
import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import {
  MembersWrapper,
  PageCopyWrapper,
} from "../../components/Members/Common/Containers";
import { Space } from "@mantine/core";
import { IconColorPicker } from "@tabler/icons";
import { DesignTabs } from "../../components/Members/Design/DesignTabs";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";
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

  return (
    <LoadingStateWrapper conditions={[user, userAccount]}>
      <MembersWrapper>
        <PageTitle Copy={"Asset Design"} ICON={<IconColorPicker size={40} />} />
        <SubHeaders Copy={"Design Your Vision"} />
        <PageCopyWrapper>
          <P>
            Elevate Your Content with Personalized Templates and Audio for a
            unique representation of your club or association's style and brand
            identity.
          </P>
        </PageCopyWrapper>
        <Space h={20} />
        <DesignTabs
          isPlaying={isPlaying}
          userAccount={userAccount}
          setIsPlaying={setIsPlaying}
        />
      </MembersWrapper>
    </LoadingStateWrapper> 
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
