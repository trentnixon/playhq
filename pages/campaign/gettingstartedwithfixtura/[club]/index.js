import { fetcher } from "../../../../lib/api";
import Meta from "../../../../components/Layouts/Meta";
import Section from "../../../../components/UI/DefaultSection";
import { Container } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import FixturaAndYourClubBanner from "../../../../components/HomePages/PLAYHQ/FixturaAndYourClub";

import { Previewer } from "../../../../components/Campaign/gettingstartedwithfixtura/Previewer";
import CtaAreaTwo from "../../../../components/Common/CtaAreaTwo";
import Feedback from "../../../../components/Common/Feedback";
const qs = require("qs");

const ClubPage = ({ clubData, useAssets }) => {
  const clubName = clubData.attributes.Name; // Adjust based on your data structure

  const isMobile = useMediaQuery("(max-width: 768px)");
  const padding = isMobile ? 0 : "sm";
  const SectionData = {
    title: `PlayHQ Integration = Instant Digital Assets`,
    paragraphs: [
      `For just $20 a week, get full access to tailored videos, graphics, and articles that celebrate your team's achievements. Experience the ease of automated content generation—your PlayHQ data now delivers more than just scores.`,
    ],
  };


  const SectionPlayer = {
    title: "What does Fixtura provide?",
    paragraphs: [
      `Check out Fixtura's range of assets designed to highlight your club's weekly highlights and achievements.`,
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
        <Section {...SectionData} color="light"></Section>
        <Section {...SectionPlayer} color="grey">
          <Container p={padding}>
            <Previewer clubData={clubData} useAssets={useAssets} />
          </Container>
        </Section>
        <Feedback />
        
        <CtaAreaTwo />
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
