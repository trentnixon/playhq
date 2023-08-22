import React from "react";
import PageBanner from "../components/Common/PageBanner";

import CtaAreaTwo from "../components/Common/CtaAreaTwo";
import { P } from "../components/Members/Common/Type";
import {
  ActionIcon,
  Card,
  Center,
  Grid,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { IconBrowser, IconPresentation, IconVideo } from "@tabler/icons-react";
import Link from "next/link";
const Resources = () => {
  const theme = useMantineTheme();

  const highLevelOptions = [
    {
      title: "Slide Presentation",
      description:
        "A comprehensive slide deck that explores all that Fixtura has to offer, targeting decision-makers for in-depth understanding.",
      icon: <IconPresentation size="3rem" color={theme.colors.white} />,
      downloadLink:
        "https://www.canva.com/design/DAFsDe8X_A0/t1z3xqpSYszIQykagRWAXA/view?utm_content=DAFsDe8X_A0&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
    },
    {
      title: "Website Presentation",
      description:
        "Navigate through Fixtura's extensive features and benefits with this interactive web guide. Designed for a deep dive into the platform.",
      icon: <IconBrowser size="3rem" color={theme.colors.white} />, // Update IconWeb based on your actual imports
      downloadLink:
        "https://www.canva.com/design/DAFsDe8X_A0/t1z3xqpSYszIQykagRWAXA/view?website#2",
    },
    {
      title: "Video",
      description:
        "An in-depth video offering a complete view of how Fixtura can bring a digital transformation to your cricket club's media strategy.",
      icon: <IconVideo size="3rem" color={theme.colors.white} />, // Update IconVideo based on your actual imports
      downloadLink: "https://www.youtube.com/...",
    },
  ];

  const eli5Options = [
    {
      title: "Slide Presentation",
      description:
        "Step-by-step slides on how to use Fixtura for your cricket club. No jargon, just simple steps.",
      icon: <IconPresentation size="3rem" color={theme.colors.white} />,
      downloadLink: "https://www.canva.com/design/DAFsI9LO800/CAmAnwJjW3BU-8Nrk1cxQw/view?utm_content=DAFsI9LO800&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
    },
    {
      title: "Website Presentation",
      description:
        "Quickly understand Fixtura's key features through this interactive online guide. Made for easy onboarding.",
      icon: <IconBrowser size="3rem" color={theme.colors.white} />, // Update IconWeb based on your actual imports
      downloadLink: "https://www.canva.com/design/DAFsI9LO800/CAmAnwJjW3BU-8Nrk1cxQw/view?website#2",
    },
    {
      title: "Video",
      description:
        "A brief video tutorial that visually takes you through Fixtura's basic functionalities. Easy to understand, quick to learn.",
      icon: <IconVideo size="3rem" color={theme.colors.white} />, // Update IconVideo based on your actual imports
      downloadLink: "https://www.youtube.com/...",
    },
  ];

  const overviewOptions = [
    {
      title: "Slide Presentation",
      description:
        "Step-by-step slides on how to use Fixtura for your cricket club. No jargon, just simple steps.",
      icon: <IconPresentation size="3rem" color={theme.colors.white} />,
      downloadLink: "https://www.canva.com/design/DAFsPf2A5jo/YuWtz2Orm1Tm_zYZjMe8bA/view?utm_content=DAFsPf2A5jo&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink",
    },
    {
      title: "Website Presentation",
      description:
        "Quickly understand Fixtura's key features through this interactive online guide. Made for easy onboarding.",
      icon: <IconBrowser size="3rem" color={theme.colors.white} />, // Update IconWeb based on your actual imports
      downloadLink: "https://www.canva.com/design/DAFsPf2A5jo/YuWtz2Orm1Tm_zYZjMe8bA/view?website#2",
    },
    {
      title: "Video",
      description:
        "A brief video tutorial that visually takes you through Fixtura's basic functionalities. Easy to understand, quick to learn.",
      icon: <IconVideo size="3rem" color={theme.colors.white} />, // Update IconVideo based on your actual imports
      downloadLink: "https://www.youtube.com/...",
    },
  ];

  const renderOptions = (options) => {
    return options.map((option, index) => (
      <Grid.Col span={4} key={index}>
        <Stack>
          <Card shadow="md" radius="md" padding="xl">
            <Center>
              <ActionIcon
                color={"blue"}
                size="6rem"
                radius="100%"
                variant="filled"
                mb={10}
              >
                {option.icon}
              </ActionIcon>
            </Center>
            <P textAlign={`center`} Weight={900} size="lg">
              {option.title}
            </P>

            <button className="btn btn-secondary">
              <Link target="_blank" href={option.downloadLink}>
                <a>Download</a>
              </Link>
            </button>
          </Card>
          <P textAlign={`center`} size="sm">
            {option.description}
          </P>
        </Stack>
      </Grid.Col>
    ));
  };

  return (
    <>
      <PageBanner
        pageTitle="Resources Hub"
        BGImage="/images/BG-Images/0D5A3099.jpg"
        position={`bottom center`}
      />
      

      <div className="pricing-area ptb-100 bg-eaf6ff">
        <div className="container">
          <div className="section-title">
            <h2>Fixtura Resources Hub</h2>
            <P textAlign={`center`} Weight={400} size="xl">
              Here, you'll find a wealth of downloadable assets, presentations,
              and videos designed to empower your club or association. Whether
              you're looking to enhance your social media presence, engage with
              your fans, or simply learn more, this is the place for you.
            </P>
          </div>
        </div>
      </div>

      <div className="pt-100 pb-70 bg-eaf6ff">
        <div className="container">
          <div className="section-title">
            <h2>Overview/Brief: Get to Know Fixtura</h2>
            <P textAlign={`center`} Weight={600} size="xl">
              A quick overview of what Fixtura is all about.
            </P>
            <P textAlign={`center`}>
              Learn the basics of Fixtura's features and how it can enhance your cricket club's content creation.
            </P>
            <Grid>{renderOptions(overviewOptions)}</Grid>
          </div>
        </div>
      </div>

      <div className="pt-100 pb-70 bg-f9f6f6">
        <div className="container ">
          <div className="section-title">
            <h2>An ELI5 Introduction to Fixtura: Fixtura Simplified</h2>
            <P textAlign={`center`} Weight={600} size="xl">
              Get to the basics with Fixtura.
            </P>
            <P textAlign={`center`}>
              Ideal for volunteers, club members, and anyone new to digital
              content creation.
            </P>
            <P textAlign={`center`}>
              Learn how Fixtura helps creates videos, graphics, and articles for
              your cricket club, without any fuss. Perfect for those who want
              the basics.
            </P>
            <Grid>{renderOptions(eli5Options)}</Grid>
          </div>
        </div>
      </div>

      <div className="pt-100 pb-70 bg-eaf6ff">
        <div className="container">
          <div className="section-title">
            <h2>
              A High-Level Introduction to Fixtura: Elevate Your Game with
              Fixtura
            </h2>
            <P textAlign={`center`} Weight={600} size="xl">
              A complete guide for club managers and decision-makers looking to
              fully leverage Fixtura's capabilities.
            </P>
            <P textAlign={`center`}>
              Discover Fixtura's ultimate toolset designed to meet your club's
              digital content needs. Suited for club managers seeking
              comprehensive understanding.
            </P>
            <Grid>{renderOptions(highLevelOptions)}</Grid>
          </div>
        </div>
      </div>

      <CtaAreaTwo />
    </>
  );
};

export default Resources;

/*
<P>
              These resources are designed to provide clubs and associations
              with comprehensive insights into Fixtura's features, benefits, and
              success stories. They can serve as valuable tools for learning
              more about Fixtura or for presenting the platform to a wider
              audience when considering signing up.
            </P>
            <P>
              Each presentation is tailored to provide a clear understanding of
              how Fixtura can elevate a club's digital presence and enhance fan
              engagement. Whether you're a club manager looking to educate your
              team or an association representative presenting to potential
              members, these presentations offer a visually engaging way to
              communicate the value of Fixtura.
            </P>
            <P>
              Choose from various topics and formats to find the presentation
              that best suits your needs.
            </P>
            Presentation Topics: Introduction to Fixtura: Get acquainted with
            the fundamental concept of Fixtura and how it transforms content
            creation for cricket clubs and associations. Explore the key
            benefits and unique features that set Fixtura apart. Making Fixtura
            Work for Your Club: Dive into how Fixtura seamlessly integrates with
            your club's needs and objectives. Learn about customization options,
            branding elements, and how to harness the platform to enhance fan
            engagement. Using Fixtura: A Step-by-Step Guide: Explore the ins and
            outs of navigating the Fixtura platform. From setting up your
            account to customizing your content and scheduling deliveries, this
            guide walks you through each stage. Signing Up for Fixtura: A
            comprehensive guide to the easy process of signing up for Fixtura.
            Learn how to create your account, select your preferences, and get
            started on the journey to elevating your club's digital presence.
            Managing Your Subscription: Discover how to effectively manage your
            Fixtura subscription. Learn how to pause or cancel your subscription
            if needed, and understand the flexibility and control you have over
            your membership. Creating Impactful Content: Unlock insights into
            crafting compelling content using Fixtura's tools. Learn about best
            practices for captions, hashtags, and timing to optimize your social
            media engagement. Leveraging Fixtura Analytics: Understand how to
            interpret and utilize the analytics provided by Fixtura. Learn how
            to measure engagement, identify trends, and adapt your content
            strategy based on valuable insights. Getting the Most Out of
            Fixtura: Explore advanced tips and tricks for maximizing the value
            of Fixtura for your club or association. Learn about utilizing
            AI-generated content, optimizing delivery schedules, and other
            optimization strategies. These resources will equip you with the
            knowledge and guidance to effectively utilize Fixtura for your club
            or association. Whether you're getting started or seeking to enhance
            your current efforts, each topic provides actionable insights to
            elevate your digital presence and engage with your fanbase.


             <div className="pt-100 pb-70 bg-eaf6ff">
        <div className="container">
          <div className="section-title">
            <h2>Downloadable</h2>
            <P>
              Downloadable Assets: Access a collection of high-quality images,
              logos, and graphics that are ready to use on your social media
              platforms, websites, and more
            </P>
          </div>
        </div>
      </div>

      <div className="pt-100 pb-70 bg-eaf6ff">
        <div className="container">
          <div className="section-title">
            <h2>Educational</h2>
            <P>
              Watch videos that provide step-by-step guides, tips, and best
              practices on using Fixtura effectively. Learn how to create
              engaging content, customize templates, and maximize the impact of
              AI-generated assets.{" "}
            </P>
          </div>
        </div>
      </div>
*/
