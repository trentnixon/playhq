import React, { useEffect } from "react";
// Import GA functions

import Link from "next/link";
import { Gradient } from "../../../../utils/Gradient";
import { Image, Text } from "@mantine/core";
import {
  trackPageView,
  trackButtonClick,
  trackCustomEvent,
} from "../../../../lib/GA";
import { useMediaQuery } from "@mantine/hooks";
import { P } from "../../../Members/Common/Type";

const MainBanner = () => {
  return (
    <>
      <div className="hero-banner video-studio overly-0">
        <MainCSSBanner />

        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6 col-lg-6">
                  <div className="main-banner-content">
                    <BannerText />
                  </div>
                </div>
                <div className="col-md-6 col-lg-6">
                  <div className="main-banner-content">
                    <BannerImage />
                    <BannerBottomText />
                  </div>
                </div>

                <div className="col-lg-12">
                  <BannerTagLine />
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

const S = (props) => {
  const { fs = "1.5em" } = props;
  return (
    <strong
      style={{
        color: "#E97830",
        fontWeight: 900,
        fontSize: fs,
      }}
    >
      {props.children}
    </strong>
  );
};

const BannerText = () => (
  <Text
    align="right"
    color="#1688D0"
    sx={{
      fontSize: "5em", // Default for large screens
      lineHeight: ".9em",
      letterSpacing: "-5px",
      fontWeight: 900,
      marginBottom: "10px",
      "@media (max-width: 75em)": {
        fontSize: "3.5em", // Medium screens
      },
      "@media (max-width: 48em)": {
        fontSize: "3.8em", // Small screens
        textAlign: "center",
        marginBottom: "20px",
      },
    }}
  >
    <S fs=".7em">Automated:</S> <br />
    Match Reports / <br />
    Video / <br /> Graphics /
  </Text>
);
const BannerImage = () => (
  <Image
    /* src="/images/FixturaLogoLarge.png" */
    src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Asset_Examples_With_Labels_6796528404.png"
    sx={{
      "@media (max-width: 48em)": {
        display: "none", // Hide image on mobile screens
      },
    }}
  />
);

const BannerBottomText = () => (
  <P textAlign={"center"} Weight="900" size="xl" color="#1688D0">
    Easy / Affordable / Efficient
  </P>
);

const BannerTagLine = () => (
  <div className="main-banner-content">
    <Text
      fz="26px"
      lh={"1.1"}
      color="gray.8"
      align="center"
      sx={{
        letterSpacing: "-2px",
        "@media (max-width: 48em)": {
          textAlign: "center",
          lineHeight: "1em",
          fontSize: "1.5em",
          display: "none",
        },
      }}
    >
      The <S>cost-effective</S>, <S>automated </S> digital service your club
      needs.
    </Text>
    <Text
      align="center"
      sx={{
        "@media (max-width: 48em)": {
          textAlign: "center",
        },
      }}
    >
      <Link legacyBehavior  href="/live-demo">
        <a
          className="btn btn-secondary"
          onClick={() => trackButtonClick("Live Demo")} // Track button click
        >
          Try our Live Demo
        </a>
      </Link>
    </Text>
  </div>
);
