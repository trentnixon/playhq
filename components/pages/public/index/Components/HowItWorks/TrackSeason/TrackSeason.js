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

    gsap.fromTo(
      daysRef.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 200px",
          end: "bottom center",
          scrub: true,
          pin: true,
          markers: false,
        },
      }
    );
  }, []);

  return (
    <div className={styles.trackSeason} ref={sectionRef}>
      <H2>
        Tracking Your <span>Season:</span>
      </H2>
      <P>so we never miss a match. </P>
      <div className={styles.content}>
        <div className={styles.calendar}>
          <svg
            width="475"
            height="475"
            viewBox="0 0 475 475"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="79.166"
              y="98.9585"
              width="316.667"
              height="316.667"
              rx="2"
              stroke="#9E9E9E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M316.667 59.375V138.542"
              stroke="#9E9E9E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M158.333 59.375V138.542"
              stroke="#9E9E9E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M79.166 217.708H395.833"
              stroke="#9E9E9E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              ref={(el) => (daysRef.current[0] = el)}
              x="137"
              y="266.875"
              width="39.5833"
              height="39.5833"
              stroke="#9E9E9E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              ref={(el) => (daysRef.current[1] = el)}
              x="215.666"
              y="267"
              width="39.5833"
              height="39.5833"
              stroke="#9E9E9E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              ref={(el) => (daysRef.current[2] = el)}
              x="292.666"
              y="266"
              width="39.5833"
              height="39.5833"
              stroke="#9E9E9E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              ref={(el) => (daysRef.current[3] = el)}
              x="137"
              y="341.875"
              width="39.5833"
              height="39.5833"
              stroke="#9E9E9E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              ref={(el) => (daysRef.current[4] = el)}
              x="215.666"
              y="342"
              width="39.5833"
              height="39.5833"
              stroke="#9E9E9E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              ref={(el) => (daysRef.current[5] = el)}
              x="292.666"
              y="341"
              width="39.5833"
              height="39.5833"
              stroke="#9E9E9E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className={styles.copy}>
          <P>Each week, we monitor your club’s fixtures and results.</P>
        </div>
      </div>
    </div>
  );
};

export default TrackSeason;
