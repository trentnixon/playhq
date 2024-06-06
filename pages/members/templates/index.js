import React, { useEffect, useState } from "react";
import { useAccountDetails } from "../../../lib/userContext";
import { useUser } from "../../../lib/authContext";
import cookie from "cookie"; // Make sure to import the cookie library
import { fetcher } from "../../../lib/api";
import {
  P,
  PageTitle,
  SubHeaders,
} from "../../../components/Members/Common/Type";
import {
  MembersWrapper,
  PageCopyWrapper,
} from "../../../components/Members/Common/Containers";
import { Group, Space } from "@mantine/core";

import { LoadingStateWrapper } from "../../../components/Members/Account/HOC/LoadingStateWrapper";
import { BTN_TOEXTLINK } from "../../../components/Members/Common/utils/Buttons";
import Meta from "../../../components/Layouts/Meta";

import {
  IconColorPicker,
  IconScissors,
  IconTemplate,
} from "@tabler/icons-react";
import { RoundedSectionContainer } from "../../../components/UI/Containers/SectionContainer";
import { SelectATemplate } from "../../../components/Members/Common/Customiser/Design/SelectATemplate";

const qs = require("qs");

const query = qs.stringify(
  {
    populate: [
      "template",
      "theme",
      "audio_option",
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
  const [selectedAsset, setSelectedAsset] = useState("UpComingFixtures");
  const [selectedHeroImage, setHeroImage] = useState(null);
  const [playerKey, setPlayerKey] = useState(Date.now());
  //const [isPlaying, setIsPlaying] = useState(false);
  const { user } = useUser();

  useEffect(() => {}, [userAccount]);
  useEffect(() => {
    setUserAccount(account);
  }, [account]);

  useEffect(() => {
    setPlayerKey(Date.now());
  }, [selectedHeroImage, selectedAsset]);
  return (
    <LoadingStateWrapper conditions={[user, userAccount]}>
      <MembersWrapper>
        <Meta
          title="Fixtura Member Templates - Tailor Your Graphics"
          description="Effortlessly customize your club's graphics with Fixtura's member-exclusive Templates. Choose, design, and showcase with ease."
          keywords="Custom graphics, Fixtura, club branding, design customization, sports visual content"
        />
        <PageTitle Copy={"Templates"} ICON={<IconTemplate size={40} />} />

        <SubHeaders Copy={"Free Templates"} ICON={<IconTemplate size={30} />} />

        <P marginBottom={0}>
          Browse through a diverse range of pre-designed templates. Our
          selection caters to various styles and preferences, offering something
          for every club. New designs are added regularly to keep your content
          fresh and engaging.
        </P>
        <SelectATemplate
          userAccount={userAccount}
          hasMediaItems={
            Response?.attributes.account_media_libraries.data.length
          }
        />
        <Space h={20} />
        <PageCopyWrapper>
          <SubHeaders
            Copy={"Bespoken Graphics"}
            ICON={<IconScissors size={30} />}
          />
          <P>
            Already have a design theme in mind or in use? Let's work together
            to adapt and integrate your vision into our system, ensuring a
            consistent and authentic online presence.
          </P>

          <Group position="right" mt={20} mb={20}>
            <P marginBottom={0}>
              To learn more or start the design journey, DM us on our Facebook
              page.
            </P>
            <BTN_TOEXTLINK
              URL="https://www.facebook.com/profile.php?id=100095406210560"
              LABEL={"Start Your Bespoke Journey"}
            />
          </Group>
        </PageCopyWrapper>
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
