import React, { useEffect } from "react";
import { Gradient } from "../../utils/Gradient";
import { Title } from "@mantine/core";

const PageBanner = ({ pageTitle, BGImage, position = "center center" }) => {
  return (
    <>
      <div className="page-title-area">
        <MainCSSBanner />
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container">
              <Title>{pageTitle}</Title>
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
    gradient.initGradient("#gradient-canvas-innerPage");
  }, []);

  return (
    <canvas
      id="gradient-canvas-innerPage"
      className="innerPage"
      data-transition-in
    />
  );
};
