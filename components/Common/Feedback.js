import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import Link from "next/link";
import { trackButtonClick } from "../../lib/GA";

const Feedback = () => {
  return (
    <>
      <div className="feedback-area ptb-100">
        <div className="container">
          <div className="feedback-list">
            <div className="quotes-icon">
              <img
                src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Logo_F_white_813c61741d.png"
                alt="icon"
              />
            </div>

            <Swiper
              pagination={{
                clickable: true,
              }}
              spaceBetween={30}
              slidesPerView={1}
              modules={[Pagination]}
              className="feedback-slides"
            >
              <SwiperSlide>
                <div className="single-feedback">
                  <img
                    style={{ width: "100px" }}
                    src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Cricket_NSW_Shires_Sq_90d1263d3a.png"
                    className="client5"
                    alt="client"
                    data-aos="zoom-in"
                    data-aos-duration="1200"
                    data-aos-delay="600"
                  />
                  <p>
                    CNSW Sydney Shires rekindled their online engagement after a
                    two-year gap, now posting weekly updates and even starting
                    an Instagram account, all powered by Fixtura's consistent
                    stream of content. The historic league now celebrates its
                    legacy and current achievements with fresh, weekly
                    narratives for all clubs.
                  </p>

                  <div className="bar"></div>

                  <h3>CNSW Sydney Shires</h3>
                  <Link href="https://www.instagram.com/sydneyshirescricket/">
                    <a
                      className="custom-btn"
                      target="_blank"
                      onClick={() =>
                        trackButtonClick("How Fixtura is Helping Sydney Shires Instagram")
                      }
                    >
                      Instagram Account
                    </a>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="single-feedback">
                  <img
                    style={{ width: "100px" }}
                    src="https://fixtura.s3.ap-southeast-2.amazonaws.com/logo_092281d6e5.png"
                    className="client5"
                    alt="client"
                    data-aos="zoom-in"
                    data-aos-duration="1200"
                    data-aos-delay="600"
                  />
                  <p>
                    Runaway Bay CC, a premier club with multiple team divisions
                    in the Gold Coast, now effortlessly manages their weekly
                    content thanks to Fixtura. Delivered every Monday at 9 AM,
                    their social media and newsletter narratives are ready to
                    publish, capturing the club's vibrant energy and competitive
                    spirit.
                  </p>

                  <div className="bar"></div>

                  <h3>Runaway Bay CC</h3>
                  <Link href="https://www.facebook.com/RunawayBayCricketClub">
                    <a
                      className="custom-btn"
                      target="_blank"
                      onClick={() =>
                        trackButtonClick("How Fixtura is Helping RBCC Facebook")
                      }
                    >
                      Facebook page
                    </a>
                  </Link>
                </div>
              </SwiperSlide>

              <SwiperSlide>
                <div className="single-feedback">
                  <img
                    style={{ width: "100px" }}
                    src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Icon_Social_Round_d44ffcbf95.png"
                    className="client5"
                    alt="client"
                    data-aos="zoom-in"
                    data-aos-duration="1200"
                    data-aos-delay="600"
                  />
                  <p>
                    The Logan District Association in Queensland, harnessing
                    Fixtura's asset delivery, now posts regular updates
                    effortlessly across their community. With no need to dig
                    through scorecards or design creatives, their focused posts
                    on players and fixtures have seen a significant boost in
                    engagement this season.
                  </p>

                  <div className="bar"></div>

                  <h3>Logan District Cricket Association</h3>

                  <Link href="https://www.facebook.com/logandistrictca">
                    <a
                      className="custom-btn"
                      target="_blank"
                      onClick={() =>
                        trackButtonClick(
                          "How Fixtura is Helping LOGAN Facebook"
                        )
                      }
                    >
                      Facebook page
                    </a>
                  </Link>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        {/* Client image */}
        <div className="client-image-box">
          <img
            style={{ width: "100px" }}
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/JCC_GOLD_Full_Logo_d39a7d905c.png"
            className="client1"
            alt="client"
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="200"
          />

          <img
            style={{ width: "100px" }}
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Pennant_Hills_Cricket_Club_0a0760ec1d.jpg"
            className="client2"
            alt="client"
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="300"
          />

          <img
            style={{ width: "100px" }}
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Icon_Social_Round_d44ffcbf95.png"
            className="client3"
            alt="client"
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="400"
          />

          <img
            style={{ width: "100px" }}
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/FREYBERG_CRICKET_CLUB_778d98c089.png"
            className="client4"
            alt="client"
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="500"
          />

          <img
            style={{ width: "100px" }}
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/logo_092281d6e5.png"
            className="client5"
            alt="client"
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="600"
          />

          <img
            style={{ width: "100px" }}
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Cricket_NSW_Shires_Sq_90d1263d3a.png"
            className="client6"
            alt="client"
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="700"
          />

          <img
            style={{ width: "100px" }}
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/20231012_230234_0000_20231012_230902_0000_802ce2cece.png"
            className="client7"
            alt="client"
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="800"
          />

          <img
            style={{ width: "100px" }}
            src="https://fixtura.s3.ap-southeast-2.amazonaws.com/mvcc_club_logo_d94e3b9556.jpeg"
            className="client8"
            alt="client"
            data-aos="zoom-in"
            data-aos-duration="1200"
            data-aos-delay="900"
          />
        </div>
      </div>
    </>
  );
};

export default Feedback;
