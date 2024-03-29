import React from "react";
import { useMantineTheme } from "@mantine/core";

const FunFactsTwo = () => {
  const theme = useMantineTheme()
  return (
    <>
  <div className="funfacts-area ptb-100 bg-fcfbfb"> 
    <div className="container">
      <div className="section-title">
        <h2>Join the First 50 Clubs and Associations</h2>
        <p>Be part of a select group of 50 clubs and associations to experience Fixtura's benefits first-hand</p>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-3 col-sm-6" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
          <div className="funfact px-3 gradient-color" >
            <i className="fa-solid fa-circle-check"></i>
            <h4 className="color-white">AI-Generated</h4>
            <p className="color-white">Get high-quality, customizable content generated by our advanced AI technology</p>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
          <div className="funfact px-3 gradient-color" >
            <i className="fa-solid fa-clock"></i>
            <h4 className="color-white">Save Timer</h4>
            <p className="color-white">Let Fixtura handle the time-consuming task of creating fixture and results content for you</p>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
          <div className="funfact px-3 gradient-color " >
            <i className="fa-solid fa-users"></i>
            <h4 className="color-white">Engage Members</h4>
            <p className="color-white">Effectively with dynamic and eye-catching videos, images, and written content</p>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6 " data-aos="fade-up" data-aos-duration="1200" data-aos-delay="400">
          <div className="funfact px-3 gradient-color" >
            <i className="fa-solid fa-heart"></i>
            <h4 className="color-white">Customized Content</h4>
            <p className="color-white">Get content tailored to meet your unique needs and goals</p>
          </div>
        </div>
      </div>
      <div className="map-bg">
        <img src="/images/map.png" alt="map" />
      </div>
    </div>
  </div>
</>
  );
};

export default FunFactsTwo;
