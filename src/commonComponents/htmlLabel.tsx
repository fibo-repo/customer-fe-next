"use client";

import React from "react";
import styled from "styled-components";
import {
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
} from "styled-system";
import { base, themed, BaseStyleProps } from "../UiComponent/baseUi";

const LabelWrapper = styled.label<BaseStyleProps>(
  base,
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  themed("Heading")
);

// Define the TypeScript interface for the props
interface HtmlLabelProps {
  htmlFor: string;
  content: React.ReactNode;
  fontFamily?: string | number | (string | number)[];
  fontWeight?: string | number | (string | number)[];
  textAlign?: string | number | (string | number)[];
  lineHeight?: string | number | (string | number)[];
  letterSpacing?: string | number | (string | number)[];
  // Include any other props you might be passing
  [key: string]: any;
}

const HtmlLabel: React.FC<HtmlLabelProps> = ({
  htmlFor,
  content,
  ...props
}) => {
  return (
    <LabelWrapper htmlFor={htmlFor} {...props}>
      {content}
    </LabelWrapper>
  );
};

export default HtmlLabel;
