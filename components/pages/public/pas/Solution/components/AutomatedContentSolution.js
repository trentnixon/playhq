import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { H1, HighlightSpan, P } from "../../Primitives/Text";
import styles from "./AutomatedContentSolution.module.scss";

gsap.registerPlugin(ScrollTrigger);

const AutomatedContentSolution = () => {
  const solutionRef = useRef(null);
  const imagesRef = useRef([]);
 
  useEffect(() => {
    const solutionElement = solutionRef.current;

    ScrollTrigger.create({
      trigger: solutionElement,
      start: "top top",
      end: "+=150%",
      scrub: true,
      pin: true,
      markers: false,
    });

    gsap.fromTo(
      imagesRef.current,
      { opacity: 0, scale: 0, y: 100 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.3,
        // Increase stagger value for slower animation
        scrollTrigger: {
          trigger: solutionElement,
          start: "top top",
          end: "bottom 60%",
          scrub: true,
        },
        ease: "elastic.out(1,1)",
      }
    );
  }, []);

  return (
    <div className={styles.contentSolution} ref={solutionRef}>
      <H1 className="fade-in-up">
        Fixtura: The Automated <HighlightSpan>Content Solution</HighlightSpan>{" "}
        for Your Club
      </H1>
      <P className="fade-in-up">
        Effortlessly create engaging digital content with our AI-powered
        platform.
      </P>
      <div className={styles.images}>
        <img
          ref={(el) => (imagesRef.current[0] = el)}
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_7beabce2f8.png"
          alt="Image 1"
          className="scale-in"
        />
        <img
          ref={(el) => (imagesRef.current[1] = el)}
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_2_cd6378737a.png"
          alt="Image 2"
          className="scale-in"
        />
        <img
          ref={(el) => (imagesRef.current[2] = el)}
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_3_0daf06a68e.png"
          alt="Image 3"
          className="scale-in"
        />
        <img
          ref={(el) => (imagesRef.current[3] = el)}
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_4_4964e2eb2e.png"
          alt="Image 4"
          className="scale-in"
        />
      </div>
    </div>
  );
};

export default AutomatedContentSolution;
