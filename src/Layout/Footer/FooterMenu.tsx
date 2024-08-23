import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';

const navigations = [
  {
    label: (
      <NavLink to="/about-us" target="_blank">
        About us
      </NavLink>
    ),
    key: 'about',
  },
  {
    label: (
      <NavLink to="/privacy-policy" target="_blank">
        Privacy Policy
      </NavLink>
    ),
    key: 'privacy',
  },
  {
    label: (
      <NavLink to="/payment-terms" target="_blank">
        Payment Terms
      </NavLink>
    ),
    key: 'payment',
  },
  {
    label: (
      <NavLink to="/term-of-use" target="_blank">
        Term Of Use
      </NavLink>
    ),
    key: 'termOfUse',
  },
];

const FooterMenu = () => {
  return <Menu items={navigations} />;
};

export default FooterMenu;
