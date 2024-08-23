"use client";

import theme from "@/theme";
import { ConfigProvider } from "antd";
import React from "react";
import { ThemeProvider } from "styled-components";
import AuthProvider from "@/context/AuthProvider";
import GlobalStyle from "@/styles/global.style";

export default function ThemeWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider theme={{ hashed: false }}>
        <React.Fragment>
          {/* <Provider store={store}> */}
          <GlobalStyle />
          {/* <FireAuth> */}
          <AuthProvider>{children}</AuthProvider>
          {/* </FireAuth> */}
          {/* </Provider> */}
        </React.Fragment>
      </ConfigProvider>
    </ThemeProvider>
  );
}
