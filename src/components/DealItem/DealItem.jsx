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
          {item?.destination}{" "}
        </div>
      </Tooltip>
      <div className="deal-item-wrapper">
        <div className="deal-item-row-one">
          {item?.s_bank_name && (
            <>
              {" "}
              bank name <span className="bold">{item?.s_bank_name}</span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.s_account_type && (
            <>
              {" "}
              account type <span className="bold">
                {item?.s_account_type}
              </span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.s_account_age && item?.s_account_age !== 0 ? (
            <>
              {" "}
              account age <span className="bold">
                {item?.s_account_age}
              </span>{" "}
              <EllipsisOutlined />{" "}
            </>
          ) : null}
          {item?.s_card_brand && (
            <>
              {" "}
              card brand <span className="bold">{item?.s_card_brand}</span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.s_card_type && (
            <>
              {" "}
              card type <span className="bold">{item?.s_card_type}</span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.s_exchange && (
            <>
              {" "}
              exchange <span className="bold">{item?.s_exchange}</span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.s_wallet_type && (
            <>
              {" "}
              wallet type <span className="bold">
                {item?.s_wallet_type}
              </span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.min && (
            <>
              {" "}
              min{" "}
              <span className="bold">{`${item?.min.toLocaleString()} ${item?.currency.toUpperCase()}`}</span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.max && (
            <>
              {" "}
              max{" "}
              <span className="bold">{`${item?.max.toLocaleString()} ${item?.currency.toUpperCase()}`}</span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.rate && (
            <>
              {" "}
              rate <span className="bold">{item?.rate}%</span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.s_state && (
            <>
              {" "}
              state <span className="bold">{item?.s_state}</span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.s_country && (
            <>
              {" "}
              country <span className="bold">{item?.s_country}</span>{" "}
              <EllipsisOutlined />{" "}
            </>
          )}
          {item?.discussion && (
            <>
              {" "}
              discussion{" "}
              <Tooltip placement="top" title={item?.discussion_details}>
                <span className="discussion">{item?.discussion}</span>
              </Tooltip>
            </>
          )}
        </div>

        <div className="deal-item-row-two">
          “{item?.deal_summary}” <br />
          <span style={{ fontSize: "11px", color: "#999" }}>
            {format(item?.created_at)}
          </span>
        </div>

        <div className="deal-item-row-three">
          <span className="username">@{item?.user_name_front}</span>
        </div>

        <div className="deal-item-row-three">
          deals closed <span className="bold">{item?.total_deals_closed}</span>{" "}
          <EllipsisOutlined /> not closed{" "}
          <span className="bold">{item?.total_deals_not_closed}</span>{" "}
          <EllipsisOutlined /> reviews{" "}
          <span className="bold">{item?.total_reviews}</span>{" "}
          <EllipsisOutlined /> status <span className="status">online</span>
        </div>

        <div className="deal-item-row-four">
          <div className="left">
            <span className="like">
              <LikeOutlined /> {item?.total_positive_reviews}
            </span>
            <span className="dislike">
              <DislikeOutlined /> {item?.total_negative_reviews}
            </span>
          </div>
          <div className="right">
            <button className="green-button">discuss</button>
          </div>
        </div>
      </div>
    </div>
  );
}
