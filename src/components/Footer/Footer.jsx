import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TwitterOutlined } from "@ant-design/icons";

import "./Footer.scss";

export default function Footer() {
  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
    //eslint-disable-next-line
  }, []);

  const [hideSecNav, setHideSecNav] = useState(true);

  const listenToScroll = () => {
    let heightToHideFrom = 135;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      hideSecNav && setHideSecNav(false);
    } else {
      setHideSecNav(true);
    }
  };
  return (
    <div className="footer-container">
      <div className="footer-wrapper">
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
