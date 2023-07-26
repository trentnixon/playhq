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
              Copy={` Our collection of personalized digital assets includes options
              such as videos, images, and AI-generated content, all designed to
              enhance your club&lsquo;s social media presence. Explore our
              examples and see how we can help bring your club&lsquo;s online
              presence to new heights.`}
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
