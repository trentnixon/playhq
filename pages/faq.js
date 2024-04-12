import React from "react";
import PageBanner from "../components/Common/PageBanner";
import FaqContent from "../components/Faq/FaqContent";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import Section from "../components/UI/DefaultSection";
import Meta from "../components/Layouts/Meta";
/* import FAQ_AccessandUsage from "../components/Faq/FAQ_AccessandUsage";
import FAQ_SubscriptionManagement from "../components/Faq/FAQ_SubscriptionManagement";
import FAQ_PrivacyandSecurity from "../components/Faq/FAQ_PrivacyandSecurity";
import FAQ_ContentandCustomization from "../components/Faq/FAQ_ContentandCustomization";
import FAQ_General from "../components/Faq/FAQ_General"; */
import { Center } from "@mantine/core";
import Link from "next/link";
import { trackButtonClick } from "../lib/GA";
const Faq = () => {
  const SectionData = {
    title: "Got Questions? Let's Connect!",
    paragraphs: [
      `At Fixtura, we believe every query deserves a personalized response.`,
      `That's why we've taken a fresh approach to FAQs – by inviting you to directly ask us anything! Whether it's about harnessing AI for your cricket club, understanding our pricing, or just curious about how we can elevate your club's digital presence, we're here to provide tailored answers.`,
      `Reach out to us on Facebook for a chat - whether it's a simple question or an in-depth discussion, we're ready to assist and guide you every step of the way. Let's embark on this digital transformation journey together!`,
    ],
  };
  return (
    <>
      <Meta
        title="FAQs - Fixtura: Your Questions Answered"
        description="Find answers to frequently asked questions about Fixtura's digital media solutions for sports clubs. Get insights and help quickly."
        keywords="FAQ Fixtura, sports media questions, digital content FAQs, club media solutions help, sports club queries"
      />
      <PageBanner
        pageTitle="FAQS"
        BGImage="/images/BG-Images/0D5A3369.jpg"
        position={`top center`}
      />
      <Section {...SectionData} color="light">
        <Center>
          <Link legacyBehavior  href="https://www.facebook.com/profile.php?id=100095406210560">
            <a
              className="btn btn-secondary"
              onClick={() => trackButtonClick("Facebook FAQ Chat")} // Track button click
            >
              Contact Us on Facebook
            </a>
          </Link>
        </Center>
      </Section>
      {/* <FAQ_General /> */}
      {/*  <FAQ_ContentandCustomization /> */}
      {/* <FAQ_AccessandUsage />
     
      <FAQ_SubscriptionManagement />
      <FAQ_PrivacyandSecurity /> */}
      <CtaAreaTwo />
    </>
  );
};

export default Faq;
