// Components
import MainBanner from "../components/HomePages/PLAYHQ/MainBanner";
import PricingStyleOne from "../components/FixturaPricingCards/FixturaPricingCards";
import Services from "../components/HomePages/DefaultHome/Services";
import FunFacts from "../components/Common/FunFacts";
import CtaArea from "../components/Common/CtaAreaTwo";
// import Partner from "../components/Common/Partner";
import { fetcher } from "../lib/api";
import Meta from "../components/Layouts/Meta";
import Feedback from "../components/Common/Feedback";

const Index = () => {
  return (
    <>
      <Meta
        title="Home - Fixtura: Elevate Your Club's Digital Presence"
        description="Discover Fixtura's cutting-edge social media content tools for PlayHQ clubs and associations. Engage fans with AI-powered digital assets."
        keywords="Fixtura, PlayHQ clubs, sports content creation, AI-powered social media, cricket digital assets, sports clubs marketing"
      />

      <MainBanner />
      <Services />
      <FunFacts />
      <Feedback />
      <PricingStyleOne />
      <CtaArea />
    </>
  );
};

export default Index;

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
