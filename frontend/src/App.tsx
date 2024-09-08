import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <footer></footer>
    </>
  );
};

export default App;
