import React from "react";
import PageBanner from "../components/Common/PageBanner";
import SignInForm from "../components/SignIn/SignInForm";
const Emailconfirmationredirection = () => {
  return (
    <>
      <PageBanner
        pageTitle="SIGN UP"
        BGImage="/images/BG-Images/0D5A3369.jpg"
      />
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <h2>Email Confirmation Complete</h2>
          <p>
            Thank you for confirming your email address! Your registration for a
            Fixtura account is now complete, and you are just a few steps away
            from enhancing your club&apos;s social media presence with our
            personalized digital assets.
          </p>
          <p>
            The next step is to complete your user profile and customize Fixtura
            for your club or association. Simply sign in to your account and
            follow the prompts to select your colors, fonts, and logos, choose
            the assets you want to receive, and set your delivery schedule and
            frequency. We&apos;ll handle the rest, creating and delivering
            high-quality content that is tailored to your specific needs and
            goals.
          </p>
          <p>
            Thank you for choosing Fixtura, and we look forward to helping you
            succeed on social media.
          </p>
        </div>
        <SignInForm />
      </div>
    </>
  );
};
export default Emailconfirmationredirection;
