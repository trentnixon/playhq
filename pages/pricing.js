import React from "react";
import PageBanner from "../components/Common/PageBanner";

import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import PricingStyleOne from "../components/Pricing/PricingStyleOne";
const Pricing = () => {
  return (
    <>
      <PageBanner
        pageTitle="Pricing Options"
        BGImage="/images/BG-Images/0D5A3099.jpg"
        position={`bottom center`}
      />
      <PricingStyleOne />
      <CtaAreaTwo />
    </>
  );
};

export default Pricing;
