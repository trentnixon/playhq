import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetcher } from "../../lib/api";
import { setToken } from "../../lib/auth";
import { useUser } from "../../lib/authContext";
import UserLoggedIn from "./LoginSuccess";
import { useLogUser } from "../../Hooks/useAuthLocal";
import { P } from "../Members/Common/Type";
import { FixturaLoading } from "../Members/Common/Loading";

// Form initial state
const INITIAL_STATE = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [contact, setContact] = useState(INITIAL_STATE);
  const [LogUser, CreateLogUser] = useLogUser();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // user Context
  const { user } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { email, password } = contact;
      const loginInfo = {
        identifier: email,
        password: password,
      };
      const result = await CreateLogUser(loginInfo);
      if (result.error) {
        setError(result.error);
      } else {
        setError(null);
      }
    } catch (error) {
      setError("An error occurred during login.");
    } finally {
      //setLoading(false);
    }
  };

  useEffect(() => {
    console.log(LogUser);
  }, [LogUser]);

  if (loading) {
    return (
      <div>
        <div className="contact-form ptb-100">
          <div className="contact-title">
            <P Copy={`Loading`} color={2} textAlign={"center"} />
            <FixturaLoading />
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return <UserLoggedIn user={user} />;
  }

  if (error) {
    return (
      <div>
        <div className="contact-form ptb-100">
          <div className="contact-title">
            <h2>Error Signing In</h2>

            <P Copy={error} color={8} textAlign={"center"} />
            <button
              className="btn btn-secondary"
              onClick={() => setError(null)}
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <h2>Sign In</h2>
          <p>Sign in to your FIXTURA account.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4">
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
              <div className="col-lg-4">
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

              <div className="col-lg-12 col-sm-12 mt-2 mb-2">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </div>
        </form>
        <small>
          <Link href="/password-request">
            <a>Forgot Password?</a>
          </Link>
        </small>
      </div>
    </>
  );
};

export default SignInForm;
