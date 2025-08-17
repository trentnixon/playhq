// Components
import CtaArea from '../components/Common/CtaAreaTwo';
import Partner from '../components/Common/Partner';
import { fetcher } from '../lib/api';
import Meta from '../components/Layouts/Meta';

import PromoBanner from '../components/pages/public/Freetrial/PromoBanner';
import PromotionalLandingCopy from '../components/pages/public/Freetrial/LandingCopy';

const Index = ({ associations }) => {
  return (
    <>
      <Meta
        title="Home - Fixtura: Elevate Your Club's Digital Presence"
        description="Discover Fixtura's cutting-edge social media content tools for PlayHQ clubs and associations. Engage fans with AI-powered digital assets."
        keywords='Fixtura, PlayHQ clubs, sports content creation, AI-powered social media, cricket digital assets, sports clubs marketing'
      />
      <PromoBanner />
      <PromotionalLandingCopy />
      <Partner associations={associations} />
      <CtaArea />
    </>
  );
};

export default Index;

export const getServerSideProps = async context => {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/associations`
  );

  return {
    props: {
      associations: response,
    },
  };
};
