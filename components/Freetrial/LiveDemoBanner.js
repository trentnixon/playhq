import React, { useEffect } from "react";
// Import GA functions

import Link from "next/link";

import { Image, Text } from "@mantine/core";
import {
  trackPageView,
  trackButtonClick,
  trackCustomEvent,
} from "../../lib/GA";
import { useMediaQuery } from "@mantine/hooks";
import { P } from "../Members/Common/Type";
import { Gradient } from "../../utils/Gradient";

const LiveDemoBanner = () => {
  return (
    <>
      <div className="hero-banner video-studio overly-0">
        <MainCSSBanner />

        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
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
                    <P
                      textAlign={"center"}
                      Weight="900"
                      size="xl"
                      color="#1688D0"
                    >
                      Your Weekly Cricket Reports, Made Easy with Fixtura!
                    </P>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="main-banner-content">
                    <Text
                      align="right"
                      color="#1688D0"
                      sx={{
                        fontSize: "4em",
                        lineHeight: ".9em",
                        letterSpacing: "-3px",
                        fontWeight: 900,
                        marginBottom: "10px",
                        "@media (max-width: 48em)": {
                          fontSize: "5em",
                          textAlign: "center",
                          marginBottom: "20px",
                        },
                      }}
                    >
                      Live Demo{" "}
                    </Text>

                    <Text
                      fz="26px"
                      lh={"1.1"}
                      color="gray.8"
                      align="right"
                      sx={{
                        letterSpacing: "-2px",
                        "@media (max-width: 48em)": {
                          textAlign: "center",
                          lineHeight: "1em",
                          fontSize: "1.5em",
                        },
                      }}
                    >
                      Find your club below to demo Fixtura for your Club
                    </Text>
                    <Text
                      align="right"
                      sx={{
                        "@media (max-width: 48em)": {
                          textAlign: "center",
                        },
                      }}
                    >
                     {/*  <Link href="/SignUp">
                        <a
                          className="btn btn-secondary"
                          onClick={() => trackButtonClick("Get Started")} // Track button click
                        >
                          Start Your Free Trial!
                        </a>
                      </Link> */}
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

export default LiveDemoBanner;

const MainCSSBanner = () => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return <canvas id="gradient-canvas" data-transition-in />;
};
