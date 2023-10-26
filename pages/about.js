import React from "react";
import PageBanner from "../components/Common/PageBanner";
import AboutContent from "../components/About/AboutContent";
import Meta from "../components/Layouts/Meta";

const About = () => {
  return (
    <>
      <Meta
        title="About Fixtura - Revolutionizing Club Media"
        description="Learn about Fixtura, the game-changer in digital sports media for clubs and associations. We combine AI innovation with sports expertise."
        keywords="About Fixtura, digital sports media, sports club innovation, AI in sports, club media revolution, sports technology"
      />
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
