import React from "react";
import PageBanner from "../components/Common/PageBanner";
import CustomizationCtaArea from "../components/pages/public/personalize-your-assets/customization/Cta";
import { fetcher } from "../lib/api";
import Section from "../components/UI/DefaultSection";
import Meta from "../components/Layouts/Meta";
import { CardsCarousel } from "../components/pages/public/personalize-your-assets/customization/CardCarousels";
import CustomizationDetails from "../components/pages/public/personalize-your-assets/customization/CustomizationDetails"; // Adjust the path as necessary
import PersonalizePoints from "../components/pages/public/personalize-your-assets/AboutContent";
import { Center, Image } from "@mantine/core";
import Link from "next/link";
import { P } from "../components/Members/Common/Type";

const qs = require("qs");

const data = [
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Data_Display_28b305f5a1.jpg",
    title: "Customize Your Numbers",
    subtitle: "Tailor Your Data for Maximum Impact",
    description:
      "Customize what data points are showcased in your videos. Exclude unwanted information and highlight what's important to your club, including player names, stats, and fixtures.",
    category: "Customization",
    scrollImage:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Data_27cafed5f6.png",
    optionalImage: [
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Runs_d0ccea1489.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Balls_33b9e6669f.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/wickets_167d44a1d8.png",
    ],
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Position_sponsors_c358bb7455.jpg",
    title: "Boost Your Sponsor Visibility",
    subtitle: "Flexible Sponsor Placement Options",
    description:
      "Move beyond the free tier with limited sponsor spots. Add as many sponsors as you want on every page, placing them strategically for maximum exposure and impact.",
    category: "Customization",
    scrollImage:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sponsor_Main_f7bbba1423.png",
    optionalImage: [
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Sponsor_f6c71bce6f.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Sponsor_f6c71bce6f.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Sponsor_f6c71bce6f.png",
    ],
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/use_Video_BGS_da917258f0.jpg",
    title: "Elevate with Video Backgrounds",
    subtitle: "Add Dynamic Visual Appeal",
    description:
      "Incorporate creative videos of your club, ground, or gameplay as backgrounds to make your digital assets more engaging and visually appealing.",
    category: "Customization",
    scrollImage:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/background_c0b189bdad.png",
    optionalImage: [
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
    ],
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Add_AI_Voice_d44d31442e.jpg",
    title: "Engage with AI Voice-Overs",
    subtitle: "Personalized Audio Narration",
    description:
      "Add AI-generated voice-overs to your videos for a professional touch. Perfect for introductions and outros, making your content stand out.",
    category: "Customization",
    scrollImage:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Data_27cafed5f6.png",
    optionalImage: [
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
    ],
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Fonts_b38221e872.jpg",
    title: "Express Your Brand with Fonts",
    subtitle: "Hundreds of Google Fonts",
    description:
      "Choose from hundreds of Google fonts to make your content truly yours. Customize the typography to align with your club's unique style and brand.",
    category: "Customization",
    scrollImage:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Data_27cafed5f6.png",
    optionalImage: [
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
    ],
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Additional_C_Olors_684ad62bec.jpg",
    title: "Add More Colors",
    subtitle: "Vibrant and Unique Palettes",
    description:
      "Expand beyond the basic two-color scheme. Add additional colors to bring your digital assets to life, making them vibrant and unique to your club.",
    category: "Customization",
    scrollImage:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Data_27cafed5f6.png",
    optionalImage: [
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
    ],
  },
  {
    image:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Animations_39522e39a1.jpg",
    title: "Captivate with Custom Animations",
    subtitle: "Engaging and Dynamic Movements",
    description:
      "Guide us on the types of animations you'd like to see. Customize in-and-out animations to make your content more dynamic and engaging.",
    category: "Customization",
    scrollImage:
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/Custom_Data_27cafed5f6.png",
    optionalImage: [
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
      "https://fixtura.s3.ap-southeast-2.amazonaws.com/sound_2bdcabc4d5.png",
    ],
  },
];

const customization = () => {
  const customizationSectionData = {
    title: "Season Preparation Starts Here!",
    paragraphs: [
      "With the new season around the corner, it’s the perfect time to update your club’s online digtial presence. Fixtura offers an exclusive chance to work directly with our design team to create custom digital assets.",
      "This season, why not personalize your club’s digital assets with Fixtura?",
    ],
  };
  const WhycustomSectionData = {
    title: "Start Your Design Process Today – Special Offer: Only $399!",
    paragraphs: [
      `Give your club's digital presence a fresh look with customized assets before the new season kicks off. Normally priced at $599, you can now get started for just $399 until the end of July!`,
    ],
  };
  return (
    <>
      <Meta
        title="Customize - Fixtura: Personalize Your Club's Media"
        description="Personalize your club's digital presence with Fixtura's customization options. Tailor videos, images, and articles to your brand."
        keywords="Customize Fixtura, sports club personalization, digital media customization, tailored sports content, club brand identity"
      />
      <PageBanner />

      <Section {...customizationSectionData} color="light">
        <PersonalizePoints />
      </Section>

      <Section {...WhycustomSectionData} color="dark">
        <CardsCarousel data={data} />
        <P color={0} textAlign='center' className="mt-4">**Please note, this is a one-time design and development service and is not included in the season pass cost. The bespoke design service provided by Fixtura is used to give your club a unique look and feel for your assets. Your designs will not be available for other accounts, and will belong solely to your brand.**</P>
      </Section>

      <CustomizationCtaArea />

      {/*  <Section {...WhycustomSectionData} color="dark">
        <CustomizationDetails data={data} />
      </Section>
      <CustomizationCtaArea /> */}
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
