import React from "react";
import FunFacts from "../components/Common/FunFacts";
import PromotionalBanner from "../components/HomePages/PLAYHQ/PromotionalBanner";
import LayoutNoNavbar from "../components/Layouts/LayoutNoNavbar";
import { ExpressionOfInterestForm } from "../components/ExpressionOfInterest/Form";
import { useState } from "react";
const EarlyAccess = () => {
  const [hasSent, setHasSent] = useState(false);
  return (
    <>
      <PromotionalBanner />
      <SectionContainers>
        <div className="container mt-5 col-lg-8 offset-lg-2">
          <h3 className="text-center mb-4">
            Be one of the First to Try Our Innovative New Product and Elevate
            Your Club's Online Presence
          </h3>
          <p>
            Fixtura is changing the game for cricket clubs and associations with
            our innovative AI-powered platform that makes it easy to create
            high-quality videos, images, and written content. Our goal is to
            help you keep your members and players informed and engaged, so you
            can elevate your club's online presence and build a stronger
            community.
          </p>
        </div>
      </SectionContainers>

      <FunFacts />
      <SectionContainers BG={`bg-f9f9f9`}>
        <div className="container mt-5 col-lg-8 offset-lg-2">
          {hasSent ? (
            false
          ) : (
            <h4 className="mb-3">Register for early access:</h4>
          )}

          {hasSent ? (
            false
          ) : (
            <p>
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
      <SectionContainers>
        <h4 className="mb-3">Benefits:</h4>
        <ul>
          <li>
            Stay ahead of the competition with personalized and professional
            digital assets
          </li>
          <li>
            Save time and hassle by letting Fixtura handle the creation of
            fixture and results content for you
          </li>
          <li>
            Engage your members with dynamic and eye-catching videos, images,
            and written content
          </li>
          <li>
            Access exclusive early access to our platform before the official
            launch
          </li>
          <li>
            Be part of a select group of 50 clubs and associations to experience
            Fixtura's benefits first-hand
          </li>
        </ul>
      </SectionContainers>
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
