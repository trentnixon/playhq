// CTA.jsx
import React from "react";
import styles from "./CTA.module.scss";
import { H1, H2, HighlightSpan, P } from "../Primitives/Text";
import { Container } from "../Primitives/Containers";
import Link from "next/link";

const CTA = () => {
  return (
    <section className={styles.cta}>
      <Container>
        <H1 className={styles.fadeInUp}>
          Ready to
          <HighlightSpan>
            Transform Your Club&rsquo;s Digital Presence?
          </HighlightSpan>
        </H1>
        <P className={styles.fadeInUp}>
          Start your <HighlightSpan>two-week free trial</HighlightSpan> and
          experience the Fixtura advantage today!
        </P>
        <CTABUTTON styles={styles} />
        <H2 className={styles.fadeInUp}>Start Your Free Trial Now</H2>
        <div className={styles.images}>
          <img
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_5_7e6c0b5c0f.png"
            alt="Image 1"
            className={styles.scaleIn}
          />
          <img
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_6_d29b2f6086.png"
            alt="Image 2"
            className={styles.scaleIn}
          />
          <img
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_7_d2363485df.png"
            alt="Image 3"
            className={styles.scaleIn}
          />
          <img
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Example_Small_8_d665e00bce.png"
            alt="Image 4"
            className={styles.scaleIn}
          />
        </div>
        <P className={`${styles.joinText} ${styles.fadeInUp}`}>
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

const CTABUTTON = ({ styles }) => {
  return (
    <Link legacyBehavior href="/sign-up/">
      <a className={`${styles.getStartedButton} btn btn-secondary`}>
        Get Started with Fixtura
      </a>
    </Link>
  );
};
