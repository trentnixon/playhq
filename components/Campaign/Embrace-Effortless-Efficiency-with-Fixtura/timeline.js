import {
  Grid,
  Col,
  Title,
  List,
  Text,
  Container,
  ThemeIcon,
  rem,
  Center,
  Group,
} from "@mantine/core";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap/dist/gsap";

import { CustomEase } from "gsap/dist/CustomEase";
import { RoughEase, ExpoScaleEase, SlowMo } from "gsap/dist/EasePack";

import { Flip } from "gsap/dist/Flip";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Observer } from "gsap/dist/Observer";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { Draggable } from "gsap/dist/Draggable";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { EaselPlugin } from "gsap/dist/EaselPlugin";
import { PixiPlugin } from "gsap/dist/PixiPlugin";
import { TextPlugin } from "gsap/dist/TextPlugin";
import {
  IconArrowBadgeRight,
  IconBrandFacebook,
  IconDatabaseImport,
  IconIndentIncrease,
  IconPhotoAi,
  IconPhotoEdit,
  IconTool,
} from "@tabler/icons-react";
gsap.registerPlugin(
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo,
  CustomEase
);
import { GradientTitle, H, P } from "../../Members/Common/Type";
import { useMediaQuery } from "@mantine/hooks";

gsap.registerPlugin(ScrollTrigger);

const animationSettings = {
  containerHeight: "auto", // Height for the timeline containers
};

const Icons = {
  DATA: (
    <IconDatabaseImport
      stroke={"1px"}
      style={{ width: "3em", height: "3em" }}
    />
  ),
  CREATOR: (
    <IconPhotoEdit stroke={"1px"} style={{ width: "3em", height: "3em" }} />
  ),
  POSTING: (
    <IconBrandFacebook stroke={"1px"} style={{ width: "3em", height: "3em" }} />
  ),
};

const timelineData = [
  {
    title: "Manual Reporting Tasks",
    est: "3-4 hours",
    sections: [
      {
        subtitle: "Manual  Data Collection:",
        icon: Icons.DATA,
        items: [
          "Visit PlayHQ website.",
          "Search for each game played by your club during the week.",
          "Record game results for every fixture.",
          "Identify top performers in each game.",
          "Calculate top 5 batting performances for each age group.",
          "Calculate top 5 bowling performances for each age group.",
          "Calculate team of the week for each age group.",
          "Check and update ladder standings for each grade.",
          "Collect upcoming fixtures for coming weekend's fixtures.",
        ],
      },
      {
        subtitle: "Manual Digital Creation:",
        icon: Icons.CREATOR,
        items: [
          "Update a Weekly Results Graphic.",
          "Update a Weekly Results Video.",
          "Update a Weekly Results Video.",
          "Create Top Batting Performers Graphic.",
          "Create Top Bowling Performers Graphic.",
          "Create Top Batting Performers Video.",
          "Create Top Bowling Performers Video.",
          "Update Grade Ladder Graphics.",
          "Create Grade Ladder Video.",
          "Create Team of the Week Graphic for Each Age Group.",
          "Create Graphics for Upcoming Fixtures.",
          "Create Graphics for Team Rosters.",
          "Write Detailed Reports for Each Game.",
          "Write Detailed Weekend Summary.",
        ],
      },
      {
        subtitle: "Manual Posting:",
        icon: Icons.POSTING,
        items: [
          "Compile and format content for social media.",
          "Schedule and post on various social media platforms.",
          "Update the club's website with new reports and graphics.",
        ],
      },
    ],
  },
  {
    title: "Fixtura Reporting Tasks",
    est: "15-20min",
    sections: [
      {
        subtitle: "Data Collection with Fixtura:",
        icon: Icons.DATA,
        items: ["Handle by Fixtura."],
      },
      {
        subtitle: "Digital Creation with Fixtura:",
        icon: Icons.CREATOR,
        items: ["Handle by Fixtura."],
      },
      {
        subtitle: "Posting with Fixtura:",
        icon: Icons.POSTING,
        items: [
          "Receive a secure link via email.",
          "Review and download your Assets.",
          "Schedule and post on various social media platforms.",
          "Update the club's website with new reports and graphics.",
        ],
      },
    ],
  },
];

