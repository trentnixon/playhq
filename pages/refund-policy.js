import React from "react";
import PageBanner from "../components/Common/PageBanner";
import Meta from "../components/Layouts/Meta";

const RefundPolicy = () => {
  return (
    <>
      <Meta
        title="Refund Policy - Fixtura: Understanding Our Terms"
        description="Read Fixtura's refund policy to understand the terms and conditions for refunds on our subscription plans."
        keywords="Refund policy, Fixtura subscription, digital media refund, user terms, refund conditions"
      />
      <PageBanner
        pageTitle="Refund Policy"
        BGImage="/images/BG-Images/f180918696.jpg"
        position={`center center`}
      />

      <div className="text-container ptb-100">
        <div className="container">
          <h1>Refund Policy</h1>

          <h2>Introduction</h2>
          <p>
            Fixtura is dedicated to providing high-quality digital content
            creation services for cricket clubs and associations. Our refund
            policy aims to ensure transparency and fairness for all subscribers.
            Please review the following policy before purchasing a season pass.
          </p>

          <h2>General Refund Policy</h2>
          <ul>
            <li>
              <span>Subscription Types and Terms:</span>
              <ul>
                <li>
                  <strong>30-Day Pass:</strong> Access for 30 days from the date
                  of purchase. No refunds are available for 30-Day Passes.
                </li>
                <li>
                  <strong>90-Day Pass:</strong> Access for 90 days from the date
                  of purchase.
                </li>
                <li>
                  <strong>1-Year Pass:</strong> Access for 365 days from the
                  date of purchase.
                </li>
              </ul>
              <p>
                All plans offer the same features and benefits; only the
                duration and cost differ.
              </p>
            </li>
            <li>
              <span>Payment Method:</span> All payments are processed securely
              through Stripe.
            </li>
            <li>
              <span>Eligibility for Refunds:</span>
              <p>
                - <strong>30-Day Pass:</strong> No refunds are available.
                <br />- <strong>90-Day Pass and 1-Year Pass:</strong>
                <ul>
                  <li>
                    Refunds are available for the remaining subscription period
                    if the cancellation is requested within the first 30 days of
                    the subscription.
                  </li>
                </ul>
              </p>
              <p>
                <strong>Partial Refund Policy:</strong> For 90-Day and 1-Year
                Passes, subscribers can apply for a refund for the remaining
                time within 30 days of the plan starting. Since assets are
                already created upon purchase, full refunds are not available.
              </p>
              <p>
                <strong>Special Conditions:</strong> No full refunds are granted
                outside the standard 30-day period. Users have a 14-day free
                trial to evaluate the service.
              </p>
            </li>
            <li>
              <span>Requesting a Refund:</span>
              <p>
                To request a refund, contact us via Facebook or email at{" "}
                <a href="mailto:admin@fixtura.com.au">admin@fixtura.com.au</a>{" "}
                with your order number and reason for cancellation. Refund
                requests must be submitted within 30 days of the subscription
                start date.
              </p>
              <p>
                <strong>Required Documentation:</strong> Subscribers need to
                provide their order number and the reason for the refund
                request.
              </p>
            </li>
            <li>
              <span>Processing Refunds:</span>
              <p>
                Approved refund requests will be processed within 7 business
                days. Refunds will be credited to the original payment method.
              </p>
            </li>
          </ul>

          <h2>Special Conditions</h2>
          <ul>
            <li>
              <span>Free Trial Period:</span>
              <p>
                Users are offered a 14-day free trial before the season pass
                begins. Extensions to the free trial period may be requested if
                the account holder experiences two consecutive weekends of
                abandoned matches.
              </p>
            </li>
            <li>
              <span>Prolonged Service Disruptions:</span>
              <p>
                As the service is not time-specific, downtime does not qualify
                for refunds or extensions.
              </p>
            </li>
            <li>
              <span>Promotional Subscriptions:</span>
              <p>
                Promotional subscriptions are treated the same as regular
                subscriptions regarding refunds.
              </p>
            </li>
            <li>
              <span>Upgrades and Downgrades:</span>
              <p>
                Currently, there are no options for upgrading or downgrading
                subscriptions.
              </p>
            </li>
          </ul>

          <h2>Subscription Cancellations</h2>
          <ul>
            <li>
              <span>Automatic Renewals:</span>
              <p>
                Subscriptions will automatically renew at the end of the
                subscription term unless canceled. Subscribers will receive a
                reminder email 7 days before the renewal date.
              </p>
            </li>
            <li>
              <span>Cancellation Policy:</span>
              <p>
                Subscribers can cancel their subscriptions at any time through
                their account settings or by contacting support. Cancellation
                will prevent the next billing cycle but does not trigger a
                refund for the remaining subscription period.
              </p>
            </li>
          </ul>

          <h2>Refund Process and Documentation</h2>
          <ul>
            <li>
              <span>Requesting a Refund:</span>
              <p>
                Contact us via Facebook or email at{" "}
                <a href="mailto:admin@fixtura.com.au">admin@fixtura.com.au</a>.
                Provide your order number and the reason for the refund request.
              </p>
            </li>
            <li>
              <span>Handling Disputes:</span>
              <p>
                Refund decisions are final. Disputes can be addressed by
                contacting our support team for further review.
              </p>
            </li>
          </ul>

          <h2>Notification and Communication</h2>
          <ul>
            <li>
              <span>Policy Changes:</span>
              <p>
                Any changes to the refund policy will be communicated to
                subscribers via email. Changes take effect immediately upon
                notification, with no grace period.
              </p>
            </li>
          </ul>

          <h2>Customer Support</h2>
          <ul>
            <li>
              <span>Response Time:</span>
              <p>
                We aim to respond to refund requests within 2 business days.
                Contact us via Facebook or email at{" "}
                <a href="mailto:admin@fixtura.com.au">admin@fixtura.com.au</a>{" "}
                for assistance.
              </p>
            </li>
          </ul>

          <h2>Legal and Compliance</h2>
          <ul>
            <li>
              <span>Compliance with Laws:</span>
              <p>
                We adhere to all relevant local and international laws regarding
                refunds and subscription cancellations.
              </p>
            </li>
          </ul>

          <p>
            By purchasing a subscription, you agree to this refund policy. For
            any questions or concerns, please contact our support team. Thank
            you for choosing Fixtura.
          </p>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
