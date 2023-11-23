import { fetcher } from "../../../../lib/api";
import Meta from "../../../../components/Layouts/Meta";
import Section from "../../../../components/UI/DefaultSection";
import { Center, Container, Image } from "@mantine/core";
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
        <Section {...SectionPlayer} color="light">
          <Container p={padding}>
            <Previewer clubData={clubData} useAssets={useAssets} />
          </Container>
        </Section>
        <Section {...SectionData} color="grey">
          <Center>
            <Image
              height={"400px"}
              width={"auto"}
              src={`https://fixtura.s3.ap-southeast-2.amazonaws.com/Exampe_Group_9e88443b76.png`}
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

export const getStaticPaths = async () => {
  let hasMoreClubs = true;
  let pageNumber = 1;
  const paths = [];

  while (hasMoreClubs) {
    const clubs = await fetchClubs(pageNumber);
   
    if (clubs.data.length === 0) {
      hasMoreClubs = false;
      break;
    }

    for (const club of clubs.data) {
      console.log(encodeURIComponent(club.attributes.Name))
      paths.push({ params: { club: encodeURIComponent(club.attributes.Name) } });
    }

    pageNumber++;
  }

  return { paths, fallback: false };
};

// You can place the fetchClubs function outside of getStaticPaths
async function fetchClubs(pageNumber = 1, pageSize = 25) {
  const queryWithPagination = qs.stringify(
    {
      pagination: {
        page: pageNumber,
        pageSize: pageSize,
      },
      populate: ["teams"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  return await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/clubs?${queryWithPagination}`);
}

 



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
