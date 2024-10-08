import React from "react";

interface InstructionIconThreeProps extends React.SVGProps<SVGSVGElement> {}

export const InstructionIconThree: React.FC<InstructionIconThreeProps> = (
  props
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 74 114"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M5.774 46.141l-1.182.76A5.695 5.695 0 002.9 54.748l11.466 17.747a5.69 5.69 0 007.838 1.677l1.182-.764a5.69 5.69 0 001.701-7.847l-11.46-17.747a5.695 5.695 0 00-7.853-1.673v0zM57.925 53.474l8.309-35.686a6.511 6.511 0 00-4.652-7.91l-1.322-.346a6.512 6.512 0 00-7.91 4.652l-9 32.591M28.154 49.726L26.818 9.05a6.507 6.507 0 016.007-6.939l1.36-.096a6.507 6.507 0 016.944 6.002l2.22 38.757"
      ></path>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M13.621 47.813l-7.718-26.33a5.997 5.997 0 014.224-7.323l1.216-.327a5.992 5.992 0 017.324 4.224l9.486 31.674M37.582 91.078C38.764 79.3 54.541 74.013 54.541 74.013l1.302-5.473-7.468-5.18c-2.926-2.403-3.291-6.392-1.336-9.886 1.529-2.73 4.695-1.629 4.695-1.629s13.985 3.431 17.008 5.416c6.487 4.267 1.725 20.535-.909 25.513-2.633 4.979-10.067 20.294-10.067 20.294l-1.817 8.03M2.338 53.595l1.639 27.517 10.02 21.956"
      ></path>
    </svg>
  );
};
