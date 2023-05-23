import { Image, useMantineTheme } from "@mantine/core";
import styles from "../../../styles/PromotionalBanner.module.css";
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
      <div className="hero-banner video-studio overly-6">
        <div className="video-background">
          <video autoPlay loop src="/video/WebsiteHeader.mp4" />
        </div>

        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="row align-items-center pb-100">
                <div className="col-lg-7  order-2 order-lg-1 ">
                  <div className="main-banner-content">
                    <h1
                      className="text-center text-lg-end fs-1 mb-0 lh-1 BannerFont"
                      style={{
                        letterSpacing: "0px",
                        fontWeight: 100,
                        textTransform: "uppercase",
                        textAlign: "right",
                      }}
                    >
                      The new era of
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
                      Social Media Content for Cricket Clubs and Associations
                      starts here.
                    </h1>
                  </div>
                </div>
                <div className="col-lg-4 order-1 order-lg-2">
                  <div className="main-banner-content d-flex justify-content-center justify-content-md-left mb-5">
                    <Image
                      src="/images/fixturaHeaderLogo.png"
                      className="img-fluid w-75 "
                    />
                  </div>
                </div>
              </div>

              <ThreePillars />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PromotionalBanner;

const ThreePillars = () => {
  return (
    <div className="pb-0  bg-eaf6ff">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-sm-6">
            <div
              className="funfact-card"
              data-aos="fade-up"
              data-aos-duration="1200"
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
        fontSize: "5rem",
        color: `${theme.colors.members[color]}`,
        animation: `pulse 2s ease-in-out infinite ${delay}s`,
      }}
    ></i>
  );
};

const ICONH3 = ({ COPY }) => {
  const theme = useMantineTheme();
  return (
    <h3
      className="BannerFont"
      style={{
        textTransform: "uppercase",
        fontWeight: 100,
        color: `${theme.colors.members[1]}`,
      }}
    >
      {COPY}
    </h3>
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
            color: `${theme.colors.members[0]}`,
            fontSize:matches ? '1em' : '3.5em'
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};
