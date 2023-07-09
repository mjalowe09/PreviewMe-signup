//libraries
import React from "react";
import { Link } from "react-router-dom";
//stylesheet
import "../css/navbar.css";
//assets

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-content">
        <Link to="/">
          <img
            className="navbar-logo"
            src="https://s3.amazonaws.com/appforest_uf/f1627381887780x550982278862589300/PreviewMe%20logo%402x-8.png"
            alt="PreviewMe Logo"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
