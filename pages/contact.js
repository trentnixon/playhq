import React from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import ContactForm from "../components/Contact/ContactForm";
import Newsletter from "../components/Common/Newsletter";

const Contact = () => {
  return (
    <>
      <NavbarTwo />

      <PageBanner
        pageTitle="Contact Us"
        BGImage="/images/BG-Images/0D5A0825-2.jpg"
      />

      <ContactForm />
    </>
  );
};

export default Contact;

//<ContactInfo />
