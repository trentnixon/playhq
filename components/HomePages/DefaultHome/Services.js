import React from "react";
import Link from "next/link";

const Services = () => {
  return (
    <>
      <div className="bg-fcfbfb pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <h2>What We Do</h2>
            <p>
              FIXTURA, the premier provider of AI-generated social
              media content for sports clubs and associations. In partnership with PlayHQ, we offer a range of video and image content that can
              be easily shared with your members via social media and email.</p> 
              <br />
            <p>
              Our AI-powered platform allows you to effortlessly publish match
              reports and weekend summaries, keeping your members informed and
              engaged with your club's activity.
            </p>
          
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
                    <a>High quality video with no effort</a>
                  </Link>
                </h3>
                <p>
                  Create HD video for all social media platforms without looking
                  at a video editor or hiring a professional.
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6"
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-delay="100"
            >
              <div className="service-card-one">
                <i className="pe-7s-clock bg-13c4a1"></i>
                <h3>
                  <Link href="/service-details">
                    <a>Set and Forget</a>
                  </Link>
                </h3>
                <p>
                  Sign up, Select your prefered layouts and upload your clubs
                  colors, then sit back and we will do all the rest.
                </p>
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
                <p>
                  Videos and Images emailed to you once a week ready to go.
                  Simply download and post away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
