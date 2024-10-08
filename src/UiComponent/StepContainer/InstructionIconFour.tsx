import React from "react";

interface InstructionIconFourProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
}

export const InstructionIconFour: React.FC<InstructionIconFourProps> = (
  props
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 74 99"
      width={props.width || "50px"}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M62.731 50.17l8.939-29.798a5.882 5.882 0 00-3.573-7.48l-1.164-.408a5.878 5.878 0 00-7.484 3.573l-9.334 26.955M36.228 44.497l1.95-36.714A5.878 5.878 0 0144.117 2h1.233a5.878 5.878 0 015.782 5.944l-1.016 35.055M24.767 49.85l-6.833-36.189a5.644 5.644 0 014.537-6.511l1.159-.209a5.644 5.644 0 016.512 4.532l6.078 32.994M24.715 49.846L11.722 28.682a4.593 4.593 0 00-5.913-2.605l-.899.352a4.584 4.584 0 00-2.605 5.913L12.2 55.867l3.556 21.42 6.164 17.825M38.806 83.278c-.26-10.71 13.297-17.183 13.297-17.183l.825-3.278-11.17-4.141c-2.891-1.806-3.668-5.362-2.305-8.709 1.063-2.605 4.028-1.988 4.028-1.988s16.814 1.845 19.749 3.286c6.29 3.1 3.842 18.212 2.04 22.97-1.801 4.758-8.291 19.318-8.291 19.318v3.387"
      ></path>
    </svg>
  );
};
