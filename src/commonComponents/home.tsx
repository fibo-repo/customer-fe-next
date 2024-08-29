"use client";

import React, { useEffect } from "react";
import SearchArea from "./Search/search";
import TopPropeties from "./TopProperties/TopPropeties";

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
      {/* <PopularLocation /> */}
    </>
  );
};

export default Home;
