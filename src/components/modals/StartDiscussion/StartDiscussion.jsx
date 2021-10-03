import React from "react";
import { Avatar, Modal } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function StartDiscussion({
  isVisible,
  handleOk,
  handleCancel,
  item,
}) {
  return (
    <Modal
      title={
        <div style={{ display: "flex" }}>
          <div className="avatar">
            <Avatar
              style={{
                color: "#14a014",
                backgroundColor: "#a9fca9",
                fontWeight: "500",
                marginRight: "10px",
              }}
            >
              {item?.user_name_front.charAt(0).toUpperCase()}
            </Avatar>
          </div>
          <div style={{ margin: "auto 0px" }} className="username-red">
            {item?.user_name_front}{" "}
          </div>
        </div>
      }
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="yes"
      cancelText="no"
    >
      <div>
        <div
          className="source-destination"
          style={{
            marginBottom: "10px",
            marginLeft: "auto",
            marginRight: "0px",
          }}
        >
          {item?.source}{" "}
          <ArrowRightOutlined
            style={{
              strokeWidth: "50",
              stroke: "white",
            }}
          />{" "}
          {item?.destination} @ {item?.rate}%
        </div>

        <div>
          start a discussion with{" "}
          <span className="username-green">@{item?.user_name_front}?</span>
        </div>
      </div>
    </Modal>
  );
}
