import React from "react";
import { H2, HighlightSpan, P } from "../../Primitives/Text";
import styles from "./WhyChooseFixtura.module.scss";

const WhyChooseFixtura = () => {
  return (
    <div className={styles.whyChoose}>
      <H2 className="fade-in-up">
        Why Choose <HighlightSpan>Fixtura?</HighlightSpan>
      </H2>
      <div className={styles.content}>
        <img
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Medium_1_96f1a50463.png"
          alt="Why Choose Fixtura"
          className="slide-in-left"
        />
        <P className="fade-in-up">
          Fixtura revolutionizes your club&rsquo;s digital presence by automating the
          creation of various digital assets, including match reports, videos,
          and graphics. Our AI-driven platform aggregates data from PlayHQ and
          uses advanced tools to produce high-quality
          content tailored to your club&rsquo;s needs.
        </P>
      </div>
    </div>
  );
};

export default WhyChooseFixtura;
