import React, { useEffect, useState } from "react";
import { useUser } from "../../../../context/authContext";
import UserLoggedIn from "./LoginSuccess";
import { useLogUser } from "../../../../Hooks/useAuthLocal";
import { SignInError } from "./SignInError";
import { SignInLoading } from "./SignInLoading";

const SignInForm = () => {
  const [contact, setContact] = useState({ email: "", password: "" });
  const [LogUser, CreateLogUser, loading, hookError] = useLogUser(); // Rename error to hookError to avoid conflict
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null); // Declare error and setError here
  const { user, ReRender } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = contact;
      const loginInfo = {
        identifier: email,
        password: password,
      };
      CreateLogUser(loginInfo).then(() => {
        ReRender();
      });
    } catch (error) {
      setError("An error occurred during login.");
    }
  };

  useEffect(() => {
    if (hookError) {
      setError(hookError.message || "An error occurred during login.");
    } else if (LogUser) {
      setUserInfo(LogUser);
    }
  }, [LogUser, hookError]);

  if (loading) {
    return <SignInLoading />;
  }
  if (error) {
    return <SignInError setError={setError} error={error} />;
  }
  if (user || (LogUser && !hookError)) {
    return <UserLoggedIn user={LogUser} />;
  }
  return (
    <>
      <div className="contact-form">
        <TheForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          contact={contact}
        />
      </div>
    </>
  );
};
export default SignInForm;

const TheForm = ({ handleSubmit, handleChange, contact }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control-343a40"
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
                className="form-control-343a40"
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
  );
};
