import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

const AboutContent = () => {
  const [toggler, setToggler] = useState(false);
  return (
    <>
      <FsLightbox
        toggler={toggler}
        sources={["https://www.youtube.com/embed/bk7McNUjWgw"]}
      />

      <div className="about-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12">
              <div className="about-image">
                <img
                  src="/images/man-with-mobile.png"
                  alt="image"
                  className="rounded-10"
                />

                <div className="video-box">
                  <div
                    className="video-btn"
                    onClick={() => setToggler(!toggler)}
                  >
                    <i className="fa-solid fa-play"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              <div className="about-content about-content-two">
                <div className="section-title">
                  <h2>What is a Fixtura?</h2>
                  <p>
                  Fixtura is a website that specializes in creating personalized digital assets for cricket clubs and associations. Our experts use the latest technology, including AI, to produce high-quality, innovative content tailored to the specific needs and goals of our clients. Whether you are a club looking to showcase your players and achievements or an association looking to engage with your fans and promote the sport, we have the expertise and resources to help you succeed.                  </p>
                </div>

                <div className="about-text">
                  <p>
                  Our services include a range of digital assets such as videos, images, and AI-generated content. Our videos include a range of content such as match reviews, upcoming fixtures, game results, and profiles of top players. All of these videos are customized to the specific club or association, featuring players and games representative of their experience and season. We also use AI to generate detailed match reports and weekend summaries that provide valuable insights and analysis of cricket matches and events                  </p>
                </div>

                <div className="about-text">
                  <p>
                  In addition to our videos and AI-generated content, we also offer a range of images and other digital assets that can be used by cricket clubs and associations to promote their teams and events. We are dedicated to providing our clients with the tools and resources they need to connect with their fans and showcase their achievements.                  </p>
                </div>

                <div className="about-text">
                  <p>
                  We are committed to delivering a high level of customer service and support to our clients and work closely with them to ensure their digital assets meet their specific needs and goals. If you are interested in using our services to promote your club or association, we welcome the opportunity to learn more about your needs and how we can help.                  </p>
                </div>

                <div className="about-text">
                  <h4>Our Mission</h4>
                  <ul>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      To provide personalized, high-quality digital assets to cricket clubs and associations.
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      To help these organizations connect with their fans, showcase their achievements, and gain a competitive edge.
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      To use expertise in sports media, AI, and technology to create innovative, engaging content.
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      To meet the specific needs and goals of clients through customization and personalized service.
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      To be a trusted partner for cricket clubs and associations looking to promote their teams and events.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
