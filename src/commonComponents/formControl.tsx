"use client";

import React from "react";
import PropTypes from "prop-types";
import Wrapper from "@/styles/formControl.style";
import HtmlLabel from "./htmlLabel";

type Props = {
  className?: string;
  label: string;
  labelTag?: string;
  htmlFor: string;
  children: React.ReactNode;
  error: React.ReactNode;
};

const FormControl = ({
  className,
  label,
  labelTag,
  htmlFor,
  children,
  error,
}: Props) => {
  const addAllClasses = ["form-control"];
  if (error) {
    addAllClasses.push("has-error");
  }
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <Wrapper className={addAllClasses.join(" ")}>
      {label && (
        <HtmlLabel
          className="field-label"
          as={labelTag}
          htmlFor={htmlFor}
          content={label}
        />
      )}
      {children}
      {error && <div className="feedback">{error}</div>}
    </Wrapper>
  );
};

FormControl.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  labelTag: PropTypes.string,
  htmlFor: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.any,
};

export default FormControl;
