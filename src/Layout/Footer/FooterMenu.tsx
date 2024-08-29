import React from "react";
import Link from "next/link";
import { Menu, MenuProps } from "antd";

interface NavigationItem {
  label: React.ReactNode;
  key: string;
}

const navigations: NavigationItem[] = [
  {
    label: (
      <Link href="/about-us" passHref legacyBehavior>
        <a target="_blank">About us</a>
      </Link>
    ),
    key: "about",
  },
  {
    label: (
      <Link href="/privacy-policy" passHref legacyBehavior>
        <a target="_blank">Privacy Policy</a>
      </Link>
    ),
    key: "privacy",
  },
  {
    label: (
      <Link href="/payment-terms" passHref legacyBehavior>
        <a target="_blank">Payment Terms</a>
      </Link>
    ),
    key: "payment",
  },
  {
    label: (
      <Link href="/term-of-use" passHref legacyBehavior>
        <a target="_blank">Term Of Use</a>
      </Link>
    ),
    key: "termOfUse",
  },
];

const FooterMenu: React.FC = () => {
  return <Menu items={navigations as MenuProps["items"]} />;
};

export default FooterMenu;
