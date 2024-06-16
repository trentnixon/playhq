import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { H2, P } from '../../Primitives/Text';
import styles from './ProblemStats.module.scss';

gsap.registerPlugin(ScrollTrigger);

const ProblemStats = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const statsElement = statsRef.current;

    gsap.fromTo(
      statsElement,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: statsElement,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
          pin: false,
        },
      }
    );
  }, []);

  return (
    <div className={styles.problemStats} ref={statsRef}>
      <H2>
        “We spend far too many hours on <span>PlayHQ</span> and Designing
        Graphics”
      </H2>
      <P>
        The Challenges of <span>Manual Content Creation</span>
      </P>
    </div>
  );
};

export default ProblemStats;
