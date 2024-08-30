"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "antd";
import { LOGIN_PAGE, REGISTRATION_PAGE } from "@/library/constants/routeUrls";
import { CustomAuthWrapper } from "../Navbar/Navbar.style";
import House from "@/assets/images/house.svg";
import Image from "next/image";

export const HostButton: React.FC = () => {
  return (
    <Link href="/property-registration" passHref legacyBehavior>
      <a
        style={{
          borderRadius: "4px",
          backgroundColor: "#deff51",
          padding: "8px 10px 8px 10px",
          width: "max-content",
          marginLeft: "50px",
          boxShadow:
            "0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Image
            style={{ width: "30px", height: "30px", opacity: 1 }}
            src={House}
            alt="House Icon"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#4dcad2",
              }}
            >
              List your Home
            </span>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "400",
                color: "#000000",
              }}
            >
              Start Hosting
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

const menuItems = [
  {
    label: <Link href={LOGIN_PAGE}>Sign in</Link>,
    key: "menu-1",
  },
  {
    label: <Link href={REGISTRATION_PAGE}>Sign up</Link>,
    key: "menu-2",
  },
];

interface AuthMenuProps {
  className?: string;
}

const AuthMenu: React.FC<AuthMenuProps> = ({ className }) => {
  return (
    <CustomAuthWrapper>
      <Menu className={className} items={menuItems} />
      <HostButton />
    </CustomAuthWrapper>
  );
};

export default AuthMenu;
