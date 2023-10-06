import React from "react";
import PageBanner from "../components/Common/PageBanner";
import SignInForm from "../components/SignIn/SignInForm";

const SignIn = () => {
  return (
    <>
      <PageBanner
        pageTitle="SIGN IN"
        BGImage="/images/BG-Images/0D5A3671.jpg"
        position={`top center`}
      />
      <SignInForm />   
    </>
  );
};

export default SignIn; 
