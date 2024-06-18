import { Box, Image, useMantineTheme } from "@mantine/core";
import { Gradient } from "../../../../utils/Gradient";
import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mantine/hooks";
const PromotionalBanner = () => {
  const theme = useMantineTheme();
  const [termIndex, setTermIndex] = useState(0);

  useEffect(() => {
    const terms = ["AI-Generated", "Programmatic", "Automated", "Scheduled"];
    const interval = setInterval(() => {
      setTermIndex((prevIndex) => (prevIndex + 1) % terms.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const term = {
    text: ["AI-Generated", "Programmatic", "Automated", "Scheduled"][termIndex],
    key: termIndex,
  };

  return (
    <>
       <MainCSSBanner />
      <div className="hero-banner ">
     
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container p-md-0 p-3">
              <div className="row align-items-center pb-100">
                <div className="col-lg-7 col-md-6 order-2 order-lg-1 ">
                  <div className="main-banner-content">
                    <h1
                      className="text-center text-lg-end fs-1 mb-0 lh-1 BannerFont"
                      style={{
                        letterSpacing: "0px",
                        fontWeight: 100,
                        textTransform: "uppercase",
                        textAlign: "right",
                        color: "black",
                      }}
                    >
                      A new
                      <br />
                      <span
                        style={{
                          display: "inline-block",
                          color: `${theme.colors.members[1]}`,
                          fontSize: "2em",
                          letterSpacing: "-4px",
                          textTransform: "uppercase",
                          fontWeight: 900,
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <AnimateTerm term={term} />
                        </span>
                      </span>{" "} 
                      <br />
                      Content TOOl FOR <strong>SOCIAL MEDIA MANAGERS</strong> AND CLUB SECRETARIES
                    </h1>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 order-1 order-md-2">
                  <div className="main-banner-content d-flex justify-content-center justify-content-md-left ">
                    <Box
                      sx={(theme) => ({
                        "@media (max-width: 768px)": {
                          width: "60%" /* adjust this as needed */,
                          marginBottom: "50px",
                        },
                      })}
                    >
                      <Image
                        src="/images/FixturaLogoLarge.png"
                        className="img-fluid"
                      />
                    </Box>
                  </div>
                </div>
              </div>
              {/* <Box
                sx={(theme) => ({
                  "@media (max-width: 768px)": {
                    display: "none",
                  },
                })}
              >
                <ThreePillars />
              </Box> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionalBanner;

const MainCSSBanner = () => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return <canvas id="gradient-canvas" data-transition-in />;
};

const ThreePillars = () => {
  return (
    <div className="pb-0  bg-eaf6ff">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-4  col-xs-6">
            <div
              className="funfact-card"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <BannerIcons color={7} icon="far fa-file-pdf" delay={0.3} />
              <ICONH3 COPY="Writeups" />
            </div>
          </div>
          <div className="col-lg-4 col-sm-6 ">
            <div
              className="funfact-card"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="300"
            >
              <BannerIcons color={6} icon="fas fa-file-video" delay={0.6} />
              <ICONH3 COPY="Videos" />
            </div>
          </div>

          <div className="col-lg-4 col-sm-6">
            <div
              className="funfact-card"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="600"
            >
              <BannerIcons color={8} icon="fas fa-file-image" delay={0.9} />
              <ICONH3 COPY="Images" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BannerIcons = ({ color, icon, delay }) => {
  const theme = useMantineTheme();
  return (
    <i
      className={icon}
      style={{
        fontSize: "3.5rem",
        color: `${theme.colors.members[color]}`,
        animation: `pulse 2s ease-in-out infinite ${delay}s`,
      }}
    ></i>
  );
};

const ICONH3 = ({ COPY }) => {
  const theme = useMantineTheme();
  return (
    <h4
      className="BannerFont"
      style={{
        textTransform: "uppercase",
        fontWeight: 100,
        color: `${theme.colors.members[3]}`,
        
      }}
    >
      {COPY}
    </h4>
  );
};

const AnimateTerm = ({ term }) => {
  const theme = useMantineTheme();
  const matches = useMediaQuery("(min-width: 1200px)");

  return (
    <span
      key={term.key}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {term.text.split("").map((letter, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity: 0,
            animation: `slideUp 5s ${index * 0.1}s forwards`,
            color: `${theme.colors.cyan[5]}`,
            fontSize: matches ? "1em" : "3.5em",
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};
