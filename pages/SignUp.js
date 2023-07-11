import React from "react";
import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import ContactInfo from "../components/Contact/ContactInfo";
import SignUpForm from "../components/SignUp/SignUpForm";
import Newsletter from "../components/Common/Newsletter";
import Footer from "../components/Layouts/FooterDark";

const Contact = () => {
  return (
    <>
      <NavbarTwo />
      <PageBanner
        pageTitle="SIGN UP"
        BGImage="/images/BG-Images/f21573128.jpg"
        position={`center center`}
      />
      <SignUpForm /> 
    </>
  );
};

export default Contact;
