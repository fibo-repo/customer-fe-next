"use client";

import React from "react";
import FooterMenu from "./components/FooterMenu";
import Logo from "@/commonComponents/Logo/Logo";
import Footer from "./components/Footer";
import BysLogo from "@/assets/images/bys_final_logo.png";

const FooterMain: React.FC = () => {
  return (
    <Footer
      logo={
        <Logo
          withLink
          linkTo="/"
          src={BysLogo}
          title="Bid your Stay"
          width={125}
        />
      }
      menu={<FooterMenu />}
      copyright={`Copyright © ${new Date().getFullYear()} Brokfree Travel Tech Pvt Ltd.`}
    />
  );
};

export default FooterMain;
