import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';

const NavbarWrapper = styled.nav`
  display: none;
  width: 100%;
  padding: 0 25px;
  min-height: 82px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${themeGet('border.3', '#E6E6E6')};
  background-color: ${themeGet('color.1', '#ffffff')};
  @media (min-width: 991px) {
    display: flex;
  }

  &.is_transparent {
    background: transparent;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 999;
    border-bottom: 0;
    background-color: transparent;
    transition: all 0.3s ease-out;

    .ant-menu {
      border-inline-end: 0 !important;

      li {
        &.ant-menu-item-selected {
          background-color: transparent;
          a {
            color: ${themeGet('color.1', '#ffffff')};
            &.active {
              border-bottom: 0;
            }
          }
        }
        a {
          color: ${themeGet('color.1', '#ffffff')};
        }
      }
      &.dropdown-menu {
        li {
          a {
            color: ${themeGet('text.0', '#2C2C2C')};
          }
        }
      }
    }
  }
`;

export const Container = styled.div`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  @media (min-width: 991px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  max-width: 650px;
  width: 100%;
  > a {
    margin-right: 27px;
  }
`;

export const MenuArea = styled.div`
  display: flex;
  align-items: center;
`;

export const CustomAuthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

export const AvatarWrapper = styled.div`
  margin-left: 46px;

  .avatar-dropdown {
    position: relative;

    .dropdown-handler {
      width: 40px;
      height: 40px;
      overflow: hidden;
      border-radius: 50%;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .dropdown-menu {
      min-width: 180px;
      border-right: 0;
      position: absolute;
      right: 0;
      top: 45px;
      border-radius: 4px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      &.hide {
        opacity: 0;
        visibility: hidden;
      }
      &.active {
        opacity: 1;
        visibility: visible;
      }
      li {
        color: ${themeGet('text.0', '#2C2C2C')};
        font-size: 15px;
        line-height: 18px;
        font-weight: 400;
        height: auto;
        padding: 0;
        transition: color 0.2s ease-in-out;
        &.ant-menu-item-selected,
        &.ant-menu-item-active {
          background-color: transparent;
        }
        &:hover {
          background-color: transparent !important;
        }

        a {
          display: block;
          padding: 8px 16px;
          color: ${themeGet('text.0', '#2C2C2C')};
          transition: color 0.2s ease-in-out;
          &:hover {
            color: ${themeGet('primary.0', '#4dcad2')};
          }
          &.active {
            font-weight: 700;
            color: ${themeGet('primary.0', '#4dcad2')};
          }
        }
        button {
          padding: 0;
          border: 0;
          cursor: pointer;
          padding: 8px 16px;
          width: 100%;
          text-align: left;
          background-color: transparent;
          transition: color 0.2s ease-in-out;
          &:hover {
            color: ${themeGet('primary.0', '#4dcad2')};
          }
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
`;

export const MenuWrapper = styled.div`
  ul,
  .ant-menu,
  ul.ant-menu {
    display: flex;
    align-items: center;
    border: 0;
    background-color: transparent;
    border-inline-end: 0 !important;

    li {
      margin: 0 14px;
      padding: 0;
      height: auto;
      margin-bottom: 0 !important;
      color: ${themeGet('text.0', '#2C2C2C')};
      font-size: 15px;
      line-height: 18px;
      font-weight: 400;
      transition: color 0.2s ease-in-out;
      border-radius: inherit;
      @media (max-width: 1200px) {
        margin: 0 10px;
      }

      &:hover {
        background-color: transparent !important;
      }

      &:first-child {
        margin-left: 0;
      }
      &:last-child {
        margin-right: 0;
      }
      &.ant-menu-item-selected,
      &.ant-menu-item-active {
        background-color: transparent;
      }

      a {
        display: block;
        padding: 30px 16px;
        color: ${themeGet('text.0', '#2C2C2C')};
        transition: color 0.2s ease-in-out;
        @media (max-width: 1200px) {
          padding: 30px 10px;
        }
        &:hover {
          color: ${themeGet('primary.0', '#4dcad2')};
        }
      }
      &.ant-menu-item-selected a.active {
        font-weight: 700;
        color: ${themeGet('primary.0', '#4dcad2')};
        border-bottom: 3px solid ${themeGet('primary.0', '#4dcad2')};
      }
    }
  }
`;

export const AuthWrapper = styled.div`
  margin-left: 74px;

  ul,
  .ant-menu,
  ul.ant-menu {
    display: flex;
    align-items: center;
    border: 0;
    background-color: transparent;

    li {
      margin: 0;
      padding: 0;
      height: auto;
      margin-bottom: 0 !important;
      color: ${themeGet('text.0', '#2C2C2C')};
      font-size: 15px;
      line-height: 18px;
      font-weight: 400;
      transition: color 0.2s ease-in-out;
      width: auto;
      border-radius: inherit;
      &.ant-menu-item-selected {
        background-color: transparent;
      }

      &:hover {
        background-color: transparent !important;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 78px;
        min-height: 38px;
        border-radius: 3px;
        color: ${themeGet('text.0', '#2C2C2C')};
        transition: color 0.2s ease-in-out;
        &:hover {
          color: ${themeGet('primary.0', '#4dcad2')};
        }
      }

      &:last-child {
        a {
          color: ${themeGet('color.1', '#ffffff')};
          background-color: ${themeGet('primary.0', '#4dcad2')};
          transition: opacity 0.2s ease;

          &:hover {
            opacity: 0.9;
          }
        }
      }
    }
  }
`;

export default NavbarWrapper;
