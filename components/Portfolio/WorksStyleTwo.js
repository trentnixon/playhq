import React from "react";
import { CardsCarousel } from "./Carousel";
import Section from "../UI/DefaultSection";
import { P } from "../Members/Common/Type";
import { IconNews, IconPhotoAi, IconVideo } from "@tabler/icons-react";

const WorksStyleTwo = ({ CaseStudies }) => {
  const SectionData = {
    title: "Craft Your Club's Digital Identity with Fixtura",
    paragraphs: [
      `With Fixtura, it's not just about a platform—it's about crafting a digital story for your cricket club or association. Leveraging a range of digital assets, from engaging videos to sharp images and AI-driven articles, we bring your club's journey to the forefront. Explore our offerings and elevate your digital presence.`,
    ],
  };
  const VAR = "attributes.asset_category.data.attributes.Identifier";

  const AssetServices = [
    {
      icon: IconVideo,
      bgColor: "bg-video-color",
      title: "Game Results Overview ",
      description:
        "Experience the full summary of game results in a dynamic video format.",
    },
    {
      icon: IconPhotoAi,
      bgColor: "bg-image-color",
      title: "Game Results Overview ",
      description:
        "A visual representation of the game results, perfect for sharing on social media.",
    },
    {
      icon: IconPhotoAi,
      bgColor: "bg-image-color",
      title: "Single Game Result ",
      description: "Zoom into specific games with a dedicated result graphic.",
    },
    {
      icon: IconVideo,
      bgColor: "bg-video-color",
      title: "Top 5 Batting Performances ",
      description:
        "Highlighting the top batsmen and their key moments from the game.",
    },

    {
      icon: IconVideo,
      bgColor: "bg-video-color",
      title: "Top 5 Bowling Performances ",
      description:
        "Spotlight on the standout bowlers and their game-changing deliveries.",
    },
    {
      icon: IconPhotoAi,
      bgColor: "bg-image-color",
      title: "Top 5 Performances ",
      description:
        "Showcasing the batters and bowlers who made a difference, in a concise graphic.",
    },
    {
      icon: IconVideo,
      bgColor: "bg-video-color",
      title: "Grade Ladder ",
      description:
        "A dynamic representation of the grade standings and shifts.",
    },
    {
      icon: IconPhotoAi,
      bgColor: "bg-image-color",
      title: "Grade Ladder ",
      description:
        "Visual standings of the grades, perfect for a quick glance.",
    },
    {
      icon: IconVideo,
      bgColor: "bg-video-color",
      title: "Upcoming Fixtures ",
      description:
        "Get hyped for what's next with a preview of upcoming games.",
    },
    {
      icon: IconPhotoAi,
      bgColor: "bg-image-color",
      title: "Upcoming Fixture ",
      description:
        "Know your next game's details with a dedicated fixture graphic.",
    },
    {
      icon: IconPhotoAi,
      bgColor: "bg-image-color",
      title: "Team Roster Template",
      description: "Showcase your team's lineup in style.",
    },
    {
      icon: IconNews,
      bgColor: "bg-writeup-color",
      title: "Result & Upcoming Fixture Deep Dive",
      description:
        "An in-depth analysis and review of game results, highlighting key moments and players.",
    },
    {
      icon: IconNews,
      bgColor: "bg-writeup-color",
      title: "@Stumps Review",
      description:
        "A wrap-up review post-game, capturing the essence of the day's play and key moments.",
    },
    {
      icon: IconNews,
      bgColor: "bg-writeup-color",
      title: "Result & Upcoming Fixture Tweets",
      description:
        "Short and catchy tweets highlighting the game results, ready to be shared instantly.",
    },
    {
      icon: IconNews,
      bgColor: "bg-writeup-color",
      title: "Top 5 Write-ups",
      description:
        "Highlighting the top 5 moments, be it batting, bowling, or fielding, from the game.",
    },
    {
      icon: IconNews,
      bgColor: "bg-writeup-color",
      title: "Ladder Summary",
      description:
        "A concise review of the grade standings, notable shifts, and predictions.",
    },
  ];
  const videoServices = AssetServices.filter(
    (service) => service.icon === IconVideo
  );
  const imageServices = AssetServices.filter(
    (service) => service.icon === IconPhotoAi
  );
  const writeupServices = AssetServices.filter(
    (service) => service.icon === IconNews
  );

  const servicesByCategory = {
    VIDEO: videoServices,
    IMAGE: imageServices,
    WRITEUP: writeupServices,
  };

  const categories = ["VIDEO", "IMAGE", "WRITEUP"];

  return (
    <>
      <Section {...SectionData} color="light" />
      {categories.map(
        (category, index) =>
          groupByIdentifier(CaseStudies.data, VAR)[category] && (
            <CaseStudiesSection
              key={index}
              category={category}
              data={groupByIdentifier(CaseStudies.data, VAR)[category]}
              services={servicesByCategory[category]}
              color={index % 2 === 0 ? "light" : "dark"}
            />
          )
      )}
    </>
  );
};

export default WorksStyleTwo;

const CaseStudiesSection = ({ category, data, services, color }) => {
  const carouselData = data.map((study) => ({
    image: study.attributes.Cover.data.attributes.url,
    title: study.attributes.Name,
    category: category,
    video: study.attributes.VideoExample.data?.attributes?.url,
    MainDescription: study.attributes.MainDescription,
  }));

  return (
    <Section
      {...{
        title: `${category}S`,
        paragraphs: [
          data[0].attributes.asset_category.data.attributes.description,
        ],
      }}
      color={color}
    >
      {/* Display the icon list here */}
      <div className="row justify-content-center">
        {services.map((service, index) => {
          //console.log("service", service, service.icon);
          return (
            <div
              key={index}
              className="col-lg-2 col-sm-3"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay={`${200 + 100 * index}`}
            >
              <div className="service-card-one">
                <i>
                  <service.icon size={`1.1em`} stroke="1" />
                </i>

                <P
                  Weight={600}
                  size={18}
                  marginBottom="14px"
                  textAlign={"center"}
                  lineHeight={"1em"}
                >
                  {service.title}
                </P>
                {/* <P size={12} textAlign={"center"}>{service.description}</P> */}
              </div>
            </div>
          );
        })}
      </div>
      <CardsCarousel data={carouselData} />
    </Section>
  );
};

function groupByIdentifier(array) {
  const grouped = {};
  array.forEach((item) => {
    const identifier =
      item.attributes.asset_category.data.attributes.Identifier;
    if (!grouped[identifier]) {
      grouped[identifier] = [];
    }
    grouped[identifier].push(item);
  });
  return grouped;
}
