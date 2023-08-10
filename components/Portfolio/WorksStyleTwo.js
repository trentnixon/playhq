import React from "react";
import Link from "next/link";
import { CardsCarousel } from "./Carousel";
import { P } from "../../components/Members/Common/Type";
const WorksStyleTwo = ({ CaseStudies }) => {
  const VAR = "attributes.asset_category.data.attributes.Identifier";

  function groupByIdentifier(array) {
    const grouped = {};
    array.forEach((item) => {
      const identifier =
        item.attributes.asset_category.data.attributes.Identifier;
      if (!grouped[identifier]) {
        grouped[identifier] = [];
      }
      grouped[identifier].push(item);
    });
    return grouped;
  }

  return (
    <>
      <div className="case-studies-area pt-100 pb-60 bg-fcfbfb">
        <div className="container">
          <div className="section-title">
            <h2>What does Fixtura Create?</h2>

            <P
              Copy={`What can Fixtura craft for you? Delve into our digital playground filled with personalized videos, images, and AI-powered write-ups, all tailored to boost your club's online buzz. Take a tour and envision how Fixtura can elevate your club's digital presence!`}
            />
          </div>
        </div>
      </div>
      <div className="case-studies-area pb-100 bg-fcfbfb">
        <div className="container">
          {Object.keys(groupByIdentifier(CaseStudies.data, VAR)).map(
            (key, i) => {
              const carouselData = groupByIdentifier(CaseStudies.data, VAR)[
                key
              ].map((study) => ({
                image: study.attributes.Cover.data.attributes.url,
                title: study.attributes.Name,
                category: key,
                video: study.attributes.VideoExample.data?.attributes?.url,
                MainDescription: study.attributes.MainDescription,
              }));

              console.log(
                groupByIdentifier(CaseStudies.data, VAR)[key][0].attributes
                  .asset_category.data.attributes.description
              );
              return (
                <div key={i} className="pb-100 container">
                  <div className="section-title">
                    <P size={26} Weight={900} Copy={`${key}S`} />
                    <P
                      Copy={
                        groupByIdentifier(CaseStudies.data, VAR)[key][0]
                          .attributes.asset_category.data.attributes.description
                      }
                    />
                  </div>

                  <CardsCarousel data={carouselData} />
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export default WorksStyleTwo;
