import React from "react";
import PageBanner from "../components/Common/PageBanner";
import FaqContent from "../components/Faq/FaqContent";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
const Faq = () => {
  return (
    <>
      <PageBanner
        pageTitle="Frequently Asked Questions"
        BGImage="/images/BG-Images/0D5A3369.jpg"
        position={`top center`}
      />

      <FaqContent />

      <CtaAreaTwo />
    </>
  );
};

export default Faq;
