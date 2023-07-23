import React, { useEffect } from "react";
import { Gradient } from "../../utils/Gradient";

const PageBanner = ({ pageTitle, BGImage, position = "center center" }) => {
  return (
    <>
     {/*  <MainCSSBanner /> */}
      <div className="page-title-area">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <h2>{pageTitle}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageBanner;

const MainCSSBanner = () => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
  }, []);

  return <canvas id="gradient-canvas" className="innerPage" data-transition-in />;
};
