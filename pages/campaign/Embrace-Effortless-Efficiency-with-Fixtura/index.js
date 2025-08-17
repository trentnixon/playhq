import React from 'react';
import Meta from '../../../components/Layouts/Meta';
//import PageBanner from "../../../components/Common/PageBanner";
import Section from '../../../components/UI/DefaultSection';
//import { Container, Image } from "@mantine/core";
import { useMediaQuery } from '@mantine/hooks';
//import Timelines from "../../../components/Campaign/Embrace-Effortless-Efficiency-with-Fixtura/timeline";
import Partner from '../../../components/Common/Partner';
//import Feedback from "../../../components/Common/Feedback";
import CtaAreaTwo from '../../../components/Common/CtaAreaTwo';
import TestimonialSingle from '../../../components/Common/TestimonialSingle';
//import PageBannerDarkMode from "../../../components/Common/PageBannerDarkMode";
import { ScrollingSections } from '../../../components/Campaign/Embrace-Effortless-Efficiency-with-Fixtura/GsapScrollPIn';

const EmbraceEffortlessEfficiencywithFixtura = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const padding = isMobile ? 0 : 'sm';

  return (
    <>
      <Meta
        title='About Fixtura - Revolutionizing Club Media'
        description='Learn about Fixtura, the game-changer in digital sports media for clubs and associations. We combine AI innovation with sports expertise.'
        keywords='About Fixtura, digital sports media, sports club innovation, AI in sports, club media revolution, sports technology'
      />
      {/* <PageBanner
        pageTitle=""
        BGImage="/images/BG-Images/0D5A0607.jpg"
        position={`top center`}
      /> */}
      <TestimonialSection />
      <ScrollingSections />
      <LeadSection padding={padding} />
      {/* <CompareTheDifference /> */}

      <Partner />

      <CtaAreaTwo />
    </>
  );
};

export default EmbraceEffortlessEfficiencywithFixtura;

const LeadSection = ({ padding }) => {
  const SectionData = {
    title: `Embrace Effortless Efficiency in Match Reporting with Fixtura`,
    paragraphs: [
      `Transform match reporting from a chore to a click. `,
      `Fixtura automates your club's reporting needs, saving hours each week.`,
    ],
  };
  return (
    <Section {...SectionData} color='light'>
      <TestimonialSingle />
    </Section>
  );
};

const TestimonialSection = ({ padding }) => {
  const SectionData = {
    title: `Embrace Effortless Efficiency in Match Reporting with Fixtura`,
    paragraphs: [
      `Transform match reporting from a chore to a click. `,
      `Fixtura automates your club's reporting needs, saving hours each week.`,
    ],
  };
  return <Section {...SectionData} color='light'></Section>;
};

/* const CompareTheDifference = ({ padding }) => {
  const SectionData = {
    title: `From Manual to Automated: The Fixtura Advantage`,
    paragraphs: [
      `Ditch the manual grind of match reporting.`,
      `Discover how Fixtura streamlines every step, saving you time and effort.`,
    ],
  };
  return (
    <Section {...SectionData} color="dark">
      <Timelines />
    </Section>
  );
};
 */
