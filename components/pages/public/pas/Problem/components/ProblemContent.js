import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { P, HighlightSpan, H1 } from "../../Primitives/Text";
import { Container } from "../../Primitives/Containers";
import styles from "./ProblemContent.module.scss";

gsap.registerPlugin(ScrollTrigger); 

const ProblemContent = () => {
  const contentRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  useEffect(() => {
    const contentElement = contentRef.current;
    const leftSideElement = leftSideRef.current;
    const rightSideElement = rightSideRef.current;

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
          pin: true,
        },
      }
    );

    gsap.fromTo(
      leftSideElement.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        stagger: 0.3,
        scrollTrigger: {
          trigger: leftSideElement,
          start: "top 30%",
          end: "bottom center",
          scrub: true,
          pin: false,
          markers: false,
        },
      }
    );

    gsap.fromTo(
      rightSideElement.children,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.5,
        scrollTrigger: {
          trigger: rightSideElement,
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
          pin: false,
          markers: false,
        },
      }
    );
  }, []);

  return (
    <Container className={styles.problemContent} ref={contentRef}>
      <div className={styles.leftSide} ref={leftSideRef}>
        <P>
          Many sports clubs and associations face significant challenges in
          producing high-quality digital content.
        </P>
        <P>
          The task of <HighlightSpan>aggregating</HighlightSpan> data,{" "}
          <HighlightSpan>creating designs</HighlightSpan>, and generating
          engaging content requires substantial time, resources, and expertise.
        </P>
        <P>
          This can lead to inconsistent and delayed content, negatively
          impacting fan engagement and the club&rsquo;s overall online presence.
        </P>
        <img
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Problem_Overview_Image_949c73b027.png"
          alt="Latest Bundle"
          className={styles.problemImage}
        />
      </div>
      <div className={styles.rightSide} ref={rightSideRef}>
        <H1>
          Manual content creation is{" "}
          <HighlightSpan>time-consuming</HighlightSpan> and often{" "}
          <HighlightSpan>inconsistent.</HighlightSpan>
        </H1>
      </div>
    </Container>
  );
};

export default ProblemContent;
