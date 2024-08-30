"use client";

import React from "react";
import { Divider } from "antd";
import Wrapper, {
  Title44,
  TitleInfo,
  Text,
  SignUpFormWrapper,
  SignupBannerWrapper,
} from "./auth.style";
import Navbar from "@/commonComponents/NavbarHost";
import SignUpForm from "./signUpForm";
import Link from "next/link";
import Image from "next/image";
import { LOGIN_PAGE } from "@/library/constants/routeUrls";
import SignUpBanner from "../../../assets/images/banner/banner_bys-02.png";

const SignUp = () => {
  return (
    <Wrapper>
      <SignUpFormWrapper>
        <Navbar />
        <Title44>Welcome To Bid Your Stay</Title44>
        <TitleInfo>Please Register for your account</TitleInfo>
        <SignUpForm />
        {/* <Divider>Or Register Up With </Divider> */}
        <Divider></Divider>
        <Text>
          Already Have an Account! &nbsp;
          <Link href={LOGIN_PAGE}>Login</Link>
        </Text>
      </SignUpFormWrapper>
      <SignupBannerWrapper>
        <Image src={SignUpBanner} alt="Auth page banner" />
      </SignupBannerWrapper>
    </Wrapper>
  );
};

export default SignUp;
