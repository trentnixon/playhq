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
import { Group, Space } from "@mantine/core";
import { IconColorPicker } from "@tabler/icons";
import { DesignTabs } from "../../components/Members/Design/DesignTabs";
import { LoadingStateWrapper } from "../../components/Members/Account/HOC/LoadingStateWrapper";
import { BTN_TOEXTLINK } from "../../components/Members/Common/utils/Buttons";
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
            Experience the power and flexibility of Fixtura's Graphics Packages.
            With a simple selection process, you can choose a visual style that
            truly represents your club or association. Remember, there are two
            primary options to consider for your organization's graphics:
          </P>
        </PageCopyWrapper>
        <Space h={20} />
        <PageCopyWrapper>
          <SubHeaders Copy={"Bespoken Graphics"} />
          <P>
            For a truly unique and tailored feel, collaborate with us to craft
            bespoke graphics that resonate with your organization's brand and
            identity. Already have a design theme in mind or in use? Let's work
            together to adapt and integrate your vision into our system,
            ensuring a consistent and authentic online presence.
          </P>

          <Group position="right" mt={20} mb={20}>
            <P marginBottom={0}>
              To learn more or start the design journey, DM us on our Facebook
              page.
            </P>
            <BTN_TOEXTLINK
              URL="https://www.facebook.com/profile.php?id=100095406210560"
              LABEL={"Start Your Bespoke Journey"}
            />{" "}
          </Group>
        </PageCopyWrapper>
        <Space h={20} />
        <SubHeaders Copy={"Free Packages"} />
        <P>
          Dive into our collection of ready-to-use graphics, available at no
          cost. As we continually expand our library, we recommend staying
          updated with our social channels for the latest graphic package
          releases.
        </P>
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
