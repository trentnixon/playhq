import { fetcher } from "../../../../lib/api";
import Meta from "../../../../components/Layouts/Meta";
import Section from "../../../../components/UI/DefaultSection";
import { Center, Container, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import FixturaAndYourClubBanner from "../../../../components/Campaign/components/FixturaAndYourClub";

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
    title: "Fixtura's Live Demo",
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
      <FixturaAndYourClubBanner AccountData={clubData.attributes} />

      <>
        <Section {...SectionPlayer} color="light">
          <Container p={padding}>
            <Previewer AccountData={clubData} useAssets={useAssets} />
          </Container>
        </Section>
        <Section {...SectionData} color="grey">
          <Center>
            <Image
              height={"400px"}
              width={"auto"}
              src={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Asset_Examples_With_Labels_6796528404.png`}
            />
          </Center>
        </Section>
        <Feedback />
        <CtaAreaTwo />
      </>
    </>
  );
};

export default ClubPage;

export const getServerSideProps = async ({ params }) => {
  const qs = require("qs");

  // Fetch club data just like you did in getStaticProps
  const clubQuery = qs.stringify(
    {
      filters: {
        PlayHQID: { $eq: params.club },
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
    return { notFound: true };
  }

  const clubData = clubDataResponse.data[0];

  const assetsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/assets?${assetQuery}`
  );

  const useAssets = assetsResponse ? assetsResponse.data : [];

  return { props: { clubData, useAssets } };
};
