import React, { useState } from "react";
import axios from "axios";

import NavbarTwo from "../components/Layouts/NavbarTwo";
import PageBanner from "../components/Common/PageBanner";
import { useRouter } from "next/router";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const { token } = router.query;
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Make a request to the Strapi API to reset the password
    const response = await fetch(
      "https://fixtura-backend.herokuapp.com/api/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: token,
          password: password,
          passwordConfirmation: confirmPassword,
        }),
      }
    );

    // Handle the response from the Strapi API
    if (response.ok) {
      // Password reset was successful, redirect the user to the login page
      router.push("/login");
    } else {
      // Password reset was not successful, show an error message
      // or take other appropriate action
    }
  };

  return (
    <>
      <NavbarTwo />

      <PageBanner
        pageTitle="Reset password"
        BGImage="/images/PLAYHQ-BG-RAINDROPS.jpg"
      />
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <h2>Reset password!</h2>
          <p>
            To reset your password, enter your new password in the first field
            on the password reset page, re-enter it in the second field to
            confirm it, and then click on the &quot;Submit&quot; or &quot;Reset password&quot;
            button to save it.
          </p>
        </div>
     
      <form onSubmit={handleSubmit}>
        <input
          type="hidden"
          value={token}
          onChange={(event) => setToken(event.target.value)}
        />
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  className="form-control"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </div>

            <div className="col-lg-12 col-sm-12">
              <button type="submit" className="btn btn-primary">
                Reset password
              </button>
            </div>
          </div>
        </div>
      </form>
      </div>
    </>
  );
};

export default ResetPasswordForm;
