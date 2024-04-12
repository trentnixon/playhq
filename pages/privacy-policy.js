import React from "react";
import PageBanner from "../components/Common/PageBanner";
import Meta from "../components/Layouts/Meta";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta
        title="Privacy Policy - Fixtura: Protecting Your Data"
        description="Read Fixtura's privacy policy to understand how we protect and manage your data while you use our digital media tools for sports clubs."
        keywords="Privacy policy, Fixtura data protection, sports club privacy, digital media security, user data safety"
      />
      <PageBanner
        pageTitle="Privacy Policy"
        BGImage="/images/BG-Images/f180918696.jpg"
        position={`center center`}
      />

      <div className="text-container ptb-100">
        <div className="container">
          <h1>Privacy Policy</h1>

          <h2>Introduction</h2>
          <p>
            Fixtura takes the privacy and security of its users seriously. This
            privacy policy serves as a comprehensive guide to how we handle your
            personal and non-personal information when you access and use our
            services, including our website (Fixtura.com) and AI-generated
            sports-related digital assets. By using any of Fixtura's services,
            you consent to the data practices outlined in this policy.
          </p>

          <h2>Purpose and Scope</h2>

          <h3>Objective</h3>
          <p>
            This privacy policy aims to inform you about the types of
            information we collect, how we use it, and the choices you have
            regarding your data. It applies to all interactions you have with
            Fixtura's services, which include, but are not limited to, our
            website and AI-generated digital assets.
          </p>

          <h3>Specialized Data Use</h3>
          <p>
            As a service focused on sports clubs and associations, we utilize
            public-facing sports fixtures and metadata from PlayHQ to generate
            specialized digital assets. Users are required to give explicit
            permission during the setup process for Fixtura to access and
            utilize this data to create digital assets for them.
          </p>

          <h2>Information We Collect</h2>

          <h3>User-Provided Information</h3>
          <p>
            When you create an account or purchase a subscription, you are
            required to provide certain personal information, including but not
            limited to, your username and password. This information is crucial
            for account creation, authentication, and subscription management.
          </p>

          <h3>Usage Data</h3>
          <p>
            We collect analytical data that helps us understand how you interact
            with our website and services. This includes pages you visit, the
            duration of your visit, and any actions you take while using our
            services.
          </p>

          <h3>Third-Party Data</h3>
          <p>
            We also use sports-related data that is publicly available on
            PlayHQ. This information allows us to create personalized,
            AI-generated sports assets that are of interest to you.
          </p>

          <h2>How We Use Your Information</h2>

          <h3>Service Provision</h3>
          <p>
            We use the information we collect to create and manage your account,
            fulfilling your subscriptions, and generating AI-powered
            sports-related digital assets for your use.
          </p>

          <h3>Customer Support</h3>
          <p>
            We use your data to provide timely and effective customer support,
            including responding to your queries, complaints, or comments.
          </p>

          <h3>Performance Analytics</h3>
          <p>
            Your usage data helps us monitor and improve the performance,
            reliability, and functionality of our services.
          </p>

          <h2>Sharing Your Information</h2>

          <h3>Payment Processing</h3>
          <p>
            We partner with Stripe for payment processing and may share your
            billing information with them to complete your transactions. For
            more details on how Stripe handles your data, you can refer to
            Stripe's privacy policy.
          </p>

          <h3>Analytics and Site Monitoring</h3>
          <p>
            We use Google Analytics to track user interaction within our
            website. This data is used solely for internal analysis to improve
            user experience and service functionality.
          </p>

          <h2>Data Security</h2>

          <h3>Protective Measures</h3>
          <p>
            We employ advanced security protocols and technologies to protect
            your data from unauthorized access, alteration, and disclosure.
          </p>

          <h3>User Responsibility</h3>
          <p>
            While we strive to protect your information, we cannot guarantee
            complete security. You are responsible for safeguarding your account
            credentials.
          </p>

          <h2>International Data Transfer</h2>

          <h3>Regional Focus</h3>
          <p>
            Although Fixtura primarily serves users in Australia and New
            Zealand, our services are hosted on servers located in the country
            where Fixtura is based. By using our services, you consent to the
            transfer of your information to this country.
          </p>

          <h2>Privacy Policy Updates</h2>

          <h3>Changes and Notifications</h3>
          <p>
            We reserve the right to update this privacy policy at our
            discretion. We will notify you of any significant changes by
            updating the effective date and posting the new policy on this page.
          </p>

          <h2>Your Rights and Choices</h2>

          <h3>Data Access and Control</h3>
          <p>
            You have the right to access, update, or delete your personal
            information stored on our systems. You can manage your data by
            logging into your account.
          </p>

          <h3>Opting Out</h3>
          <p>
            You have the option to opt out of any marketing communications we
            may send you. Instructions for opting out will be included in each
            communication.
          </p>

          <h2>Contact Us</h2>
          <p>
            For any questions or concerns about this privacy policy or how we
            handle your data, please contact us at [Insert Contact Information].
          </p>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
