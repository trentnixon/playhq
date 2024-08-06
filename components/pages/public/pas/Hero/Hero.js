import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.scss";
import { H1, P } from "../Primitives/Text";

const Hero = () => {
  const heroRef = useRef(null);
  const highlightRef = useRef(null);
  const images = [
    {
      src: "https://fixtura.s3.ap-southeast-2.amazonaws.com/POS_Site_Human_010_6ae3f3eee5.png",
      alt: "Header Item 1",
    }/* ,
    {
      src: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Hero_example_2_4228e0d1e9.png",
      alt: "Header Item 2",
    },
    {
      src: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Hero_example_1_f15e1bc128.png",

      alt: "Header Item 3",
    }, */
  ];

  useEffect(() => {
    const heroElement = heroRef.current;
    gsap.fromTo(heroElement, { opacity: 0 }, { opacity: 1, duration: 0 });

    const images = heroElement.querySelectorAll(".imageItem");
    gsap.fromTo(
      images,
      { x: 450, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power1.out" }
    );

    const highlight = highlightRef.current;
    gsap.fromTo(
      highlight,
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      }
    );
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.heroContent}>
        <HeroText highlightRef={highlightRef} />
        <HeroImages images={images} />
      </div>
    </section>
  );
};

const HeroText = ({ highlightRef }) => {
  return (
    <div className={styles.textContent}>
      <H1>
        Struggling to Keep Up with Your{" "}
        <span ref={highlightRef} className={styles.highlight}>
          Club&rsquo;s Digital Content
        </span>{" "}
        Schedule?
      </H1>
      <P>Let <span ref={highlightRef} className={styles.highlight}>Fixtura</span> Streamline the Process</P>
    </div>
  );
};

const HeroImages = ({ images }) => {
  return (
    <div className={styles.imageStack}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={`${styles.imageItem} imageItem`}
        />
      ))}
    </div>
  );
};

export default Hero;
