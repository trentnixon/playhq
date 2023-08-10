import React from "react";
//import Navbar from "../components/Layouts/NavbarTwo";

// Components
import MainBanner from "../components/HomePages/PLAYHQ/MainBanner";
import PricingStyleOne from "../components/Pricing/PricingStyleOne";
import OurWorks from "../components/HomePages/PortfolioAgency/OurWorks";
import Services from "../components/HomePages/DefaultHome/Services";
import FunFacts from "../components/Common/FunFacts";
import CtaArea from "../components/Common/CtaAreaTwo";
import Partner from "../components/Common/Partner"; 

import { fetcher } from "../lib/api";
//import Footer from "../components/Layouts/Footer";
const qs = require("qs");
 
const CS_query = qs.stringify(
  {
    populate: ["Cover"],
  },
  {
    encodeValuesOnly: true,
  }
);
const Index = ({ associations, CaseStudies }) => {
  return (
    <>
      <MainBanner />
      <Services />
      <FunFacts />
      <Partner associations={associations} />
     {/*  <OurWorks CaseStudies={CaseStudies} /> */}
      <PricingStyleOne />
      <CtaArea />
    </>
  );
};

export default Index;

export const getServerSideProps = async (context) => {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/associations`
  );
  const CaseStudies = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/case-studies?${CS_query}`
  );

  return {
    props: {
      associations: response,
      CaseStudies: CaseStudies,
    },
  };
};
