// ProblemContent.jsx
import React from 'react';
import { P, HighlightSpan, H1 } from '../../Primitives/Text';
import { Container } from '../../Primitives/Containers';
import styles from './ProblemContent.module.scss';

const ProblemContent = () => {
  return (
    <Container className={styles.problemContent}>
      <H1>
        Manual content creation is <HighlightSpan>time-consuming</HighlightSpan>{' '}
        and often <HighlightSpan>inconsistent.</HighlightSpan>
      </H1>
      <P>
        Simplify Your Club or Association's Match Reporting with Fixtura's
        Scheduled Automation!
      </P>

      <div className={styles.contentSolution}>
        <div className={styles.images}>
          <img
            src='https://fixtura.s3.ap-southeast-2.amazonaws.com/POS_Site_Human_001_a805230b3d.png'
            alt='Image 1'
            className='scale-in'
          />
          {/* If you have more images, add them here without refs */}
          {/* Example:
          <img
            src="https://example.com/image2.png"
            alt="Image 2"
            className="scale-in"
          />
          */}
        </div>
      </div>

      <P>
        We specialize in curating and delivering digital content for your club
        or Association's social media and website presence.
      </P>
    </Container>
  );
};

export default ProblemContent;
