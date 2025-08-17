import React from 'react';
import { useMantineTheme, Title, Space } from '@mantine/core';
import { IconPhotoAi, IconVideo, IconNews } from '@tabler/icons-react';
import { P } from '../Members/Common/Type';
import { trackButtonClick, trackCustomEvent } from '../../lib/GA';
import Section from '../UI/DefaultSection';

const funFactsData = [
  {
    icon: IconNews,
    title: 'AI-Powered Stories',
    description:
      "Where technology meets passion. Fixtura crafts unique content—from in-depth match analyses to vibrant player spotlights—that truly echoes your club or association's spirit.",
  },
  {
    icon: IconVideo,
    title: 'Engaging Videos',
    description:
      "Stay ahead of the game with Fixtura's bespoke videos. Highlight upcoming fixtures, showcase match results, and keep your community informed and engaged.",
  },
  {
    icon: IconPhotoAi,
    title: 'Stunning Visuals',
    description:
      'Beyond mere photos—Fixtura captures the essence. Our images, derived from key video moments, ensure your content tells a cohesive and compelling tale.',
  },
];

const FunFacts = () => {
  const theme = useMantineTheme();
  const handleCardClick = title => {
    trackButtonClick(`Clicked on ${title}`);
  };

  const handleCardHover = title => {
    trackCustomEvent('Hover', `Hovered over ${title}`, 'Fun Facts Section');
  };
  const SectionData = {
    title: "Craft Your Club's Story with Fixtura",
    paragraphs: [
      `From nail-biting matches to monumental victories across Cricket, AFL, and Netball, Fixtura's suite of advanced tools brings your sports journey to life. Embrace the power of AI-driven write-ups, dynamic videos, and stunning images designed to make your narrative shine. Whether it's the cricket pitch, the football field, or the netball court, ensure every moment is captured and celebrated with Fixtura.`,
    ],
  };

  return (
    <>
      <Section {...SectionData} color='dark'>
        <div className='row justify-content-center'>
          {funFactsData.map((fact, index) => (
            <div
              key={index}
              className='col-lg-4 col-sm-6'
              data-aos='fade-up'
              data-aos-duration='1200'
              data-aos-delay={`${100 + 200 * index}`}
              onClick={() => handleCardClick(fact.title)}
              onMouseEnter={() => handleCardHover(fact.title)}
            >
              <div className='funfact-card'>
                <fact.icon
                  size='4rem'
                  stroke={1}
                  color={theme.colors.blue[6]}
                />
                <Title
                  mb={20}
                  variant='gradient'
                  gradient={{ from: '#339AF0', to: '#3BC9DB', deg: 45 }}
                >
                  {fact.title}
                </Title>
                <P color={6} textAlign={'center'}>
                  {fact.description}
                </P>
              </div>
            </div>
          ))}
        </div>
        <Space h={50} />
        <P color={6} textAlign={'center'}>
          Fixtura: Precision-Crafted Stories that Make an Impact.
        </P>
      </Section>
    </>
  );
};
export default FunFacts;
