import React from "react";
import PageBanner from "../components/Common/PageBanner";
import SignInForm from "../components/SignIn/SignInForm";
import { P } from "../components/Members/Common/Type";
const Emailconfirmationredirection = () => {
  return (
    <>
      <PageBanner
        pageTitle="Email Confirmation Complete"
        BGImage="/images/BG-Images/0D5A3369.jpg"
      />
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <h2>Email Confirmed</h2>
          <P>
            Your email address has been successfully confirmed. Now it's time to
            take your club's social media presence to the next level with our
            personalized digital assets.
          </P>
          <P>
            To continue, simply log in to your account and complete your
            organization profile.
          </P>
        </div>
        <SignInForm />
      </div>
    </>
  );
};
export default Emailconfirmationredirection;
