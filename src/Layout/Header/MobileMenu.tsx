"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Menu } from "antd";
// import { useAuth } from "@/library/hooks/useAuthContext";
import { LOGIN_PAGE } from "@/library/constants/routeUrls";
// import { AuthContext } from "@/context/AuthProvider";

interface MobileMenuProps {
  className?: string;
  onClick?: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ className, onClick }) => {
  const loggedIn =
    typeof window !== "undefined" && localStorage.getItem("userDetails")
      ? true
      : false;
  const router = useRouter();

  const goToMyBids = () => {
    router.push(`/customer/my-bids`);
  };

  const navigations = [
    {
      label: loggedIn && <button onClick={goToMyBids}>My Bids</button>,
      key: "login",
    },
    {
      label: loggedIn && (
        <button onClick={() => router.push("/customer/myBookings")}>
          My Bookings
        </button>
      ),
      key: "my_bookings",
    },
    {
      label: loggedIn && (
        <button onClick={() => router.push("/property-registration")}>
          List Your Property
        </button>
      ),
      key: "list_property",
    },
    {
      label: loggedIn && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            localStorage.clear();
            router.push(LOGIN_PAGE);
          }}
        >
          Log Out
        </button>
      ),
      key: "logout",
    },
  ];

  return (
    <Menu
      style={{ paddingTop: "0px" }}
      className={className}
      items={navigations}
      onClick={onClick}
    />
  );
};

export default MobileMenu;
