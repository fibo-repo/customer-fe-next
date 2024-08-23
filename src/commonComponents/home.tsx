"use client";

import React, { useEffect } from "react";
import { Button } from "../app/main.style";
import SearchArea from "./Search/Search";

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }, []);

  return (
    <>
      <SearchArea />
      <PopularLocation />
      <Button>Hello</Button>
    </>
  );
};

export default Home;
