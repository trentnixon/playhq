import React from "react";
import Link from "next/link";

const OurWorks = ({ CaseStudies }) => {
  console.log(CaseStudies);
  return (
    <>
      <section className="case-studies-area lg-portfolio ptb-100">
        <div className="container-fluid">
          <div className="section-title">
            <h2>Examples</h2>
            <p>
            With FIXTURA, you can easily keep your social media presence active and relevant, without spending hours creating content.
            </p>
          </div>

          <div className="row justify-content-center">
            {CaseStudies.data.map((study, i) => {
              console.log(study.attributes.Cover.data.attributes.url)
              return (
                <div
                  key={i}
                  className="col-lg-3 col-sm-6"
                  data-aos="fade-up"
                  data-aos-duration="1200"
                  data-aos-delay="100"
                >
                  <div className="work-card">
                    <img src={study.attributes.Cover.data.attributes.url} alt="image" />

                    <div className="content text-center">
                      <span>
                        <Link href="/portfolio">
                          <a>{study.attributes.Name}</a>
                        </Link>
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
        </div>
      </section>
    </>
  );
};

export default OurWorks;
