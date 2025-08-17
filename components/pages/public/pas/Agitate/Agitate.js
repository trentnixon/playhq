import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../../pas/Primitives/Containers';
import styles from './Agitate.module.scss';
import AgitateHeader from './components/AgitateHeader';
import AgitateContentCreation from './components/AgitateContentCreation';
import AgitateFansExpect from './components/AgitateFansExpect';

gsap.registerPlugin(ScrollTrigger);

const Agitate = () => {
  const agitateRef = useRef(null);

  useEffect(() => {
    const elements = agitateRef.current.querySelectorAll(
      '.fade-in-up, .slide-in,.slide-in-right'
    );

    elements.forEach(el => {
      if (el.classList.contains('fade-in-up')) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        );
      } else if (el.classList.contains('slide-in')) {
        gsap.fromTo(
          el,
          { opacity: 0, x: -500 },
          {
            opacity: 1,
            x: 0,
            duration: 1.5,

            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: true,
            },
            ease: 'expo.out',
          }
        );
      } else if (el.classList.contains('slide-in-right')) {
        gsap.fromTo(
          el,
          { opacity: 0, x: 500 },
          {
            opacity: 1,
            x: 0,
            duration: 1.5,

            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: true,
            },
            ease: 'expo.out',
          }
        );
      }
    });
  }, []);

  return (
    <div className={`${styles.agitate}`} ref={agitateRef}>
      <Container>
        <AgitateHeader />
        <AgitateContentCreation />
        <AgitateFansExpect />
      </Container>
    </div>
  );
};

export default Agitate;
