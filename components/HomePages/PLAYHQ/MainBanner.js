import React, { useEffect, useRef } from "react";

import Link from "next/link";
import { Gradient } from "../../../utils/Gradient";
import { Text, Title } from "@mantine/core";

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
                    <Title
                      style={{ fontSize: "2.5em", lineHeight: "1em" }}
                      align="right"
                      color="blue.9"
                    >
                      From Scintillating Scorecards to Captivating Chronicles
                    </Title>

                    <Text fz="xl" align="right">
                      Elevate Your Organization's Story with Fixtura's
                      Effortless Content Creation
                    </Text>
                    <Text align="right">
                      <Link href="/SignUp">
                        <a className="btn btn-secondary">Get Started</a>
                      </Link>
                    </Text>
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
