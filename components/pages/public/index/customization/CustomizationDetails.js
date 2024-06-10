'use client';

import React, { useRef, useEffect } from "react";
import { H, P } from "../../../../Members/Common/Type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CustomizationDetails = ({ data }) => {
  const main = useRef(null);
  const sectionsRef = useRef([]);

  useGSAP(() => {
    const sections = gsap.utils.toArray('.section');
    sections.forEach((section, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: 'bottom center',
          scrub: false,
          pin: true,
          pinSpacing: false,
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(section.querySelector('.content'), 
        { opacity: 0, y: 50, scale: 0.5 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out' }
      );

      tl.fromTo(section.querySelector('.images img'), 
        { opacity: 0, x: 100, rotate: 10 }, 
        { opacity: 1, x: 0, rotate: 0, duration: 1, ease: 'power4.out' }, 
        '-=0.5'
      );
    });
  }, { scope: main });

  return (
    <div id="wrapper">
      <div id="content" ref={main}>
        <div className="accordions">
          {data.map((item, index) => (
            <div
              key={index}
              className="accordion section"
              ref={(el) => sectionsRef.current[index] = el}
              style={{ display: "flex", alignItems: "center", height: "100vh" }} // Increased height for longer scroll
            >
              <div
                className="container"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: '100%'
                }}
              >
                <div className="content" style={{ flex: 1, paddingRight: "20px" }}>
                  <H color={`white`} className="title">{item.title}</H>
                  <H color={`white`} className="title">{item.subtitle}</H>
                  <P color={0} className="text">{item.description}</P>
                </div>
                <div className="images" style={{ flex: 1 }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="spacer"></div>
      </div>
    </div>
  );
};

export default CustomizationDetails;
