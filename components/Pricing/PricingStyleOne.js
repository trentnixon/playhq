import React from "react";
import Link from "next/link";

/*
Fixtura
Wicketly
Bowlify
*/

const PricingStyleOne = () => {
  return (
    <>
      <div className="pricing-area ptb-100 bg-f9f6f6">
        <div className="container">
          <div className="section-title">
            <h2>One plan One Price Policy</h2>
            <p>Need help choosing a plan? No problem, we only offer one!</p>
            <p>
              Unlike other services that may have multiple tiers of plans to
              choose from, we have a single, all-inclusive option that covers
              everything you need and any future additions we make.
            </p>
            <p>
              So you can focus on getting the best value for your club, without
              worrying about what's included in each plan.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div
                className="pricing-table active-plan"
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="200"
              >
                <div className="pricing-header">
                  <h3>The Only Plan</h3>
                </div>

                <div className="price">
                  <span>
                    <sup>$</sup>12.50
                    <span>/Weekly</span>
                  </span>
                </div>

                <div className="pricing-features">
                  <ul>
                    <li className="active">10 video options covering various grades and games</li>
                    <li className="active">Up to 44* customized images generated per weekend</li>
                    <li className="active">AI-generated match reports, summaries, posts, and emails for all games</li>
                    <li className="active">Customization with your club's colors and branding</li>
                    <li className="active">Option to include title sponsors in your assets</li>
                  </ul>
                </div>

                <div className="pricing-footer">
                  <Link href="/SignUp/">
                    <a className="btn btn-primary">Sign up</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingStyleOne;
