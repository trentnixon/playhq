import React from "react";
import PageBanner from "../components/Common/PageBanner";
import FaqContent from "../components/Faq/FaqContent";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import Section from "../components/UI/DefaultSection";
import Meta from "../components/Layouts/Meta";
const Faq = () => {
  const SectionData = {
    title: "Frequently Asked Questions",
    paragraphs: [``],
  };
  return (
    <>
      <Meta
        title="FAQs - Fixtura: Your Questions Answered"
        description="Find answers to frequently asked questions about Fixtura's digital media solutions for sports clubs. Get insights and help quickly."
        keywords="FAQ Fixtura, sports media questions, digital content FAQs, club media solutions help, sports club queries"
      />
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
