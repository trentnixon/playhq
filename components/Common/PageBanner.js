import React from "react";

const PageBanner = ({ pageTitle, BGImage, position='center center' }) => {
  return (
    <>
      <div className="page-title-area" style={{ backgroundImage: `url(${BGImage})`, backgroundPosition:position }}>
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
