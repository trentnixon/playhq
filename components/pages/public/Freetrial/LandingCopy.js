import React from "react";
import { P } from "../../../Members/Common/Type";
import { trackCustomEvent } from "../../../../lib/GA";
import Section from "../../../UI/DefaultSection";
import { Container, Image, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
// Import GA functions

const PromotionalLandingCopy = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const padding = isMobile ? 0 : "sm";
  const SectionData = {
    title:
      "Seamless Digital Match Reports and Content Creation - No Extra Effort Needed!",
    paragraphs: [
      `Step into a world where cricket club reporting is a breeze. With Fixtura, experience the ease of automatic, comprehensive match and fixture reports that require no effort on your part.`,
      `Our two-week free trial invites you to see firsthand how we can transform your weekly reporting routine, saving you time and energy that you can redirect towards the sport you love.`,
      `Sign up now, and let Fixtura take the load off your match days.`
    ],
  };
  return (
    <>
      <Section {...SectionData} color="light">
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

export default PromotionalLandingCopy;

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
      Name: "Runaway Bay Cricket Club Inc",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/rbccgrey_a7f0d27008.png",
    },
    {
      Name: "Moss Vale Cricket Club",
      IMG: "https://fixtura.s3.ap-southeast-2.amazonaws.com/mossvalegrey_3c71c208da.png",
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
