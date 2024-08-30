"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Divider, Menu } from "antd";
import useOnClickOutside from "@/library/hooks/useOnClickOutside";
import { LOGIN_PAGE } from "@/library/constants/routeUrls";

interface ProfileMenuProps {
  avatar: React.ReactNode;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ avatar }) => {
  const router = useRouter();
  const [state, setState] = useState(false);

  const handleDropdown = () => {
    setState(!state);
  };

  const closeDropdown = () => {
    setState(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setState(false));

  const goToMyBids = () => {
    router.push(`/customer/my-bids`);
  };

  const logOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    localStorage.clear();
    router.push(LOGIN_PAGE);
  };

  const menuItems = [
    {
      label: <button onClick={goToMyBids}>My Bids</button>,
      key: "my_bids",
    },
    {
      label: (
        <button onClick={() => router.push("/customer/myBookings")}>
          My Bookings
        </button>
      ),
      key: "my_bookings",
    },
    { label: <button onClick={logOut}>Log Out</button>, key: "log_out" },
    {
      label: (
        <div>
          <Divider
            style={{
              margin: "0px 0px 10px 0px",
              height: "2px",
              backgroundColor: "#d2cfcf",
            }}
          />
          <a href="/property-registration">List Your Property</a>
        </div>
      ),
      key: "add_hotel",
    },
  ];

  return (
    <div className="avatar-dropdown" ref={dropdownRef}>
      <div className="dropdown-handler" onClick={handleDropdown}>
        {avatar}
      </div>
      <Menu
        className={`dropdown-menu ${state ? "active" : "hide"}`}
        items={menuItems}
        onClick={closeDropdown}
      />
    </div>
  );
};

export default ProfileMenu;
