import React from "react";
import PageBanner from "../components/Common/PageBanner";
import SignUpForm from "../components/SignUp/SignUpForm";

const Contact = () => {
  return (
    <>
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
