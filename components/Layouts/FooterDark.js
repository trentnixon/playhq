import React from "react";
import Link from "next/link";

const FooterDark = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="footer-area footer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-12">
              <div className="single-footer-widget">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <img src="/images/image_processing20220611-3013-fimmni.png" alt="Logo" />
                    </a> 
                  </Link>
                </div>

                <p>
                Fixtura provides personalized digital assets to help cricket clubs and associations connect with fans, showcase achievements, and gain a competitive edge. We create innovative content using sports media, AI, and technology, and offer customization and personalized service to meet clients&apos; specific needs and goals. We aim to be a trusted partner for cricket clubs and associations looking to promote their teams and events 
                </p>

                <ul className="social-links">
                  <li>
                    <a href="https://www.facebook.com/" target="_blank" without rel="noreferrer">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/" target="_blank" without rel="noreferrer">
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                
                  <li>
                    <a href="https://www.instagram.com/" target="_blank" without rel="noreferrer">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            

            <div className="col-lg-4 col-sm-6">
              <div className="single-footer-widget ml-4">
                <h3>Business Links</h3>

                <ul className="list">
                 
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

            <div className="col-lg-4 col-sm-6">
              <div className="single-footer-widget">
                <h3>Get in Touch</h3>

                <ul className="get-in-touch">
                 
                  <li className="pt-2">
                    <i className="fa-solid fa-headset"></i>
                    <Link href="/contact">
                      <a>Contact</a>
                    </Link>
                  </li>
                  <li className="pt-2">
                    <i className="fa-solid fa-envelope"></i>
                    <a href="mailto:hello@pungent.com">info@fixtura.com.au</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright-area">
          <div className="container">
            <p>
              Copyright &copy; {currentYear} FIXTURA
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterDark;
