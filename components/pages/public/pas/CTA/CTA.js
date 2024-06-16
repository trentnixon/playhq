import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CTA.module.scss";
import { H1, H2, HighlightSpan, P } from "../Primitives/Text";
import { Container } from "../Primitives/Containers";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const ctaRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const ctaElement = ctaRef.current;

    ScrollTrigger.create({
      trigger: ctaElement,
      start: "top top",
      end: "+=200%",
      scrub: true,
      pin: true,
      markers: false,
    });

    const elements = ctaElement.querySelectorAll(".fade-in-up");
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );
    });

    gsap.fromTo(
      imagesRef.current,
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.5,
        scrollTrigger: {
          trigger: ctaElement,
          start: "top top",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".btn",
      { scale: 0 },
      {
        scale: 1,
        duration: 1.5,
        scrollTrigger: {
          trigger: ".btn",
          start: "top 80%",
          end: "bottom 60%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className={styles.cta} ref={ctaRef}>
      <Container>
        <H1 className="fade-in-up">
          Ready to
          <HighlightSpan>
            Transform Your Club&rsquo;s Digital Presence?
          </HighlightSpan>
        </H1>
        <P className="fade-in-up">
          Start your <HighlightSpan>two-week free trial</HighlightSpan> and
          experience the Fixtura advantage today!
        </P>
        <Link legacyBehavior href="/sign-up/">
          <a className={`${styles.getStartedButton} btn btn-secondary`}>
            Get Started with Fixtura
          </a>
        </Link>

        <H2 className="fade-in-up">Start Your Free Trial Now</H2>
        <div className={styles.images}>
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
        </div>
        <P className={`${styles.joinText} fade-in-up`}>
          Join the growing number of clubs leveraging Fixtura to streamline
          their content creation. Our platform supports Cricket, AFL, and
          Netball, delivering high-quality, automated content tailored to your
          needs. With Fixtura, you&rsquo;ll save time, engage your audience, and
          elevate your club&rsquo;s online presence.
        </P>
      </Container>
    </section>
  );
};

export default CTA;
