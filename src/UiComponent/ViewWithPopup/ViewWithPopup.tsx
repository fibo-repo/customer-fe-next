import React, { useState, useRef, ReactNode, CSSProperties } from "react";
import Portal from "../Portal/Portal";
import { Wrapper, Container } from "./ViewWithPopup.style";
import { useOnClickOutside } from "./useOnClickOutside";

interface ViewWithPopupProps {
  show?: boolean;
  view?: ReactNode;
  popup?: ReactNode;
  noView?: boolean;
  style?: CSSProperties;
  className?: string;
}

export default function ViewWithPopup({
  show = false,
  view,
  popup,
  noView = false,
  style,
  className,
}: ViewWithPopupProps) {
  const [showPopup, setShowPopup] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => setShowPopup(false));

  // Add all classes to an array
  const addAllClasses = ["view_with__popup"];

  // className prop checking
  if (className) {
    addAllClasses.push(className);
  }

  return (
    <Wrapper
      className={`${addAllClasses.join(" ")} ${showPopup ? "active" : ""}`}
      ref={ref}
    >
      {view && noView && (
        <div className="popup_handler" onClick={() => setShowPopup(!showPopup)}>
          {view}
        </div>
      )}
      {!show && (
        <Container
          className="popup_container"
          showPopup={showPopup}
          onClick={() => setShowPopup(true)}
          style={style}
        >
          {view && !noView && view}
          {showPopup && (
            <div id="popup">
              <Portal rendererId="popup">{popup && popup}</Portal>
            </div>
          )}
        </Container>
      )}
    </Wrapper>
  );
}
