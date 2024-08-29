import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import {
  flexWrap,
  flexDirection,
  alignItems,
  justifyContent,
} from "styled-system";
import { base, themed } from "../baseUi";

// Define the props for the Box component
interface BoxProps {
  children: ReactNode;
  flexBox?: boolean;
  as?:
    | "div"
    | "article"
    | "section"
    | "address"
    | "header"
    | "footer"
    | "nav"
    | "main";
  width?: string | number | (string | number)[];
  height?: string | number | (string | number)[];
  fontSize?: string | number | (string | number)[];
  color?: string | number | (string | number)[];
  flex?: string | number | (string | number)[];
  order?: string | number | (string | number)[];
  alignSelf?: string | number | (string | number)[];
  display?: string | number | (string | number)[];
  border?: string | number | (string | number)[];
  borderTop?: string | number | (string | number)[];
  borderRight?: string | number | (string | number)[];
  borderBottom?: string | number | (string | number)[];
  borderLeft?: string | number | (string | number)[];
  borderColor?: string | number | (string | number)[];
  [key: string]: any; // For allowing other props passed through styled-system
}

// Styled-components wrapper for Box
const BoxWrapper = styled.div<BoxProps>`
  ${base}
  ${themed("Box")}
  ${(props) =>
    props.flexBox &&
    css(
      { display: "flex" },
      flexWrap,
      flexDirection,
      alignItems,
      justifyContent,
      themed("FlexBox")
    )}
`;

// Box component
const Box: React.FC<BoxProps> = ({ children, ...props }) => (
  <BoxWrapper {...props}>{children}</BoxWrapper>
);

export default Box;

// Default props for the Box component
Box.defaultProps = {
  as: "div",
};
