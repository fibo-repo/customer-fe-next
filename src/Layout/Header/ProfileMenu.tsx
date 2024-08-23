import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Divider, Menu } from 'antd';
import useOnClickOutside from 'library/hooks/useOnClickOutside';
import { LOGIN_PAGE } from 'settings/constant';
// import { AuthContext } from 'context/AuthProvider';
// import {
//   AGENT_PROFILE_PAGE,
//   AGENT_ACCOUNT_SETTINGS_PAGE,
//   ADD_HOTEL_PAGE,
// } from 'settings/constant';

export default function ProfileMenu({ avatar }) {
  const navigate = useNavigate();
  // const { logOut } = useContext(AuthContext);
  const [state, setState] = useState(false);
  const handleDropdown = () => {
    setState(!state);
  };
  const closeDropdown = () => {
    setState(false);
  };
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setState(false));

  const goToMyBids = () => {
    navigate(`/customer/my-bids`);
  };

  const logOut = (e) => {
    e.stopPropagation();
    e.preventDefault();
    localStorage.clear();
    navigate(LOGIN_PAGE);
  };

  const menuItems = [
    {
      label: <button onClick={goToMyBids}>My Bids</button>,
      key: 'my_bids',
    },
    {
      label: (
        <button onClick={() => navigate('/customer/myBookings')}>
          My Bookings
        </button>
      ),
      key: 'my_bookings',
    },
    { label: <button onClick={logOut}>Log Out</button>, key: 'log_out' },
    {
      label: (
        <NavLink to="/property-registration">
          <Divider
            style={{
              margin: '0px 0px 10px 0px',
              height: '2px',
              backgroundColor: '#d2cfcf',
            }}
          />
          List Your Property
        </NavLink>
      ),
      key: 'add_hotel',
    },
  ];

  return (
    <div className="avatar-dropdown" ref={dropdownRef}>
      <div className="dropdown-handler" onClick={handleDropdown}>
        {avatar}
      </div>
      <Menu
        className={`dropdown-menu ${state ? 'active' : 'hide'}`}
        items={menuItems}
        onClick={closeDropdown}
      />
    </div>
  );
}
