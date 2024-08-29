import React from "react";
import Footers from "components/Footer/Footer";
import FooterMenu from "./FooterMenu";
import Logo from "@/commonComponents/logo";

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
