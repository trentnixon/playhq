import React from "react";
import PageBanner from "../components/Common/PageBanner";
import Section from "../components/UI/DefaultSection";
import Link from "next/link";
import { Center } from "@mantine/core";
import Meta from "../components/Layouts/Meta";

const Error = () => {
  const SectionData = {
    title: "Error 404: Page not on the pitch.",
    paragraphs: [
      `Don't worry, you can take another run. Head back home or check out our other pages.`,
    ],
  };
  return (
    <>
      <Meta
        title="404: Page Not Found - Fixtura"
        description="The page you're looking for isn't here. Navigate back to Fixtura to explore our digital media solutions for sports clubs."
        keywords="404 error, page not found, Fixtura error page, missing content, sports media navigation"
      />
      <PageBanner
        pageTitle="Looks like you played and missed at one there!"
        BGImage="/images/page-banner3.jpg"
      />
      <Section {...SectionData} color="light">
        <Center>
          <div className="back-btn">
            <Link legacyBehavior href="/">
              <a className="btn btn-primary">Go Back Home</a>
            </Link>
          </div>
        </Center>
      </Section>
    </>
  );
};

export default Error;
