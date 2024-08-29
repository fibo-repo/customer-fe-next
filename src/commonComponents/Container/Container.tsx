import React, { ReactNode } from "react";
import ContainerWrapper from "./Container.style";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  noGutter?: boolean;
  fluid?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  fullWidth,
  noGutter,
  fluid,
}) => {
  return (
    <ContainerWrapper
      className={className}
      fullWidth={fullWidth}
      noGutter={noGutter}
      fluid={fluid}
    >
      {children}
    </ContainerWrapper>
  );
};

export default Container;
