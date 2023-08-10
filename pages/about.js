import React from "react";
import PageBanner from "../components/Common/PageBanner";
import AboutContent from "../components/About/AboutContent";
import FunFactsTwo from "../components/Common/FunFactsTwo";
import TeamStyleThree from "../components/Common/TeamStyleThree";
import Feedback from "../components/Common/Feedback";
import Partner from "../components/Common/Partner";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import Footer from "../components/Layouts/Footer";

const About = () => {
  return (
    <>
      <PageBanner
        pageTitle="Meet Fixtura: Your Digital Game-Changer"
        BGImage="/images/BG-Images/0D5A0607.jpg"
        position={`top center`}
      />
      <AboutContent />
    </>
  );
};

export default About;
//<FunFactsTwo />
//<Feedback />
