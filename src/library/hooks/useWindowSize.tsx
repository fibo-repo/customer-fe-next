"use client";
import React from "react";

const useWindowSize = () => {
  const isClient = typeof window === "object";

  const getSize = React.useCallback(
    () => ({
      width: isClient ? window.innerWidth : 0,
      height: isClient ? window.innerHeight : 0,
    }),
    [isClient]
  );

  const [size, setSize] = React.useState(getSize);

  React.useEffect(() => {
    if (!isClient) {
      return;
    }
    const onHandleResize = () => {
      setSize(getSize());
    };
    window.addEventListener("resize", onHandleResize);
    return () => window.removeEventListener("resize", onHandleResize);
  }, [getSize, isClient]);

  return size;
};

export default useWindowSize;
