import React from "react";
import { P } from "../../Members/Common/Type";
import { trackCustomEvent } from "../../../lib/GA";
// Import GA functions

const servicesData = [
  {
    icon: "pe-7s-video",
    bgColor: "bg-6610f2",
    title: "Create Content with Ease",
    description:
      "Elevate your online presence with visually captivating graphical images and insightful write-ups. With FIXTURA, the tedious dive into scorecards is a thing of the past. We handle all the intricacies, letting you effortlessly generate professional-grade content that truly resonates.",
  },
  {
    icon: "pe-7s-mail-open-file",
    bgColor: "bg-ffb700",
    title: "Content Delivered to you",
    description:
      "Don't chase assets; let them come to you. Fixtura streamlines content delivery by sending your tailored videos, images, and articles directly each week. Hassle-free and timely, we make sure your content reaches you right when you need it.",
  },
  {
    icon: "pe-7s-clock",
    bgColor: "bg-13c4a1",
    title: "Set and Forget",
    description:
      "Embrace simplicity with FIXTURA's automated system. We handle the heavy lifting, crafting and delivering high-quality assets that speak your club's language. Sit back, relax, and watch as your online presence takes flight. It's content creation redefined.",
  },
];

const Services = () => {
  // Track when a service is hovered
  const handleServiceHover = (serviceTitle) => {
    trackCustomEvent("Services", "Service Hovered", serviceTitle);
  };

  return (
    <>
      <div className="bg-eaf6ff pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Your Premier Destination for Customized Cricket Content</h2>
            <P textAlign={"center"}>
              Fixtura is the premier provider of AI-generated social media
              content for cricket clubs and associations. We cover everything
              from tailored videos to personalized match reports, delivering a
              complete digital experience. Share captivating content with ease
              and keep your fans engaged across social media and email
              platforms. Our AI-powered platform ensures your members are always
              in the loop with the latest club activities.
            </P>
            <P textAlign={"center"}>
              Our AI-powered platform allows you to effortlessly publish match
              reports and weekend summaries, keeping your members informed and
              engaged with your club&apos;s activity.
            </P>
          </div>

          <div className="row justify-content-center">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className="col-lg-4 col-sm-6"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay={`${200 + 100 * index}`}
                onMouseEnter={() => handleServiceHover(service.title)}
              >
                <div className="service-card-one">
                  <i className={`${service.icon} ${service.bgColor}`}></i>
                  <P
                    Weight={900}
                    size={24}
                    marginBottom="14px"
                    textAlign={"center"}
                  >
                    {service.title}
                  </P>
                  <P textAlign={"center"}>{service.description}</P>
                </div>
              </div>
            ))}
          </div>
          <div className="row justify-content-center">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
