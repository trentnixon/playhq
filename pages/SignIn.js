import React from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import ContactInfo from "../components/Contact/ContactInfo";
import SignInForm from "../components/SignIn/SignInForm";
import Newsletter from "../components/Common/Newsletter";
import Footer from "../components/Layouts/FooterDark";

const Contact = () => {
  return (
    <>
      <NavbarTwo />

      <PageBanner
        pageTitle="SIGN IN"
        BGImage="/images/BG-Images/0D5A3671.jpg"
        position={`top center`}
      />

      <SignInForm />
    </>
  );
};

export default Contact;
