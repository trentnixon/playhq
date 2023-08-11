import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetcher } from "../../lib/api";
import { setToken } from "../../lib/auth";
import { useUser } from "../../lib/authContext";
import UserLoggedIn from "./LoginSuccess";
import { useLogUser } from "../../Hooks/useAuthLocal";

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
      if (result && result.error) {
        setError(result.error.message); // Extract the error message
      } else {
        setError(null);
      }
    } catch (error) {
      setError("An error occurred during login.");
    } finally {
      setLoading(false); // Set loading to false after handling login
    }
  };

  useEffect(() => {
    console.log(LogUser);
  }, [LogUser]);

  if (loading) {
    return (
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (user) {
    return <UserLoggedIn user={user} />;
  }

  if (error) {
    return (
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => setError(null)} className="btn btn-primary">
            Try again
          </button>
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
                    type="email"
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

              <div className="col-lg-12 col-sm-12">
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
        <br />
        <small>
          Don’t have a login?{" "}
          <Link href="/SignUp">
            <a> Sign up here</a>
          </Link>
        </small>
      </div>
    </>
  );
};

export default SignInForm;
