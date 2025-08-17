// Components

import Meta from '../components/Layouts/Meta';

import Hero from '../components/pages/public/pas/Hero/Hero';
import Problem from '../components/pages/public/pas/Problem/Problem';

import Agitate from '../components/pages/public/pas/Agitate/Agitate';
import Solution from '../components/pages/public/pas/Solution/Solution';
import Features from '../components/pages/public/pas/Features/Features';
import CTA from '../components/pages/public/pas/CTA/CTA';
import '../components/pages/public/pas/PAS.module.scss';
const Index = () => {
  return (
    <div>
      <Meta
        title="Solution for Your Club's Digital Content - Fixtura"
        description="Struggling to keep up with your club's digital content? Discover Fixtura's automated solutions for PlayHQ clubs and associations. Engage fans effortlessly with AI-powered digital assets."
        keywords='Fixtura, PlayHQ clubs, sports content creation, AI-powered social media, cricket digital assets, sports clubs marketing, digital content solutions, automated content creation'
      />
      <Hero />
      <Problem />
      <Agitate />
      <Solution />
      <Features />
      <CTA />
    </div>
  );
};

export default Index;
