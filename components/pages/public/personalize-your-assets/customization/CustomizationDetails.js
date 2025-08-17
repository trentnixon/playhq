'use client';

import React, { useRef, useEffect } from 'react';
import { H, P } from '../../../../Members/Common/Type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Title } from '@mantine/core';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const CustomizationDetails = ({ data }) => {
  const main = useRef(null);
  const sectionsRef = useRef([]);

  useGSAP(
    () => {
      const sections = gsap.utils.toArray('.section');
      sections.forEach((section, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 15%',
            end: 'bottom bottom',
            scrub: true,
            pin: true,
            pinSpacing: false,
            markers: true,
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          section.querySelector('.Header'),
          { opacity: 0, y: 50, scale: 0.5 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out' }
        );
        tl.fromTo(
          section.querySelector('.content'),
          { opacity: 0, y: 50, scale: 0.5 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out' }
        );

        tl.fromTo(
          section.querySelector('.images img'),
          { opacity: 0, x: 400, rotate: 15 },
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            duration: 1,
            ease: 'power4.out',
            duration: 1,
          },
          '2'
        );

        if (section.querySelector('.optional-images')) {
          tl.fromTo(
            section.querySelectorAll('.optional-images img'),
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 2,
              ease: 'elastic',
              stagger: 0.3,
            },
            '-=0.5'
          );
        }
      });
    },
    { scope: main }
  );

  return (
    <div id='wrapper'>
      <div id='content' ref={main}>
        <div className='accordions'>
          {data.map((item, index) => (
            <div
              key={index}
              className='accordion section'
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '150vh',
              }}
            >
              <Title
                mb={0}
                style={{ textAlign: 'center', fontSize: '4em' }}
                variant='gradient'
                gradient={{ from: '#339AF0', to: '#3BC9DB', deg: 45 }}
                className='Header'
              >
                {item.title}
              </Title>

              <div
                className='content'
                ref={el => (sectionsRef.current[index] = el)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <div
                  className='container'
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <div
                    className='content'
                    style={{ flex: 1, paddingRight: '0px' }}
                  >
                    <Title
                      mb={0}
                      size='h2'
                      variant='gradient'
                      gradient={{ from: '#339AF0', to: '#3BC9DB', deg: 45 }}
                    >
                      {item.subtitle}
                    </Title>

                    <P color={0} className='text'>
                      {item.description}
                    </P>
                  </div>
                  <div className='images' style={{ flex: 0.6 }}>
                    <img
                      src={item.scrollImage}
                      alt={item.title}
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
              </div>
              {item.optionalImage && (
                <div
                  className='optional-images'
                  style={{ display: 'flex', gap: '10px' }}
                >
                  {item.optionalImage.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${item.title} optional ${i}`}
                      style={{ height: '150px', width: 'auto' }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='spacer'></div>
      </div>
    </div>
  );
};

export default CustomizationDetails;
