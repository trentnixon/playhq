import withAuth from "./withAuth";
import { useEffect } from "react";
import Router from "next/router";

function UserLoggedIn() {
  useEffect(() => {
    // Automatically redirect after 5 seconds
    const timer = setTimeout(() => {
      Router.push("/members/account"); // Replace with your actual account page URL
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="contact-form ptb-100">
      <div className="contact-title">
        <h2>Sign In successful</h2>
      </div>
    </div>
  ); 
}
export default withAuth(UserLoggedIn);