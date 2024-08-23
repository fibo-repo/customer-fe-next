import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthProvider';
// import {
//   // LISTING_POSTS_PAGE,
//   // PRICING_PLAN_PAGE,
//   AGENT_ACCOUNT_SETTINGS_PAGE,
// } from 'settings/constant';

const MobileMenu = ({ className, onClick }) => {
  // auth context
  const { logOut } = useContext(AuthContext);
  const loggedIn = localStorage.getItem('userDetails') ? true : false;
  let navigate = useNavigate();

  const goToMyBids = () => {
    navigate(`/customer/my-bids`);
  };

  const navigations = [
    {
      label: loggedIn && <button onClick={goToMyBids}>My Bids</button>,
      key: 'login',
    },
    {
      label: loggedIn && (
        <button onClick={() => navigate('/customer/myBookings')}>
          My Bookings
        </button>
      ),
      key: 'my_bookings',
    },
    {
      label: loggedIn && (
        <button onClick={() => navigate('/property-registration')}>
          List Your Property
        </button>
      ),
      key: 'list_property',
    },

    {
      label: loggedIn && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            localStorage.clear();
            navigate('/sign-in');
            logOut();
          }}
        >
          Log Out
        </button>
      ),
      key: 'logout',
    },
  ];

  return (
    <Menu
      style={{ paddingTop: '0px' }}
      className={className}
      items={navigations}
      onClick={onClick}
    />
  );
};

export default MobileMenu;
