import React, { useEffect, useState } from "react";

import { fetcher } from "../../lib/api";
import { Container } from "@mantine/core";
import { P } from "../Members/Common/Type";
import Link from "next/link";

// Form initial state
const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
  confirmPassword: null,
  termsAccepted: false,
};

const SignUpForm = () => {
  const [contact, setContact] = useState(INITIAL_STATE);
  const [Registered, setRegistered] = useState(null);
  const [error, setError] = useState(false);
  const [msg, Setmsg] = useState(false);
  const [terms, setTerms] = useState(false); // initialize the value of "terms" to false

  const handleTermsChange = (e) => {
    const { name, value } = e.target;
    //console.log(terms);

    setTerms(!terms); // update the value of "terms" when the checkbox is clicked
    setContact((prevState) => ({ ...prevState, [name]: !terms }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = contact;
    //console.log(name, email);
    try {
      const response = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email: email,
            password: password,
          }),
        }
      );
      //console.log(response);

      if (response.user) {
        setRegistered(true);
        Setmsg(
          "Registration Recieved, you should recied an email to this address to complete the process"
        );
      } else {
        setError(true);
        Setmsg(response.error.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {}, [contact, terms]);

  if (Registered) return <SuccessfulRegistration />;
  if (error)
    return (
      <ErrorRegistration
        error={msg}
        setError={setError}
        setContact={setContact}
      />
    );
  return (
    <>
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <P
            textAlign="center"
            size={"1.6em"}
            Weight={900}
            Copy={`Unlock the Power of Effortless Content Creation.`}
          />
          <P
            textAlign="center"
            Copy={`Sign up now to
            customize your club's profile, access premium video options, and
            receive weekly personalized assets delivered to your inbox.`}
          />
        </div>
        <Container size={"sm"}>
          <form onSubmit={handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="form-control"
                      value={contact.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="form-control"
                      value={contact.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="form-control"
                      value={contact.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="form-control"
                      value={contact.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12 col-sm-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="termsAccepted"
                      id="termsCheck"
                      onChange={handleTermsChange}
                    />
                    <label className="form-check-label" htmlFor="termsCheck">
                      I agree to the <Link href={'terms-conditions/'}>terms and conditions </Link>
                    </label>
                  </div>
                  {!terms && (
                    <p className="error-message">
                      Please agree to the <Link href={'terms-conditions/'}>terms and conditions </Link> to continue
                    </p>
                  )}
                </div>
                <div className="col-lg-12 col-sm-12">
                  <button
                    type="submit"
                    className={`btn ${
                      contact.password !== contact.confirmPassword ||
                      !contact.termsAccepted
                        ? ""
                        : "btn-primary"
                    }`}
                    disabled={
                      contact.password !== contact.confirmPassword ||
                      !contact.termsAccepted
                    }
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
};

export default SignUpForm;

const SuccessfulRegistration = () => {
  return (
    <>
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <P
            color={2}
            Weight={900}
            size={30}
            textAlign={"center"}
            Copy={"Please Verify Your Email to Get Started"}
          />
         {/*  <P
            Copy={`Congratulations on joining Fixtura! You're just a click away from unlocking personalized digital assets that will amplify your club's social media presence.`}
          /> */}

          <P
            Weight={900}
            Copy={`An email has been sent to the address you provided, containing a verification link. Clicking this link is essential to activate your account and start using Fixtura's services.`}
          />
          <P
            Weight={400}
            Copy={`If you don't see the email in your inbox, please check your spam or junk folder.`}
          />

          {/* <P
            Copy={`Once verified, you can dive into customization, selecting assets, and setting your delivery preferences. We'll take care of the rest, tailoring content to your specific needs.`}
          /> */}
          {/* <P
            Copy={`Thank you for choosing Fixtura, and we can't wait to see your cricketing story shine online.`}
          /> */}
        </div>
      </div>
    </>
  );
};

const ErrorRegistration = ({ error, setError, setContact }) => {
  return (
    <>
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <h2>ERROR</h2>
          <p>{error}</p>
          <div className="col-lg-12 col-sm-12">
            <button
              type="submit"
              className={"btn btn-primary"}
              onClick={() => {
                setError(false);
                setContact(INITIAL_STATE);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
