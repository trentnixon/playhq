import React, { useEffect } from 'react';
import { Gradient } from '../../utils/Gradient';
import { Image, Title } from '@mantine/core';
import { GradientTitle } from '../Members/Common/Type';

const PageBannerDarkMode = ({ pageTitle }) => {
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
              {/* {pageTitle && <Title variant="g">{pageTitle}</Title>} */}
              <GradientTitle
                className='timeline-title'
                fw={'900'}
                ta={'center'}
                size={'2.5em'}
                title={pageTitle}
                gradient={{ from: 'orange', to: 'green', deg: 45 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBannerDarkMode;

const MainCSSBanner = ({ bannerHeight }) => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient('#gradient-dark-canvas-innerPage');
  }, []);

  return (
    <canvas
      id='gradient-dark-canvas-innerPage'
      className='innerPage'
      data-transition-in
      style={{ height: bannerHeight }}
    />
  );
};
