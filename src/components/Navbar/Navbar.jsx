import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  TwitterOutlined,
  LeftOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import "./Navbar.scss";

export default function Navbar() {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
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
            {userState?.profile ? (
              <>
                <div className="balance">$10.39</div>

                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item key="0">Profile</Menu.Item>
                      <Menu.Item key="1">Settings</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        key="3"
                        onClick={() => {
                          dispatch({ type: "DESTROY_SESSION" });
                          history.push("/");
                        }}
                        style={{ color: "#ed1450" }}
                      >
                        Logout
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <div className="name">
                    {userState?.profile?.user_name}{" "}
                    <EllipsisOutlined
                      rotate="90"
                      style={{ fontSize: "13px" }}
                    />
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <Button size="small" type="link">
                  <Link to="/login">login</Link>
                </Button>
                <Button type="primary" size="small">
                  <Link to="/register">register</Link>
                </Button>
              </>
            )}
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
