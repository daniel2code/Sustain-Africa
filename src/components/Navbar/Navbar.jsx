import React from "react";
import { Button, Dropdown, Menu, Avatar } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
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
          <div className="left">
            <div
              className="nav"
              onClick={() => {
                history.goBack();
              }}
            >
              {location.pathname !== "/" && (
                <span>
                  <LeftOutlined style={{ marginRight: "2px" }} /> back
                </span>
              )}

              {location.pathname === "/" && (
                <div className="app-name">
                  <Link to="/">sustain.africa</Link>
                  <div className="bottom">buy, sell & swap funds.</div>
                </div>
              )}
            </div>
          </div>

          <div className="right">
            {userState?.profile ? (
              <>
                <div className="balance">$10.39</div>

                <Dropdown
                  overlay={
                    <Menu>
                      <Menu.Item
                        key="0"
                        disabled={location.pathname === "/profile"}
                      >
                        <Link to="/profile">profile</Link>
                      </Menu.Item>
                      <Menu.Item key="1">settings</Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        key="3"
                        onClick={() => {
                          dispatch({ type: "DESTROY_SESSION" });
                          history.push("/");
                        }}
                        style={{ color: "#ed1450" }}
                      >
                        logout
                      </Menu.Item>
                    </Menu>
                  }
                  trigger={["click"]}
                  placement="bottomLeft"
                >
                  <div className="name">
                    {userState?.profile?.user_name}{" "}
                    <Avatar
                      style={{
                        color: "#14a014",
                        backgroundColor: "#a9fca9",
                      }}
                    >
                      {userState?.profile?.user_name.charAt(0).toUpperCase()}
                    </Avatar>
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <Button size="normal" type="link">
                  <Link to="/login">login</Link>
                </Button>
                <Button type="primary" size="normal">
                  <Link to="/register">register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
