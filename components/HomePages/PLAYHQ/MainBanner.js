import React, { useEffect, useRef } from "react";

import Link from "next/link";
import { Gradient } from "../../../utils/Gradient";

const MainBanner = () => {
  return (
    <>
      <div className="hero-banner video-studio overly-0">
        <MainCSSBanner />

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
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="main-banner-content">
                    <p className="">
                      The social media content creator for PlayHQ cricket clubs
                      and Associations
                    </p>
                    <Link href="/contact">
                      <a className="btn btn-secondary">Get Started</a>
                    </Link>
                    {/*  <Link href="/SignUp">
                      <a
                    
                        className="video-btn"
                      >
                        <i className="fa-solid fa-user-plus"></i>
                      </a>
                    </Link> */}
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

const MainCSSBanner = () => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return <canvas id="gradient-canvas" data-transition-in />;
};
