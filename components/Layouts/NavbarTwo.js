import React from "react";
import { getAccountFromLocalCookie, unsetToken } from "../../lib/auth";
import { useUser } from "../../lib/authContext";
import Link from "../../utils/ActiveLink";
import { useRouter } from "next/router";
import {
  IconBadgeTm,
  IconBrandStripe,
  IconCheck,
  IconColorPicker,
  IconDownload,
  IconLogout2,
  IconTrack,
} from "@tabler/icons-react";
import { Group, useMantineTheme } from "@mantine/core";
import { useAccountDetails } from "../../lib/userContext";

const NavbarTwo = () => {
  const [menu, setMenu] = React.useState(true);
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  // user Context
  const { user, loading } = useUser();

  React.useEffect(() => {
    let elementId = document.getElementById("navbarTwo");
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
      <div id="navbarTwo" className={`navbar-area navbar-style-2`}>
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
                {user && <MembersNavItem user={user} />}
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
                  <Link href="/faq" activeClassName="active">
                    <a className="nav-link">FAQ</a>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/contact" activeClassName="active">
                    <a className="nav-link">Contact Us</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarTwo;

const NavItem = ({ href, title, IconComponent }) => {
  const theme = useMantineTheme();
  return (
    <li className="nav-item members-item">
      <Link href={href} activeClassName="active">
        <Group
          position="apart"
          sx={(theme) => ({
            padding: "12px 15px ",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.colors.dark[0],
              color: theme.colors.dark[0],
            },
          })}
        >
          <a className="nav-link">{title}</a>

          <IconComponent
            size={"1.5em"}
            stroke={1}
            color={theme.colors.blue[5]}
          />
        </Group>
      </Link>
    </li>
  );
};

const MembersNavItem = ({ user }) => {
  const router = useRouter();
  const PATH = "/members";
  const theme = useMantineTheme();
  const hasSetup = getAccountFromLocalCookie();
  const { account } = useAccountDetails();

  console.log(account?.attributes?.hasCompletedStartSequence);
  const handleLogout = () => {
    unsetToken();
    router.push(`/`);
  };

  const navItems = [
    {
      href: `${PATH}/orderHistory`,
      title: "Downloads",
      IconComponent: IconDownload,
    },
    { href: `${PATH}/tracking`, title: "Tracking", IconComponent: IconTrack },
    { href: `${PATH}/brand`, title: "Your Brand", IconComponent: IconBadgeTm },
    {
      href: `${PATH}/design`,
      title: "Asset Design",
      IconComponent: IconColorPicker,
    },
    { href: `${PATH}/sponsors`, title: "Sponsors", IconComponent: IconCheck },
    {
      href: `${PATH}/account`,
      title: "Account",
      IconComponent: IconBrandStripe,
    },
  ];

  const navItemsNoSetup = [
    {
      href: `${PATH}/setup`,
      title: "Setup Account",
      IconComponent: IconBrandStripe,
    }
  ];

  const navItemsToRender =
    account?.attributes?.hasCompletedStartSequence === undefined ||
    account?.attributes?.hasCompletedStartSequence == false
      ? navItemsNoSetup
      : navItems;
  return (
    <li className="nav-item">
      <Link href="#">
        <a className="nav-link" onClick={(e) => e.preventDefault()}>
          {user} <i className="fa-solid fa-angle-down"></i>
        </a>
      </Link>

      <ul className="dropdown-menu">
        {navItemsToRender.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
        {hasSetup !== "undefined" && (
          <li className="nav-item">
            <Group position="apart">
              <a className="nav-link" onClick={handleLogout}>
                Log Out
              </a>
              <IconLogout2
                size={"1.5em"}
                stroke={1}
                color={theme.colors.red[5]}
              />
            </Group>
          </li>
        )}
      </ul>
    </li>
  );
};
