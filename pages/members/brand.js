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
import { Container, Space } from "@mantine/core";
import { IconColorPicker } from "@tabler/icons";
//import { DesignTabs } from "../../components/Members/Design/DesignTabs";
import { AccountLogo } from "../../components/Members/Design/AddLogo";
import { SelectATheme } from "../../components/Members/Common/Customiser/Design/SelectATheme";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";
import { IconBadgeTm } from "@tabler/icons-react";
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

const OurBrand = () => {
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

  useEffect(() => {}, [userAccount]);

  return (
    <LoadingStateWrapper conditions={[user, userAccount]}>
      <MembersWrapper>
        <PageTitle Copy={"Your Brand"} ICON={<IconBadgeTm size={40} />} />
        <SubHeaders Copy={"Brand Settings"} />

        <PageCopyWrapper>
          {/* <P
          Copy={`Personalize Your Content with a Distinct Identity. Showcasing your brand is essential to building a strong online presence. By uploading your logo and selecting brand colors, you'll ensure that all visual assets created by Fixtura represent your club or association in a consistent and professional manner.`}
        /> */}
          <P
            Copy={`Take control of your club's visual identity and create a compelling brand presence with Fixtura's Your Brand section. Upload your logo and select brand colors to elevate your online presence and connect with your audience on a deeper level. Show your team's spirit and build a lasting connection with your members and fans through personalized content that embodies the essence of your club or association.`}
          />
        </PageCopyWrapper>
        <Space h={20} />
        <AccountLogo />
        <Space h={20} />
        <SelectATheme />
        <Space h={20} />
      </MembersWrapper>
    </LoadingStateWrapper>
  );
};

OurBrand.getInitialProps = async (ctx) => {
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
export default OurBrand;
