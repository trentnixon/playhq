import withAuth from "./withAuth";
import { useEffect } from "react";
import Router from "next/router";
import { P } from "../Members/Common/Type";

function UserLoggedIn() {
  useEffect(() => {
    // Automatically redirect after 5 seconds
    const timer = setTimeout(() => {
      Router.push("/members/"); // Replace with your actual account page URL
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="contact-form ptb-100">
      <div className="contact-title">
        <h2>Sign In successful</h2>
        <P textAlign={'center'}>Redirecting in 1 second</P>
      </div>
    </div>
  ); 
}
export default withAuth(UserLoggedIn);