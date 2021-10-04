import React from "react";
import { Avatar } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import "./message.scss";

export default function Message() {
  const history = useHistory();

  return (
    <div className="message-page-container">
      <div className="header-container">
        <div className="header-main">
          <div className="left" onClick={() => {}}>
            <div className="avatar">
              <Avatar
                style={{
                  color: "#14a014",
                  backgroundColor: "#a9fca9",
                  fontWeight: "500",
                }}
              >
                O
              </Avatar>
            </div>
            <div>
              <div className="username-green">officerknow </div>
              <div className="status">waiting to accept</div>
            </div>
          </div>

          <div className="right">
            <div className="like-dislike no-margin-top">
              <span className="like">
                <LikeOutlined /> 21
              </span>
              <span className="dislike add-margin-right">
                <DislikeOutlined /> 4
              </span>
            </div>
            <div
              className="close"
              onClick={() => {
                history.goBack();
              }}
            >
              <CloseOutlined />
            </div>
          </div>
        </div>
      </div>
      <div className="message-page-wrapper">1</div>
    </div>
  );
}
