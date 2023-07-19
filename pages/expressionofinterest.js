import React from "react";
import FunFacts from "../components/Common/FunFacts";
import PromotionalBanner from "../components/HomePages/PLAYHQ/PromotionalBanner";
import LayoutNoNavbar from "../components/Layouts/LayoutNoNavbar";
import { ExpressionOfInterestForm } from "../components/ExpressionOfInterest/Form";
import { useState } from "react";
import FunFactsTwo from "../components/Common/FunFactsTwo";

const EarlyAccess = () => {
  const [hasSent, setHasSent] = useState(false);
  return (
    <>
      <PromotionalBanner />

      <Benefits />

      <SectionContainers BG={`bg-f9f9f9`}>
        <div className="container mt-5 col-lg-8 offset-lg-2">
          {hasSent ? (
            false
          ) : (
            <h1 className="mb-3 ">SIGN UP FOR EARLY ACCESS</h1>
          )}

          {hasSent ? (
            false
          ) : (
            <p >
              Fill out the form below to express your interest in early access
              to Fixtura. We will be in touch with you soon with more
              information on how to become part of our exclusive group of 50
              clubs and associations. Don't miss out on this opportunity to take
              your online presence to the next level with Fixtura.
            </p>
          )}

          <ExpressionOfInterestForm setHasSent={setHasSent} />
        </div>
      </SectionContainers>

      <FunFacts />
      <FunFactsTwo />
    </>
  );
};

EarlyAccess.getLayout = (page) => <LayoutNoNavbar>{page}</LayoutNoNavbar>;

export default EarlyAccess;

const SectionContainers = (props) => {
  const { BG = "bg-fcfbfb" } = props;
  return (
    <div className={`${BG} pt-100 pb-70`}>
      <div className="container">{props.children}</div>
    </div>
  );
};

const Benefits = () => {
  return (
    <div className=" ptb-100">
      <div className="container">
        <div className="section-title">
          <h2>Join Our Early Access Program</h2>
          <h3 className="text-center mb-4">
            Be Among the First to Try Our Revolutionary AI-Powered Content
            Creation Platform for Cricket Clubs and Associations
          </h3>
          <p>
            Fixtura is an innovative AI-powered platform designed to make it
            easy for cricket clubs and associations to create high-quality
            videos, images, and written content that engage their members and
            players. With our early access program, you can be one of the first
            50 clubs and associations to experience Fixtura's benefits
            first-hand.
          </p>
        </div>
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12">
            <div className="saas-how-it-works-content white-color">
              <ul>
                <li
                  data-aos="fade-in"
                  data-aos-duration="1200"
                  data-aos-delay="100"
                  className="aos-init aos-animate"
                >
                  <i className="fa-solid fa-clock"></i>
                  <h3>Save Time and Resources</h3>
                  <p>
                    Let Fixtura handle the creation of fixture and results
                    content for you, so you can save time and hassle.
                  </p>
                </li>
                <li
                  data-aos="fade-in"
                  data-aos-duration="1200"
                  data-aos-delay="200"
                  className="aos-init aos-animate"
                >
                  <i className="icon fa-solid fa-pencil-alt"></i>
                  <h3>Create High-Quality Content</h3>
                  <p>
                    Engage your members with dynamic and eye-catching videos,
                    images, and written content that showcase your club or
                    association in a professional and visually appealing way.
                  </p>
                </li>
                <li
                  data-aos="fade-in"
                  data-aos-duration="1200"
                  data-aos-delay="300"
                  className="aos-init aos-animate"
                >
                  <i className="icon fa-solid fa-users"></i>
                  <h3>Engage your members</h3>
                  <p>
                    Keep your members informed and engaged with dynamic and
                    eye-catching videos, images, and written content
                  </p>{" "}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div
              className="saas-how-it-works-image aos-init aos-animate"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              <img
                src="/images/Moss_Vale_Cricket_Club_Ladder_3d3a441b8864.png"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
