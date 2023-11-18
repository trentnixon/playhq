// [club].js
import { useState, useEffect } from "react";
import { fetcher } from "../../../../lib/api";
import Meta from "../../../../components/Layouts/Meta";
import { P } from "../../../../components/Members/Common/Type";
import Section from "../../../../components/UI/DefaultSection";
import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import FixturaAndYourClubBanner from "../../../../components/HomePages/PLAYHQ/FixturaAndYourClub";

import { Player } from "@remotion/player";
import { Example_Video_Upcoming } from "../../../../remotion/templates/Basic/MarketingExamples/Example_Video_Upcoming";
import DATA_FIXTURES from "../../../../remotion/utils/upcoming_v2.json";

const qs = require("qs");
const ClubPage = ({ clubData }) => {
  const clubName = clubData.attributes.Name; // Adjust based on your data structure
  console.log(clubData.attributes);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const padding = isMobile ? 0 : "sm";
  const SectionData = {
    title:
      "Starting at Only $20 a Week, Discover Fixtura's Revolutionary Digital Content for Your Club!",
    paragraphs: [
      `Transform your club's digital narrative with Fixtura's elite content services, starting at just $20 a week. Experience a unique blend of creativity and AI-driven precision in crafting engaging fixture posts and captivating club stories.`,

      `Embark on your Fixtura journey today with a no-obligation two-week free trial and unlock the power of affordable, professional-grade digital storytelling.`,
      `Start your two-week free trial and embrace the Fixtura advantage.`,
    ],
  };
  return (
    <>
      <Meta
        title={`Home - ${clubName}: Elevate Your Club's Digital Presence`}
        description={`Discover Fixtura's cutting-edge social media content tools for ${clubName}. Engage fans with AI-powered digital assets.`}
        keywords={`Fixtura, ${clubName}, sports content creation, AI-powered social media, cricket digital assets, sports clubs marketing`}
      />
      <FixturaAndYourClubBanner clubData={clubData.attributes} />

      <>
        <Section {...SectionData} color="light">
          <Container p={padding}>
            <P>Hi {clubName}</P>
          </Container>
          <RemotionPlayer clubData={clubData} />
        </Section>
      </>
    </>
  );
};

export default ClubPage;

export const getStaticPaths = async () => {
  const clubs = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/clubs`);
  const paths = clubs.data.map((club) => ({
    params: { club: club.attributes.Name }, // Using Name for paths
  }));

  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  console.log("params.club", params.club);

  const query = qs.stringify(
    {
      filters: {
        Name: {
          $eq: params.club,
        },
      },
      populate: ["Logo"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const clubDataResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/clubs?${query}`
  );
  const clubData = clubDataResponse.data[0]; // Assuming the first match is correct

  return {
    props: {
      clubData,
    },
  };
};

const RemotionPlayer = ({ clubData }) => {
  const [isMounted, setIsMounted] = useState(false);
  const DATA = DATA_FIXTURES;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const padding = isMobile ? 0 : "sm";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Container p={padding}>
      <Player
        id={"UpComingFixtures"}
        component={Example_Video_Upcoming}
        durationInFrames={500}
        fps={30}
        compositionHeight={1350}
        compositionWidth={1080}
        inputProps={{
          DATA: DATA,
        }}
        controls
        style={{
          width: 1080 / 2,
          height: 1350 / 2,
        }}
      />
    </Container>
  );
};
