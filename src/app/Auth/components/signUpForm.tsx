"use client";

import React, { useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Input, Button, notification, Select } from "antd";
import axios from "axios";
import { FieldWrapper } from "./auth.style";
import FormControl from "@/commonComponents/formControl";
import { MdLockOpen } from "react-icons/md";
import { API_BASE_URI } from "@/library/constants/api";
import { useRouter } from "next/navigation";
import { LOGIN_PAGE, REGISTRATION_PAGE } from "@/library/constants/routeUrls";

const SignUpForm = () => {
  const [otpEnabled, setOTPEnabled] = useState(false);

  const router = useRouter();
  const {
    control,
    formState: { errors },
    setError,
    getValues,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: FieldValues) => {
    const payload = { ...data };
    const url = `${API_BASE_URI}/auth/signup/`;

    payload["sign_up_method"] = "self";
    debugger;
    axios
      .post(url, payload)
      .then((response) => {
        console.log("response", response);
        if (response.data.responseInformation.responseCode === 0) {
          const jwtToken = response.data.result[0].jwtToken;
          const userDetails = response.data.result[0].userDetails;
          localStorage.setItem("jwtToken", jwtToken);
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          notification.success({
            message: "OTP Verified",
            description: "Welcome to Bid Your Stay!",
          });
          // console.log("test after verified")
          // debugger;
          setTimeout(() => {
            router.push("/");
          }, 2000);
        } else {
          notification.error({
            message: "Verification Failed",
            description: "User already exist . Please signin.",
          });
          setTimeout(() => {
            router.push(LOGIN_PAGE);
          }, 2000);
        }

        // Handle response here, e.g., save user data to localStorage or router.push
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleVerifyOtp = async () => {
    const values = getValues();
    const otp = values.Otp;
    const phoneNo = values.phone;
    if (!phoneNo || !otp) {
      notification.warning({
        message: "Validation Error",
        description: "Please enter correct phone number and OTP.",
      });
      return;
    }

    try {
      const phoneNo = "+91" + values.phone;
      const response = await axios.post(`${API_BASE_URI}/auth/verifyOtp/`, {
        phoneNo: phoneNo,
        otp: otp,
      });

      if (response.data.responseInformation.responseCode === 0) {
        onSubmit(values);
      } else {
        notification.error({
          message: "Verification Failed",
          description: "An error occurred while verifying OTP.",
        });
        setTimeout(() => {
          router.push(REGISTRATION_PAGE);
        }, 2000);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      notification.error({
        message: "Verification Failed",
        description: "An error occurred while verifying OTP.",
      });
    }
  };

  const handleGetOtp = async () => {
    try {
      const phone = "+91" + getValues("phone");
      const res = await axios.get(`${API_BASE_URI}/auth/requestOtp/` + phone);
      if (res.data.responseInformation.responseCode === 0) {
        setOTPEnabled(true);
      }
    } catch (error) {
      console.error("Error fetching OTP:", error);
      setError("phone", {
        type: "manual",
        message: `${error}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleVerifyOtp)}>
      <FormControl
        label="First Name"
        htmlFor="First Name"
        error={
          errors.username && (
            <>
              {errors.first_name?.type === "required" && (
                <span>This field is required!</span>
              )}
            </>
          )
        }
      >
        <Controller
          name="first_name"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </FormControl>
      <FormControl
        label="Last Name"
        htmlFor="Last Name"
        error={
          errors.username && (
            <>
              {errors.last_name?.type === "required" && (
                <span>This field is required!</span>
              )}
            </>
          )
        }
      >
        <Controller
          name="last_name"
          defaultValue=""
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
      </FormControl>
      <FormControl
        label="Email"
        htmlFor="email"
        error={
          errors.email && (
            <>
              {errors.email?.type === "required" && (
                <span>This field is required!</span>
              )}
              {errors.email?.type === "pattern" && (
                <span>Please enter a valid email address!</span>
              )}
            </>
          )
        }
      >
        <Controller
          name="email"
          defaultValue=""
          control={control}
          rules={{
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              type="email"
              onChange={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </FormControl>

      <FormControl
        label="Gender"
        htmlFor="Gender"
        error={
          errors.gender && (
            <>
              {errors.gender?.type === "required" && (
                <span>This field is required!</span>
              )}
            </>
          )
        }
      >
        <Controller
          // name="gender"
          // defaultValue=""
          // control={control}
          // rules={{ required: true }}
          // render={({ field: { onChange, onBlur, value } }) => (
          //   <Input onChange={onChange} onBlur={onBlur} value={value} />
          // )}
          name="gender"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <Select onChange={onChange} placeholder="Select Your Gender">
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Prefer not to say">
                Prefer not to say
              </Select.Option>
              <Select.Option value="Others">Others</Select.Option>
            </Select>
            // <select {...field} id="selectOption">
            //   {/* <option value="">None</option> */}
            //   <option value="Male">Male</option>
            //   <option value="Female">Female</option>
            //   <option value="Not to say">Prefer not to say</option>
            // </select>
          )}
        />

        {/* <Controller
          name="gender"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value, onBlur } }) => (
            <Select
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Select Your Gender" // <-- Place the placeholder here
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Prefer not to say">
                Prefer not to say
              </Select.Option>
              <Select.Option value="Others">Others</Select.Option>
            </Select>
          )}
        /> */}
      </FormControl>

      <FormControl
        className="relative"
        label="Phone Number"
        htmlFor="Phone Number"
        error={
          errors.phone && (
            <>
              {errors.phone?.type === "required" && (
                <span>This field is required!</span>
              )}
              {errors.phone?.type === "minLength" && (
                <span>Phone Number must be of 10 digits!</span>
              )}
              {errors.phone?.type === "pattern" && (
                <span>Please enter a valid phone number!</span>
              )}
              {errors.phone.message && (
                <span>
                  {typeof errors.phone.message === "string"
                    ? errors.phone.message
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
            name="phone"
            defaultValue=""
            control={control}
            rules={{
              required: true,
              minLength: 10,
              maxLength: 14,
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

      <p style={{ margin: "20px 0" }}>
        By clicking on Register, you agree to our{" "}
        <a target="_blank" href="/term-of-use" rel="noreferrer">
          Terms of Service
        </a>{" "}
        and{" "}
        <a target="_blank" rel="noreferrer" href="/privacy-policy">
          Privacy policy
        </a>
      </p>

      <Button
        className="signin-btn"
        type="primary"
        htmlType="submit"
        size="large"
        style={{ width: "100%" }}
      >
        <MdLockOpen />
        Register
      </Button>
    </form>
  );
};

export default SignUpForm;
