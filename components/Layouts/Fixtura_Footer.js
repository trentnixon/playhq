import React from "react";
import Link from "next/link";
import { P } from "../Members/Common/Type";

const FooterDark = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer-area footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6">
              <div className="single-footer-widget ml-4">
                <h3>Business Links</h3>

                <ul className="list">
                  <li>
                    <Link legacyBehavior href="/about">
                      <a>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/resources">
                      <a>Resources</a>
                    </Link>
                  </li>

                  <li>
                    <Link legacyBehavior href="/faq">
                      <a>Faq</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/privacy-policy">
                      <a>Privacy Policy</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/terms-conditions">
                      <a>Terms & Conditions</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6">
              <div className="single-footer-widget">
                <h3>Get in Touch</h3>

                <ul className="get-in-touch">
                  <li className="pt-2">
                    <i className="fa-solid fa-headset"></i>
                    <Link legacyBehavior href="/contact">
                      <a>Contact</a>
                    </Link>
                  </li>
                  <li className="pt-2">
                    <i className="fa-brands fa-facebook-f"></i>
                    <a href="https://www.facebook.com/profile.php?id=100095406210560">
                      Message us on facebook
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="single-footer-widget">
                <div className="logo">
                  <Link legacyBehavior href="/">
                    <a>
                      <img
                        src="/images/image_processing20220611-3013-fimmni.png"
                        alt="Logo"
                      />
                    </a>
                  </Link>
                </div>
                <P Weight={900}>
                  Fixtura: Your Premier Digital Solution for sports Clubs &
                  Associations
                </P>
                <P>
                  Embrace the dynamic world of sports with Fixtura, your
                  ultimate partner for AI-driven, personalized digital assets
                  across Cricket, AFL, and Netball. With our deep understanding
                  of sports media, innovative AI technology, and creative
                  expertise, we deliver compelling content that drives fan
                  engagement and celebrates your club's achievements. Whether
                  it's securing a competitive edge or commemorating your team's
                  victories, Fixtura puts your club in the limelight across all
                  your favorite sports.
                </P>

                <ul className="social-links">
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=100095406210560"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  {/* <li>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li> */}

                  <li>
                    <a
                      href="https://www.instagram.com/fixtura_ai/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-area">
          <div className="container">
            <P color="#ffffff" textAlign={"center"} size="xs">
              Copyright &copy; {currentYear} FIXTURA - Revolutionizing Digital
              Content for Sports Clubs & Associations.
            </P>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterDark;
