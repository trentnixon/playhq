// ProblemDashboard.jsx
import React from 'react';
import styles from './ProblemDashboard.module.scss';

const ProblemDashboard = () => {
  return (
    <div className={styles.problemDashboard}>
      <img
        src='https://fixtura.s3.ap-southeast-2.amazonaws.com/Problem_Dashboard_Image_62bd5708e0.png'
        alt='Problem Dashboard'
        className={styles.dashboardImage}
      />
    </div>
  );
};

export default ProblemDashboard;
