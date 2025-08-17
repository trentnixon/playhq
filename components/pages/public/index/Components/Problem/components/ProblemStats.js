// ProblemStats.jsx
import React from 'react';
import { H2, P } from '../../Primitives/Text';
import styles from './ProblemStats.module.scss';

const ProblemStats = () => {
  return (
    <div className={styles.problemStats}>
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
