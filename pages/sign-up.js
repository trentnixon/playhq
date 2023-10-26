import React from "react";
import PageBanner from "../components/Common/PageBanner";
import SignUpForm from "../components/SignUp/SignUpForm";
import Section from "../components/UI/DefaultSection";
import Meta from "../components/Layouts/Meta";
import { P } from "../components/Members/Common/Type";
import Link from "next/link";

const Contact = () => {
  const SectionData = {
    title: "Start Your Two-Week Free Trial with Fixtura!",
    paragraphs: [
      `No credit card. No obligations. Just tailored content for your cricket club or association. Experience all our features and receive personalized assets in your inbox, with dedicated support throughout your trial.`,
      `Set up your account below and hit 'Start Trial' to begin your journey.`,
    ],
  };
  return (
    <>
      <Meta
        title="Sign Up - Fixtura: Join the Digital Sports Revolution"
        description="Start your free trial with Fixtura and revolutionize your club's digital media strategy. Sign up and experience our innovative tools."
        keywords="Fixtura sign up, free trial sports media, join digital sports, club content creation, sports media innovation"
      />
      <PageBanner
        pageTitle=""
        BGImage="/images/BG-Images/f21573128.jpg"
        position={`center center`}
      />

      <Section {...SectionData} color="light">
        <P textAlign="center" Weight={600}>
          Already have a Fixtura Account?{" "}
          <Link href="/login">
            <a>Sign in Here</a>
          </Link>
        </P>

        <SignUpForm />
      </Section>
    </>
  );
};

export default Contact;
