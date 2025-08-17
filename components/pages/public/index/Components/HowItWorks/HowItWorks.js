import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TrackSeason from './TrackSeason/TrackSeason';
import LearnFixtura from './LearnFixtura/LearnFixtura';
import DataAggregation from './DataAggregation/DataAggregation';
import ContentCreation from './ContentCreation/ContentCreation';
import styles from './HowItWorks.module.scss';
import { H1 } from '../Primitives/Text';
import ContentDelivery from './ContentDelivery/ContentDelivery';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const headerRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top+=20px',
      end: 'bottom top',
      toggleClass: { targets: headerRef.current, className: styles.shrink },
      markers: true, // Use this line only for debugging
    });
  }, []);

  return (
    <div>
      <section className={styles.howItWorks} ref={sectionRef}>
        <div className={styles.stickyTitle} ref={headerRef}>
          <H1>
            Let <span>Fixtura</span> create your <span>digital content</span>{' '}
            for you by ...
          </H1>
        </div>
        <TrackSeason />
        <LearnFixtura />
        <DataAggregation />
        <ContentCreation />
      </section>
      <ContentDelivery />
    </div>
  );
};

export default HowItWorks;
