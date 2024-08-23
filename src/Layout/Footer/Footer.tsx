import React from 'react';
import Logo from 'components/UI/Logo/Logo';
import Footers from 'components/Footer/Footer';
import FooterMenu from './FooterMenu';

const Footer = () => {
  return (
    <Footers
      logo={
        <Logo
          withLink
          linkTo="/"
          src="/images/bys_final_logo.png"
          title="Bid your Stay"
        />
      }
      menu={<FooterMenu />}
      copyright={`Copyright @ ${new Date().getFullYear()} Brokfree Travel Tech Pvt Ltd.`}
    />
  );
};

export default Footer;
