"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MdLockOpen } from "react-icons/md";
import { Input, Button, notification } from "antd";
import axios from "axios";
import DOMPurify from "dompurify";
import FormControl from "@/commonComponents/formControl";
import { FieldWrapper } from "./auth.style";
import { API_BASE_URI } from "@/library/constants/api";
import { useRouter } from "next/navigation";

type OnSubmitData = {
  Otp: string;
  Phone: string;
};
export default function SignInForm() {
  const [otpEnabled, setOTPEnabled] = useState(false);
  const router = useRouter();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
    getValues,
  } = useForm();

  const onSubmit = async (data: OnSubmitData) => {
    try {
      const Otp = data.Otp;
      const phoneNo = "+91" + data.Phone;
      const response = await axios.post(`${API_BASE_URI}/auth/verifyOtp/`, {
        phoneNo: phoneNo,
        otp: Otp,
      });

      const userExists = response?.data?.result[0].user_exist;

      if (response.data.responseInformation.responseCode === 0 && userExists) {
        const jwtToken = response.data.result[0].jwtToken;
        const userDetails = response.data.result[0].userDetails;
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        notification.success({
          message: "OTP Verified",
          description: "Welcome Back to Bid Your Stay!",
        });

        setTimeout(() => {
          const redirectUrl = localStorage.getItem("redirectAfterLogin") || "/";
          console.log("tedt1", redirectUrl);
          localStorage.removeItem("redirectAfterLogin");
          router.push(redirectUrl);
        }, 2000);
      } else if (
        response.data.responseInformation.responseCode === 0 &&
        !userExists
      ) {
        notification.error({
          message: "Verification Failed",
          description: "User doesn't exist. Please signup first.",
        });
        setTimeout(() => {
          router.push("/sign-up");
        }, 2000);
      } else {
        notification.error({
          message: "Sign In Failed",
          description: "Please check your number and OTP or try again later.",
        });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      notification.error({
        message: "Verification Failed",
        description: "An error occurred while verifying OTP.",
      });
    }
  };

  const handleGetOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const phone = "+91" + getValues("Phone");
      const res = await axios.get(`${API_BASE_URI}/auth/requestOtp/` + phone);
      if (res.data.responseInformation.responseCode === 0) {
        setOTPEnabled(true);
      } else {
        setError("Phone", {
          type: "manual",
          message: "Enter valid number",
        });
      }
    } catch (error) {
      console.error("Error fetching OTP:", error);
      setError("Phone", {
        type: "manual",
        message: `${error}`,
      });
    }
  };

  const handleVerifyOtp = async () => {
    const values = getValues();
    const sanitizedOtpValue = DOMPurify.sanitize(values.Otp);
    const sanitizedPhoneValue = DOMPurify.sanitize(values.Phone);
    const Otp = sanitizedOtpValue;
    // console.log("verugy",Otp);
    const phoneNo = sanitizedPhoneValue;
    if (!phoneNo || !Otp) {
      notification.warning({
        message: "Validation Error",
        description: "Please enter both phone number and OTP.",
      });
      return;
    }
    const sanitizedValues = {
      Otp: Otp,
      Phone: phoneNo,
    };
    onSubmit(sanitizedValues);
  };

  return (
    <form onSubmit={handleSubmit(handleVerifyOtp)}>
      <FormControl
        className="relative"
        label="Phone Number"
        htmlFor="Phone Number"
        error={
          errors.Phone && (
            <>
              {errors.Phone?.type === "required" && (
                <span>This field is required!</span>
              )}
              {errors.Phone?.type === "minLength" && (
                <span>Phone Number must be of 10 digits!</span>
              )}
              {errors.Phone?.type === "pattern" && (
                <span>Please enter a valid phone number!</span>
              )}
              {errors.Phone?.message && (
                <span>
                  {typeof errors.Phone.message === "string"
                    ? errors.Phone.message
                    : "Invalid input"}
                </span>
              )}
            </>
          )
        }
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "46px",
              borderStyle: "solid",
              borderRadius: "3px",
              borderColor: "#E6E6E6",
              background: "#ffffff",
              width: "50px",
              fontSize: "0.9rem",
            }}
          >
            +91
          </span>
          <Controller
            name="Phone"
            defaultValue=""
            control={control}
            rules={{
              required: true,
              minLength: 10,
              maxLength: 14,
              // pattern: /^\+(?:[0-9] ?){6,14}[0-9]$/,
              pattern: /^\d{10}$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input onChange={onChange} onBlur={onBlur} value={value} />
            )}
          />
        </div>
        <FieldWrapper className="otp-wrapper">
          <button className="getOtp" onClick={handleGetOtp}>
            Get OTP
          </button>
        </FieldWrapper>
      </FormControl>

      <FormControl
        label="OTP"
        htmlFor="OTP"
        error={
          errors.Otp && (
            <>
              {errors.Otp?.type === "required" && (
                <span>This field is required!</span>
              )}
              {errors.Otp?.type === "minLength" && (
                <span>Phone Number must be of minimum 4 digits!</span>
              )}
              {errors.Otp?.type === "maxLength" && (
                <span>Phone Number must be of maximum 6 digits!</span>
              )}
              {errors.Otp.message && (
                <span>
                  {typeof errors.Otp.message === "string"
                    ? errors.Otp.message
                    : "Invalid input"}
                </span>
              )}
            </>
          )
        }
      >
        <Controller
          name="Otp"
          control={control}
          rules={{
            required: true,
            minLength: 4,
            maxLength: 6,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              disabled={!otpEnabled}
            />
          )}
        />
      </FormControl>
      <div id="recaptcha-container"></div>

      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: "100%" }}
        // onClick={VerifyOtp}
      >
        <MdLockOpen />
        Continue
      </Button>
    </form>
  );
}
