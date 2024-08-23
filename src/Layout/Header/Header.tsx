import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sticky from 'react-stickynode';
import { IoIosClose } from 'react-icons/io';
import { Button, Drawer } from 'antd';
import Logo from 'components/UI/Logo/Logo';
import Text from 'components/UI/Text/Text';
// import TextLink from 'components/UI/TextLink/TextLink';
import Navbar from 'components/Navbar/Navbar';
// import { AuthContext } from 'context/AuthProvider';
// import { LayoutContext } from 'context/LayoutProvider';
import useWindowSize from 'library/hooks/useWindowSize';
// import { AGENT_PROFILE_PAGE } from 'settings/constant';
import AuthMenu from './AuthMenu';
import MainMenu from './MainMenu';
import MobileMenu from './MobileMenu';
import ProfileMenu from './ProfileMenu';
// import NavbarSearch from './NavbarSearch';
import HeaderWrapper, {
  MobileNavbar,
  CloseDrawer,
  AvatarWrapper,
  AvatarImage,
  AvatarInfo,
  LogoArea,
} from './Header.style';

export default function Header() {
  let location = useLocation();
  // const [{ searchVisibility }] = useContext(LayoutContext);
  const { width } = useWindowSize();
  const [state, setState] = useState(false);
  const sidebarHandler = () => {
    setState(!state);
  };
  const headerType = location.pathname === '/' ? 'transparent' : 'default';
  const isLoggedIn = localStorage.getItem('userDetails') ? true : false;
  const userDetails = isLoggedIn
    ? JSON.parse(localStorage.getItem('userDetails'))
    : null;
  
  const userName = userDetails ? `${userDetails.firstName} ${userDetails.lastName}` : '';

  return (
    <HeaderWrapper>
      <Sticky
        top={headerType === 'transparent' ? -1 : 0}
        innerZ={10001}
        activeClass="isHeaderSticky"
      >
        {width > 991 ? (
          <Navbar
            logo={
              <>
                <Logo
                  withLink
                  linkTo="/"
                  src="/images/bys_final_logo.png"
                  title="Bid your Stay"
                />
              </>
            }
            navMenu={<MainMenu />}
            authMenu={<AuthMenu />}
            isLogin={isLoggedIn}
            avatar={<Logo src="/images/user_icon_2.png" />}
            profileMenu={
              <ProfileMenu avatar={<Logo src="/images/user_icon_2.png" />} />
            }
            headerType={headerType}
            // searchComponent={<NavbarSearch />}
            location={location}
            // searchVisibility={searchVisibility}
          />
        ) : (
          <MobileNavbar className={headerType}>
            <LogoArea>
              <>
                <Logo
                  withLink
                  linkTo="/"
                  src="/images/bys_final_logo.png"
                  title="Bid your Stay"
                />
              </>
              {/* <NavbarSearch /> */}
            </LogoArea>
            <Button
              className={`hamburg-btn ${state ? 'active' : ''}`}
              onClick={sidebarHandler}
            >
              <span />
              <span />
              <span />
            </Button>
            <Drawer
              placement="right"
              closable={false}
              onClose={sidebarHandler}
              width="285px"
              className="mobile-header"
              open={state}
            >
              <CloseDrawer>
                <button onClick={sidebarHandler}>
                  <IoIosClose />
                </button>
              </CloseDrawer>
              {isLoggedIn ? (
                <AvatarWrapper>
                  <AvatarImage>
                    <Logo src="/images/user_icon_2.png" />
                  </AvatarImage>
                  <AvatarInfo>
                    <Text as="h3" content={userName} />
                    {/* <TextLink
                      link={AGENT_PROFILE_PAGE}
                      content="View Profile"
                    /> */}
                  </AvatarInfo>
                </AvatarWrapper>
              ) : (
                <AuthMenu className="auth-menu" />
              )}
              <MobileMenu className="main-menu" onClick={sidebarHandler} />
            </Drawer>
          </MobileNavbar>
        )}
      </Sticky>
    </HeaderWrapper>
  );
}
