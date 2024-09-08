import React from "react";
import Banner from "../../components/Banner";
import Stories from "../stories/Stories";

const Home = () => {
  return (
    <div className="w-screen px-10 py-3 bg-bgPrimary text-accentPrimary">
      <Banner />
      <Stories />
    </div>
  );
};

export default Home;
