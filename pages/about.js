import React from "react";
import PageBanner from "../components/Common/PageBanner";
import AboutContent from "../components/About/AboutContent";

const About = () => {
  return (
    <>
      <PageBanner
        pageTitle=""
        BGImage="/images/BG-Images/0D5A0607.jpg"
        position={`top center`}
      />
      <AboutContent />
    </>
  );
};

export default About;
