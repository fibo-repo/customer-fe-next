"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sticky from "react-stickynode";
import { IoIosClose } from "react-icons/io";
import { Button, Drawer } from "antd";
import useWindowSize from "@/library/hooks/useWindowSize";
import AuthMenu from "./AuthMenu";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";
import HeaderWrapper, {
  MobileNavbar,
  CloseDrawer,
  AvatarWrapper,
  AvatarImage,
  AvatarInfo,
  LogoArea,
} from "./Header.style";
import Logo from "@/commonComponents/Logo/Logo";
import Text from "@/UiComponent/Text/Text";
import Navbar from "../Navbar/Navbar";
import MainMenu from "./MainMenu";
import BysLogo from "@/assets/images/bys_final_logo.png";
import Avatar from "@/assets/images/user_icon_2.png";

const Header: React.FC = () => {
  const location = usePathname();
  const { width } = useWindowSize();
  const [state, setState] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("userDetails");
    if (user) {
      setUserDetails(JSON.parse(user));
      setIsLoggedIn(true);
    }
  }, []);

  const sidebarHandler = () => {
    setState(!state);
  };

  const headerType = location === "/" ? "transparent" : "default";
  const userName = userDetails
    ? `${userDetails.firstName} ${userDetails.lastName}`
    : "";

  return (
    <HeaderWrapper>
      <Sticky
        top={headerType === "transparent" ? -1 : 0}
        innerZ={10001}
        activeClass="isHeaderSticky"
      >
        {width && width > 991 ? (
          <Navbar
            logo={
              <Logo
                withLink
                linkTo="/"
                src={BysLogo}
                title="Bid your Stay"
                width={125}
              />
            }
            navMenu={<MainMenu />}
            authMenu={<AuthMenu />}
            isLogin={isLoggedIn}
            avatar={<Logo src={Avatar} />}
            profileMenu={<ProfileMenu avatar={<Logo src={Avatar} />} />}
            headerType={headerType}
          />
        ) : (
          <MobileNavbar className={headerType}>
            <LogoArea>
              <Logo
                withLink
                linkTo="/"
                src={BysLogo}
                title="Bid your Stay"
                width={125}
              />
            </LogoArea>
            <Button
              className={`hamburg-btn ${state ? "active" : ""}`}
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
                    <Logo src={Avatar} width={40} />
                  </AvatarImage>
                  <AvatarInfo>
                    <Text as="h3" content={userName} />
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
};

export default Header;
