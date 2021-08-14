import React from "react";
import { Tooltip } from "antd";
import { format } from "timeago.js";

import {
  LikeOutlined,
  DislikeOutlined,
  ArrowRightOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import "./DealItem.scss";

export default function DealItem({ item }) {
  return (
    <div className="deal-item-container">
      <Tooltip
        placement="top"
        title={`i am picking ${item?.source} and will remit to ${item?.destination}`}
      >
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
      </Tooltip>
      <div className="deal-item-wrapper">
        <div className="deal-item-row-one">
          {item?.bank_name && (
            <div>
              {" "}
              bank name <span className="bold">{item?.bank_name}</span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.account_type && (
            <div>
              {" "}
              account type <span className="bold">
                {item?.account_type}
              </span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.card_brand && (
            <div>
              {" "}
              card brand <span className="bold">{item?.card_brand}</span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.card_type && (
            <div>
              {" "}
              card type <span className="bold">{item?.card_type}</span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.exchange && (
            <div>
              {" "}
              exchange <span className="bold">{item?.exchange}</span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.wallet_type && (
            <div>
              {" "}
              wallet type <span className="bold">{item?.wallet_type}</span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.min && (
            <div>
              {" "}
              min{" "}
              <span className="bold">{`${
                item?.min
              }${item?.currency.toUpperCase()}`}</span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.max && (
            <div>
              {" "}
              max{" "}
              <span className="bold">{`${
                item?.max
              }${item?.currency.toUpperCase()}`}</span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.rate && (
            <div>
              {" "}
              rate <span className="bold">{item?.rate}%</span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.state && (
            <div>
              {" "}
              state <span className="bold">{item?.state}</span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.country && (
            <div>
              {" "}
              country <span className="bold">{item?.country}</span>{" "}
              <EllipsisOutlined />{" "}
            </div>
          )}
          {item?.discussion && (
            <div>
              {" "}
              discussion{" "}
              <Tooltip placement="top" title={item?.discussion_details}>
                <span className="discussion">{item?.discussion}</span>
              </Tooltip>
            </div>
          )}
        </div>

        <div className="deal-item-row-two">
          “{item?.deal_summary}”{" "}
          <span style={{ fontSize: "11px" }}>
            (posted {format(item?.created_at)})
          </span>
        </div>

        <div className="deal-item-row-three">
          <span className="username">@{item?.dealer_user_name}</span>
        </div>

        <div className="deal-item-row-three">
          deals closed <span className="bold">92</span> <EllipsisOutlined /> not
          closed <span className="bold">156</span> <EllipsisOutlined /> reviews{" "}
          <span className="bold">14</span> <EllipsisOutlined /> status{" "}
          <span className="status">online</span>
        </div>

        <div className="deal-item-row-four">
          <div className="left">
            <span className="like">
              <LikeOutlined /> 201
            </span>
            <span className="dislike">
              <DislikeOutlined /> 56
            </span>
          </div>
          <div className="right">
            <button>discuss</button>
          </div>
        </div>
      </div>
    </div>
  );
}
