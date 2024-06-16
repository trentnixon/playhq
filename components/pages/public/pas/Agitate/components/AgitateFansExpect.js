import React from "react";
import { H2, HighlightSpan, P } from "../../Primitives/Text";
import styles from "./AgitateFansExpect.module.scss";

const AgitateFansExpect = () => {
  return (
    <div className={styles.fansExpect}>
      <img
        src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Fistura_Downloadable_35d01155c1.png"
        alt="Fans Expect"
        className={`${styles.image} slide-in`}
      />
      <div className={`${styles.text} fade-in-up`}>
        <H2>
          Fans Expect Regular,{" "}
          <HighlightSpan>High-Quality Content</HighlightSpan>
        </H2>
        <P>
          When content is inconsistent or delayed, fans lose interest. Regular
          updates keep fans engaged and excited about your club&rsquo;s activities.
          Without timely posts, your club risks appearing inactive or less
          professional.
        </P>
      </div>
    </div>
  );
};

export default AgitateFansExpect;
