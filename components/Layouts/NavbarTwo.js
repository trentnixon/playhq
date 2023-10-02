import React, { useEffect, useState } from "react";
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
  IconLayoutDashboard,
  IconLogout2,
  IconPhotoPlus,
  IconTrack,
} from "@tabler/icons-react";
import { Group, useMantineTheme } from "@mantine/core";
import { useAccountDetails } from "../../lib/userContext";

const NavbarTwo = () => {
  const [menu, setMenu] = useState(true);
  const toggleNavbar = () => {
    setMenu(!menu);
  };

  // user Context
  const { user, loading } = useUser();

  useEffect(() => {
    let elementId = document.getElementById("navbarTwo");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  useEffect(() => {
    console.log("NavbarTwo User:", user);
    console.log("NavbarTwo Loading:", loading);
  }, []);

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
                {user && <MembersNavItem user={user} setMenu={setMenu} />}
                {!user && <VisitorMenu user={user} setMenu={setMenu} />}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarTwo;

const VisitorMenu = ({ setMenu }) => {
  return (
    <>
      <li className="nav-item">
        <Link href="/">
          <a className="nav-link" onClick={() => setMenu(true)}>
            Home
          </a>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/portfolio" activeClassName="active">
          <a className="nav-link" onClick={() => setMenu(true)}>
            Examples
          </a>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/about" activeClassName="active">
          <a className="nav-link" onClick={() => setMenu(true)}>
            About
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/resources" activeClassName="active">
          <a className="nav-link" onClick={() => setMenu(true)}>
            Resources
          </a>
        </Link>
      </li>
      <li className="nav-item">
        <Link href="/faq" activeClassName="active">
          <a className="nav-link" onClick={() => setMenu(true)}>
            FAQ
          </a>
        </Link>
      </li>

      <li className="nav-item">
        <Link href="/contact" activeClassName="active">
          <a className="nav-link" onClick={() => setMenu(true)}>
            Contact
          </a>
        </Link>
      </li>
    </>
  );
};

const NavItem = ({ href, title, IconComponent, setMenu }) => {
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
            "@media (max-width: 48em)": {
              paddingLeft: 0,
            },
          })}
          onClick={() => setMenu(true)}
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

const MembersNavItem = ({ user, setMenu }) => {
  //const router = useRouter();
  const PATH = "/members";
  const theme = useMantineTheme();
  const hasSetup = getAccountFromLocalCookie();
  const { account } = useAccountDetails();

  //console.log(account?.attributes?.hasCompletedStartSequence);

  const handleLogout = async () => {
    try {
      
      await unsetToken(); // Assuming unsetToken is an async operation
      console.log("unsetToken COMPLETED")
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Log out failed", error);
      // Show an error message to the user
    }
  };

  const navItems = [
    {
      href: `${PATH}/`,
      title: "Dashboard",
      IconComponent: IconLayoutDashboard,
    },
    {
      href: `${PATH}/bundles`,
      title: "Bundles",
      IconComponent: IconDownload,
    },
    {
      href: `${PATH}/graphics-packages`,
      title: "Graphics Packages",
      IconComponent: IconColorPicker,
    },
    { href: `${PATH}/branding`, title: "Your Branding", IconComponent: IconBadgeTm },
    {
      href: `${PATH}/gallery`,
      title: "Media Gallery",
      IconComponent: IconPhotoPlus,
    },
    { href: `${PATH}/sponsors`, title: "Add Sponsors", IconComponent: IconCheck },

    { href: `${PATH}/tracking`, title: "Season", IconComponent: IconTrack },
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
    },
  ];

  const navItemsToRender =
    account?.attributes?.hasCompletedStartSequence == false
      ? navItemsNoSetup
      : account?.attributes?.hasCompletedStartSequence === undefined
      ? []
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
          <NavItem key={index} {...item} setMenu={setMenu} />
        ))}
        {hasSetup && (
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <Group position="apart" px={0}>
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
