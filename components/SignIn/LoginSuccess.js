import Link from "next/link";
import withAuth from "./withAuth";

function UserLoggedIn() {
  return (
    <div className="contact-form ptb-100">
      <div className="contact-title">
        <h2>Sign In successful</h2>

        
        <button className="btn btn-secondary">
          <Link href="/members/orderHistory/">
            <a>Go To Downloads</a>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default withAuth(UserLoggedIn);
