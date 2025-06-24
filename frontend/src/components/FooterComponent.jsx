import React from "react";
import { NavLink } from "react-router-dom";

const FooterComponent = () => {
  return (
    <div>
      <footer>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/setting">Setting</NavLink>
        <NavLink to="/imprint">Imprint</NavLink>
      </footer>
    </div>
  );
};

export default FooterComponent;
