import React from "react";
import Link from "next/link";
import { Space, Text } from "@mantine/core";

const Services = () => {
  return (
    <>
      <div className="bg-eaf6ff pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>Your Premier Destination for Customized Cricket content</h2>
            <Text>
              Fixtura is the premier provider of AI-generated social media
              content for sports clubs and associations. We provide cricket
              clubs and associations with a comprehensive range of articles,
              videos, and images. Effortlessly share captivating content with
              your members across social media and email platforms.
            </Text>

            <Space h={15} />
            <Space h={10} />
            <Text>
              Our AI-powered platform allows you to effortlessly publish match
              reports and weekend summaries, keeping your members informed and
              engaged with your club&apos;s activity.
            </Text>
          </div>

          <div className="row justify-content-center">
            <div
              className="col-lg-4 col-sm-6"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="200"
            >
              <div className="service-card-one">
                <i className="pe-7s-video bg-6610f2"></i>
                <h3>
                  <Link href="/service-details">
                    <a>Create High-Quality Content with Ease</a>
                  </Link>
                </h3>
                <Text>
                  Elevate your online presence on social media platforms with
                  visually captivating images and engaging articles. With
                  FIXTURA, you can effortlessly generate professional-grade
                  content without the need to dive into scorecards
                </Text>
              </div>
            </div>

            <div
              className="col-lg-4 col-sm-6"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="300"
            >
              <div className="service-card-one">
                <i className="pe-7s-mail-open-file bg-ffb700"></i>
                <h3>
                  <Link href="/service-details">
                    <a>Content Delivered to you</a>
                  </Link>
                </h3>
                <Text>
                  Experience seamless access to your tailored videos, images,
                  and articles. Fixtura delivers your assets directly to you
                  each week, ensuring hassle-free sharing with your audience.
                </Text>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="400"
            >
              <div className="service-card-one">
                <i className="pe-7s-clock bg-13c4a1"></i>
                <h3>
                  <Link href="/service-details">
                    <a>Set and Forget</a>
                  </Link>
                </h3>
                <Text>
                  Our automated system takes care of all the hard work, ensuring
                  hassle-free content creation. Sit back, relax, and let FIXTURA
                  deliver high-quality assets that will elevate your club's
                  online presence
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
