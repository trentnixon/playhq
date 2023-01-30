import React from "react";
import Link from "next/link";

//data[0].attributes.asset_category.data.attributes.Identifier

const WorksStyleTwo = ({ CaseStudies }) => {

  const VAR='attributes.asset_category.data.attributes.Identifier'

  function groupByIdentifier(array) {
    const grouped = {};
    array.forEach(item => {
      const identifier = item.attributes.asset_category.data.attributes.Identifier;
      if (!grouped[identifier]) {
        grouped[identifier] = [];
      }
      grouped[identifier].push(item);
    });
    return grouped;
  }


  
  console.log(groupByIdentifier(CaseStudies.data,VAR))
  return (
    <>
      <div className="case-studies-area ptb-100 bg-fcfbfb">
        <div className="container">
          <div className="section-title">
            <h2>What does Fixtura Create?</h2>
            <p>
              Our collection of personalized digital assets includes options
              such as videos, images, and AI-generated content, all designed to
              enhance your club's social media presence. Explore our examples
              and see how we can help bring your club's online presence to new
              heights.
            </p>
          </div>

        {
          Object.keys(groupByIdentifier(CaseStudies.data,VAR)).map((key,i)=>{
              return(
                <>
                  <h1>{key}S</h1>
                  <div className="row justify-content-center">
            {groupByIdentifier(CaseStudies.data,VAR)[key].map((study, i) => {
             //data[0].attributes.asset_category.data.attributes.Identifier
             console.log(study.attributes.asset_category.data.attributes.Identifier)
              return (
                <div className="col-lg-4 col-sm-6">
                  <div className="work-card">
                    <img src={`http://localhost:1337${study.attributes.Cover.data.attributes.formats.medium.url}`} alt="image" />

                    <div className="content">
                      <h3>
                        <Link href="/portfolio-details">
                          <a>{study.attributes.Name}</a>
                        </Link>
                      </h3>
                      <span>
                        <a>{study.attributes.description}</a>
                      </span>

                      <Link href="/portfolio-details">
                        <a className="custom-btn">
                          View {study.attributes.Name}
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
                </>
              )
          })
        }


         
        </div>
      </div>
    </>
  );
};

export default WorksStyleTwo;
