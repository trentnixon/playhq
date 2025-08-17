import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ProblemDashboard.module.scss';

gsap.registerPlugin(ScrollTrigger);

const ProblemDashboard = () => {
  const dashboardRef = useRef(null);

  useEffect(() => {
    const dashboardElement = dashboardRef.current;

    gsap.fromTo(
      dashboardElement,
      { opacity: 0, y: 150 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: dashboardElement,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
          pin: false,
          markers: false,
        },
      }
    );
  }, []);

  return (
    <div className={styles.problemDashboard} ref={dashboardRef}>
      <img
        src='https://fixtura.s3.ap-southeast-2.amazonaws.com/Problem_Dashboard_Image_62bd5708e0.png'
        alt='Problem Dashboard'
        className={styles.dashboardImage}
      />
    </div>
  );
};

export default ProblemDashboard;
