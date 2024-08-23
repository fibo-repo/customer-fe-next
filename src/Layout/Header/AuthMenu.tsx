import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { LOGIN_PAGE, REGISTRATION_PAGE } from 'settings/constant';
import { CustomAuthWrapper } from 'components/Navbar/Navbar.style';

export const HostButton = () => {
  return (
    <NavLink
      style={{
        borderRadius: '4px',
        backgroundColor: '#deff51',
        padding: '8px 10px 8px 10px',
        width: 'max-content',
        marginLeft: '50px',
        boxShadow:
          '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
      }}
      to={'/property-registration'}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <img
          style={{ width: '30px', height: '30px', opacity: 1 }}
          src="/images/house.svg"
          alt="House Icon"
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#4dcad2',
            }}
          >
            List your Home
          </span>
          <span
            style={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#000000',
            }}
          >
            Start Hosting
          </span>
        </div>
      </div>
    </NavLink>
  );
};

const menuItems = [
  {
    label: <NavLink to={LOGIN_PAGE}>Sign in</NavLink>,
    key: 'menu-1',
  },
  {
    label: <NavLink to={REGISTRATION_PAGE}>Sign up</NavLink>,
    key: 'menu-2',
  },
];

const AuthMenu = ({ className }) => {
  return (
    <CustomAuthWrapper>
      <Menu className={className} items={menuItems} />
      <HostButton />
    </CustomAuthWrapper>
  );
};

export default AuthMenu;
