import React from "react";
import "./discussionitem.scss";
import { ArrowRightOutlined, EllipsisOutlined } from "@ant-design/icons";

export default function PrefileDiscussionItem() {
  return (
    <div className="discussion-item-container">
      <div className="top">
        <div className="username-green">@nightmodel</div>
        <div className="status">#inprogress</div>
      </div>
      <div className="bottom">
        <div className="source-destination">
          bank{" "}
          <ArrowRightOutlined
            style={{
              strokeWidth: "50",
              stroke: "white",
            }}
          />{" "}
          bank
        </div>
        <div className="info">
          min <span className="bold">1k</span> <EllipsisOutlined /> max{" "}
          <span className="bold">1m</span> <EllipsisOutlined /> rate{" "}
          <span className="bold">20%</span>
        </div>
      </div>
    </div>
  );
}
