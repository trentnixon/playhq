import { Center, Image } from "@mantine/core";
import { H, P } from "../../../Members/Common/Type";
import Link from "next/link";

const PersonalizePoints = () => {
  return (
    <>
      <div className="about-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12">
              <div className="about-image">
                <video
                  className="rounded-10"
                  src="https://fixtura.s3.ap-southeast-2.amazonaws.com/Up_Coming_Fixtures_with_AIVO_68cfb8097e.mp4"
                  autoPlay
                  muted
                  loop
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              <div className="about-content about-content-two">
                <div className="section-title">
                  <H>How to Get Started!</H>
                </div>

                <div className="about-text"></div>

                <div className="about-text">
                  <ul>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <P>
                        <strong>Get in Touch: </strong> Reach out to our design
                        team to discuss your ideas and needs
                      </P>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <P>
                        <strong>Design Consultation :</strong> Work with our
                        experts to create a personalized plan.
                      </P>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <P>
                        <strong>Review & Approve :</strong> Check out the custom
                        designs and give your approval.
                      </P>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <P>
                        <strong>Prepare for the Season:</strong> Enjoy peace of
                        mind knowing your digital assets are taken care of,
                        ready to wow your fans and sponsors.
                      </P>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <P>
                        <strong>Beyond Business:</strong> With Fixtura, you gain
                        more than a service—you gain a teammate, a confidant,
                        and a supporter in amplifying your narrative across
                        Cricket, AFL, and Netball.
                      </P>
                    </li>
                  </ul>
                  <Center>
                    <Link legacyBehavior href="/contact">
                      <a className="btn btn-primary">Get in Touch</a>
                    </Link>
                  </Center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalizePoints;
