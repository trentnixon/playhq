import React from 'react';
// @ts-ignore
import styles from './ContentCreation.module.scss';
import { H2, P } from '../../Primitives/Text';

const ContentCreation = () => {
  return (
    <div className={styles.contentCreation}>
      <H2>
        <span>Automating</span> the <span>Content Creation</span> process
      </H2>
      <P>We handle the heavy lifting for you.</P>
      <div className={styles.icons}>
        <img
          src='https://fixtura.s3.ap-southeast-2.amazonaws.com/POS_Site_Human_006_71c7fe1070.png'
          alt='Content creation automation illustration'
        />
      </div>
      <div className={styles.limitedWidth}>
        <P>
          On a scheduled day each week, Fixtura automatically transforms the
          aggregated data into a wide range of assets for your club:
        </P>
      </div>
    </div>
  );
};

export default ContentCreation;
