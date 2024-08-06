import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H2, P } from "../../Primitives/Text";
import styles from "./LearnFixtura.module.scss";
import { CricketSVG } from "./CricketSVG";
import { FootballBallSVG } from "./FootballBallSVG";
import { RugbyBallSVG } from "./RugbyBallSVG";
import { BasketBallSVG } from "./BasketBallSVG";

gsap.registerPlugin(ScrollTrigger);

const LearnFixtura = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const ballRefs = useRef([]);
  const playHqLogoRef = useRef(null);
  const fixturaLogoRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    const contentElement = contentRef.current;

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: "top 100px",
        end: "bottom -200%",
        scrub: true,
        pin: true,
        markers: false,
      },
    });

    // First animation: Fixtura logo fades in and moves up into position
    tl.fromTo(
      fixturaLogoRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power1.inOut" }
    );

    // First animation: PlayHQ logo fades in and moves down into position
    tl.fromTo(
      playHqLogoRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power1.inOut" },
      "<" // This symbol means the animation should start at the same time as the previous one
    );

    // Animate each ball individually with a consistent drop and stagger timing
    ballRefs.current.forEach((el, index) => {
      tl.fromTo(
        el,
        {
          y: 0, // Start at the top
          scale: 0.1,
          opacity: 0,
        },
        {
          y: () => contentElement.clientHeight - 200, // End position at the bottom of the container
          scale: 0.5,
          opacity: 1,
          duration: 1.5,
          ease: "power1.inOut",
          stagger: 0.3 * index, // Stagger each drop by 0.3 seconds
          onComplete: () => {
            gsap.to(el, {
              scale: 0.1,
              opacity: 0,
              duration: 1.5,
              ease: "power1.inOut",
            });
          },
        }
      );
    });

    // Animate the drop shadow opacity of the Fixtura logo
    tl.to(
      fixturaLogoRef.current,
      {
        filter: "drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.8))",
        duration: 1.5,
        ease: "power1.inOut",
      },
      "-=1" // Align this animation with the end of the last ball animation
    );
  }, []);

  return (
    <div className={styles.learnFixtura} ref={sectionRef}>
      <H2>
        Learning about your <span>results</span> and <span>fixtures</span>:
      </H2>
      <P>Saving you hours of research time digging through scorecards.</P>
      <div className={styles.content} ref={contentRef}>
        <div className={styles.sportsBallsContainer}>
          <div className={styles.sportsBalls}>
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <FootballBallSVG ref={(el) => ballRefs.current.push(el)} />
                <RugbyBallSVG ref={(el) => ballRefs.current.push(el)} />
                <CricketSVG ref={(el) => ballRefs.current.push(el)} />
                <BasketBallSVG ref={(el) => ballRefs.current.push(el)} />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.playhq} ref={playHqLogoRef}>
          <img
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/POS_Site_Human_003_342704f205.png"
            alt="PlayHQ Logo"
          />
        </div>
        <div className={styles.middle}></div>
        <div className={styles.fixtura}>
          <img
            ref={fixturaLogoRef}
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/POS_Site_Human_004_0fd1dc0f8e.png"
            alt="Fixtura Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default LearnFixtura;
