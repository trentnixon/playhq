import React from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import WorksStyleTwo from "../components/Portfolio/WorksStyleTwo";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import { fetcher } from "../lib/api";
const qs = require("qs");
const Portfolio = ({ associations,CaseStudies }) => {
  return (
    <>
      <NavbarTwo />

      <PageBanner
        pageTitle="Digital Content"
        BGImage="/images//BG-Images/0D5A0766.jpg"
      />
      <WorksStyleTwo CaseStudies={CaseStudies}/>

      <CtaAreaTwo />
    </>
  );
};

export default Portfolio;

export const getServerSideProps = async (context) => {
  const query = qs.stringify(
    {
      populate: ["Cover", "asset_category"]
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

      CaseStudies:CaseStudies
    },
  };
};