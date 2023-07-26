import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

const AboutContent = () => {
  const [toggler, setToggler] = useState(false);
  return (
    <>
      <div className="about-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12">
              <div className="about-image">
                <img
                  src="/images/aboutFixturaImg1.jpg"
                  alt="image"
                  className="rounded-10"
                />
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              <div className="about-content about-content-two">
                <div className="section-title">
                  <h2>What is Fixtura?</h2>
                  <p>
                    Fixtura is your go-to web application for personalized
                    digital assets designed exclusively for cricket clubs and
                    associations. Our team of experts harnesses cutting-edge
                    technology, including AI, to craft innovative and
                    high-quality content tailored to your unique needs and
                    objectives. Whether you want to showcase your players'
                    achievements, engage with your fans, or promote the sport,
                    Fixtura has the expertise and resources to help you achieve
                    your goals.
                  </p>
                </div>

                <div className="about-text">
                  <p>
                    Our comprehensive range of services includes captivating
                    videos, striking images, and AI-generated content. Our
                    videos encompass match reviews, upcoming fixtures, game
                    results, and player profiles, all customized to your club or
                    association, showcasing your players and games in the best
                    light. Moreover, our AI-powered match reports and weekend
                    summaries offer valuable insights and analysis of cricket
                    matches and events.
                  </p>
                </div>

                <div className="about-text">
                  <p>
                    At Fixtura, we are dedicated to empowering cricket clubs and
                    associations with powerful tools and resources to connect
                    with their fanbase and showcase their accomplishments. With
                    a strong commitment to customer service, we work closely
                    with our clients to ensure their digital assets meet their
                    specific requirements and aspirations.
                  </p>
                </div>

                <div className="about-text">
                  <p>
                    Take your cricket club or association to new heights with
                    Fixtura's personalized content solutions. Let us elevate
                    your digital presence and amplify your cricketing journey.
                    Get started today!
                  </p>
                </div>

                <div className="about-text">
                  <h4>Our Mission</h4>
                  <ul>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      To provide personalized, high-quality digital assets to
                      cricket clubs and associations.
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      To help these organizations connect with their fans,
                      showcase their achievements, and gain a competitive edge.
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      To use expertise in sports media, AI, and technology to
                      create innovative, engaging content.
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      To meet the specific needs and goals of clients through
                      customization and personalized service.
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      To be a trusted partner for cricket clubs and associations
                      looking to promote their teams and events.
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

/* <FsLightbox
        toggler={toggler}
        sources={["https://www.youtube.com/embed/bk7McNUjWgw"]}
      /> */
/*  <div className="video-box">
                  <div
                    className="video-btn"
                    onClick={() => setToggler(!toggler)}
                  >
                    <i className="fa-solid fa-play"></i>
                  </div>
                </div> */
