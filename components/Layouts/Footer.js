import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <img src="/images/logo.png" alt="Logo" />
                    </a>
                  </Link>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam.
                </p>

                <ul className="social-links">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget ml-4 pl-5">
                <h3>Explore</h3>

                <ul className="list">
                  <li>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/about">
                      <a>About</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services">
                      <a>Services</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/portfolio">
                      <a>Portfolio</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/team">
                      <a>Team</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget ml-4">
                <h3>Quick Links</h3>

                <ul className="list">
                  <li>
                    <Link href="/contact">
                      <a>Contact Us</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing">
                      <a>Pricing</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq">
                      <a>Faq</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a>Privacy Policy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-conditions">
                      <a>Terms & Conditions</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="single-footer-widget">
                <h3>Get in Touch</h3>

                <ul className="get-in-touch">
                  <li>
                    <i className="fa-solid fa-location-dot"></i> 2750 Quadra Street
                    Victoria, Canada.
                  </li>
                  <li>
                    <i className="fa-solid fa-headset"></i>
                    <a href="tel:+324-9442-515">+324-9442-515</a> 
                    <br />
                    <a href="tel:+324-9442-515">+324-9442-999</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope"></i>
                    <a href="mailto:hello@pungent.com">hello@pungent.com</a>
                    <a href="mailto:support@pungent.com">support@pungent.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-area">
          <div className="container">
            <p>
              Copyright &copy; {currentYear} Pungent. All Rights Reserved By{" "}
              <a href="https://envytheme.com" target="_blank" rel="noreferrer">
                EnvyTheme
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
