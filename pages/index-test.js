// Components
//import MainBanner from "../components/pages/public/index/MainBanner";
import Services from "../components/pages/public/index/Services";
import FunFacts from "../components/Common/FunFacts";
import CtaArea from "../components/Common/CtaAreaTwo";

import { fetcher } from "../lib/api";
import Meta from "../components/Layouts/Meta";
import Feedback from "../components/Common/Feedback";
import Hero from "../components/pages/public/pas/Hero/Hero";
import FixturaPricingCards from "../components/pages/public/FixturaPricingCards/FixturaPricingCards";
import HomePageProblem from "../components/pages/public/index/Components/Problem/HomePageProblem";
import HowItWorks from "../components/pages/public/index/Components/HowItWorks/HowItWorks";
import CTA from "../components/pages/public/pas/CTA/CTA";

const Home = () => {
  return (
    <>
      <Meta
        title="Home - Fixtura: Elevate Your Club's Digital Presence"
        description="Discover Fixtura's cutting-edge social media content tools for PlayHQ clubs and associations. Engage fans with AI-powered digital assets."
        keywords="Fixtura, PlayHQ clubs, sports content creation, AI-powered social media, cricket digital assets, sports clubs marketing"
      />
      <Hero />
      <HomePageProblem />
      <HowItWorks />
      <CTA />
      {/* <Services />  */}
      {/* <FunFacts />
      <Feedback />
      <FixturaPricingCards />
      <CtaArea /> */}
    </>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/associations`
  );

  return {
    props: {
      associations: response,
    },
  };
};
