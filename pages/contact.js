import React from "react";
import PageBanner from "../components/Common/PageBanner";
import ContactForm from "../components/Contact/ContactForm";
import Newsletter from "../components/Common/Newsletter";
import Section from "../components/UI/DefaultSection";

const Contact = () => {
  const SectionData = {
    title: "Get In Touch",
    paragraphs: [
      `If you have any questions or need assistance with your account, our team is here to help. Please fill out the form below and we will get back to you as soon as possible. We look forward to hearing from you and helping you get the most out of your Fixtura experience.`,
    ],
  };
  return (
    <>
      <PageBanner
        pageTitle="Contact Us"
        BGImage="/images/BG-Images/0D5A0825-2.jpg"
      />
      <Section {...SectionData} color="light">
        <ContactForm />
      </Section>
    </>
  );
};

export default Contact;
