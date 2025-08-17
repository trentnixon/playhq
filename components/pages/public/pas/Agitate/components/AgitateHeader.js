import React from 'react';
import { H1, HighlightSpan } from '../../Primitives/Text';
import styles from './AgitateHeader.module.scss';

const AgitateHeader = () => {
  return (
    <div className={`${styles.header} fade-in-up`}>
      <H1>
        The <HighlightSpan>Hidden Costs</HighlightSpan> of Inefficient Content
        Creation
      </H1>
    </div>
  );
};

export default AgitateHeader;
