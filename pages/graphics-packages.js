import React from "react";
import PageBanner from "../components/Common/PageBanner";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import Section from "../components/UI/DefaultSection";
import { H, P } from "../components/Members/Common/Type";
import { CardsCarousel } from "../components/Portfolio/Carousel";
import Link from "next/link";
import { trackButtonClick } from "../lib/GA";
import { Center } from "@mantine/core";
import Meta from "../components/Layouts/Meta";

const GraphicsPackages = () => {
  return (
    <>
      <Meta
        title="Graphics Packages - Fixtura: Custom Branding Solutions"
        description="Choose from Fixtura's range of graphic packages for sports clubs. Customize your brand with our unique and engaging visual designs."
        keywords="Fixtura graphics, branding for sports clubs, custom graphics packages, sports club branding, digital design solutions"
      />
      <PageBanner pageTitle="" BGImage="/images/BG-Images/0D5A3099.jpg" />
      <IntroToPackages />
      <Bespoke />
      <FreeTier />
    </>
  );
};

export default GraphicsPackages;

const IntroToPackages = () => {
  const data = {
    title: "Craft a Digital Identity Tailored to Your Club",
    paragraphs: [
      "With Fixtura, selecting a graphics package is more than just a design choice; it's about sculpting a unique digital identity for your club or association. Let's bring your vision to life.",
    ],
  };

  const servicesData = [
    {
      icon: "pe-7s-video", // replace with your actual class name

      title: "Unwavering Brand Consistency",
      description:
        "With Fixtura, every pixel, every color, and every design element is tuned to echo your club or association's branding. Ensure that every visual output, from logos to color schemes, aligns perfectly with your established brand identity.",
    },
    {
      icon: "pe-7s-video", // replace with your actual class name

      title: "Seamless Sponsorship Showcasing",
      description:
        "Integrate your sponsors' branding effortlessly. With Fixtura, you can amplify their visibility and appreciation, ensuring they get the recognition they deserve on every asset.",
    },
    {
      icon: "pe-7s-video", // replace with your actual class name

      title: "Adaptive Graphics, Consistent Identity",
      description:
        "Whether it's an event-specific graphic or a campaign-targeted design, adapt and tailor your visuals with Fixtura. No matter the customization, your club's core identity remains intact and unmistakable.",
    },
  ];

  const handleServiceHover = (title) => {};

  return (
    <Section {...data} color="light">
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
              <i className={`${service.icon} `}></i>
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
    </Section>
  );
};

const FreeTier = () => {
  const freePackageData = {
    title: "Kickstart Your Journey with Our Free Packages!",
    paragraphs: [
      "Dive into Fixtura's blend of style and utility, crafted to enhance your clubs content. Explore the 'Basic' package, featuring designs from sharp 'Square' angles to modern 'Pill' shapes. Or opt for the 'Gradient' package, showcasing four distinct gradient directions.",
      `Best of all? `,
      "These packages are completely free.",
    ],
  };

  const PricingComponent = () => {
    return (
      <div>
        <H mb={0}>Our free packages are priced at $0.</H>
        <P textAlign="center">Obviously</P>
      </div>
    );
  };

  // Dummy data for the carousel
  const carouselData = [
    {
      image:
        "https://fixtura.s3.ap-southeast-2.amazonaws.com/Redlands_Tigers_Cricket_Club_Weekend_Result_bc576e311ef1_2a54f30c7b.png",
      title: "Example 2",
      category: "Basic: Outside Edge",
      video: "",
      MainDescription: "This is a gradient design.",
    },
    {
      image:
        "https://fixtura.s3.ap-southeast-2.amazonaws.com/Northern_Suburbs_District_Cricket_Club_Weekend_Result_8b632f09df84_f0f6052960.png",
      title: "Example 1",
      category: "Basic: Thats a Pill",
      video: "",
      MainDescription: "This is a basic square design.",
    },
    {
      image:
        "https://fixtura.s3.ap-southeast-2.amazonaws.com/LDCC_Lindfield_Cricket_SENIORS_Ladder_d4fa6ef4097c_a1fdd02d07_0ac91bba80.png",
      title: "Example 1",
      category: "Basic: Soft Hands",
      video: "",
      MainDescription: "This is a basic square design.",
    },
    {
      image:
        "https://fixtura.s3.ap-southeast-2.amazonaws.com/Northern_Suburbs_District_Cricket_Club_Weekend_Result_eb8f8c23dc68_d2c5b86f9c.png",
      title: "Example 1",
      category: "Gradient: From Below",
      video: "",
      MainDescription: "This is a basic square design.",
    },
    {
      image:
        "https://fixtura.s3.ap-southeast-2.amazonaws.com/University_of_QLD_Cricket_Club_Results_ce9df3e76061_254a7f11f8.png",
      title: "Example 1",
      category: "Gradient: From the Left",
      video: "",
      MainDescription: "This is a basic square design.",
    },
    {
      image:
        "  https://fixtura.s3.ap-southeast-2.amazonaws.com/LDCC_Lindfield_Cricket_SENIORS_Fixtures_88ca73ce29ba_46af24425e.png",
      title: "Example 1",
      category: "Gradient: From the Top",
      video: "",
      MainDescription: "This is a basic square design.",
    },
    {
      image:
        "https://fixtura.s3.ap-southeast-2.amazonaws.com/Sunshine_Coast_Scorchers_Weekend_Result_7a6e81fa1029_7d2422129a.png",
      title: "Example 1",
      category: "Gradient: From the Right",
      video: "",
      MainDescription: "This is a basic square design.",
    },
  ];
  return (
    <Section {...freePackageData} color="light">
      {/*  <PricingComponent /> */}
      <CardsCarousel data={carouselData} />
      <P textAlign={"center"}>
        Stay tuned! We're constantly rolling out fresh, new packages.
      </P>
    </Section>
  );
};

const Bespoke = () => {
  const bespokeIntroOffer = {
    title:
      "Craft Tailored Designs with Fixtura's Bespoke Builds - Now at 50% Off!",
    paragraphs: [
      `Delve into a world of customization with Fixtura. With our Bespoke Builds, your club's unique story takes center stage.`,
      ` It's more than just design; it's a collaboration. And for a limited time, our transformative package, valued at $399, is available for just $199.`,
      `No hidden fees, just a commitment to amplifying your brand. Elevate your club's digital presence with Fixtura and stand out from the crowd.`,
    ],
  };

  return (
    <>
      <Section {...bespokeIntroOffer} color="dark">
        <Center>
          <Link legacyBehavior  href="https://www.facebook.com/profile.php?id=100095406210560">
            <a
              target="_blank"
              className="btn btn-primary"
              onClick={() => trackButtonClick("Bespoke Package Enquiry")} // Track button click
            >
              Message us on Facebook to find out more
            </a>
          </Link>
        </Center>
        {/*   <CardsCarousel data={bespokeExamples} /> */}
      </Section>
    </>
  );
};
