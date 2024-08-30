"use client";

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import LogoArea from "@/styles/logoArea.style";
import BysLogo from "@/assets/images/bys_final_logo.png";

type LogoProps = {
  className?: string;
  withLink?: boolean;
  linkTo?: string;
  src: StaticImageData | string;
  title?: string;
  width?: number | string;
};
const Logo = ({ className, withLink, linkTo, src, width }: LogoProps) => {
  return (
    <LogoArea className={className}>
      {withLink ? (
        <Link href={linkTo || "#"}>
          {src ? (
            <Image
              style={{ width: width || "100%", opacity: 1, height: "auto" }}
              src={src}
              alt="Profile Icon."
            />
          ) : (
            <Image
              style={{ width: 125, height: "auto", marginTop: 10, opacity: 1 }}
              src={BysLogo}
              alt="BidYourStay Logo."
            />
          )}
        </Link>
      ) : (
        <Fragment>
          {src ? (
            <Image
              style={{ opacity: 1, width: width || "100%", height: "auto" }}
              src={src}
              alt="Profile Icon."
            />
          ) : (
            <Image
              style={{ width: 125, height: "auto", marginTop: 10, opacity: 1 }}
              src={BysLogo}
              alt="BidYourStay Logo."
            />
          )}
        </Fragment>
      )}
    </LogoArea>
  );
};

Logo.propTypes = {
  className: PropTypes.string,
  withLink: PropTypes.bool,
  src: PropTypes.string,
  title: PropTypes.string,
  linkTo: PropTypes.string,
};

export default Logo;
