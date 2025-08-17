import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../../pas/Primitives/Containers';
import styles from './Features.module.scss';
import FeatureDescription from './components/FeatureDescription';
import FeatureDetails from './components/FeatureDetails';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const featuresRef = useRef(null);

  useEffect(() => {
    const elements = featuresRef.current.querySelectorAll('.fade-in-up');

    elements.forEach(el => {
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
    });
  }, []);

  return (
    <section className={styles.features} ref={featuresRef}>
      <FeatureDescription />
      <FeatureDetails />
    </section>
  );
};

export default Features;
