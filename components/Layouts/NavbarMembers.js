import React, { useEffect, useState } from 'react';
import { getAccountFromLocalCookie, unsetToken } from '../../lib/auth';
import { useUser } from '../../context/authContext';
import Link from '../../utils/ActiveLink';
import { useRouter } from 'next/router';
import {
  IconBadgeTm,
  IconBrandStripe,
  IconCheck,
  IconColorPicker,
  IconDownload,
  IconLayoutDashboard,
  IconLogout2,
  IconPhotoPlus,
  IconSettings,
  IconTrack,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';
import {
  Group,
  Image,
  useMantineTheme,
  Box,
  Text,
  ActionIcon,
} from '@mantine/core';
import { useAccountDetails } from '../../context/userContext';
import { IsFreeTrial } from '../Members/Account/userIsFreeTrial';
import { IsFreeTrialWelcome } from '../Members/Account/components/isTrialNotifications.js/FreeTrialMessaging';

const NavbarMembers = () => {
  const [menu, setMenu] = useState(true);
  const toggleNavbar = () => {
    const newMenuState = !menu;
    setMenu(newMenuState);

    // Toggle body scroll lock for mobile
    if (typeof window !== 'undefined' && window.innerWidth <= 767) {
      if (newMenuState) {
        document.body.classList.remove('mobile-menu-open');
      } else {
        document.body.classList.add('mobile-menu-open');
      }
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      const navbar = document.getElementById('navbarTwo');
      const navbarCollapse = document.getElementById('navbarSupportedContent');

      if (navbar && navbarCollapse && !navbar.contains(event.target)) {
        setMenu(true);
        if (typeof window !== 'undefined') {
          document.body.classList.remove('mobile-menu-open');
        }
      }
    };

    if (!menu) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menu]);

  // user Context
  const { user, loading } = useUser();
  const { account } = useAccountDetails();

  // Debug logs - commented out to prevent console spam during loops
  // useEffect(() => {
  //   console.log("[NavbarMembers] user:", user);
  //   console.log("[NavbarMembers] loading:", loading);
  //   console.log("[NavbarMembers] account:", account);
  //   console.log("[NavbarMembers] loading:", menu);
  // }, [user, loading, account, menu]);

  useEffect(() => {
    let elementId = document.getElementById('navbarTwo');
    document.addEventListener('scroll', () => {
      if (window.scrollY > 170) {
        elementId.classList.add('is-sticky');
      } else {
        elementId.classList.remove('is-sticky');
      }
    });
  });

  useEffect(() => {}, []);

  const classOne = menu
    ? 'collapse navbar-collapse mean-menu'
    : 'collapse navbar-collapse show';
  const classTwo = menu
    ? 'navbar-toggler navbar-toggler-right collapsed'
    : 'navbar-toggler navbar-toggler-right';

  return (
    <>
      <div id='navbarTwo' className={`navbar-area navbar-style-2`}>
        <nav className='navbar navbar-expand-md navbar-light'>
          <div className='grid grid-cols-2 gap-4 w-full'>
            <div className='flex flex-row gap-4 justify-start items-center w-full px-2'>
              <Link legacyBehavior href='/'>
                <a className='navbar-brand'>
                  <img
                    src='/images/image_processing20220611-3013-fimmni.png'
                    className='black-logo'
                    alt='logo'
                  />
                  <Image
                    src={`/images/fixturaHeaderLogo.png`}
                    height={30}
                    width={'auto'}
                    className='white-logo'
                  />
                </a>
              </Link>

              <IsFreeTrialWelcome user={account} />
            </div>
            <div className='flex justify-end items-center'>
              {/* Toggle navigation */}
              <button
                onClick={toggleNavbar}
                className={classTwo}
                type='button'
                data-toggle='collapse'
                data-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded={!menu}
                aria-label='Toggle navigation'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '44px',
                  height: '44px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                }}
              >
                <span
                  className='icon-bar top-bar'
                  style={{
                    transform: menu
                      ? 'rotate(0deg) translateY(0px)'
                      : 'rotate(45deg) translateY(6px)',
                    transition:
                      'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  }}
                ></span>
                <span
                  className='icon-bar middle-bar'
                  style={{
                    opacity: menu ? 1 : 0,
                    transform: menu ? 'scaleX(1)' : 'scaleX(0)',
                    transition:
                      'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  }}
                ></span>
                <span
                  className='icon-bar bottom-bar'
                  style={{
                    transform: menu
                      ? 'rotate(0deg) translateY(0px)'
                      : 'rotate(-45deg) translateY(-6px)',
                    transition:
                      'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  }}
                ></span>
              </button>

              <div className={classOne} id='navbarSupportedContent'>
                {/* Mobile Close Button */}
                <button
                  className='mobile-close-btn'
                  onClick={() => setMenu(true)}
                  aria-label='Close menu'
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '40px',
                    height: '40px',
                    background: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 1002,
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    fontSize: '1.5rem',
                    color: '#333',
                    fontWeight: 'bold',
                  }}
                >
                  ✕
                </button>

                <ul className='navbar-nav'>
                  {user && <MembersNavItem user={user} setMenu={setMenu} />}
                  {!user && <VisitorMenu setMenu={setMenu} />}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavbarMembers;

const VisitorMenu = ({ setMenu }) => {
  const closeMenu = () => {
    setMenu(true);
    if (typeof window !== 'undefined') {
      document.body.classList.remove('mobile-menu-open');
    }
  };

  return (
    <>
      <li className='nav-item'>
        <Link legacyBehavior href='/'>
          <a className='nav-link' onClick={closeMenu}>
            Home
          </a>
        </Link>
      </li>

      <li className='nav-item'>
        <Link legacyBehavior href='/portfolio' activeClassName='active'>
          <a className='nav-link' onClick={closeMenu}>
            Examples
          </a>
        </Link>
      </li>

      <li className='nav-item'>
        <Link legacyBehavior href='/about' activeClassName='active'>
          <a className='nav-link' onClick={closeMenu}>
            About
          </a>
        </Link>
      </li>
      <li className='nav-item'>
        <Link legacyBehavior href='/resources' activeClassName='active'>
          <a className='nav-link' onClick={closeMenu}>
            Resources
          </a>
        </Link>
      </li>
      <li className='nav-item'>
        <Link legacyBehavior href='/faq' activeClassName='active'>
          <a className='nav-link' onClick={closeMenu}>
            FAQ
          </a>
        </Link>
      </li>

      <li className='nav-item'>
        <Link legacyBehavior href='/contact' activeClassName='active'>
          <a className='nav-link' onClick={closeMenu}>
            Contact
          </a>
        </Link>
      </li>
    </>
  );
};

const NavItem = ({ href, title, IconComponent, setMenu }) => {
  const theme = useMantineTheme();
  const closeMenu = () => {
    setMenu(true);
    if (typeof window !== 'undefined') {
      document.body.classList.remove('mobile-menu-open');
    }
  };

  return (
    <li className='nav-item members-item'>
      <Link legacyBehavior href={href} activeClassName='active'>
        <Group
          position='apart'
          sx={theme => ({
            padding: '12px 15px ',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme.colors.dark[0],
              color: theme.colors.dark[0],
            },
          })}
          onClick={closeMenu}
        >
          <a className='nav-link'>{title}</a>

          <IconComponent
            size={'1.5em'}
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
  const PATH = '/members';
  const theme = useMantineTheme();
  const hasSetup = getAccountFromLocalCookie();
  const { account } = useAccountDetails();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;

  const handleDropdownEnter = () => {
    if (!isMobile) {
      setDropdownOpen(true);
    }
  };

  const handleDropdownLeave = () => {
    if (!isMobile) {
      setDropdownOpen(false);
    }
  };

  // On mobile, always show dropdown when menu is open
  const shouldShowDropdown = isMobile || dropdownOpen;

  // Handle window resize to update mobile state
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 767;
      if (newIsMobile !== isMobile) {
        // Force re-render when switching between mobile/desktop
        setDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleLogout = async () => {
    try {
      await unsetToken(); // Assuming unsetToken is an async operation
      console.log('unsetToken COMPLETED');
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Log out failed', error);
      // Show an error message to the user
    }
  };

  const navItems = [
    {
      href: `${PATH}/`,
      title: 'Dashboard',
      IconComponent: IconLayoutDashboard,
    },
    {
      href: `${PATH}/settings`,
      title: 'Settings',
      IconComponent: IconSettings,
    },
    {
      href: `${PATH}/bundles`,
      title: 'Bundles',
      IconComponent: IconDownload,
    },

    {
      href: `${PATH}/templateBuilder`,
      title: 'Template builder',
      IconComponent: IconColorPicker,
    },

    {
      href: `${PATH}/gallery`,
      title: 'Media Gallery',
      IconComponent: IconPhotoPlus,
    },
    {
      href: `${PATH}/sponsors`,
      title: 'Manage Sponsors',
      IconComponent: IconCheck,
    },

    { href: `${PATH}/tracking`, title: 'Season', IconComponent: IconTrack },
    {
      href: `${PATH}/account`,
      title: 'Account',
      IconComponent: IconBrandStripe,
    },
  ];

  const navItemsNoSetup = [
    {
      href: `${PATH}/onboarding`,
      title: 'Setup account',
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
    <li
      className='nav-item'
      onMouseEnter={handleDropdownEnter}
      onMouseLeave={handleDropdownLeave}
      onFocus={handleDropdownEnter}
      onBlur={handleDropdownLeave}
      tabIndex={0}
    >
      <Link legacyBehavior href='#'>
        <a
          className='nav-link'
          onClick={e => e.preventDefault()}
          aria-haspopup='true'
          aria-expanded={dropdownOpen}
          tabIndex={0}
          onFocus={handleDropdownEnter}
          onBlur={handleDropdownLeave}
        >
          {user || 'Admin'} <i className='fa-solid fa-angle-down'></i>
        </a>
      </Link>
      <ul
        className='dropdown-menu'
        style={{ display: shouldShowDropdown ? 'block' : 'none' }}
      >
        {navItemsToRender.map((item, index) => (
          <NavItem key={index} {...item} setMenu={setMenu} />
        ))}
        {hasSetup && (
          <li className='nav-item' style={{ cursor: 'pointer' }}>
            <Group position='apart' px={0}>
              <a
                className='nav-link'
                onClick={() => {
                  handleLogout();
                  setMenu(true);
                  if (typeof window !== 'undefined') {
                    document.body.classList.remove('mobile-menu-open');
                  }
                }}
              >
                Log Out
              </a>
              <IconLogout2
                size={'1.5em'}
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
