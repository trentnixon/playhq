import React, { useEffect } from "react";
// Import GA functions

import { Gradient } from "../../../utils/Gradient";
import { Group, Image, Text } from "@mantine/core";

import { P } from "../../Members/Common/Type";
import Link from "next/link";
import { trackButtonClick } from "../../../lib/GA";
import { useMediaQuery } from "@mantine/hooks";

const FixturaAndYourClubBanner = ({ AccountData }) => {
  //console.log(AccountData)
  const useLOGO = !AccountData.Logo.data
    ? AccountData.ParentLogo
    : AccountData.Logo.data.attributes.url;


  const matches = useMediaQuery('(min-width: 56.25em)');
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
                    <div className="main-banner-content" style={{marginTop:0}}>
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
                        marginBottom: "0px",
                        "@media (max-width: 48em)": {
                          innerWidth: "40%",
                          marginTop: "40px",
                          marginBottom: "0px",
                        },
                      }}
                    />
                  </Group>
                </div>
                <div className="main-banner-content">
                  <P
                    textAlign={"center"}
                    Weight="900"
                    size="3em"
                    color="#343a40"
                    marginBottom={0}
                    lineHeight="1.1em"
                  >
                    Simplify Your Social Media
                  </P>
                  <P
                    textAlign={"center"}
                    Weight="400"
                    size="2.6em"
                    color="#343a40"
                    lineHeight="1.1em"
                    marginBottom={0}
                  >
                    Easy / Affordable / Efficient
                  </P>
                  <Text
                    align="center"
                    sx={{
                      "@media (max-width: 48em)": {
                        textAlign: "center",
                      },
                    }}
                  >
                    <Link legacyBehavior  href="/sign-up">
                      <a
                        className="btn btn-secondary"
                        onClick={() =>
                          trackButtonClick("Campaign Header CTA Click SIGN UP")
                        }
                      >
                        Start Your Free Trial!
                      </a>
                    </Link>
                  </Text>
                </div>
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
    gradient.initGradient("#gradient-canvas-campaign");
  }, []);

  return <canvas id="gradient-canvas-campaign" data-transition-in />;
};
