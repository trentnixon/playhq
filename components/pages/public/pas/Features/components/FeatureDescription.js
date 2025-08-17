import React from 'react';
import { H2, HighlightSpan } from '../../Primitives/Text';
import styles from './FeatureDescription.module.scss';

const FeatureDescription = () => {
  return (
    <div className={`${styles.featureDescription} fade-in-up`}>
      <H2>
        <HighlightSpan>Upcoming</HighlightSpan> Fixtures,{' '}
        <HighlightSpan>Weekend</HighlightSpan> Results,{' '}
        <HighlightSpan>Team</HighlightSpan> Rosters and{' '}
        <HighlightSpan>More</HighlightSpan>...
      </H2>
    </div>
  );
};

export default FeatureDescription;
