"use client";

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import LogoArea from "@/styles/logoArea.style";

type LogoProps = {
  className?: string;
  withLink?: boolean;
  linkTo: string;
  src: StaticImageData | string;
  title?: string;
};
const Logo = ({ className, withLink, linkTo, src }: LogoProps) => {
  return (
    <LogoArea className={className}>
      {withLink ? (
        <Link href={linkTo}>
          {src ? (
            <Image
              style={{ width: 125, opacity: 1, height: "auto" }}
              src={src}
              alt="Profile Icon."
            />
          ) : (
            <Image
              style={{ width: 125, height: "auto", marginTop: 10, opacity: 1 }}
              src="/assets/images/bys_final_logo.png"
              alt="BidYourStay Logo."
            />
          )}
        </Link>
      ) : (
        <Fragment>
          {src ? (
            <Image
              style={{ opacity: 1, width: 125, height: "auto" }}
              src={src}
              alt="Profile Icon."
            />
          ) : (
            <Image
              style={{ width: 125, height: "auto", marginTop: 10, opacity: 1 }}
              src="/assets/images/bys_final_logo.png"
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
