import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./DataAggregation.module.scss";
import { H2, P } from "../../Primitives/Text";

gsap.registerPlugin(ScrollTrigger);

const DataAggregation = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const scoreRefs = useRef([]);
  const fixturaLogoRef = useRef(null);
  const dbLogoRef = useRef(null);
  const scores = ["5/128", "10/206", "8/97", "6/189", "89-76", "102-98"];

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const contentElement = contentRef.current;

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: "top 200px",
        end: "bottom -200%",
        scrub: true,
        pin: true,
        markers: false,
      },
    });

    // Animate the logos
    tl.fromTo(
      fixturaLogoRef.current,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    ).fromTo(
      dbLogoRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      "<" // Start at the same time as the fixtura logo animation
    );

    // Animate each score individually with a consistent left to right and stagger timing
    scoreRefs.current.forEach((el, index) => {
      tl.fromTo(
        el,
        {
          x: 0, // Start at the left
          scale: 0.3,
          opacity: 0,
        },
        {
          x: () => contentElement.clientWidth - 150, // End position at the right of the container
          scale: 0.8,
          opacity: 1,
          duration: 0.5,
          ease: "power1.inOut",
          stagger: 0.3 * index, // Stagger each drop by 0.3 seconds
          onComplete: () => {
            gsap.to(el, {
              scale: 0.1,
              opacity: 0,
              duration: 0.5,
              ease: "power1.inOut",
            });
          },
        }
      );
    });

    // Change the drop shadow of the receiving image over the same duration as the scores animation
    gsap.to(dbLogoRef.current, {
      filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.8))",
      duration: scores.length * 1.8, // 1.5 for each score + 0.3 stagger
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className={styles.dataAggregation} ref={sectionRef}>
      <H2>
        Aggregating <span>Your Data </span>
      </H2>
      <P>Transforming your weekend results into insightful stats.</P>
      <div className={styles.content} ref={contentRef}>
        {/* <div className={styles.fixtura} ref={fixturaLogoRef}>
          <img
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/fixtura_bucket_99ec5b6ace.png"
            alt="Fixtura Logo"
          />
        </div> */}
        {/* <div className={styles.scoresContainer}>
          <div className={styles.scores}>
            {scores.map((score, i) => (
              <div
                key={i}
                className={styles.score}
                ref={(el) => scoreRefs.current.push(el)}
              >
                {score}
              </div>
            ))}
          </div>
        </div> */}
        <div className={styles.db} ref={dbLogoRef}>
          <img
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/POS_Site_Human_005_965990cbf4.png"
            alt="Database Icon"
          />
        </div>
      </div>
    </div>
  );
};

export default DataAggregation;
