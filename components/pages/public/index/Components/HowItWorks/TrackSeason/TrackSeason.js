import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2, P } from "../../Primitives/Text";
import styles from "./TrackSeason.module.scss";

gsap.registerPlugin(ScrollTrigger);

const TrackSeason = () => {
  const sectionRef = useRef(null);
  const daysRef = useRef([]);
  useEffect(() => {
    const sectionElement = sectionRef.current;
  }, []);

  return (
    <div className={styles.trackSeason} ref={sectionRef}>
      <H2>
        Tracking Your <span>Season:</span>
      </H2>
      <P>so we never miss a match. </P>
      <div className={styles.content}>
        <div className={styles.calendar}>
          <img
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/POS_Site_Human_002_b68f0ec64f.png"
            alt="Calendar"
          />
        </div>
        <div className={styles.copy}>
          <P>Each week, we monitor your club’s fixtures and results.</P>
        </div>
      </div>
    </div>
  );
};

export default TrackSeason;
