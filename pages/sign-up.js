import React from "react";
import PageBanner from "../components/Common/PageBanner";
import SignUpForm from "../components/SignUp/SignUpForm";
import Section from "../components/UI/DefaultSection";

const Contact = () => {
  const SectionData = {
    title: "Start Your Two-Week Free Trial with Fixtura!",
    paragraphs: [
      `No credit card. No obligations. Just tailored content for your cricket club or association. Experience all our features and receive personalized assets in your inbox, with dedicated support throughout your trial.`,
      `Set up your account below and hit 'Start Trial' to begin your journey.`
    ],
  };
  return (
    <>
      <PageBanner
        pageTitle=""
        BGImage="/images/BG-Images/f21573128.jpg"
        position={`center center`}
      />
      <Section {...SectionData} color="light">
        <SignUpForm />
      </Section>
    </>
  );
};

export default Contact;
