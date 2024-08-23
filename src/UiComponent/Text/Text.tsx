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
import DOMPurify from "dompurify";
import { base, themed } from "@/UiComponent/baseUi";

interface TextProps
  extends FontFamilyProps,
    FontWeightProps,
    TextAlignProps,
    LineHeightProps,
    LetterSpacingProps {
  content: string;
  as?: React.ElementType;
  m?: string | number;
}

const TextWrapper = styled("p")<TextProps>(
  base,
  fontFamily,
  fontWeight,
  textAlign,
  lineHeight,
  letterSpacing,
  themed("Text")
);

const Text: React.FC<TextProps> = ({ content, ...props }) => {
  const sanitizedData = () => ({
    __html: DOMPurify.sanitize(content),
  });

  return <TextWrapper dangerouslySetInnerHTML={sanitizedData()} {...props} />;
};

Text.defaultProps = {
  as: "p",
  m: 0,
};

export default Text;
