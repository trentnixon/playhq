import React, { useEffect } from "react";

import Link from "next/link";
import { Gradient } from "../../../utils/Gradient";
import { Image, Text, Title } from "@mantine/core";

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
                    <Image
                      src="/images/FixturaLogoLarge.png"
                      sx={{
                        "@media (max-width: 48em)": {
                          innerWidth: "90%",
                          marginTop: "40px",
                          marginBottom: "20px",
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="main-banner-content">
                    <Text
                      align="right"
                      color="blue.9"
                      sx={{
                        fontSize: "2.5em",
                        lineHeight: ".9em",
                        fontWeight:600,
                        marginBottom:'10px',
                        "@media (max-width: 48em)": {
                          fontSize: "2em",
                          textAlign: "center",
                          marginBottom:'20px',
                        },
                      }}
                    >
                      From Scintillating Scorecards to Captivating Chronicles
                    </Text>

                    <Text
                      fz="xl"
                      align="right"
                      sx={{
                        "@media (max-width: 48em)": {
                          textAlign: "center",
                          lineHeight: "1em",
                        },
                      }}
                    >
                      Elevate Your Organization's Story with Fixtura's
                      Effortless Content Creation
                    </Text>
                    <Text
                      align="right"
                      sx={{
                        "@media (max-width: 48em)": {
                          textAlign: "center",
                        },
                      }}
                    >
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