const Timelines = () => {
  useGSAP(() => {
    // Animating Main Titles
    gsap.from(".timeline-title", {
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top center",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: -30,
      stagger: 0.3,
      duration: 0.5,
      ease: "power2.out",
    });
    // Animating Subtitles and List Items
    gsap.from(".timeline-section-title", {
      scrollTrigger: {
        trigger: ".timeline-section ",
        start: "top center",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 10,
      x: 0,
      stagger: 0.15,
      duration: 0.3,
      ease: "power1.out",
    });

    // Animating Subtitles and List Items
    gsap.from(".timeline-item", {
      scrollTrigger: {
        trigger: ".timeline-section-title",
        start: "top center",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -100,
      stagger: 0.05,
      duration: 0.5,
      ease: "ease.out",
    });
  }, []);

  return (
    <Grid>
      {timelineData.map((timeline, index) => {
        console.log(index);
        const TextAlign = index === 0 ? "left" : "right";
        const useGradient =
          index === 0
            ? { from: "red", to: "purple", deg: 45 }
            : { from: "orange", to: "green", deg: 45 };
        const Icon =
          index === 0 ? (
            <IconTool style={{ width: "70%", height: "70%" }} />
          ) : (
            <IconPhotoAi style={{ width: "70%", height: "70%" }} />
          );
        return (
          <Col key={index} span={12} md={6}>
            
            <Center>
              <ThemeIcon
                my={30}
                className="timeline-title"
                variant="outline"
                radius="5em"
                size="5em"
                color="gray"
              >
                {Icon}
              </ThemeIcon>
            </Center>
            <H order={1} className="timeline-title" color="white" mb={30}>
              {timeline.title}
            </H>
            {/* <GradientTitle
              className="timeline-title"
              fw={"900"}
              ta={"center"}
              size={"2.5em"}
              title={timeline.title}
              gradient={useGradient}
            /> */}
           
            {timeline.sections.map((section, sectionIndex) => {
              return (
                <TimelineSection
                  key={sectionIndex}
                  section={section}
                  TextAlign={TextAlign}
                  BGColor={index}
                />
              );
            })}
             <Center mb={20}>
              <GradientTitle
                size={"1em"}
                title={"Est"}
                gradient={useGradient}
              />
              <GradientTitle
                tt="uppercase"
                gradient={useGradient}
                size={"2.7em"}
                title={`${timeline.est} / w`}
              />
            </Center>
          </Col>
          
        );
      })}
      
    </Grid>
  );
};

export default Timelines;

const TimelineSection = ({ section, TextAlign, BGColor }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const padding = isMobile ? 0 : "sm";
  const BG = BGColor === 0 ? "#595c65" : "#191b21";
  const Color = BGColor === 0 ? "white" : "white";
  const useGradient =
    BGColor === 0
      ? { from: "red", to: "purple", deg: 45 }
      : { from: "orange", to: "green", deg: 45 };
  return (
    <Container
      px={isMobile ? 0 : "xl"}
      className="timeline-section"
      mb={50}
      mx={0}
    >
      <Group position="apart" mb={10} mx={0}>
        {isMobile ? false : section.icon}

        <GradientTitle
          ta={TextAlign}
          size={"h2"}
          className="timeline-section-title"
          title={section.subtitle}
          gradient={useGradient}
        />
      </Group>

      <Container
        className="timeline-section"
        style={{
          height: animationSettings.containerHeight,
          backgroundColor: BG,
          borderRadius: "3px",
          marginBottom: "10px",
          padding: isMobile ? "3px" : "20px",
        }}
      >
        {section.items.map((item, index) => (
          <Group key={index} position="apart" my={10}>
            {isMobile ? false : <IconArrowBadgeRight color={Color} />}
            <P
              color={Color}
              size={isMobile ? "md" : "xl"}
              textAlign={isMobile ? "left" : TextAlign}
              className="timeline-item"
              marginBottom={0}
              Weight={200}
            >
              {item}
            </P>
          </Group>
        ))}
      </Container>
    </Container>
  );
};
