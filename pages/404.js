import React from "react";
import PageBanner from "../components/Common/PageBanner";
import Footer from "../components/Layouts/Footer";
import Section from "../components/UI/DefaultSection";
import Link from "next/link";
import { Center } from "@mantine/core";

const Error = () => {
  const SectionData = {
    title: "Error 404: Page not on the pitch.",
    paragraphs: [
      `Don't worry, you can take another run. Head back home or check out our other pages.`,
    ],
  };
  return (
    <>
      <PageBanner
        pageTitle="Looks like you played and missed at one there!"
        BGImage="/images/page-banner3.jpg"
      />
      <Section {...SectionData} color="light">
        <Center>
          <div className="back-btn">
            <Link href="/">
              <a className="btn btn-primary">Go Back Home</a>
            </Link>
          </div>
        </Center>
      </Section>
    </>
  );
};

export default Error;
