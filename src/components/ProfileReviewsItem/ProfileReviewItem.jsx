import React from "react";
import { LikeOutlined } from "@ant-design/icons";

import "./profilereviewitem.scss";
export default function ProfileReviewItem() {
  return (
    <div className="profile-review-item-container">
      <div className="row-one">
        <div className="left">
          <div className="username-reviewitem-green">@megamind2020</div>
          <div className="date">June 12, 2021</div>
        </div>

        <div className="right">
          <div className="white-background-button">view deal</div>
        </div>
      </div>

      <div className="row-two">
        <div className="text-green">
          “Good deal. Nice guy we share good money”
        </div>
      </div>

      <div className="row-three">
        <div className="like-dislike">
          <span className="like">
            <LikeOutlined /> 410
          </span>
        </div>
      </div>
    </div>
  );
}
