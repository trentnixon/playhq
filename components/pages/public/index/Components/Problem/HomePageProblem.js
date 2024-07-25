import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProblemContent from "./components/ProblemContent";
import ProblemStats from "./components/ProblemStats";
import ProblemDashboard from "./components/ProblemDashboard";

import styles from "./Problem.module.scss";
import { Container, GradientContainer } from "../Primitives/Containers";

gsap.registerPlugin(ScrollTrigger);

const HomePageProblem = () => {
  const problemRef = useRef(null);

  useEffect(() => {
    const sections = problemRef.current.querySelectorAll(
      `.${styles.problemSection}`
    );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: problemRef.current,
          start: "top 100px",
          end: "bottom bottom",
          scrub: true,
          pin: true,
          markers: false,
        },
      })
      .fromTo(sections, { y: 50 }, { y: 0, duration: 0.5, stagger: 0.5 });
  }, []);

  return (
    <section className={styles.problem} ref={problemRef}>
      <Container className={`${styles.problemSection} ${styles.whiteSection}`}>
        <ProblemContent />
      </Container>

      <GradientContainer
        className={`${styles.problemSection} ${styles.gradientSection}`}
      >
        <ProblemStats />
      </GradientContainer>
      <Container className={`${styles.problemSection} ${styles.bottomSection}`}>
        <ProblemDashboard />
      </Container>
    </section>
  );
};

export default HomePageProblem;
