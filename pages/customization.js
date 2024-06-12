import React from "react";
import PageBanner from "../components/Common/PageBanner";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import { fetcher } from "../lib/api";
import { P } from "../components/Members/Common/Type";
import {
  IconCategory2,
  IconColorSwatch,
  IconPhotoAi,
  IconTruckDelivery,
  IconUpload,
} from "@tabler/icons-react";
import { Space } from "@mantine/core";
import Section from "../components/UI/DefaultSection";
import CardItem from "../components/UI/Containers/CardItem";
import Meta from "../components/Layouts/Meta";

const qs = require("qs");

const customization = () => {
  const customizationSectionData = {
    title: "Customize Your Club’s Branding Now with Fixtura",
    paragraphs: [
      "At Fixtura, we believe that your club or association's story is best told through a lens of authenticity.",
      `That's why we've crafted our platform to champion your unique brand identity in every piece of content. Dive into a world where your videos, images, and AI-enhanced write-ups seamlessly mirror your brand ethos.`,
      `From color palettes and logo placements to sponsor integrations, wield the power of customization. With Fixtura, take the reins of your narrative and present a digital brand image that captivates and resonates.`,
    ],
  };
  return (
    <>
      <Meta
        title="Customize - Fixtura: Personalize Your Club's Media"
        description="Personalize your club's digital presence with Fixtura's customization options. Tailor videos, images, and articles to your brand."
        keywords="Customize Fixtura, sports club personalization, digital media customization, tailored sports content, club brand identity"
      />
      <PageBanner pageTitle="" BGImage="/images/BG-Images/0D5A3099.jpg" />
      <Section {...customizationSectionData} color="light" />
      <CustomisationSection />
      <CtaAreaTwo />
    </>
  );
};

export default customization;

export const getServerSideProps = async (context) => {
  const query = qs.stringify(
    {
      populate: ["Cover", "asset_category", "VideoExample", "MainDescription"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const CaseStudies = await fetcher(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/case-studies?${query}`
  );

  return {
    props: {
      CaseStudies: CaseStudies,
    },
  };
};

const CustomisationSection = () => {
  const customizationSectionData = {
    title: "Craft a Distinct Narrative with Fixtura",
    paragraphs: [
      `Every match, every victory, and every moment holds a story. With Fixtura, you're not just sharing these moments; you're crafting a narrative that encapsulates your club or association's spirit.`,
      `Dive into our customization suite and mold content that speaks directly to your audience.`,
    ],
  };
  return (
    <>
      <Section {...customizationSectionData} color="dark">
        <div className="row justify-content-center">
          {CusomizationItems.map((fact, index) => (
            <CardItem
              key={index}
              item={fact}
              data-aos-delay={`${100 + 200 * index}`}
            />
          ))}
        </div>
        <Space h={50} />
        <P color={6} textAlign={"center"}>
          Craft your narrative, and let Fixtura bring it to life with finesse
          and flair.
        </P>
      </Section>
    </>
  );
};

const CusomizationItems = [
  {
    icon: IconColorSwatch, // Add your custom icon component here
    title: "Brand Colors",
    description:
      "Personalize your videos and graphics with your signature colors, ensuring brand cohesion at every touchpoint.",
  },
  {
    icon: IconUpload, // Add your custom icon component here
    title: "Logo Integration",
    description:
      "Seamlessly weave your club's emblem or association's logo into all visual content, amplifying brand recognition.",
  },
  {
    icon: IconPhotoAi, // Add your custom icon component here
    title: "Sponsor Visibility:",
    description:
      "Honor your sponsors by prominently featuring their logos, celebrating partnerships that propel your club forward.",
  },
  {
    icon: IconTruckDelivery, // Add your custom icon component here
    title: "Flexible Delivery",
    description:
      "Align content delivery with your schedules, guaranteeing your audience always stays informed and engaged.",
  },
  {
    icon: IconCategory2, // Add your custom icon component here
    title: "Smart Asset Categorization",
    description:
      "Intuitively categorize assets, ensuring every piece of content hits the mark with relevance and impact.",
  },
];
