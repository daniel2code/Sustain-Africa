import React from "react";
import { ArrowRightOutlined, EllipsisOutlined } from "@ant-design/icons";

import "./profiledealitem.scss";

export default function ProfileDealItem() {
  return (
    <div className="profile-deal-item-container">
      <div className="top">
        <div className="left">
          <div className="source-destination">
            giftcard{" "}
            <ArrowRightOutlined
              style={{
                strokeWidth: "50",
                stroke: "white",
              }}
            />{" "}
            bitcoin
          </div>
        </div>
        <div className="right">
          <div className="white-background-button">view</div>
          <div className="white-background-button">edit</div>
            <div className="white-background-button">delete</div>
        </div>
      </div>
      <div className="bottom">
        <div className="info">
          3 year old paypal account <EllipsisOutlined />
          min <span className="bold">1k</span> <EllipsisOutlined /> max{" "}
          <span className="bold">1m</span> <EllipsisOutlined /> rate{" "}
          <span className="bold">20%</span>
        </div>
      </div>
    </div>
  );
}
