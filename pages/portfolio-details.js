import React from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import PortfolioDetailsContent from "../components/Portfolio/PortfolioDetailsContent";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import Footer from "../components/Layouts/Footer";

const PortfolioDetails = () => {
  return (
    <>
      <PageBanner pageTitle="Example Deep Dive" BGImage="/images/BG-Images/f180918696.jpg" />
      <PortfolioDetailsContent />
      <CtaAreaTwo />
    </>
  );
};

export default PortfolioDetails;
