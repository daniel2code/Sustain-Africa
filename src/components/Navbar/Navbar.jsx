import React from "react";
import { Button } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { TwitterOutlined, LeftOutlined } from "@ant-design/icons";

import "./Navbar.scss";

export default function Navbar() {
  const history = useHistory();
  const location = useLocation();
  return (
    <div className="navbar-container">
      <div className="navbar-wrapper">
        <div className="row-one">
          <div
            className="left"
            onClick={() => {
              history.goBack();
            }}
          >
            {location.pathname !== "/" && (
              <span>
                <LeftOutlined style={{ marginRight: "2px" }} />
                back
              </span>
            )}
          </div>

          <div className="right">
            <Button size="small" type="link">
              <Link to="/login">login</Link>
            </Button>
            <Button type="primary" size="small">
              <Link to="/register">register</Link>
            </Button>
          </div>
        </div>

        <div className="row-two">
          <div className="top">
            <Link to="/">sustain.africa</Link>
          </div>
          <div className="bottom">
            alternative ways to move funds around the world.
          </div>
        </div>
        <div className="row-three">
          <div className="top">email: help@sustain.africa</div>
          <div className="bottom">
            {" "}
            <TwitterOutlined /> @sustainafrica
          </div>
        </div>
      </div>
    </div>
  );
}
