"use client";

import React from "react";
import Link from "next/link";
import { Divider } from "antd";
// import SocialLogin from "../components/socialLogin";
import Navbar from "@/commonComponents/navbar";
import Wrapper, {
  BannerWrapper,
  FormWrapper,
  Text,
  Title,
  TitleInfo,
} from "./auth.style";
import SignInForm from "../components/signInForm";
import Image from "next/image";
import SignInBanner from "@/assets/images/otp_screen_updated.png";

const SignIn = () => {
  return (
    <Wrapper>
      <FormWrapper>
        <Navbar />
        {/* <Logo
          withLink
          linkTo="/"
          src="/images/logo-alt.svg"
          title="Bid your Stay"
        /> */}
        <Title>Welcome to Bid Your Stay!</Title>
        <TitleInfo>
          If you don&apos;t have an account yet, please register or log in to
          experience Bid Your Stay.
        </TitleInfo>
        <SignInForm />
        <Divider>Or log in with </Divider>
        {/* <SocialLogin /> */}
        <Text>
          Don&apos;t Have an Account?&nbsp;
          <Link href="/sign-up">Register</Link>
        </Text>
      </FormWrapper>
      <BannerWrapper>
        <Image src={SignInBanner} alt="Auth page banner" />
      </BannerWrapper>
    </Wrapper>
  );
};

export default SignIn;
