import React from "react";
import Link from "../../utils/ActiveLink";

const NavbarOne = () => {
    const [menu, setMenu] = React.useState(true);
    const toggleNavbar = () => {
      setMenu(!menu);
    };
  
    React.useEffect(() => {
      let elementId = document.getElementById("navbarOne");
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
      <div id="navbarOne" className={`navbar-area navbar-style-1`}>
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

                <li className="nav-item">
                  <Link href="/pricing" activeClassName="active">
                    <a className="nav-link">Pricing</a>
                  </Link>
                </li>

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

                <SignIn />
              </ul>

              <SignUp />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarOne;

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
