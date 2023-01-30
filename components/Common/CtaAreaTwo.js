import React from "react";
import Link from "next/link";

const CtaAreaTwo = () => {
  return (
    <>
      <div className="cta-area-two ptb-100">
        <div className="container">
          <div className="cta-content">
            <h3>Effortless fixture and results content creation.</h3>
            <span>Save time and hassle by letting Fixtura handle the creation of fixture and results content for you</span>
          </div>
          <div
            className="cta-btn-box"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <Link href="/contact">
              <a className="custom-btn">Contact Us</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CtaAreaTwo;
