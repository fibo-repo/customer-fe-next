"use client";

import React, { useEffect } from "react";
import SearchArea from "./Search/search";
import TopPropeties from "./TopProperties/TopPropeties";
import PopularLocation from "@/UiComponent/PopularLocation/PopularLocation";

const Home = () => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }, []);

  return (
    <>
      <SearchArea />
      <TopPropeties />
      <PopularLocation />
    </>
  );
};

export default Home;
