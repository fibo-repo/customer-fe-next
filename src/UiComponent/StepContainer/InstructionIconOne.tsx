import React from "react";

interface InstructionIconOneProps extends React.SVGProps<SVGSVGElement> {}

export const InstructionIconOne: React.FC<InstructionIconOneProps> = (
  props
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 74 116"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M17.243 37.344L16 38.152a5.981 5.981 0 00-1.778 8.25l12.054 18.657a5.987 5.987 0 008.25 1.768l1.242-.803a5.987 5.987 0 001.773-8.25L25.493 39.122a5.987 5.987 0 00-8.25-1.778v0z"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M5.966 44.629l-1.243.808a5.982 5.982 0 00-1.773 8.25l12.074 18.652a5.987 5.987 0 008.25 1.773l1.242-.803a5.982 5.982 0 001.774-8.25L14.236 46.402a5.981 5.981 0 00-8.27-1.773v0zM53.516 53.161l-.096-44.34A6.84 6.84 0 0046.6 2h-1.44a6.84 6.84 0 00-6.82 6.82v25.497"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M28.506 30.068l-1.242.798a5.987 5.987 0 00-1.779 8.25L34.842 53.6a5.981 5.981 0 008.25 1.778l1.242-.803a5.98 5.98 0 001.773-8.25l-9.36-14.484a5.982 5.982 0 00-8.24-1.773v0zM35.797 93.683C37.045 81.276 53.63 75.76 53.63 75.76l1.37-5.77-7.846-5.445c-3.082-2.526-3.466-6.714-1.415-10.387 1.612-2.875 4.94-1.718 4.94-1.718s14.702 3.607 17.895 5.709c6.82 4.48 1.814 21.582-.955 26.816-2.768 5.233-10.574 21.339-10.574 21.339l-1.697 7.654M2.223 52.09l1.854 31.115 10.533 23.082"
      ></path>
    </svg>
  );
};
