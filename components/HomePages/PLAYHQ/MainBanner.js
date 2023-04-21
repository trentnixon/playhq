import React, { useState } from "react";
import FsLightbox from "fslightbox-react";
import Link from "next/link";

const MainBanner = () => {
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
                <div className="col-lg-8">
                  <div className="main-banner-content">
                  <img
                  src="/images/FixturaLogoLarge.png"
                  className="white-logo"
                  alt="logo"
                />
                   

                    <p>
                      The social media content creator for PlayHQ cricket clubs and
                      Associations
                    </p>

                    <Link href="/contact">
                      <a className="btn btn-primary">Sign up</a>
                    </Link>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="video-box">
                    <Link href="/SignUp">
                      <a
                       /*  onClick={() => setToggler(!toggler)} */
                        className="video-btn"
                      >
                        <i className="fa-solid fa-user-plus"></i>
                      </a>
                    </Link>
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

export default MainBanner;
