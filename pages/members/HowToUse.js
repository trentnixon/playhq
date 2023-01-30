import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../../lib/authContext";
import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
  Space,
  Group,
  Box,
} from "@mantine/core";
import Cookies from "js-cookie";

import { fetcher } from "../../lib/api";
// components

import {
  MembersWrapper,
  ShadowWrapper,
  Wrapper,
} from "../../components/Members/Common/Containers";

import { P, PageTitle, SubHeaders } from "../../components/Members/Common/Type";
import { IconQuestionMark } from "@tabler/icons";

const OBJ = {
  sections: [
    {
      title: "Deliveries",
      image: `/images/HowToBannerDefault.jpg`,
      content:
        "To select the delivery days for your assets, go to the 'Deliveries' tab in your account. From there, you can choose the days of the week that you want to receive your assets. You can also change the delivery email address by clicking the 'Edit' button next to the current email address. Make sure to click 'Save' to apply any changes you make.",
    },
    {
      title: "Videos and Images",
      image: `/images/HowToBannerDefault.jpg`,
      content:
        "Fixtura offers a range of videos and images that you can use to showcase your club or association. To select the videos and images you want to receive, go to the 'Videos and Images' tab in your account. From there, you can browse the available options and select the ones you want to include in your deliveries. You can also preview the assets to see how they will look before you add them to your selection.",
    },
    {
      title: "Articles and Writeups",
      image: `/images/HowToBannerDefault.jpg`,
      content:
        "In addition to videos and images, Fixtura also offers AI-generated articles and writeups that you can use to share news and updates about your club or association. To access these assets, go to the 'Articles and Writeups' tab in your account. From there, you can browse the available options and select the ones you want to include in your deliveries. You can also customize the look and feel of the articles and writeups to match your branding.",
    },
    {
      title: "Branding",
      image: `/images/HowToBannerDefault.jpg`,
      content:
        "To customize the look and feel of your assets, go to the 'Branding' tab in your account. From there, you can upload your club or association's logo and select the brand colors that you want to use. You can also preview how the assets will look with your branding applied. Make sure to click 'Save' to apply any changes you make.",
    },
    {
      title: "Sponsorships",
      image: `/images/HowToBannerDefault.jpg`,
      content:
        "If you have sponsors that you want to feature in your assets, you can add their logos and information to the 'Sponsorships' tab in your account. From there, you can choose which assets you want to include the sponsors in and customize the look and feel of the sponsor information. Make sure to click 'Save' to apply any changes you make.",
    },
    {
      title: "Partners",
      image: `/images/HowToBannerDefault.jpg`,
      content:
        "To promote your club or association through partnerships, go to the 'Partners' tab in your account. From there, you can browse the available partnerships and select the ones you want to join. You can also customize the look and feel of the partner information to match your branding. Make sure to click 'Save' to apply any changes you make.",
    },
  ],
};

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontWeight: 600,
  },
  content: {
    fontWeight: 400,
  },
}));

const HowToUse = (props) => {
  const { Response } = props;
  const { classes } = useStyles();
  /* is User Auth */
  const { user, loading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;
  useEffect(() => {
    if (!user) router.push(`/members/verification/?prev=${currentRoute}`);
  }, []);
  /* End User Check*/

  const cards = OBJ.sections.map((article) => (
    <Card
      key={article.title}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text color="dimmed" size="lg" transform="uppercase" weight={900} mt="md">
        {article.title}
      </Text>
      <Text className={classes.content} mt={5}>
        {article.content}
      </Text>
    </Card>
  ));

  if (!user) return false;
  if (Response === null) return false;
  return (
    <MembersWrapper>
      <PageTitle Copy={"How to use"} ICON={<IconQuestionMark size={40} />} />
      <Wrapper>
        <Group position="apart">
          <Box
            sx={(theme) => ({
              width: "60%",
            })}
          >
            <P
              Copy={`Welcome to Fixtura! We're excited to have you on board as a new member. Here's a quick guide on how to use our platform to get the most out of your subscription.`}
            />
          </Box>
        </Group>
      </Wrapper>

      <Wrapper>
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </Wrapper>
    </MembersWrapper>
  );
};

export default HowToUse;
