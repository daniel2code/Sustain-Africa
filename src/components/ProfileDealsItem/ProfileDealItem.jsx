import React from "react";
import { ArrowRightOutlined, EllipsisOutlined } from "@ant-design/icons";

import "./profiledealitem.scss";

export default function ProfileDealItem({ item }) {
  return (
    <div className="profile-deal-item-container">
      <div className="top">
        <div className="left">
          <div className="source-destination">
            {item?.source}{" "}
            <ArrowRightOutlined
              style={{
                strokeWidth: "50",
                stroke: "white",
              }}
            />{" "}
            {item?.destination}
          </div>
        </div>
        <div className="right">
          <div className="white-background-button">view</div>
          <div className="white-background-button">delete</div>
        </div>
      </div>
      <div className="bottom">
        <div className="info">
          {item?.deal_summary} <EllipsisOutlined />
          min{" "}
          <span className="bold">
            {`${item?.min.toLocaleString()} ${item?.currency.toUpperCase()}`}
          </span>{" "}
          <EllipsisOutlined /> max{" "}
          <span className="bold">{`${item?.max.toLocaleString()} ${item?.currency.toUpperCase()}`}</span>{" "}
          <EllipsisOutlined /> rate <span className="bold">{item?.rate}%</span>
        </div>
      </div>
    </div>
  );
}
