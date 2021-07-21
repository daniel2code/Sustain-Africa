import React from "react";
import {
  SwapRightOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";

import "./deal-item.scss";

export default function DealItem() {
  return (
    <div className="deal-item-container">
      <div className="deal-item-wrapper">
        <div className="deal-item-row-one">
          <div className="left">
            bank <span className="bold">HSBC</span> / account type{" "}
            <span className="bold">corporate</span> / currency{" "}
            <span className="bold">US$</span> / min{" "}
            <span className="bold">1k</span> / max{" "}
            <span className="bold">1m</span>/ rate{" "}
            <span className="bold">20%</span> / discussion{" "}
            <span className="discussion">WhatsApp</span>
          </div>
          <div className="right">
            bank <SwapRightOutlined /> bitcoin
          </div>
        </div>

        <div className="deal-item-row-two">
          “HSBC account in West Virginia area available to pick. Send to BTC
          wallet address within 12 hours. We can do video call on WhatsApp.
          Serious contacts only. Don’t waste my time. Thanks.”
        </div>

        <div className="deal-item-row-three">
          <span className="username">@marion22</span> deals closed{" "}
          <span className="bold">92</span> / not closed{" "}
          <span className="bold">156</span> / Reviews{" "}
          <span className="bold">14</span>
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
            <button>link up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
