import React, { useEffect, useState } from "react";
import { useAccountDetails } from "../../lib/userContext";
import { useUser } from "../../lib/authContext";
import Cookies from "js-cookie";
import cookie from "cookie"; // Make sure to import the cookie library

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
      "account_media_libraries",
      "account_media_libraries.imageId",
    ],
  },
  {
    encodeValuesOnly: true,
  }
);

const Design = ({ Response }) => {
  const { account } = useAccountDetails();
  const [userAccount, setUserAccount] = useState(account);
  //const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useUser();

  console.log(
    "Response",
    Response?.attributes.account_media_libraries.data,
    Response?.attributes.account_media_libraries.data.length
  );
  useEffect(() => {
    console.log("userAccount ", userAccount);
  }, [userAccount]);

  return (
    <LoadingStateWrapper conditions={[user, userAccount]}>
      <MembersWrapper>
        <PageTitle
          Copy={"Graphics Package"}
          ICON={<IconColorPicker size={40} />}
        />
   
        <PageCopyWrapper>
          <P>
            Elevate Your Content with Personalized Graphics Packages and Audio
            Bundles for a unique representation of your club or association's
            style and brand identity.
          </P>
        </PageCopyWrapper>
        <Space h={20} />
        <DesignTabs
          userAccount={userAccount}
          hasMediaItems={
            Response?.attributes.account_media_libraries.data.length
          }
        />
      </MembersWrapper>
    </LoadingStateWrapper>
  );
};

export async function getServerSideProps(ctx) {
  // Parse cookies from the incoming headers
  const parsedCookies = cookie.parse(ctx.req.headers.cookie || "");
  const jwt = parsedCookies["jwt"]; // Use the actual key you set the JWT cookie with
  const linkedAccount = parsedCookies["LinkedAccount"]; // Use the actual key

  // Now you can use these in your fetcher
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/accounts/${linkedAccount}?${query}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  const Response = response.data;
  return { props: { Response } }; // Return the response data as props
}

export default Design;
