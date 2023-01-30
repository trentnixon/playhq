import React, { useState } from "react";
import Link from "next/link";
import { fetcher } from "../../lib/api";
import { setToken } from "../../lib/auth";
import { useUser } from "../../lib/authContext";
import UserLoggedIn from './LoginSuccess'
// Form initial state
const INITIAL_STATE = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [contact, setContact] = useState(INITIAL_STATE);

  // user Context
  const { user, loading } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
    // console.log(contact)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = contact;
      const loginInfo = {
        identifier: email,
        password: password,
      };
      const data = await fetcher(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/auth/local`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );

      setToken(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (user) return <UserLoggedIn user={user} />;
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
                    value={contact.passwrod}
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
      </div>
    </>
  );
};

export default SignInForm;




