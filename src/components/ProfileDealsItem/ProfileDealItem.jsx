import React from "react";
import { ArrowRightOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Popconfirm } from "antd";

import "./profiledealitem.scss";
import useDeals from "../../hooks/useDeals";

export default function ProfileDealItem({ item, showDelete }) {
  const history = useHistory();
  const { deleteDeal } = useDeals();

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
          <div
            className="white-background-button"
            onClick={() => {
              history.push(`/deal/${item?.d_id}`);
            }}
          >
            view
          </div>
          {showDelete && (
            <Popconfirm
              placement="topRight"
              title={"delete this deal?"}
              onConfirm={() => {
                deleteDeal(item?.d_id);
              }}
              okText="delete"
              cancelText="cancel"
            >
              <div className="white-background-button">delete</div>
            </Popconfirm>
          )}
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
