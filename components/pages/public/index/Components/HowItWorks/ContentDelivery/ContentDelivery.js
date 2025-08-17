import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ContentDelivery.module.scss';
import { H2, P } from '../../Primitives/Text';
import EmailSVG from './EmailSVG';

gsap.registerPlugin(ScrollTrigger);

const ContentDelivery = () => {
  const sectionRef = useRef(null);
  const emailRef = useRef(null);
  const textRef = useRef(null);
  const iconRefs = useRef([]);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionElement,
        start: 'top 0px',
        end: 'bottom -100%',
        scrub: true,
        pin: true,
        markers: true,
      },
    });

    // Animate the email svg
    tl.fromTo(
      emailRef.current,
      { x: -500, opacity: 0 },
      { x: 0, opacity: 1, duration: 2, ease: 'power2.inOut' }
    );

    // Animate the text
    tl.fromTo(
      textRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power1.inOut' },
      '-=1.5'
    );

    // Animate the icons
    iconRefs.current.forEach((el, index) => {
      tl.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power1.inOut',
          stagger: 0.3 * index,
        },
        '-=1'
      );
    });
  }, []);

  return (
    <div className={styles.contentDelivery} ref={sectionRef}>
      <H2>
        <span>We’ll let you know when it’s ready!</span>
      </H2>

      <div className={styles.images}>
        <EmailSVG ref={emailRef} />
      </div>
      <P>
        Receive an email with a secure link to your content bundle, allowing you
        to review and download all your assets, ready to share with your
        audience.
      </P>

      <div className={styles.toolsNoNeeded}>
        <H2>No need for additional tools.</H2>
        <div className={styles.icons}>
          <img
            ref={el => (iconRefs.current[0] = el)}
            src='https://fixtura.s3.ap-southeast-2.amazonaws.com/Figma_9679fd36d0.png'
            alt='Figma Icon'
          />
          <img
            ref={el => (iconRefs.current[1] = el)}
            src='https://fixtura.s3.ap-southeast-2.amazonaws.com/Canva_4e1c9d3a42.png'
            alt='Canva Icon'
          />
          <img
            ref={el => (iconRefs.current[2] = el)}
            src='https://fixtura.s3.ap-southeast-2.amazonaws.com/openai_52b88c6cf3.png'
            alt='OpenAI Icon'
          />
          <img
            ref={el => (iconRefs.current[3] = el)}
            src='https://fixtura.s3.ap-southeast-2.amazonaws.com/premierpro_f742e2636a.png'
            alt='Premiere Icon'
          />
        </div>
        <P>Fixtura handles everything from creation to delivery.</P>
      </div>
    </div>
  );
};

export default ContentDelivery;
