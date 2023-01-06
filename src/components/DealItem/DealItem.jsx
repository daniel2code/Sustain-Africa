import React, { useState } from "react";
import { message, Tooltip } from "antd";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import {
  LikeOutlined,
  DislikeOutlined,
  ArrowRightOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import "./DealItem.scss";
import { curType } from "../../utils/datasource";
import DealModal from "../DealModal/DealModal";

export default function DealItem({ item }) {
  const history = useHistory();
  const userIdState = useSelector((state) => state?.user?.userData?.id);
  const [modal, setModal] = useState(false);

  console.log(item?.user_status);

  return (
    <>
      {/* deal modal */}
      <DealModal
        modal={modal}
        close={() => setModal(false)}
        deal={item}
        dealerData={item}
      />

      {/* deal item */}
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

        {/* deal item header start */}
        <div
          className="left"
          onClick={() => {
            if (
              userIdState &&
              item?.dealer_id.toString() === userIdState.toString()
            ) {
              history.push(`/profile`);
            } else {
              history.push(`/user/${item?.dealer_id}/profile`);
            }
          }}
        >
          <div>
            <div className="username-green">@{item?.user_name} </div>
            <span
              className="status"
              style={{ color: item?.user_status === 1 ? "#14a014" : "#dedede" }}
            >
              {item?.user_status === 1 ? "online" : "away"}
            </span>
            <div>
              <div className="score-green">
                score <span style={{ fontWeight: 600 }}>{item?.a_score}</span>{" "}
                <EllipsisOutlined /> deals closed{" "}
                <span className="bold">{item?.total_deals_closed}</span>{" "}
                <EllipsisOutlined /> not closed{" "}
                <span className="bold">{item?.total_deals_not_closed}</span>{" "}
                <EllipsisOutlined /> reviews{" "}
                <span className="bold">{item?.total_reviews}</span>{" "}
                <EllipsisOutlined />{" "}
                <span className="bold">
                  {item?.receipt_required ? "receipt required " : ""}
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        {/* deal item header end */}

        {/* deal item wrapper  start*/}
        <div className="deal-item-wrapper">
          {/* deal item body start */}
          <div className="deal-item-row-one">
            “{/* bank */}
            {item?.s_account_age &&
              item?.s_account_age !== "Any Age" &&
              item?.s_bank_name &&
              `${item?.s_account_age} ${
                item?.s_account_age !== "Any Age" ? "year" : ""
              }${item?.s_account_age !== 1 ? "s" : ""} old `}
            {/* wallet */}
            {item?.s_wallet_age &&
              item?.s_wallet_age !== "Any Age" &&
              item?.s_wallet_type &&
              `${item?.s_wallet_age} ${
                item?.s_wallet_age !== "Any Age" ? "year" : ""
              }${item?.s_wallet_age !== 1 ? "s" : ""} old `}
            {/* bank name */}
            {item?.s_bank_name &&
              `${item?.s_bank_name} ${item?.s_account_type} account available in `}
            {/* {item?.s_wallet_type && `${item?.source} wallet available`} */}
            {item?.s_state && `${item?.s_state},`}
            {item?.source !== "bank fund" &&
            item?.source !== "bitcoin" &&
            item?.source !== "ethereum" &&
            item?.source !== "litecoin" &&
            item?.source !== "dogecoin"
              ? `${item?.source} wallet (${curType(
                  item.source_currency.toLowerCase()
                )}) available`
              : ""}{" "}
            {item?.s_country && `${item?.s_country},`} to remit to{" "}
            {item?.destination === "bank fund"
              ? "bank account"
              : item?.destination}
            ({curType(item.destination_currency.toLowerCase())}) at {item?.rate}
            {item?.rate_structure === "percentage"
              ? "%"
              : "/" + curType(item.source_currency.toLowerCase())}
            ”
          </div>
          {/* deal item body end */}

          {/* deal item body2 start */}
          <div className="deal-item-row-two">
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
                account type{" "}
                <span className="bold">{item?.s_account_type}</span>{" "}
                <EllipsisOutlined /> +
              </>
            )}
            {item?.s_account_age && item?.s_account_age !== 0 ? (
              <>
                {" "}
                account age{" "}
                <span className="bold">
                  {item?.s_account_age} years old
                </span>{" "}
                <EllipsisOutlined />{" "}
              </>
            ) : null}
            {item?.s_card_brand && (
              <>
                {" "}
                card brand <span className="bold">
                  {item?.s_card_brand}
                </span>{" "}
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
                <span className="bold">{`${item?.min?.toLocaleString()} ${item?.destination_currency?.toUpperCase()}`}</span>{" "}
                <EllipsisOutlined />{" "}
              </>
            )}
            {item?.max && (
              <>
                {" "}
                max{" "}
                <span className="bold">{`${item?.max?.toLocaleString()} ${item?.destination_currency?.toUpperCase()}`}</span>{" "}
                <EllipsisOutlined />{" "}
              </>
            )}
            {item?.rate && (
              <>
                {" "}
                rate{" "}
                <span className="bold">
                  {item?.rate}
                  {item?.rate_structure === "percentage"
                    ? "%"
                    : "/" + curType(item.source_currency.toLowerCase())}
                </span>{" "}
                <EllipsisOutlined />{" "}
              </>
            )}
            {item?.s_state && (
              <>
                {" "}
                bank state <span className="bold">{item?.s_state}</span>{" "}
                <EllipsisOutlined />{" "}
              </>
            )}
            {item?.s_country && (
              <>
                {" "}
                bank country <span className="bold">
                  {item?.s_country}
                </span>{" "}
                <EllipsisOutlined />{" "}
              </>
            )}
            {item?.discussion && (
              <>
                {" "}
                discussion{" "}
                <Tooltip placement="top" title={item?.discussion_details}>
                  <span className="discussion">{item?.discussion}</span>{" "}
                </Tooltip>
                <EllipsisOutlined />{" "}
              </>
            )}
            {item?.deal_summary && (
              <>
                {" "}
                <Tooltip placement="top" title={item?.deal_summary}>
                  <span className="discussion">other notes</span>
                </Tooltip>
              </>
            )}

            <br />
            <br />
            <span style={{ fontSize: "11px", color: "#999" }}>
              {format(item?.d_created_at)}{" "}
              <Tooltip
                placement="top"
                title={
                  "user posted this deal from this location and will probably arrange a meetup there if necessary."
                }
              >
                {" "}
                · <span className="location">{item?.user_location}</span>
              </Tooltip>{" "}
            </span>
          </div>

          {/* deal item body2 end */}

          {/* deal item footer start */}
          <div className="deal-item-row-four">
            <div className="like-dislike">
              <span className="like">
                <LikeOutlined /> {item?.total_positive_reviews}
              </span>
              <span className="dislike">
                <DislikeOutlined /> {item?.total_negative_reviews}
              </span>
            </div>
            <div className="right">
              <div
                className="grey-button-nobg"
                onClick={() => {
                  history.push(`/deal/${item?.d_id}`);
                }}
              >
                view
              </div>

              {userIdState &&
              item?.dealer_id.toString() !== userIdState.toString() ? (
                <button
                  className="green-button"
                  onClick={() => {
                    if (userIdState) {
                      setModal(true);
                    } else {
                      message.error("you must login to continue");
                      history.push("/login");
                    }
                  }}
                >
                  discuss
                </button>
              ) : (
                userIdState && (
                  <button
                    className="green-button disabled"
                    onClick={() => {
                      message.warn("you posted this deal!");
                    }}
                  >
                    discuss
                  </button>
                )
              )}

              {!userIdState && (
                <button
                  className="green-button"
                  onClick={() => {
                    message.error("you must login to continue");
                    history.push("/login");
                  }}
                >
                  discuss
                </button>
              )}
            </div>
          </div>
          {/* deal item footer end */}
        </div>
        {/* deal item wrapper  end*/}
      </div>
    </>
  );
}
