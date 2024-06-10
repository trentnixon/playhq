import React from "react";
import PageBanner from "../components/Common/PageBanner";
import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import { fetcher } from "../lib/api";
import { H, P } from "../components/Members/Common/Type";
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
import { CardsCarousel } from "../components/pages/public/index/customization/CardCarousels";
import CustomizationCtaArea from "../components/pages/public/index/customization/Cta";

const qs = require("qs");

const data = [
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Data_Display_28b305f5a1.jpg",
    title: "Custom Data Display",
    subtitle: "Tailor Your Stats",
    description:
      "This option allows accounts to decide what data points are used in the videos and what can be left out. For example, a club can exclude the opposition from all videos if they wish. Customize how players' names, stats, and fixtures are displayed.",
    category: "Customization",
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Position_sponsors_c358bb7455.jpg",
    title: "Position Your Sponsors",
    subtitle: "Flexible Sponsor Placement",
    description:
      "Move away from the free tier option of 2 sponsors on every page. Customization allows users to add as many sponsors as they wish to every page, placing them strategically for maximum impact.",
    category: "Customization",
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/use_Video_BGS_da917258f0.jpg",
    title: "Use of Video Backgrounds",
    subtitle: "Dynamic Visual Appeal",
    description:
      "Add a creative video of your club, ground, or gameplay as a background to your assets, making them more engaging and visually appealing.",
    category: "Customization",
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Add_AI_Voice_d44d31442e.jpg",
    title: "Add Voice Over",
    subtitle: "Personalized Audio Narration",
    description:
      "Add an AI voice-over introduction to every video. These will be limited to just the intro and outros, adding a professional touch to your content.",
    category: "Customization",
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Fonts_b38221e872.jpg",
    title: "Choice of Fonts",
    subtitle: "Expressive Typography",
    description:
      "Select from hundreds of Google fonts to truly make the assets your own. Customize the look and feel of your content with the perfect typography.",
    category: "Customization",
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Additional_C_Olors_684ad62bec.jpg",
    title: "Additional Colors",
    subtitle: "Vibrant and Unique",
    description:
      "Add more than the two colors we offer in the free tier. Incorporate a 3rd or 4th color to bring your assets to life and make them uniquely yours.",
    category: "Customization",
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Animations_39522e39a1.jpg",
    title: "Custom Animations",
    subtitle: "Engaging Movements",
    description:
      "Guide us on the types of animations you would like to see or use. Customize animations in and out to enhance your content's dynamism.",
    category: "Customization",
  },
];

const customization = () => {
  const customizationSectionData = {
    title: "Season Preparation Starts Here!",
    paragraphs: [
      "With the new season just around the corner, we want to ensure you're fully prepared with the best and most exciting digital content.",
      "This season, we're offering the opportunity to work with our design team to create bespoke digital assets for your club, whether it's updating your templates, incorporating your latest branding, or creating something entirely new. ",
    ],
  };
  const WhycustomSectionData = {
    title: "Why Customise your Assets?",
    paragraphs: [],
  };
  return (
    <>
      <Meta
        title="Customize - Fixtura: Personalize Your Club's Media"
        description="Personalize your club's digital presence with Fixtura's customization options. Tailor videos, images, and articles to your brand."
        keywords="Customize Fixtura, sports club personalization, digital media customization, tailored sports content, club brand identity"
      />
      <PageBanner pageTitle="Personalize Your Digital Assets for the New Season!" />

      <Section {...customizationSectionData} color="light">
        <CardsCarousel data={data} />
      </Section>
      {/* 
      <Section {...WhycustomSectionData} color="dark">
        <CustomizationDetails data={data} />
      </Section> */}

      <CustomizationCtaArea />
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

const CustomizationDetails = ({ data }) => {
  return data.map((item, index) => (
    <div className="cta-area-two ptb-100">
      <div className="container">
        <div className="cta-content">
          <h3>{item.title}</h3>
          <span>{item.subtitle}</span>
        </div>
        <div
          key={index}
          className="customization-item"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <p>{item.description}</p>
        </div>
      </div>
    </div>
  ));
};
