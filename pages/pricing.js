import React from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import PricingStyleTwo from "../components/Pricing/PricingStyleOne";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import Footer from "../components/Layouts/Footer";

const Pricing = () => {
  return (
    <>
      <NavbarTwo />

      <PageBanner pageTitle="Pricing Options" BGImage="/images/BG-Images/0D5A3099.jpg" position={`bottom center`} />

      <PricingStyleTwo />

      <CtaAreaTwo />

    </>
  );
};

export default Pricing;
