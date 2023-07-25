import withAuth from "./withAuth";

 function UserLoggedIn  () {

    
    return (
      <div className="contact-form ptb-100">
        <div className="contact-title">
          <h2>Sign In successful</h2>
          <p>User Logged in </p>
        </div>
      </div>
    );
  };
  
  export default withAuth(UserLoggedIn)