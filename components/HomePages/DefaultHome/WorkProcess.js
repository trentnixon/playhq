import React from "react";

const WorkProcess = () => {
  return (
    <>
      <section className="work-process-area ptb-100">
        <div className="container">
          <div className="section-title">
            <h2>Our Work Process</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="work-process">
            <div 
              data-aos="zoom-in"
              data-aos-duration="1200"
              data-aos-delay="600"
            >
              <img src="/images/man-with-mobile.png" alt="logo" />
            </div>

            <div className="work-process-list">
              <div className="single-work-process">
                <div className="icon">
                  <i className="pe-7s-display1"></i>
                </div>
                <h3>Your Account</h3>
                <span>Visual Design</span>
              </div>

              <div className="single-work-process">
                <div className="icon">
                  <i className="pe-7s-display2"></i>
                </div>
                <h3>Your Association/Club</h3>
                <span>Wireframes</span>
              </div>

              <div className="single-work-process">
                <div className="icon">
                  <i className="pe-7s-airplay"></i>
                </div>
                <h3>Your look</h3>
                <span>Screen Flow</span>
              </div>

              <div className="single-work-process">
                <div className="icon">
                  <i className="pe-7s-note2"></i>
                </div>
                <h3>Data from PlayHQ</h3>
                <span>Requirements</span>
              </div>

              <div className="single-work-process">
                <div className="icon">
                  <i className="pe-7s-light"></i>
                </div>
                <h3>Create Videos</h3>
                <span>User Research</span>
              </div>

              <div className="single-work-process">
                <div className="icon">
                  <i className="pe-7s-sun"></i>
                </div>
                <h3>Your Email</h3>
                <span>Lunch/Analyse</span>
              </div>
            </div>

            <img
              src="/images/circle.png"
              className="rotateme circle-image"
              alt="image"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkProcess;
