import React from 'react';
import ScheduledAutomation from './ScheduledAutomation';
import CustomizationOptions from './CustomizationOptions';
import { Container } from '../../Primitives/Containers';
import styles from './FeatureDetails.module.scss';

const FeatureDetails = () => {
  return (
    <div className={styles.featureDetails}>
      <Container>
        <ScheduledAutomation />
      </Container>
      <CustomizationOptions />
    </div>
  );
};

export default FeatureDetails;
