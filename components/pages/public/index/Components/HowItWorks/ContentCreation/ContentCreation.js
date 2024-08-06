import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CalendarSVG from "./CalendarSVG";
import DatabaseSVG from "./DatabaseSVG";
import AISVG from "./AISVG";
import ArrowSVG from "./ArrowSVG";
import styles from "./ContentCreation.module.scss";
import { H2, P } from "../../Primitives/Text";

gsap.registerPlugin(ScrollTrigger);

const ContentCreation = () => {
  const sectionRef = useRef(null);
  const calendarRef = useRef(null);
  const databaseRef = useRef(null);
  const aiRef = useRef(null);
  const arrowRefs = useRef([]);
  const imagesRef = useRef([]);
  useEffect(() => {
    const sectionElement = sectionRef.current;

    // Create a timeline for the animation
  /*   const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: "top 200px",
        end: "bottom -100%",
        scrub: true,
        pin: true,
        markers: false,
      },
    });

    // Sequence animations: fade in from left to right
    tl.fromTo(
      calendarRef.current,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
    )
      .fromTo(
        databaseRef.current,
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
        "-=0.5"
      )
      .fromTo(
        aiRef.current,
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
        "-=0.5"
      )
      .fromTo(
        arrowRefs.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.inOut", stagger: 0.5 }
      );

    gsap.fromTo(
      imagesRef.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.5,
        scrollTrigger: {
          trigger: sectionElement,
          start: "top 100px",
          end: "bottom 60%",
          scrub: true,
          markers: false,
        },
      }
    ); */
  }, []);

  return (
    <div className={styles.contentCreation} ref={sectionRef}>
      <H2>
        <span>Automating</span> the <span>Content Creation</span> process
      </H2>
      <P>We handle the heavy lifting for you.</P>
      <div className={styles.icons}>
        <img src="https://fixtura.s3.ap-southeast-2.amazonaws.com/POS_Site_Human_006_71c7fe1070.png" />
       {/*  <CalendarSVG ref={calendarRef} />
        <ArrowSVG ref={(el) => (arrowRefs.current[0] = el)} />
        <DatabaseSVG ref={databaseRef} />
        <ArrowSVG ref={(el) => (arrowRefs.current[1] = el)} />
        <AISVG ref={aiRef} /> */}
      </div>
      <div className={styles.limitedWidth}>
        <P>
          On a scheduled day each week, Fixtura automatically transforms the
          aggregated data into a wide range of assets for your club:
        </P>
      </div>
     {/*  <div className={styles.assets}>
        <img
          ref={(el) => (imagesRef.current[0] = el)}
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_5_7e6c0b5c0f.png"
          alt="Image 1"
          className="scale-in"
        />
        <img
          ref={(el) => (imagesRef.current[1] = el)}
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_6_d29b2f6086.png"
          alt="Image 2"
          className="scale-in"
        />
        <img
          ref={(el) => (imagesRef.current[2] = el)}
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_7_d2363485df.png"
          alt="Image 3"
          className="scale-in"
        />
        <img
          ref={(el) => (imagesRef.current[3] = el)}
          src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_8_d665e00bce.png"
          alt="Image 4"
          className="scale-in"
        />
      </div> */}
    </div>
  );
};

export default ContentCreation;
