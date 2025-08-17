import React from 'react';
import PageBanner from '../components/Common/PageBanner';
import Section from '../components/UI/DefaultSection';
import Meta from '../components/Layouts/Meta';
import SignInForm from '../components/pages/public/SignIn/SignInForm';
const Emailconfirmationredirection = () => {
  const SectionData = {
    title: 'Email Confirmed',
    paragraphs: [
      `Your email address has been successfully confirmed. Now it's time to
    take your club's social media presence to the next level with our
    personalized digital assets.`,
      `To continue, simply log in to your account and complete your
  organization profile.`,
    ],
  };

  return (
    <>
      <Meta
        title='Email Confirmation - Fixtura'
        description="Confirm your email to continue enjoying Fixtura's digital media tools. We ensure secure access for sports clubs and associations."
        keywords='Email confirmation, Fixtura account security, sports media email verification, secure club access'
      />
      <PageBanner
        pageTitle='Email Confirmation Complete'
        BGImage='/images/BG-Images/0D5A3369.jpg'
      />
      <Section {...SectionData} color='dark'>
        <SignInForm />
      </Section>
    </>
  );
};
export default Emailconfirmationredirection;
