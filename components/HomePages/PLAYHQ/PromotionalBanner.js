import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

const PromotionalBanner = () => {
  const [toggler, setToggler] = useState(false);
  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={["https://www.youtube.com/embed/bk7McNUjWgw"]}
      />

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
                      Get Early Access to Fixtura
                    </h1>
                    <h1 className="text-center  fs-1 mb-0 lh-1">
                      the Premier Provider of
                      AI-Generated Social Media Content for cricket Clubs and
                      Associations
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
