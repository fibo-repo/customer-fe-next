"use client";

import React from "react";
import FooterWrapper, {
  MenuWrapper,
  CopyrightArea,
  SecondaryFooter,
  ContactArea,
  ContactAreaItem,
} from "./Footer.style";

interface FooterProps {
  className?: string;
  logo?: React.ReactNode;
  menu?: React.ReactNode;
  bgSrc?: string;
  copyright?: string | React.ReactNode;
  path?: string;
}

const Footer: React.FC<FooterProps> = ({
  logo,
  menu,
  bgSrc,
  copyright,
  className,
  path,
}) => {
  return (
    <>
      <FooterWrapper id="footer" className={className} bg-img={bgSrc}>
        {logo && logo}
        {menu && <MenuWrapper>{menu}</MenuWrapper>}
        <ContactArea>
          <ContactAreaItem>
            Phone: <a href="tel:">+91 70196 20792</a> ,{" "}
            <a href="tel:">+91 88829 67672</a>
          </ContactAreaItem>
          <ContactAreaItem>
            Email:{" "}
            <a href="mailto:notifications@bidyourstay.com">
              notifications@bidyourstay.com
            </a>
          </ContactAreaItem>
        </ContactArea>
        {copyright && <CopyrightArea>{copyright}</CopyrightArea>}
      </FooterWrapper>
      {!!path && <SecondaryFooter />}
    </>
  );
};

export default Footer;
