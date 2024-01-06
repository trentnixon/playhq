import { fetcher } from "../../../../lib/api";
import Meta from "../../../../components/Layouts/Meta";
import Section from "../../../../components/UI/DefaultSection";
import { Center, Container, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
//import FixturaAndYourAssociationBanner from "../../../../components/HomePages/PLAYHQ/FixturaAndYourAssociation";
import FixturaAndYourClubBanner from "../../../../components/HomePages/PLAYHQ/FixturaAndYourClub";

import { Previewer } from "../../../../components/Campaign/Simplify-Your-Social-Media-with-Fixtura/Previewer";
import CtaAreaTwo from "../../../../components/Common/CtaAreaTwo";
import Feedback from "../../../../components/Common/Feedback";
const qs = require("qs");

const AssociationPage = ({ associationData, useAssets }) => {
  const associationName = associationData.attributes.Name; // Adjust based on your data structure

  const DefaultLogo='https://fixtura.s3.ap-southeast-2.amazonaws.com/Default_ICON_171b58a21b.png'
  console.log(associationData.attributes.ParentLogo)
  associationData.attributes.ParentLogo = associationData.attributes.ParentLogo ==='No Parent Logo'?DefaultLogo:associationData.attributes.ParentLogo
  const isMobile = useMediaQuery("(max-width: 768px)");
  const padding = isMobile ? 0 : "sm";
  const SectionData = {
    title: `Automate Your Content for Just $30/Week – Zero Extra Work!`,
    paragraphs: [
      `Unlock the power of automated content creation at an unbeatable price. With Fixtura, effortlessly transform your association's data into engaging videos, dynamic graphics, and insightful articles. Experience the ease of top-tier digital storytelling for just $30 a week, without adding to your workload. Welcome to smart, simple, and cost-effective content management.`,
    ],
  };

  const SectionPlayer = {
    title: "How Can Fixtura Simplify Your Content Creation?",
    paragraphs: [
      `Take a look at real examples of automated content generated by Fixtura for cricket associations. See how easily we convert your weekly matches and key moments into engaging digital content, saving time and reducing effort for your team.`,
    ],
  };

  return (
    <>
      <Meta
        title={`Home - ${associationName}: Elevate Your Association's Digital Presence`}
        description={`Discover Fixtura's cutting-edge social media content tools for ${associationName}. Engage fans with AI-powered digital assets.`}
        keywords={`Fixtura, ${associationName}, sports content creation, AI-powered social media, cricket digital assets, sports associations marketing`}
      />
      <FixturaAndYourClubBanner AccountData={associationData.attributes} />

      <>
        <Section {...SectionPlayer} color="light">
          <Container p={padding}>
            <Previewer AccountData={associationData} useAssets={useAssets} />
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

export default AssociationPage;

export const getStaticPaths = async () => {
  let hasMoreAssociations = true;
  let pageNumber = 1;
  const paths = [];

  while (hasMoreAssociations) {
    const associations = await fetchAssociations(pageNumber);
    if (associations.data.length === 0) {
      hasMoreAssociations = false;
      break;
    }

    for (const association of associations.data) {
      if (association?.attributes?.PlayHQID) {
        paths.push({
          params: { association: association.attributes.PlayHQID.toString() },
        });
      }
    }

    pageNumber++;
  }

  return { paths, fallback: false };
};

async function fetchAssociations(pageNumber = 1, pageSize = 25) {
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
  return await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/associations?${queryWithPagination}`
  );
}

export const getStaticProps = async ({ params }) => {
  const associationQuery = qs.stringify(
    {
      filters: {
        PlayHQID: { $eq: params.association },
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

  const associationDataResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/associations?${associationQuery}`
  );

  if (!associationDataResponse || !associationDataResponse.data) {
    return { notFound: true };
  }

  const associationData = associationDataResponse.data[0];

  const assetsResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/assets?${assetQuery}`
  );

  if (!assetsResponse || !assetsResponse.data) {
    return { props: { associationData, useAssets: [] } };
  }

  const useAssets = assetsResponse.data;

  return { props: { associationData, useAssets } };
};