"use client";

import React, { Fragment, ReactNode } from "react";
import { Layout as LayoutWrapper } from "antd";
import {
  LISTING_POSTS_PAGE,
  LOGIN_PAGE,
  REGISTRATION_PAGE,
  AGENT_PROFILE_PAGE,
  AGENT_ACCOUNT_SETTINGS_PAGE,
  ADD_HOTEL_PAGE,
  PRICING_PLAN_PAGE,
  SINGLE_POST_PAGE,
  PRIVACY_PAGE,
  CHANGE_PASSWORD_PAGE,
  FORGET_PASSWORD_PAGE,
  AGENT_IMAGE_EDIT_PAGE,
  AGENT_PASSWORD_CHANGE_PAGE,
} from "../library/constants/routeUrls";
import { usePathname } from "next/navigation";
import useWindowSize from "../library/hooks/useWindowSize";
import LayoutProvider from "@/context/LayoutProvider";
import Header from "@/Layout/Header/Header";
import FooterMain from "@/Layout/FooterMain/FooterMain";

const { Content } = LayoutWrapper;

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = usePathname();
  // const router = useRouter();
  const { width } = useWindowSize();
  const singlePageUrlFromConst = SINGLE_POST_PAGE.split("/");
  const singlePageUrlFormLocation = location.split("/");

  // useEffect(() => {
  //   if (location !== LOGIN_PAGE && location !== REGISTRATION_PAGE) {
  //     router.push("/");
  //   }
  // }, [location, router]);

  return (
    <LayoutProvider>
      {location === LOGIN_PAGE || location === REGISTRATION_PAGE ? (
        <Content>{children}</Content>
      ) : (
        <Fragment>
          <Header />
          <Content>{children}</Content>
          {location === LISTING_POSTS_PAGE ||
          location === PRICING_PLAN_PAGE ||
          location === ADD_HOTEL_PAGE ||
          location === AGENT_PROFILE_PAGE ||
          location === CHANGE_PASSWORD_PAGE ||
          location === FORGET_PASSWORD_PAGE ||
          location === PRIVACY_PAGE ||
          location ===
            `${AGENT_ACCOUNT_SETTINGS_PAGE}${AGENT_IMAGE_EDIT_PAGE}` ||
          location ===
            `${AGENT_ACCOUNT_SETTINGS_PAGE}${AGENT_PASSWORD_CHANGE_PAGE}` ||
          location === AGENT_ACCOUNT_SETTINGS_PAGE ? (
            <div style={{ height: "33px" }} />
          ) : (
            <Fragment>
              <FooterMain />
              {singlePageUrlFormLocation[1] === singlePageUrlFromConst[1] && (
                <Fragment>
                  {width && width < 1200 && <div style={{ height: "74px" }} />}
                </Fragment>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </LayoutProvider>
  );
};

export default Layout;
