// HomePageProblem.jsx
import React from "react";
import ProblemContent from "./components/ProblemContent";
import ProblemStats from "./components/ProblemStats";
import ProblemDashboard from "./components/ProblemDashboard";

import styles from "./Problem.module.scss";
import { Container, GradientContainer } from "../Primitives/Containers";

const HomePageProblem = () => {
  return (
    <section className={styles.problem}>
      <Container className={`${styles.problemSection} ${styles.whiteSection}`}>
        <ProblemContent />
      </Container>

      <GradientContainer
        className={`${styles.problemSection} ${styles.gradientSection}`}>
        <ProblemStats />
      </GradientContainer>

      <Container className={`${styles.problemSection} ${styles.bottomSection}`}>
        <ProblemDashboard />
      </Container>
    </section>
  );
};

export default HomePageProblem;
