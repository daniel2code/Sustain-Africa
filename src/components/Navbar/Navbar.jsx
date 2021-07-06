import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

import "./Navbar.scss";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="row-one">
          <Button size="small" type="link">
            <Link to="/login">login</Link>
          </Button>
          <Button type="primary" size="small">
            <Link to="/register">register</Link>
          </Button>
        </div>

        <div className="row-two">
          <div className="top">sustain.africa</div>
          <div className="bottom">
            alternative ways to move funds around the world.
          </div>
        </div>
        <div className="row-three">Support: help@sustain.africa</div>
      </div>
    </div>
  );
}
