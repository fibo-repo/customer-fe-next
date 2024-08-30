"use client";

import React from "react";
import NavbarWrapper, {
  Container,
  LogoArea,
  MenuArea,
  AvatarWrapper,
  AuthWrapper,
  MenuWrapper,
} from "./Navbar.style";

interface NavbarProps {
  className?: string;
  logo?: React.ReactNode;
  avatar?: React.ReactNode;
  navMenu?: React.ReactNode;
  authMenu?: React.ReactNode;
  profileMenu?: React.ReactNode;
  isLogin?: boolean;
  headerType?: "transparent" | "default";
  searchComponent?: React.ReactNode;
  // location?: { pathname: string };
  searchVisibility?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  className,
  logo,
  avatar,
  navMenu,
  authMenu,
  profileMenu,
  isLogin,
  headerType,
  searchComponent,
  // location,
  searchVisibility,
}) => {
  const addAllClasses = ["navbar"];
  if (className) {
    addAllClasses.push(className);
  }
  if (headerType) {
    addAllClasses.push(`is_${headerType}`);
  }

  return (
    <NavbarWrapper className={addAllClasses.join(" ")}>
      <Container>
        {logo || searchVisibility ? (
          <LogoArea>
            {logo}
            {!searchVisibility && location?.pathname === "/"
              ? null
              : searchComponent}
          </LogoArea>
        ) : null}
        <MenuArea>
          {navMenu && (
            <MenuWrapper className="main_menu">{navMenu}</MenuWrapper>
          )}
          {isLogin && avatar ? (
            <AvatarWrapper>{profileMenu}</AvatarWrapper>
          ) : (
            authMenu && (
              <AuthWrapper className="auth_menu">{authMenu}</AuthWrapper>
            )
          )}
        </MenuArea>
      </Container>
    </NavbarWrapper>
  );
};

export default Navbar;
