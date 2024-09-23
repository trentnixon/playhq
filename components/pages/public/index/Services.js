import React from "react";
import { P } from "../../../Members/Common/Type";
import { trackButtonClick, trackCustomEvent } from "../../../../lib/GA";
import Section from "../../../UI/DefaultSection";
import { Center, Container, Image, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { ExampleGallery } from "./ExampleGallery";
// Import GA functions

const Services = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const padding = isMobile ? 0 : "sm";
  const SectionData = {
    title: "Simplify Your Club or Association's Match Reporting!",
    paragraphs: [
      `We specialize in curating and delivering bespoke content for your club or Association's social media and website presence. Our service ensures scheduled deliveries are always on time, thanks to our cutting-edge automated AI and generative video creation tools.`,

      `Start your two-week free trial and embrace the Fixtura advantage.`,
    ],
  };
  // /`Embark on your Fixtura journey today with a no-obligation two-week free trial and unlock the power of affordable, professional-grade digital storytelling.`,
  return (
    <>
      <Section {...SectionData} color="light">
        <Center>
          <Link legacyBehavior href="/live-demo">
            <a
              className="btn btn-secondary"
              onClick={() => trackButtonClick("Live Demo")} // Track button click
            >
              Try our Live Demo
            </a>
          </Link>
        </Center>

        <Container p={padding}>
          <WelcomeVideo />
        </Container>
        <OrangisatonAlreadyUsingFixtura />
      </Section>
    </>
  );
};

export default Services;

export const OrangisatonAlreadyUsingFixtura = () => {
  const isMobile = useMediaQuery("(max-width: 425px)");
  const isSmallDevice = useMediaQuery("(max-width: 768px)");
  const USINGFIXTURA = [
    {
      Name: "Cricket Whanganui",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Cricket_Whanganui_02f099e7d4.png",
    },
    {
      Name: "Thunder Cricket League",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Thunder_Cricket_League_ec1871a392.png",
    },
    {
      Name: "Sixers Cricket League",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Sixers_Cricket_League_9a33e6d0b5.png",
    },

    {
      Name: "CNSW Sydney Shires",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/CNSW_Sydney_Shires_6f1d2062c3.png",
    },

    {
      Name: "Runaway Bay Cricket Club",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Runaway_Bay_Cricket_Club_e93a6c7926.png",
    },
    {
      Name: "Freyberg CC",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Freyberg_CC_0e8c17ae05.png",
    },
    {
      Name: "Coastal Cricket League",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Coastal_Cricket_League_98da9265f2.png",
    },

    {
      Name: "Logan District Cricket Association",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Logan_District_Cricket_Association_b7aca17671.png",
    },
    {
      Name: "Mudgeeraba Nerang & Districts' Cricket Club",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Mudgeeraba_Nerang_bebd94311c.png",
    },

    {
      Name: "Jacana Cricket Club",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Jacana_Cricket_Club_5ca01087e1.png",
    },
    {
      Name: "Southport Labrador Cricket Club",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Southport_Labrador_Cricket_Club_b015583515.png",
    },

    {
      Name: "Queens Cricket Club",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Queens_Logo_no_outline_smaller_9616030c22_1e9924ec6d.png",
    },
  ];
  const handleServiceHover = serviceTitle => {
    trackCustomEvent("Services", "Service Hovered", serviceTitle);
  };
  const SectionData = {
    title: "Organisations using Fixtura",
    paragraphs: [
      `A selection of nearly 100 clubs and associations that have experienced Fixtura in our debut season.`,
    ],
  };

  const ImageSize = isMobile ? 80 : 150;
  const showItems = isSmallDevice ? 6 : USINGFIXTURA.length;
  return (
    <Section {...SectionData} color="light">
      <div className="row justify-content-center">
        {USINGFIXTURA.slice(0, showItems).map((service, index) => (
          <div
            key={index}
            className="col-lg-2 col-sm-3 col-6"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay={`${200 + 100 * index}`}
            onMouseEnter={() => handleServiceHover(service.title)}>
            <Stack align="center" spacing="xs">
              <Image height={ImageSize} width={ImageSize} src={service.IMG} />
              <P
                Weight={900}
                size={15}
                marginBottom="14px"
                textAlign={"center"}>
                {service.Name}
              </P>
            </Stack>
          </div>
        ))}
      </div>
    </Section>
  );
};

const WelcomeVideo = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const padding = isMobile ? 0 : "sm";
  return (
    <Container p={padding}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto", // This sets the container height to be the full viewport height
        }}>
        <video
          poster="https://fixtura.s3.ap-southeast-2.amazonaws.com/titlescreen_2_6_1_24fb7299f3.jpg"
          style={{
            maxWidth: "100%", // This makes the video responsive
            maxHeight: "100%",
          }}
          controls>
          <source
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Fixtura_Introduction_Version_1_86590be452.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <P textAlign="right" size={"sm"}>
        Check out our brief about Video
      </P>
    </Container>
  );
};
