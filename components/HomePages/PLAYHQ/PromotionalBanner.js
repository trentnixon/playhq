import { useMantineTheme } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { keyframes, css } from "styled-components";
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
                <div className="col-lg-4 offset-1">
                  <div className="main-banner-content">
                    <img src="/images/LogoF-white.png" />
                  </div>
                </div>
                <div className="col-lg-7">
                  <div className="main-banner-content">
                    <h1
                      className="text-md-start fs-1 mb-0 lh-1"
                      style={{
                        letterSpacing: "0px",
                        fontWeight: 100,
                        textTransform: "uppercase",
                      }}
                    >
                      The new era of{" "}
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
                            height: "1em",
                          }}
                        >
                          <AnimateTerm term={term} />
                        </span>
                      </span>{" "}
                      <br />
                      Social Media Content for Cricket Clubs and
                      Associations starts here.
                    </h1>
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
              data-aos-delay="300"
            >
              <ICONH3 COPY="Writeups" />
              <BannerIcons color={7} icon="far fa-file-pdf"  delay={0.3}/>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div
              className="funfact-card"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="600"
            >
              <ICONH3 COPY="Videos" />
              <BannerIcons color={6} icon="fas fa-file-video"  delay={0.6}/>
            </div>
          </div>

          <div className="col-lg-4 col-sm-6">
            <div
              className="funfact-card"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="900"
            >
              <ICONH3 COPY="Images" />
              <BannerIcons color={8} icon="fas fa-file-image"  delay={0.9}/>
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
  

  return (
    <span
      key={term.key}
      style={{
        display: "inline-block",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "1em",
      }}
    >
      {term.text.split("").map((letter, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            opacity:0,
            animation: `slideUp 5s ${index * 0.1}s forwards`,
            color: `${theme.colors.members[0]}`,
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
};
