import { Image } from "@mantine/core";
import { H, P } from "../Members/Common/Type";

const AboutContent = () => {
  return (
    <>
      <div className="about-area ptb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-md-12">
              <div className="about-image">
                <Image
                  src={
                    "https://fixtura.s3.ap-southeast-2.amazonaws.com/Mudgeeraba_Nerang_and_Districts_Cricket_Club_Weekend_Result_Senior_5bcf4b2f61df_1cf23f4392.png"
                  }
                  className="rounded-10"
                />
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              <div className="about-content about-content-two">
                <div className="section-title">
                  <H>
                    Introducing Fixtura: Elevating Sports' Digital Landscape
                  </H>
                  <P>
                    At Fixtura, we're more than just a platform; we're your
                    digital ally across Cricket, AFL, and Netball. We amplify
                    your sports journey, celebrate your achievements, and
                    enhance your connection with fans in a digital age where
                    standing out is paramount.
                  </P>
                  <H align="left" size="h3" mb={10}>
                    Why Fixtura?
                  </H>
                  <P>
                    <strong>Innovation Meets Passion:</strong> Combining
                    cutting-edge technology with our passion for sports, we
                    deliver tailored videos that animate match reviews,
                    fixtures, and results. Our immersive images capture iconic
                    moments, and our AI-powered content serves as your
                    analytical sidekick on game days.
                  </P>
                  <P>
                    <strong>Crafted for You:</strong> Every club and association
                    has a story. We're dedicated to ensuring that your story is
                    told in a way that's as unique as your team.
                  </P>
                  <P>
                    <strong>Your Partner in Success:</strong> With Fixtura, you
                    gain more than a service; you gain a partner. We're
                    committed to ensuring your digital content resonates with
                    your ethos, objectives, and dreams across all your sports.
                  </P>
                </div>

                <div className="about-text"></div>

                <div className="about-text">
                  <h4>Our Mission</h4>
                  <ul>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <P>
                        <strong>Celebrate Sports:</strong> Craft world-class
                        digital assets that highlight the essence of Cricket,
                        AFL, and Netball clubs and associations.
                      </P>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <P>
                        <strong>Connect & Engage:</strong> Build lasting
                        connections with fans across all sports, igniting their
                        passion and boosting your digital prominence.
                      </P>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <P>
                        <strong>Innovative Excellence:</strong> Seamlessly
                        integrate sports media expertise, AI-driven insights,
                        and technological prowess to deliver fresh, engaging
                        content for all your sporting needs.
                      </P>
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check"></i>
                      <P>
                        <strong>Your Story, Your Way:</strong> Prioritize
                        customization, ensuring every piece of content is a true
                        reflection of your multifaceted sports journey.
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutContent;
