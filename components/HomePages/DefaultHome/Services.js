import React from "react";
import { P } from "../../Members/Common/Type";
import { trackButtonClick, trackCustomEvent } from "../../../lib/GA";
import Section from "../../UI/DefaultSection";
import { Center, Container, Image, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
// Import GA functions

const Services = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const padding = isMobile ? 0 : "sm";
  const SectionData = {
    title:
      "Looking for an Easier Solution for Social Media and Website Content Creation for Your Club or Association?",
    paragraphs: [
      `We specialize in curating and delivering bespoke content for your club's social media and website presence. Our service ensures scheduled deliveries are always on time, thanks to our cutting-edge automated AI and generative video creation tools.`,

      `Start your two-week free trial and embrace the Fixtura advantage.`,
    ],
  };
  // /`Embark on your Fixtura journey today with a no-obligation two-week free trial and unlock the power of affordable, professional-grade digital storytelling.`,
  return (
    <>
      <Section {...SectionData} color="light">
        <Center>
          <Link href="/live-demo">
            <a
              className="btn btn-secondary"
              onClick={() => trackButtonClick("Live Demo")} // Track button click
            >
              Try our Live Demo
            </a>
          </Link>
        </Center>
        <Container p={padding}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "auto", // This sets the container height to be the full viewport height
            }}
          >
            <video
              poster="https://fixtura.s3.ap-southeast-2.amazonaws.com/titlescreen_2_6_1_24fb7299f3.jpg"
              style={{
                maxWidth: "100%", // This makes the video responsive
                maxHeight: "100%",
              }}
              controls
            >
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

        <OrangisatonAlreadyUsingFixtura />
      </Section>
    </>
  );
};

export default Services;

const OrangisatonAlreadyUsingFixtura = () => {
  const USINGFIXTURA = [
    {
      Name: "Cricket Whanganui",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Cricket_Whanganui_grey_6aef3a5136.png",
    },
    {
      Name: "Logan District Cricket Association",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Logan_Grey_947e4522b4.png",
    },
    {
      Name: "CNSW Sydney Shires",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/Cricket_NSW_Shires_gray_798703895c.png",
    },
    {
      Name: "Runaway Bay Cricket Club Inc",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/rbccgrey_a7f0d27008.png",
    },

    {
      Name: "Mudgeeraba Nerang & Districts' Cricket Club",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/bushmengrey_7179c8fc93.png",
    },
  ];
  const handleServiceHover = (serviceTitle) => {
    trackCustomEvent("Services", "Service Hovered", serviceTitle);
  };
  const SectionData = {
    title: "Organisations using Fixtura",
    paragraphs: [``],
  };
  return (
    <Section {...SectionData} color="light">
      <div className="row justify-content-center">
        {USINGFIXTURA.map((service, index) => (
          <div
            key={index}
            className="col-lg-2 col-sm-3"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay={`${200 + 100 * index}`}
            onMouseEnter={() => handleServiceHover(service.title)}
          >
            <Stack align="center" spacing="xs">
              <Image height={150} width={150} src={service.IMG} />
              <P
                Weight={900}
                size={15}
                marginBottom="14px"
                textAlign={"center"}
              >
                {service.Name}
              </P>
            </Stack>
          </div>
        ))}
      </div>
    </Section>
  );
};
