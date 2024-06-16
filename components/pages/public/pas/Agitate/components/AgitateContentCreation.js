import React from "react";
import { H2, HighlightSpan, P } from "../../Primitives/Text";
import styles from "./AgitateContentCreation.module.scss";

const AgitateContentCreation = () => {
  return (
    <div className={styles.contentCreation}>
      <div className={`${styles.text} fade-in-up`}>
        <H2>
          Content Creation{" "}
          <HighlightSpan>Takes Time Away from Core Activities</HighlightSpan>
        </H2>
        <P>
          Club presidents and secretaries often spend up to 6 hours a week
          managing content. This time could be better spent on strategic
          initiatives, improving club operations, and engaging with members.
        </P>
      </div>
      <img
        src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Fixtura_Asset_Types_06d2af87fd.png"
        alt="Content Creation"
        className={`${styles.image} slide-in-right`}
      />
    </div>
  );
};

export default AgitateContentCreation;
