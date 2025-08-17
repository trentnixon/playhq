import {
  Grid,
  Col,
  Title,
  List,
  Text,
  Container,
  ThemeIcon,
  rem,
  Center,
  Group,
  Stack,
  Box,
} from '@mantine/core';
import { GradientTitle, H, P } from '../../Members/Common/Type';
import { useMediaQuery } from '@mantine/hooks';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/dist/gsap';

import { CustomEase } from 'gsap/dist/CustomEase';
import { RoughEase, ExpoScaleEase, SlowMo } from 'gsap/dist/EasePack';

import { Flip } from 'gsap/dist/Flip';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Observer } from 'gsap/dist/Observer';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { Draggable } from 'gsap/dist/Draggable';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { EaselPlugin } from 'gsap/dist/EaselPlugin';
import { PixiPlugin } from 'gsap/dist/PixiPlugin';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import {
  IconArrowBadgeRight,
  IconArrowBadgeUp,
  IconArrowBadgeUpFilled,
  IconBrandFacebook,
  IconDatabaseImport,
  IconIndentIncrease,
  IconPhotoAi,
  IconPhotoEdit,
  IconTool,
} from '@tabler/icons-react';
gsap.registerPlugin(
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase
);

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin);
// Generic Section Component
const Section = ({ id, className, children }) => (
  <section id={id} className={`panel ${className}`}>
    {children}
  </section>
);

// Individual Section Components
const SectionOne = () => {
  const titleText = 'How Can Fixtura Help your Club?';
  const titleWords = titleText.split(' ').map((word, index) => (
    <span key={index} style={{ whiteSpace: 'pre-wrap' }}>
      {word.split('').map((char, charIndex) => (
        <span
          key={charIndex}
          className='char'
          style={{ display: 'inline-block' }}
        >
          {char}
        </span>
      ))}{' '}
    </span>
  ));

  useGSAP(() => {
    gsap.set('.char', {
      y: 200,
      fontSize: '250%', // Increase font size by 4 times
    });

    // Character-by-character animation for titleWords
    gsap.from('.char', {
      opacity: 0,
      y: 220,
      duration: 1,
      ease: 'power2.out',
      stagger: 0.03,
    });

    // Timeline for scroll-triggered animations
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#one',
        start: 'top top',
        end: 'center center',
        scrub: true,
      },
    });

    tl.to('.char', {
      y: 0,
      fontSize: '100%', // Reset font size to original
      stagger: 0.03, // Staggered animation for each character
      ease: 'power2.out',
    });

    tl.from('.fade-in', {
      opacity: 0,
      duration: 1,
      ease: 'power1.out',
    }).from('.slide-in', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power1.out',
    });
  }, []);

  return (
    <Section id='one' className='dark'>
      <Container fluid={true} style={{ paddingTop: '150px' }}>
        <Stack>
          <div>
            <H lh={'1.8em'} color={'white'}>
              {titleWords}
            </H>
          </div>
          <P className='fade-in' textAlign='center'>
            Let's explore how automated digital asset production can save you:
          </P>
          <Group position='apart'>
            <Box>
              <P size={'xl'} textAlign='center' className='fade-in'>
                Time
              </P>
              <IconArrowBadgeUpFilled size={'3em'} className='slide-in' />
            </Box>
            <Box>
              <P size={'xl'} textAlign='center' className='fade-in'>
                Resources
              </P>
              <IconArrowBadgeUp size={'3em'} className='slide-in' />
            </Box>
            <Box>
              <P size={'xl'} textAlign='center' className='fade-in'>
                Quality
              </P>
              <IconArrowBadgeUpFilled size={'3em'} className='slide-in' />
            </Box>
          </Group>
        </Stack>
      </Container>
    </Section>
  );
};

export const SectionTwo = () => (
  <Section id='two' className='orange'>
    <P>Tracking Your Fixtures</P>
  </Section>
);

export const SectionThree = () => (
  <Section id='three' className='purple'>
    <P>Collecting Match Data</P>
  </Section>
);

export const SectionFour = () => (
  <Section id='four' className='green'>
    <H>Analyzing Data</H>
  </Section>
);

export const SectionFive = () => (
  <Section id='five' className='red'>
    <H>Asset Drop Website</H>
  </Section>
);

export const SectionSix = () => (
  <Section id='six' className='orange'>
    <H>Emailing Links to Assets</H>
  </Section>
);

export const SectionSeven = () => (
  <Section id='seven' className='green'>
    <H>Conclusion</H>
  </Section>
);

export const SectionEight = () => (
  <Section id='eight' className=''>
    {/* Content for Section Eight */}
  </Section>
);

// Main ScrollingSections Component
export const ScrollingSections = () => {
  useGSAP(() => {
    gsap.utils.toArray('.panel').forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top top',
        pin: true,
        pinSpacing: false,
        markers: true,
      });
    });
  }, []);

  return (
    <>
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
      <SectionEight />
    </>
  );
};
