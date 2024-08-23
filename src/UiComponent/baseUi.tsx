"use client";

import {
  space,
  borders,
  borderColor,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  display,
  fontSize,
  flex,
  order,
  alignSelf,
  color,
  compose,
} from "styled-system";
import { CSSObject } from "styled-components";

// Define the type for the props
export type BaseProps = {
  space?: any;
  width?: any;
  minWidth?: any;
  maxWidth?: any;
  height?: any;
  minHeight?: any;
  maxHeight?: any;
  fontSize?: any;
  color?: any;
  flex?: any;
  order?: any;
  alignSelf?: any;
  borders?: any;
  borderColor?: any;
  display?: any;
};

export const themed = (key: string) => (props: any) => props.theme[key];

export const base = compose(
  () => ({ boxSizing: "border-box" } as CSSObject),
  space,
  width,
  minWidth,
  maxWidth,
  height,
  minHeight,
  maxHeight,
  fontSize,
  color,
  flex,
  order,
  alignSelf,
  borders,
  borderColor,
  display
);

// Export type for components using base
export type BaseStyleProps = BaseProps;
