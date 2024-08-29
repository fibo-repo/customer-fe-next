"use client";

import React from "react";
import LoaderWrapper from "./Loader.style";

interface LoaderProps {
  className?: string;
  fill?: string;
}

const Loader: React.FC<LoaderProps> = ({ fill = "#4dcad2", className }) => {
  // default className
  const addAllClasses = ["loader"];

  // add new class using className prop
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <LoaderWrapper className={addAllClasses.join(" ")}>
      <svg enableBackground="new 0 0 0 0">
        <circle fill={fill} stroke="none" cx="6" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.1"
          />
        </circle>
        <circle fill={fill} stroke="none" cx="26" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.2"
          />
        </circle>
        <circle fill={fill} stroke="none" cx="46" cy="50" r="6">
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin="0.3"
          />
        </circle>
      </svg>
    </LoaderWrapper>
  );
};

export default Loader;
