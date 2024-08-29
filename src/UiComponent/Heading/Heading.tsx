import React from "react";
import styled from "styled-components";
import {
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  FontFamilyProps,
  FontWeightProps,
  TextAlignProps,
  LineHeightProps,
  LetterSpacingProps,
} from "styled-system";
import { base, themed } from "@/UiComponent/baseUi";

interface HeadingProps
  extends FontFamilyProps,
    FontWeightProps,
    TextAlignProps,
    LineHeightProps,
    LetterSpacingProps {
  content: string | React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  mt?: string | number;
  mb?: string | number;
  style?: React.CSSProperties; // Added to support inline styles
}

const HeadingWrapper = styled("p")<HeadingProps>(
  base,
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  themed("Heading")
);

const Heading: React.FC<HeadingProps> = ({ content, style, ...props }) => (
  <HeadingWrapper style={style} {...props}>
    {content}
  </HeadingWrapper>
);

Heading.defaultProps = {
  as: "h2",
  mt: 0,
  mb: 0,
  fontWeight: 700,
};

export default Heading;
