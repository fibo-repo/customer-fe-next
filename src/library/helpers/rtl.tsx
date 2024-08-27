import React, { ComponentType } from "react";

let direction: string = "ltr";

if (typeof window !== "undefined") {
  const htmlElement = document.getElementsByTagName("html")[0];
  const dirAttribute = htmlElement.getAttribute("dir");
  if (dirAttribute) {
    direction = dirAttribute;
  }
}

const withDirection = <P extends object>(
  Component: ComponentType<P>
): React.FC<P> => {
  return (props: P) => {
    return <Component {...props} data-rtl={direction} />;
  };
};

export default withDirection;
export { direction };
