import React from "react";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home.jsx";

// import "react-datepicker/dist/react-datepicker.css"; /////!!

const MainComponent = () => {
  return (
    <main>
      <Outlet />
      <Home />
    </main>
  );
};

export default MainComponent;
