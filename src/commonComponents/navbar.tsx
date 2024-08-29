"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/navbar.module.css";
import { FaUserCircle } from "react-icons/fa";
import Logo from "./logo";
import { LOGIN_PAGE } from "../library/constants/routeUrls";
import { useRouter } from "next/navigation";
import Img from "@/assets/images/bys_final_logo.png";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleToggle = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
  };

  useEffect(() => {
    const hostDetails = localStorage.getItem("userDetails");
    if (hostDetails) {
      const hostDetailsJson = JSON.parse(hostDetails);
      setLoggedIn(true);
      let user = hostDetailsJson.firstName;
      setUserName(user);
    }
  }, []);

  const goToMyBids = () => {
    setShowMenu(false);
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) {
      window.open(`/host/my-bids`, "_blank");
    }
  };

  const logOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    localStorage.clear();
    router.push(LOGIN_PAGE);
  };

  const menuItems = [
    {
      label: (
        <button
          type="submit"
          onClick={goToMyBids}
          style={{ color: "gray", background: "transparent", border: "none" }}
        >
          Recieved Bids
        </button>
      ),
      key: "recieved_bids",
    },
    {
      label: (
        <button
          type="submit"
          onClick={() => router.push("/host/myBookings")}
          style={{ color: "gray", background: "transparent", border: "none" }}
        >
          Bookings
        </button>
      ),
      key: "recieved_bids",
    },
    {
      label: (
        <button
          type="submit"
          style={{ color: "gray", background: "transparent", border: "none" }}
          onClick={logOut}
        >
          Log Out
        </button>
      ),
      key: "log_out",
    },
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.navbar}>
      <div style={{ margin: "18px" }}>
        <Logo withLink linkTo="/" src={Img} title="Bid your Stay" />
      </div>

      {loggedIn && (
        <div className={styles.profileMenuContainer}>
          <div
            ref={profileRef}
            className={styles.profileContainer}
            onClick={handleToggle}
          >
            <FaUserCircle className={styles.usericon} />
            <h2 className={styles.usergreeting}>{userName}</h2>
          </div>
          {showMenu && (
            <div ref={menuRef} className={styles.menu}>
              {menuItems.map((item) => (
                <div key={item.key} className={styles.menuItem}>
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
