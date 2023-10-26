import React from "react";
import PageBanner from "../components/Common/PageBanner";
import WorksStyleTwo from "../components/Portfolio/WorksStyleTwo";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import { fetcher } from "../lib/api";
import Meta from "../components/Layouts/Meta";

const qs = require("qs");
const Portfolio = ({ associations, CaseStudies }) => {
  return (
    <>
      <Meta
        title="Our Services - Fixtura: Transforming Club Media"
        description="Explore the diverse digital media offerings of Fixtura. From AI-generated content to bespoke videos and images for sports clubs."
        keywords="Fixtura services, AI-generated sports content, club media solutions, digital asset creation, sports graphics, custom sports videos"
      />
      <PageBanner pageTitle="" BGImage="/images/BG-Images/0D5A3099.jpg" />
      <WorksStyleTwo CaseStudies={CaseStudies} />
      <CtaAreaTwo />
    </>
  );
};

export default Portfolio;

export const getServerSideProps = async (context) => {
  const query = qs.stringify(
    {
      populate: ["Cover", "asset_category", "VideoExample", "MainDescription"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const CaseStudies = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/case-studies?${query}`
  );

  return {
    props: {
      CaseStudies: CaseStudies,
    },
  };
};
