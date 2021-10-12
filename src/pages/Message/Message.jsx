import React from "react";
import { Avatar, Input, Button } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  RightOutlined,
} from "@ant-design/icons";

import "./message.scss";

const { TextArea } = Input;

export default function Message() {
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
              <div className="username-green">
                officerknow <span style={{ color: "#14a014" }}>&#9679;</span>
              </div>
              <div className="status">waiting to accept...</div>
            </div>
          </div>

          <div className="right">
            <div className="like-dislike no-margin-top">
              <span className="like">
                <LikeOutlined /> 21
              </span>
              <span className="dislike no-margin-right">
                <DislikeOutlined /> 4
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="message-content">
        <div className="chat-summary">direct chat &#9679; no issues raised</div>
      </div>

      <div className="message-footer">
        <div className="wrapper">
          <div className="row-one">
            <TextArea rows={4} placeholder="type a message..." />
          </div>

          <div className="row-two">
            <div className="left">
              <div className="end">
                end chat <RightOutlined />
              </div>
              <div className="issue">
                raise an issue <RightOutlined />
              </div>
            </div>
            <div className="right">
              <Button type="primary" size="normal">
                send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
