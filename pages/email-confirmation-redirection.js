import React from "react";
import PageBanner from "../components/Common/PageBanner";
import SignInForm from "../components/SignIn/SignInForm";
import Section from "../components/UI/DefaultSection";
const Emailconfirmationredirection = () => {
  const SectionData = {
    title: "Email Confirmed",
    paragraphs: [
      `Your email address has been successfully confirmed. Now it's time to
    take your club's social media presence to the next level with our
    personalized digital assets.`,
      `To continue, simply log in to your account and complete your
  organization profile.`,
    ],
  };

  return (
    <>
      <PageBanner
        pageTitle="Email Confirmation Complete"
        BGImage="/images/BG-Images/0D5A3369.jpg"
      />
      <Section {...SectionData} color="dark">
        <SignInForm />
      </Section>
    </>
  );
};
export default Emailconfirmationredirection;
