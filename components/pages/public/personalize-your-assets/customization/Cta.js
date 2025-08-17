import React from 'react';
import Link from 'next/link';
import { P } from '../../../../Members/Common/Type';

const CustomizationCtaArea = () => {
  return (
    <>
      <div className='cta-area bg-gradient'>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-7 col-md-8'>
              <div className='cta-content'>
                <h3>Start Your Design Process Today, From $399!</h3>
                <p>
                  Enhance your club's digital presence with bespoke assets
                  before the new season begins.
                </p>
                <p>
                  <strong>Special Offer:</strong> Was $599, now $399 till the
                  end of July!
                </p>
              </div>
            </div>

            <div
              className='col-lg-5 col-md-4'
              data-aos='zoom-in-left'
              data-aos-duration='1200'
            >
              <div className='cta-btn-box'>
                <Link legacyBehavior href='/contact'>
                  <a className='btn btn-primary'>Get in Touch</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizationCtaArea;
