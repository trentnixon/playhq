import React, { useEffect } from "react";
// Import GA functions

import Link from "next/link";
import { Gradient } from "../../../utils/Gradient";
import { Group, Image, Text } from "@mantine/core";
import {
  trackPageView,
  trackButtonClick,
  trackCustomEvent,
} from "../../../lib/GA";
import { useMediaQuery } from "@mantine/hooks";
import { P } from "../../Members/Common/Type";

const FixturaAndYourClubBanner = ({ clubData }) => {
  const useLOGO = !clubData.Logo.data
    ? clubData.ParentLogo
    : clubData.Logo.data;
  console.log(useLOGO);
  return (
    <>
      <div
        className="hero-banner video-studio overly-0"
        style={{ height: "60vh" }}
      >
        <MainCSSBanner />

        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <Group position="center">
                    <Image
                      src="/images/FixturaLogoLarge.png"
                      width={"200px"}
                      sx={{
                        "@media (max-width: 48em)": {
                          innerWidth: "40%",
                          marginTop: "40px",
                          marginBottom: "20px",
                        },
                      }}
                    />
                    <div className="main-banner-content">
                      <P
                        textAlign={"center"}
                        Weight="900"
                        size="xl"
                        color="#fff"
                      >
                        &amp;
                      </P>
                    </div>
                    <Image
                      src={useLOGO}
                      height={"130px"}
                      width={"auto"}
                      sx={{
                        "@media (max-width: 48em)": {
                          innerWidth: "40%",
                          marginTop: "40px",
                          marginBottom: "20px",
                        },
                      }}
                    />
                  </Group>
                </div>
                <div className="main-banner-content">
                  <P
                    textAlign={"center"}
                    Weight="900"
                    size="2.3em"
                    color="#fff"
                  >
                    Digital Excellence for {clubData.Name} at $20/Week
                  </P>
                </div>

                {/* <div className="col-lg-4">
                  <div className="main-banner-content">
                    <Text
                      align="right"
                      color="#1688D0"
                      sx={{
                        fontSize: "4em",
                        lineHeight: ".9em",
                        letterSpacing: "-6px",
                        fontWeight: 900,
                        marginBottom: "10px",
                        "@media (max-width: 48em)": {
                          fontSize: "5em",
                          textAlign: "center",
                          marginBottom: "20px",
                        },
                      }}
                    >
                      SIGN UP TODAY
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
                      For a{" "}
                      <strong
                        style={{
                          color: "#E97830",
                          fontWeight: 900,
                          fontSize: "1.5em",
                        }}
                      >
                        Two-Week No-Obligation Trial
                      </strong>{" "}
                      for your Club or Association
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
                        <a
                          className="btn btn-secondary"
                          onClick={() => trackButtonClick("Get Started")} // Track button click
                        >
                          Start Your Free Trial!
                        </a>
                      </Link>
                    </Text>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FixturaAndYourClubBanner;

const MainCSSBanner = () => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return <canvas id="gradient-canvas" data-transition-in />;
};
