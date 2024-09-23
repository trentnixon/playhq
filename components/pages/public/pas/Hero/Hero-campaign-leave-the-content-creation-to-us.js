import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.scss";
import { H1, P } from "../Primitives/Text";

const Hero = () => {
  const heroRef = useRef(null);
  const highlightRef = useRef(null);
  const images = [
    {
      src: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Leave_The_Content_To_Us_2c9344ad4f.png",
      alt: "Header Item 1",
    },
  ];

  useEffect(() => {
    const heroElement = heroRef.current;
    gsap.fromTo(heroElement, { opacity: 0 }, { opacity: 1, duration: 0 });

    const images = heroElement.querySelectorAll(".imageItem");
    gsap.fromTo(
      images,
      { x: 550, opacity: 0 },
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
        This Summer, Leave the{" "}
        <span ref={highlightRef} className={styles.highlight}>
          Digital Content Creation
        </span>{" "}
        to Us!
      </H1>
      <P>
        You can{" "}
        <span ref={highlightRef} className={styles.highlight}>
          focus
        </span>{" "}
        on your game
      </P>
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
