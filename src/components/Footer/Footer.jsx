import React from "react";
import { Link } from "react-router-dom";
import { TwitterOutlined } from "@ant-design/icons";

import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
        <div className="row-two">
          <div className="top">
            <Link to="/">sustain.africa</Link>
          </div>
          <div className="bottom">
            buy, sell & swap funds anonymously via over 100 methods.
          </div>
        </div>
        <div className="row-three">
          <div className="top">email: help@sustain.africa</div>
          <div className="bottom">
            <TwitterOutlined /> @sustainafrica
            <div className="right">
              <Link to="/">privacy</Link> |{" "}
              <Link to="/">terms & conditions</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
