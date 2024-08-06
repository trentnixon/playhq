import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { P, HighlightSpan, H1 } from "../../Primitives/Text";
import { Container } from "../../Primitives/Containers";
import styles from "./ProblemContent.module.scss";

gsap.registerPlugin(ScrollTrigger);

const ProblemContent = () => {
  const contentRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const contentElement = contentRef.current;

    gsap.fromTo(
      contentElement,
      { opacity: 1 },
      {
        opacity: 1,
        duration: 0,
        scrollTrigger: {
          trigger: contentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: false,
          markers: false,
          pin: false, // Remove pinning
        },
      }
    );

    const solutionElement = contentElement;

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
    <Container className={styles.problemContent} ref={contentRef}>
      <H1>
        Manual content creation is <HighlightSpan>time-consuming</HighlightSpan>{" "}
        and often <HighlightSpan>inconsistent.</HighlightSpan>
      </H1>
      <P>
        Simplify Your Club or Association's Match Reporting with Fixtura's
        Scheduled Automation!
      </P>

      <div className={styles.contentSolution}>
        <div className={styles.images}>
          <img
            ref={(el) => (imagesRef.current[0] = el)}
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/POS_Site_Human_001_a805230b3d.png"
            alt="Image 1"
            className="scale-in"
          />

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
