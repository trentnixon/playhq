// Hero.jsx
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Hero.module.scss";
import { H1, P } from "../Primitives/Text";

const Hero = () => {
  const heroRef = useRef(null);
  const highlightRefs = useRef([]);
  const images = [
    {
      src: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Leave_The_Content_To_Us_2c9344ad4f.png",
      alt: "Header Item 1",
    },
  ];

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const heroElement = heroRef.current;

      // Fade in the hero section
      gsap.fromTo(
        heroElement,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power1.out" }
      );

      // Animate images
      const imageElements = heroElement.querySelectorAll(".imageItem");
      gsap.fromTo(
        imageElements,
        { x: 550, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: "power1.out" }
      );

      // Animate each highlight separately
      highlightRefs.current.forEach(highlight => {
        if (highlight) {
          gsap.fromTo(
            highlight,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power1.out" }
          );
        }
      });

      // Cleanup on unmount
      return () => {
        gsap.killTweensOf(heroElement);
        gsap.killTweensOf(imageElements);
        highlightRefs.current.forEach(highlight => {
          if (highlight) gsap.killTweensOf(highlight);
        });
      };
    }
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.heroContent}>
        <HeroText highlightRefs={highlightRefs} />
        <HeroImages images={images} />
      </div>
    </section>
  );
};

const HeroText = ({ highlightRefs }) => {
  // Assign refs dynamically
  const setHighlightRef = (el, index) => {
    highlightRefs.current[index] = el;
  };

  return (
    <div className={styles.textContent}>
      <H1>
        This Summer, Leave the{" "}
        <span ref={el => setHighlightRef(el, 0)} className={styles.highlight}>
          Digital Content Creation
        </span>{" "}
        to Us!
      </H1>
      <P>
        So you can{" "}
        <span ref={el => setHighlightRef(el, 1)} className={styles.highlight}>
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
