import React from "react";
import { H1, HighlightSpan, P } from "../../Primitives/Text";
import styles from "./ScheduledAutomation.module.scss";

const ScheduledAutomation = () => {
  return (
    <div className={styles.scheduledAutomation}>
      <H1 className="fade-in-up">Scheduled Automation</H1>
      <P className="fade-in-up">
        <HighlightSpan>
          Set It and Forget It – Automated Content Delivery
        </HighlightSpan>
      </P>
      <P className="fade-in-up">
        With Fixtura, you can set your preferred delivery time, and our platform
        handles the rest. Our automated system ensures that high-quality content
        is delivered directly to your inbox, ready to be shared with your
        audience.
      </P>
      <img
        src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Fixtura_Bundles_27815b6c0d.png"
        alt="Scheduled Automation"
        className={`${styles.image} fade-in-up`}
      />
    </div>
  );
};

export default ScheduledAutomation;
