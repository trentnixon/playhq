import React from "react";
import PageBanner from "../components/Common/PageBanner";

import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import PricingStyleOne from "../components/Pricing/PricingStyleOne";
import Meta from "../components/Layouts/Meta";
const Pricing = () => {
  return (
    <>
      <Meta
        title="Pricing - Fixtura: Affordable Media Solutions"
        description="Find the perfect pricing plan for your club with Fixtura. Affordable and flexible options for superior digital content creation."
        keywords="Fixtura pricing, sports content pricing plans, affordable media solutions, club digital plans, social media content packages"
      />
      <PageBanner
        pageTitle=""
        BGImage="/images/BG-Images/0D5A3099.jpg"
        position={`bottom center`}
      />
      <PricingStyleOne />
      <CtaAreaTwo />
    </>
  );
};

export default Pricing;
