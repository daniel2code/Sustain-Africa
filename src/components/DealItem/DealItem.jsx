import React from "react";
import {Tooltip, Button} from 'antd';

import {
  LikeOutlined,
  DislikeOutlined,
  ArrowRightOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import "./deal-item.scss";


const dealTag = <span>i am picking bank funds and will remit to bitcoin</span>;
const dealLocationDetails = <span>we can discuss via whatsapp video call and/or voice call. chat me up for details.</span>;
  const buttonWidth = 70;

export default function DealItem() {
  return (
    <div className="deal-item-container">
      <div className="deal-item-wrapper">
        <div className="deal-item-row-one">
          <div className="left">
            bank name <span className="bold">HSBC</span> <EllipsisOutlined />{" "}
            account type <span className="bold">corporate</span>{" "}
            <EllipsisOutlined /> currency <span className="bold">US$</span>{" "}
            <EllipsisOutlined /> min <span className="bold">1k</span>{" "}
            <EllipsisOutlined /> max <span className="bold">1m</span>{" "}
            <EllipsisOutlined /> rate <span className="bold">20%</span>{" "}
            <EllipsisOutlined /> discussion{" "}
            <Tooltip placement="top" title={dealLocationDetails}><span className="discussion">WhatsApp</span></Tooltip>
          </div>
          <Tooltip placement="top" title={dealTag}>
          <div className="right">
            bank funds{" "}
            <ArrowRightOutlined
              style={{
                strokeWidth: "50",
                stroke: "white",
              }}
            />{" "}
            bitcoin
          </div>
          </Tooltip>
        </div>

        <div className="deal-item-row-two">
          “HSBC account in West Virginia area available to pick. Send to BTC
          wallet address within 12 hours. We can do video call on WhatsApp.
          Serious contacts only. Don’t waste my time. Thanks.”
        </div>

        <div className="deal-item-row-three">
          <span className="username">@marion22</span>
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
