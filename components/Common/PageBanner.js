import React, { useEffect } from 'react';
import { Gradient } from '../../utils/Gradient';
import { Title } from '@mantine/core';

const PageBanner = ({ pageTitle }) => {
  const bannerHeight = pageTitle ? '300px' : '120px';
  const paddingTop = pageTitle ? '120px' : '0px';
  const paddingBottom = pageTitle ? '120px' : '0px';

  return (
    <>
      <div
        className='page-title-area'
        style={{
          height: bannerHeight,
          paddingTop: paddingTop,
          paddingBottom: paddingBottom,
        }}
      >
        <MainCSSBanner bannerHeight={bannerHeight} />
        <div className='d-table'>
          <div className='d-table-cell'>
            <div className='container'>
              {pageTitle && <Title>{pageTitle}</Title>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBanner;

const MainCSSBanner = ({ bannerHeight }) => {
  useEffect(() => {
    const canvas = document.querySelector('#gradient-canvas-innerPage');
    if (!canvas) return;

    // @ts-ignore - initGradient is dynamically added
    const gradient = new Gradient().initGradient('#gradient-canvas-innerPage');

    return () => {
      gradient?.disconnect?.();
    };
  }, []);

  return (
    <canvas
      id='gradient-canvas-innerPage'
      className='innerPage'
      data-transition-in
      style={{ height: bannerHeight }}
    />
  );
};
