import React, { useState } from "react";
import axios from "axios";
import PageBanner from "../components/Common/PageBanner";
import Section from "../components/UI/DefaultSection";
import Meta from "../components/Layouts/Meta";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("Sending password reset email...");
    try {
      await axios.post(
        "https://fixtura-backend.herokuapp.com/api/auth/forgot-password",
        {
          email,
        }
      );
      setMessage("A password reset email has been sent to your email address.");
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };
  const SectionData = {
    title: "Forgot your Password?",
    paragraphs: [
      `To reset your password for Fixtura, please enter the email address
    that you used to sign up for the service. You will then receive
    instructions on how to create a new password.`,
    ],
  };

  return (
    <>
      <Meta
        title="Password Request - Fixtura: Secure Account Access"
        description="Request a password reset for your Fixtura account. We ensure secure and easy access to your sports club's digital media tools."
        keywords="Password request, Fixtura account access, secure password reset, sports club account recovery"
      />
      <PageBanner
        pageTitle="Forgot your Password"
        BGImage="/images/PLAYHQ-BG-RAINDROPS.jpg"
      />
      <Section {...SectionData} color="light">
        {message && <MessageContainer message={message} />}
        {!loading && (
          <div className="contact-form ptb-100">
            <form onSubmit={handleSubmit}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        className="form-control-343a40"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-sm-12">
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      disabled={loading}
                    >
                      Send password reset email
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </Section>
    </>
  );
};

export default ForgotPasswordForm;

const MessageContainer = ({ message }) => {
  return (
    <div className="contact-form ptb-100">
      <div className="contact-title">
        <h2>Forgot your Password?</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};
