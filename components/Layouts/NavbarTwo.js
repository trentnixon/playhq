import React from "react";
import { getAccountFromLocalCookie, unsetToken } from "../../lib/auth";
import { useUser } from "../../lib/authContext";
import Link from "../../utils/ActiveLink";
import { useRouter } from "next/router";
const NavbarTwo = ({navBarClass='navbar-style-2'}) => {
  const [menu, setMenu] = React.useState(true);
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  // user Context
  const { user, loading } = useUser();

  React.useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  const classOne = menu
    ? "collapse navbar-collapse mean-menu"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <>
      <div id="navbar" className={`navbar-area ${navBarClass}`}>
        <nav className="navbar navbar-expand-md navbar-light">
          <div className="container-fluid">
            <Link href="/">
              <a className="navbar-brand">
                <img
                  src="/images/image_processing20220611-3013-fimmni.png"
                  className="black-logo"
                  alt="logo"
                />
                <img
                  src="/images/image_processing_white.png"
                  className="white-logo"
                  alt="logo"
                />
              </a>
            </Link>

            {/* Toggle navigation */}
            <button
              onClick={toggleNavbar}
              className={classTwo}
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icon-bar top-bar"></span>
              <span className="icon-bar middle-bar"></span>
              <span className="icon-bar bottom-bar"></span>
            </button>

            <div className={classOne} id="navbarSupportedContent">
              <ul className="navbar-nav">
              {user ? <MembersNavItem user={user} /> : false}
                <li className="nav-item">
                  <Link href="/">
                    <a className="nav-link">Home</a>
                  </Link>
                </li>
                <li className="nav-item">
                      <Link href="/portfolio" activeClassName="active">
                        <a className="nav-link">Examples</a>
                      </Link>
                    </li>
            

                <li className="nav-item">
                  <Link href="/about" activeClassName="active">
                    <a className="nav-link">About us</a>
                  </Link>
                </li>
                {user ? false : <li className="nav-item">
                      <Link href="/pricing" activeClassName="active">
                        <a className="nav-link">Pricing</a>
                      </Link>
                    </li>}
                
                <li className="nav-item">
                      <Link href="/faq" activeClassName="active">
                        <a className="nav-link">FAQ</a>
                      </Link>
                    </li>

                <li className="nav-item">
                  <Link href="/contact" activeClassName="active">
                    <a className="nav-link">Contact Us</a>
                  </Link>
                </li>
                
                {user ? null : <SignIn />}
              </ul>

              {user ? null : <SignUp />}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarTwo;

const SignUp = () => {

  return (
    <div className="others-options">
      <Link href="/SignUp">
        <a className="btn btn-primary">Get Started</a>
      </Link>
    </div>
  );
};

const SignIn = () => {
  return (
    <li className="nav-item">
      <Link href="/SignIn" activeClassName="active">
        <a className="nav-link">Sign In</a>
      </Link>
    </li>
  );
};

const MembersNavItem = ({ user }) => {
  const router = useRouter();
  const PATH = "/members";
  const hasSetup =getAccountFromLocalCookie()

  const handleLogout = () => {
    
    unsetToken();
    router.push(`/`);
  }; 

  
  if(hasSetup === 'undefined')
  return(
    <li className="nav-item">
    <Link href="#">
      <a className="nav-link" onClick={(e) => e.preventDefault()}>
        {user} <i className="fa-solid fa-angle-down"></i>
      </a>
    </Link>

    <ul className="dropdown-menu">
   
      <li className="nav-item">
        <Link href={`${PATH}/setup`} activeClassName="active">
          <a className="nav-link">Setup Account</a>
        </Link>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={handleLogout}>
          Log Out
        </a>
      </li>
    </ul>
  </li>
  )
  return (
    <li className="nav-item">
      <Link href="#">
        <a className="nav-link" onClick={(e) => e.preventDefault()}>
          {user} <i className="fa-solid fa-angle-down"></i>
        </a>
      </Link>

      <ul className="dropdown-menu">
     
       {/*  <li className="nav-item">
          <Link href={`${PATH}/settings`} activeClassName="active">
            <a className="nav-link">Overview</a>
          </Link>
        </li> */}
        
        <li className="nav-item">
          <Link href={`${PATH}/account`} activeClassName="active">
            <a className="nav-link">Account</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href={`${PATH}/orderHistory`} activeClassName="active">
            <a className="nav-link">Downloads</a>
          </Link>
        </li>
        <li>
          <hr />
        </li>
        <li className="nav-item">
          <Link href={`${PATH}/assets`} activeClassName="active">
            <a className="nav-link">Assets</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href={`${PATH}/design`} activeClassName="active">
            <a className="nav-link">Design</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href={`${PATH}/ai-assistant`} activeClassName="active">
            <a className="nav-link">AI Assistant</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href={`${PATH}/sponsors`} activeClassName="active">
            <a className="nav-link">Sponsors</a>
          </Link>
        </li>
       {/*  <li className="nav-item">
          <Link href={`${PATH}/customiser`} activeClassName="active">
            <a className="nav-link">Customiser</a>
          </Link>
        </li> */}
        
        <li>
          <hr />
        </li>
        <li className="nav-item">
          <Link href={`${PATH}/HowToUse`} activeClassName="active">
            <a className="nav-link">How to Use</a>
          </Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={handleLogout}>
            Log Out
          </a>
        </li>
      </ul>
    </li>
  );
};