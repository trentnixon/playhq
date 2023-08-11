import React from "react";
import { useMantineTheme, Title, Space } from "@mantine/core";
import { IconPhotoAi, IconVideo, IconNews } from "@tabler/icons-react";
import { P } from "../Members/Common/Type";

const funFactsData = [
  {
    icon: IconNews,
    title: "AI-Generated Write-ups",
    description:
      "At Fixtura, storytelling meets innovation. Our AI write-ups offer unique, engaging content that can be personalized to your club or association's voice. From detailed match reports to lively player profiles, we pen the cricket stories that matter to you.",
  },
  {
    icon: IconVideo,
    title: "Tailored Videos",
    description:
      "Fixtura's tailored videos provide dynamic, captivating visuals for your cricket club or association. Keep your members and followers in the loop with content that ranges from upcoming matches to player highlights, all crafted to suit your specific needs.",
  },
  {
    icon: IconPhotoAi,
    title: "High-Quality Images",
    description:
      "More than just snapshots, Fixtura's images are visual narrations. Crafted to showcase your club or association in a professional and appealing manner, these images capture key moments from the videos, giving your digital content a cohesive look and feel.",
  },
];

const FunFacts = () => {
  const theme = useMantineTheme();

  return (
    <>
      <div className="pt-100 pb-70 bg-2C2E33">
        <div className="container">
          <div className="section-title">
            <P
              Weight={600}
              color={1}
              size={50}
              marginBottom="14px"
              textAlign={"center"}
            >
              Tailoring Your Cricket Narrative
            </P>
            <P color={0} textAlign={"center"}>
              Whether it's painting a vivid picture of a thrilling match or
              capturing a glorious victory, Fixtura’s personalized content
              breathes life into your cricket journey. Choose from our array of
              AI-generated write-ups, tailored videos, and high-quality images
              to craft a compelling narrative that resonates with your audience.
            </P>
          </div>
          <div className="row justify-content-center">
            {funFactsData.map((fact, index) => (
              <div
                key={index}
                className="col-lg-4 col-sm-6"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay={`${100 + 200 * index}`}
              >
                <div className="funfact-card">
                  <fact.icon
                    size="4rem"
                    stroke={1}
                    color={theme.colors.blue[6]}
                  />
                  <Title
                    mb={20}
                    variant="gradient"
                    gradient={{ from: "#339AF0", to: "#3BC9DB", deg: 45 }}
                  >
                    {fact.title}
                  </Title>
                  <P color={0} textAlign={"center"}>
                    {fact.description}
                  </P>
                </div>
              </div>
            ))}
          </div>
          <Space h={50} />
          <P color={0} textAlign={"center"}>
            Fixtura: Crafting Your Unique Story with Precision and Flair
          </P>
        </div>
      </div>
    </>
  );
};

export default FunFacts;
