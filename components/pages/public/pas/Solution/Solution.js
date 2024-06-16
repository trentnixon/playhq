import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../../pas/Primitives/Containers';
import styles from './Solution.module.scss';
import AutomatedContentSolution from './components/AutomatedContentSolution';
import WhyChooseFixtura from './components/WhyChooseFixtura';

gsap.registerPlugin(ScrollTrigger);

const Solution = () => {
  const solutionRef = useRef(null);

  useEffect(() => {
    const elements = solutionRef.current.querySelectorAll('.fade-in-up, .slide-in-left');

    elements.forEach((el) => {
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
      } else if (el.classList.contains('slide-in-left')) {
        gsap.fromTo(
          el,
          { opacity: 0, x: -100 },
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
          }
        );
      }
    });
  }, []);

  return (
    <section className={styles.solution} ref={solutionRef}>
      <Container>
        <AutomatedContentSolution />
        <WhyChooseFixtura /> 
      </Container>
    </section>
  );
};

export default Solution;
