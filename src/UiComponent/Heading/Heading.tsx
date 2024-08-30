"use client";

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
  $mt?: string | number;
  $mb?: string | number;
  $fontWeight?: string | number;
  style?: React.CSSProperties;
}

// Filtering out styled-system props from being passed to DOM elements
const HeadingWrapper = styled("p").withConfig({
  shouldForwardProp: (prop) =>
    ![
      "$mt",
      "$mb",
      "$fontWeight",
      "fontFamily",
      "fontWeight",
      "textAlign",
      "lineHeight",
      "letterSpacing",
    ].includes(prop),
})<HeadingProps>(
  base,
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  themed("Heading")
);

const Heading: React.FC<HeadingProps> = ({
  content,
  style,
  as = "h2",
  $mt = 0,
  $mb = 0,
  $fontWeight = 700,
  ...props
}) => (
  <HeadingWrapper
    as={as}
    $mt={$mt}
    $mb={$mb}
    $fontWeight={$fontWeight}
    style={style}
    {...props}
  >
    {content}
  </HeadingWrapper>
);

export default Heading;
