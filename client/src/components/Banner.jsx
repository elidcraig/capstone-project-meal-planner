import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div className="banner">
      <Link to="/">
        <div className="banner-logo">MEAL PLANNER</div>
      </Link>
      <div className="banner-button-group">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Banner;
