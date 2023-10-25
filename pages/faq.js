import React from "react";
import PageBanner from "../components/Common/PageBanner";
import FaqContent from "../components/Faq/FaqContent";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import Section from "../components/UI/DefaultSection";
const Faq = () => {
  const SectionData = {
    title: "Frequently Asked Questions",
    paragraphs: [``],
  };
  return (
    <>
      <PageBanner
        pageTitle=""
        BGImage="/images/BG-Images/0D5A3369.jpg"
        position={`top center`}
      />

      <Section {...SectionData} color="light">
        <FaqContent />
      </Section>

      <CtaAreaTwo />
    </>
  );
};

export default Faq;
