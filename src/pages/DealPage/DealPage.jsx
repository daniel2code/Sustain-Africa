import React, { useState, useEffect } from "react";
import { Tooltip, message, Avatar, Divider } from "antd";
import { useSelector } from "react-redux";
import {
  LikeOutlined,
  DislikeOutlined,
  EllipsisOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import Timestamp from "react-timestamp";
import Loader from "./../../components/Loader/Loader";
import { instance } from "./../../utils/API";
import "./deal-page.scss";
import ProfileReviewsItem from "../../components/ProfileReviewsItem/ProfileReviewItem";

export default function DealPage({ match }) {
  const [deal, setDeal] = useState(null);
  const [dealerData, setDealerData] = useState(null);
  const [userId, setUserId] = useState("000111222333444");
  const userIdState = useSelector((state) => state?.user?.userData?.id);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDealInfo();

    if (userIdState) {
      setUserId(userIdState);
    }
    //eslint-disable-next-line
  }, []);

  const getDealInfo = async () => {
    instance
      .get(`/return_this_deal?deal_id=${match.params.id}`)
      .then(function (response) {
        setDeal(response?.data?.deal_data[0]);
        setDealerData(response?.data?.dealer_profile_data[0]);
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        }
      });
  };

  return (
    <div className="deal-page-container">
      {(!deal || !dealerData) && <Loader />}

      {deal && dealerData && (
        <div className="deal-page-wrapper">
          <div className="user-info">
            <div className="left">
              <div className="avatar">
                <Avatar
                  style={{
                    color: "#14a014",
                    backgroundColor: "#a9fca9",
                    fontWeight: "500",
                  }}
                >
                  {dealerData?.user_name.charAt(0).toUpperCase()}
                </Avatar>
              </div>
              <div>
                <div className="username-green">{dealerData?.user_name} </div>
                <div>
                  <div className="score-green">
                    score{" "}
                    <span style={{ fontWeight: 600 }}>
                      {dealerData?.a_score}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="source-destination">
              {deal?.source}{" "}
              <ArrowRightOutlined
                style={{
                  strokeWidth: "50",
                  stroke: "white",
                }}
              />{" "}
              {deal?.destination}{" "}
            </div>
          </div>

          <div className="deal-info">
            <div className="deal-item-wrapper">
              <div className="deal-item-row-one">
                {deal?.s_bank_name && (
                  <>
                    {" "}
                    bank name <span className="bold">
                      {deal?.s_bank_name}
                    </span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.s_account_type && (
                  <>
                    {" "}
                    account type{" "}
                    <span className="bold">{deal?.s_account_type}</span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.s_account_age && deal?.s_account_age !== 0 ? (
                  <>
                    {" "}
                    account age{" "}
                    <span className="bold">
                      {deal?.s_account_age} years old
                    </span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                ) : null}
                {deal?.s_card_brand && (
                  <>
                    {" "}
                    card brand{" "}
                    <span className="bold">{deal?.s_card_brand}</span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.s_card_type && (
                  <>
                    {" "}
                    card type <span className="bold">
                      {deal?.s_card_type}
                    </span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.s_exchange && (
                  <>
                    {" "}
                    exchange <span className="bold">
                      {deal?.s_exchange}
                    </span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.s_wallet_type && (
                  <>
                    {" "}
                    wallet type{" "}
                    <span className="bold">{deal?.s_wallet_type}</span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.min && (
                  <>
                    {" "}
                    min{" "}
                    <span className="bold">{`${deal?.min.toLocaleString()} ${deal?.currency.toUpperCase()}`}</span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.max && (
                  <>
                    {" "}
                    max{" "}
                    <span className="bold">{`${deal?.max.toLocaleString()} ${deal?.currency.toUpperCase()}`}</span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.rate && (
                  <>
                    {" "}
                    rate <span className="bold">{deal?.rate}%</span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.s_state && (
                  <>
                    {" "}
                    bank state <span className="bold">
                      {deal?.s_state}
                    </span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.s_country && (
                  <>
                    {" "}
                    bank country <span className="bold">
                      {deal?.s_country}
                    </span>{" "}
                    <EllipsisOutlined />{" "}
                  </>
                )}
                {deal?.discussion && (
                  <>
                    {" "}
                    discussion{" "}
                    <Tooltip placement="top" title={deal?.discussion_details}>
                      <span className="discussion">{deal?.discussion}</span>
                    </Tooltip>
                  </>
                )}
              </div>

              <div className="deal-item-row-two">“{deal?.deal_summary}”</div>

              <div className="deal-item-row-three">
                <span>{deal?.last_updated_at ? "updated" : ""}</span>{" "}
                <Timestamp
                  date={
                    deal?.last_updated_at
                      ? deal?.last_updated_at
                      : deal?.created_at
                  }
                />{" "}
                <Tooltip
                  placement="top"
                  title={
                    "user posted this deal from this location and will probably arrange a meetup there if necessary."
                  }
                > · <span className="location">{dealerData?.user_location}</span>
                </Tooltip>{" "}
              </div>

              <div className="deal-item-row-four">
                <div className="like-dislike no-margin-top">
                  <span className="like">
                    <LikeOutlined /> {dealerData?.total_positive_reviews}
                  </span>
                  <span className="dislike add-margin-right">
                    <DislikeOutlined /> {dealerData?.total_negative_reviews}
                  </span>
                </div>

                <div className="grey-button-nobg">
                  {deal?.dealer_id.toString() === userId.toString()
                    ? "edit"
                    : "review"}
                </div>
                <div
                  className={`grey-button-nobg ${
                    deal?.dealer_id.toString() === userId.toString()
                      ? "no-margin-right"
                      : ""
                  }`}
                >
                  share
                </div>
                {deal?.dealer_id.toString() !== userId.toString() && (
                  <button className="green-button">discuss</button>
                )}
              </div>
            </div>
          </div>

          <Divider
            style={{ fontSize: "14px", color: "#999", marginTop: "60px" }}
          >
            reviews for @{dealerData?.user_name} ({dealerData?.total_reviews})
          </Divider>

          <div className="deal-reviews">
            <ProfileReviewsItem />
            <ProfileReviewsItem />
          </div>
        </div>
      )}
    </div>
  );
}
