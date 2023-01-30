import React from "react";

const FunFacts = () => {
  return (
    <>
      <div className="pt-100 pb-70 bg-fcfbfb">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6">
              <div
                className="funfact-card"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="100"
              >
                <i className="pe-7s-video"></i>
                <h3>
                  23 <span>videos</span>
                </h3>
                <p>
                Fixtura videos are a great way to keep your members and followers informed about upcoming matches and competitions, with dynamic layouts and all the important details clearly displayed.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div
                className="funfact-card"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="200"
              >
                <i className="pe-7s-photo"></i>
                <h3>
                  50 <span>Images</span>
                </h3>
                <p>
                Fixtura's images are high-quality and tailored to showcase your club or association in a professional and visually appealing way.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div
                className="funfact-card"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="200"
              >
                <i className="pe-7s-news-paper"></i>
                <h3>
                  8 <span>Writeups</span>
                </h3>
                <p>
                Fixtura's AI write ups provide high-quality, customizable content for clubs and associations to use in their communication and marketing efforts. Our advanced AI technology generates unique and engaging articles that can be tailored to your specific needs and goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FunFacts;
