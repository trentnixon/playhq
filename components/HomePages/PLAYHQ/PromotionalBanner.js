import React, { useState } from "react";

const PromotionalBanner = () => {

  return (
    <>
     
      <div className="hero-banner video-studio overly-6">
        <div className="video-background">
          <video autoPlay loop src="/video/promo-video.mp4" />
        </div>

        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-10 offset-lg-1">
                  <div className="main-banner-content">
                    <h1 className="text-center fs-0 mb-4 lh-sm"> 
                    Join our Early Access Program for FIXTURA 
                    </h1>
                    <h1 className="text-center  fs-1 mb-0 lh-1">
                    The Premier AI-Generated Social Media Content Provider for Cricket Clubs and Associations"
                    </h1>
                  </div>
                </div>

              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionalBanner;
