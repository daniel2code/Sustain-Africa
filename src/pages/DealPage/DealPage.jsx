import React, { useState, useEffect } from "react";
import { Tooltip, message, Divider, Breadcrumb } from "antd";
import { Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  LikeOutlined,
  DislikeOutlined,
  EllipsisOutlined,
  ArrowRightOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Loader from "./../../components/Loader/Loader";
import { instance } from "./../../utils/API";
import "./deal-page.scss";
import ProfileReviewsItem from "../../components/ProfileReviewsItem/ProfileReviewItem";
import { setHasError } from "../../redux/data/data.actions";
import { format } from "timeago.js";
import { curType } from "../../utils/datasource";
import DealModal from "../../components/DealModal/DealModal";

//const { confirm } = Modal;

export default function DealPage({ match }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [deal, setDeal] = useState(null);
  const [dealerData, setDealerData] = useState(null);
  const userId = useSelector((state) => state?.user?.userData?.id);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    getDealInfo();

    //eslint-disable-next-line
  }, []);

  const getDealInfo = () => {
    instance
      .get(`/return_this_deal?deal_id=${match.params.id}`)
      .then(function (response) {
        setDeal(response?.data?.deal_data[0]);
        console.log(response?.data?.deal_data[0]);
        setDealerData(response?.data?.dealer_profile_data[0]);
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        } else {
          dispatch(setHasError(true));
        }
      });
  };

  return (
    <>
      <DealModal
        modal={modal}
        close={() => setModal(false)}
        deal={deal}
        dealerData={dealerData}
      />

      <div className="deal-page-container">
        {(!deal || !dealerData) && <Loader />}

        {deal && dealerData && (
          <div className="deal-page-wrapper">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">
                  <HomeOutlined />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link
                  to={
                    userId && deal?.dealer_id === userId
                      ? "/profile"
                      : `/user/${deal?.dealer_id}/profile`
                  }
                >
                  {dealerData?.user_name}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>deal</Breadcrumb.Item>
            </Breadcrumb>

            <div className="user-info">
              <div
                className="left"
                onClick={() => {
                  if (userId && deal?.dealer_id === userId) {
                    history.push(`/profile`);
                  } else {
                    history.push(`/user/${deal?.dealer_id}/profile`);
                  }
                }}
              >
                {/*<div className="avatar">
                <Avatar
                  style={{
                    color: "#14a014",
                    backgroundColor: "#a9fca9",
                    fontWeight: "500",
                  }}
                >
                  {dealerData?.user_name_front.charAt(0).toUpperCase()}
                </Avatar>
              </div>*/}
                <div>
                  <div className="username-green">
                    @{dealerData?.user_name}{" "}
                  </div>
                  <div>
                    <div className="score-green">
                      score{" "}
                      <span style={{ fontWeight: 600 }}>
                        {dealerData?.a_score}
                      </span>{" "}
                      <EllipsisOutlined /> status{" "}
                      <span style={{ fontWeight: 600 }}>online</span>
                      {dealerData?.receipt_required && (
                        <>
                          {" "}
                          <EllipsisOutlined />{" "}
                          <span style={{ fontWeight: 600 }}>
                            receipt required
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Tooltip
                placement="top"
                title={`i am picking ${deal?.source} and will remit to ${deal?.destination}`}
              >
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
              </Tooltip>
            </div>

            <div className="deal-info">
              <div className="deal-item-wrapper">
                <div className="deal-item-row-one">
                  ???
                  {deal?.s_account_age &&
                    deal?.s_account_age !== "Any Age" &&
                    deal?.s_bank_name &&
                    `${deal?.s_account_age} ${
                      deal?.s_account_age !== "Any Age" ? "year" : ""
                    }${deal?.s_account_age !== 1 ? "s" : ""} old `}
                  {deal?.s_wallet_age &&
                    deal?.s_wallet_age !== "Any Age" &&
                    deal?.s_wallet_type &&
                    `${deal?.s_wallet_age} ${
                      deal?.s_wallet_age !== "Any Age" ? "year" : ""
                    }${deal?.s_wallet_age !== 1 ? "s" : ""} old `}
                  {deal?.s_bank_name &&
                    `${deal?.s_bank_name} ${deal?.s_account_type} account available in `}
                  {/* {deal?.s_wallet_type && `${deal?.source} wallet available`} */}
                  {deal?.s_state && `${deal?.s_state},`}
                  {deal?.source !== "bank fund" &&
                  deal?.source !== "bitcoin" &&
                  deal?.source !== "ethereum" &&
                  deal?.source !== "litecoin" &&
                  deal?.source !== "dogecoin"
                    ? `${deal?.source} wallet (${curType(
                        deal.source_currency.toLowerCase()
                      )}) available`
                    : ""}{" "}
                  {deal?.s_country && `${deal?.s_country},`} to remit to{" "}
                  {deal?.destination === "bank fund"
                    ? "bank account"
                    : deal?.destination}{" "}
                  at {deal?.rate}
                  {deal?.rate_structure === "percentage"
                    ? "%"
                    : "/" + curType(deal.source_currency.toLowerCase())}
                  ???
                </div>

                <div className="deal-item-row-two">
                  {deal?.s_bank_name && (
                    <>
                      {" "}
                      bank name{" "}
                      <span className="bold">{deal?.s_bank_name}</span>{" "}
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
                      card type{" "}
                      <span className="bold">{deal?.s_card_type}</span>{" "}
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
                      <span className="bold">{`${deal?.min.toLocaleString()} ${deal?.destination_currency?.toUpperCase()}`}</span>{" "}
                      <EllipsisOutlined />{" "}
                    </>
                  )}
                  {deal?.max && (
                    <>
                      {" "}
                      max{" "}
                      <span className="bold">{`${deal?.max.toLocaleString()} ${deal?.destination_currency?.toUpperCase()}`}</span>{" "}
                      <EllipsisOutlined />{" "}
                    </>
                  )}
                  {deal?.rate && (
                    <>
                      {" "}
                      rate{" "}
                      <span className="bold">
                        {deal?.rate}
                        {deal?.rate_structure === "percentage"
                          ? "%"
                          : "/" + curType(deal.source_currency.toLowerCase())}
                      </span>{" "}
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
                      bank country{" "}
                      <span className="bold">{deal?.s_country}</span>{" "}
                      <EllipsisOutlined />{" "}
                    </>
                  )}
                  {deal?.discussion && (
                    <>
                      {" "}
                      discussion{" "}
                      <Tooltip placement="top" title={deal?.discussion_details}>
                        <span className="discussion">{deal?.discussion}</span>{" "}
                      </Tooltip>
                      <EllipsisOutlined />{" "}
                    </>
                  )}
                  {deal?.deal_summary && (
                    <>
                      {" "}
                      <Tooltip placement="top" title={deal?.deal_summary}>
                        <span className="discussion">other notes</span>
                      </Tooltip>
                    </>
                  )}
                </div>

                <div className="deal-item-row-three">
                  <span>{deal?.d_last_updated_at ? "updated" : ""}</span>{" "}
                  {format(
                    deal?.d_last_updated_at
                      ? deal?.d_last_updated_at
                      : deal?.d_created_at
                  )}{" "}
                  <Tooltip
                    placement="top"
                    title={
                      "user posted this deal from this location and will probably arrange a meetup there if necessary."
                    }
                  >
                    {" "}
                    ??{" "}
                    <span className="location">
                      {dealerData?.user_location}
                    </span>
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

                  <div
                    className="grey-button-nobg"
                    onClick={() => {
                      if (deal?.dealer_id === userId) {
                        history.push(`/edit-deal/${deal?.d_id}`);
                      }
                    }}
                  >
                    {deal?.dealer_id === userId ? "edit" : "review"}
                  </div>
                  <div
                    className={`grey-button-nobg ${
                      deal?.dealer_id === userId ? "no-margin-right" : ""
                    }`}
                  >
                    share
                  </div>
                  {deal?.dealer_id !== userId && (
                    <button
                      className="green-button"
                      onClick={() => {
                        if (!userId) {
                          message.error("you must login to continue");
                          history.push("/login");
                        }
                        setModal(true);
                      }}
                    >
                      discuss
                    </button>
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
    </>
  );
}
