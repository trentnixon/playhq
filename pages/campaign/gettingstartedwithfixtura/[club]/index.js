import { fetcher } from "../../../../lib/api";
import Meta from "../../../../components/Layouts/Meta";
import { P } from "../../../../components/Members/Common/Type";
import Section from "../../../../components/UI/DefaultSection";
import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import FixturaAndYourClubBanner from "../../../../components/HomePages/PLAYHQ/FixturaAndYourClub";

import { Previewer } from "../../../../components/Campaign/gettingstartedwithfixtura/Previewer";
const qs = require("qs");

const ClubPage = ({ clubData, useAssets }) => {
  const clubName = clubData.attributes.Name; // Adjust based on your data structure

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

  const SectionPlayer = {
    title: "Preview",
    paragraphs: [``],
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
        <Section {...SectionData} color="light"></Section>
        <Section {...SectionPlayer} color="grey">
          <Container p={padding}>
            <Previewer clubData={clubData} useAssets={useAssets} />
          </Container>
        </Section>
        <Section {...SectionData} color="light">
          <Container p={padding}>
            <P>Hi {clubName}</P>
          </Container>
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
  // Fetch club data
  const clubQuery = qs.stringify(
    {
      filters: {
        Name: { $eq: params.club },
      },
      populate: ["Logo"],
    },
    { encodeValuesOnly: true }
  );

  const assetQuery = qs.stringify(
    {
      populate: ["asset_type", "asset_category"],
    },
    { encodeValuesOnly: true }
  );

  const clubDataResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/clubs?${clubQuery}`
  );

  if (!clubDataResponse || !clubDataResponse.data) {
    // Handle error or return not found
    return { notFound: true };
  }

  const clubData = clubDataResponse.data[0]; // Assuming the first match is correct

  // Fetch assets data
  const assetsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/assets?${assetQuery}`
  );

  if (!assetsResponse || !assetsResponse.data) {
    // Handle error or default to an empty array
    return { props: { clubData, useAssets: [] } };
  }

  const useAssets = assetsResponse.data;

  return { props: { clubData, useAssets } };
};
