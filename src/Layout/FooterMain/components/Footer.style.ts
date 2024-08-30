import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import footerBg from "./footer-bg.svg";

interface FooterWrapperProps {
  bgSrc?: string;
}

const FooterWrapper = styled.footer<FooterWrapperProps>`
  width: 100%;
  background-color: ${themeGet("color.1", "#ffffff")};
  background-image: url(${(props) => (props.bgSrc ? props.bgSrc : footerBg)});
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 414px) {
    padding: 60px 0 50px;
  }
`;

export const MenuWrapper = styled.div`
  margin-top: 40px;
  padding-left: 10px;

  @media (max-width: 414px) {
    margin-top: 30px;
    padding: 0 48px;
  }

  ul,
  .ant-menu,
  ul.ant-menu {
    display: flex;
    align-items: center;
    border: 0;
    background-color: transparent;
    border-inline-end: 0 !important;

    @media (max-width: 414px) {
      flex-wrap: wrap;
    }

    li {
      margin: 0 30px;
      padding: 0;
      height: auto;
      margin-bottom: 0 !important;
      width: auto;
      border-radius: 0;

      @media (max-width: 414px) {
        width: 50%;
        margin: 0px;
      }

      &:hover {
        background: transparent !important;
      }

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &.ant-menu-item-selected {
        background-color: transparent;
      }

      color: ${themeGet("text.0", "#2C2C2C")};
      font-size: 15px;
      line-height: 18px;
      font-weight: 700;
      transition: color 0.2s ease-in-out;

      a {
        color: ${themeGet("text.0", "#2C2C2C")};
        transition: color 0.2s ease-in-out;
        &:hover {
          color: ${themeGet("primary.0", "#4dcad2")};
        }
      }
    }
  }
`;

export const CopyrightArea = styled.div`
  color: ${themeGet("text.1", "#909090")};
  font-size: 15px;
  line-height: 18px;
  font-weight: 400;
  margin-top: 30px;
  @media (max-width: 414px) {
    font-size: 14px;
    margin-top: 20px;
  }
`;

export const ContactArea = styled.div`
  color: ${themeGet("text.1", "#909090")};
  font-size: 15px;
  line-height: 18px;
  font-weight: 400;
  margin-top: 30px;
  display: flex;

  @media (max-width: 414px) {
    font-size: 14px;

    display: block;
  }
`;

export const ContactAreaItem = styled.div`
  margin-left: 24px;
  margin-top: 8px;

  @media (max-width: 414px) {
    margin-left: 0px;
  }
`;

export const SecondaryFooter = styled.div`
  @media (max-width: 1200px) {
    height: 74px;
  }
`;

export default FooterWrapper;
