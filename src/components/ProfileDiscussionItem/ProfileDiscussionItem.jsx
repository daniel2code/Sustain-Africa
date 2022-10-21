import React from "react";
import "./discussionitem.scss";
import { ArrowRightOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { curType } from "../../utils/datasource";
import { Tag, Button } from "antd";

const ProfileDiscussionItem = ({ data }) => {
  const history = useHistory();
  const user = useSelector((state) => state?.user?.userData);

  console.log(data);

  return (
    <div
      className="discussion-item-container"
      onClick={() => history.push(`/chat/${data?.id}`)}
    >
      <div className="top">
        <div className="top-item">
          {" "}
          <span className="username-green">
            <span className="with-indicator">with </span>@
            {user.id === data.dealer
              ? data.merchant_data[0]?.user_name
              : data.dealer_data[0]?.user_name}
          </span>{" "}
          {data?.deal_info[0]?.source ? (
            <div className="source-destination">
              {data?.deal_info[0]?.source}
              <ArrowRightOutlined
                style={{
                  strokeWidth: "50",
                  stroke: "#14a014",
                }}
              />{" "}
              {data.deal_info[0]?.destination}
            </div>
          ) : (
            <div />
          )}
        </div>

        {data?.status === "progress" && <Tag color="blue">in progress</Tag>}
        {data?.status === "canceled" && <Tag color="red">canceled</Tag>}
        {data?.status === "completed" && <Tag color="green">completed</Tag>}
        {data?.status === "dispute" && <Tag color="orange">dispute</Tag>}
      </div>

      <div className="bottom">
        <span className="info">
          min <span className="bold">{data.deal_info[0]?.min}</span>
          <EllipsisOutlined /> max
          <span className="bold"> {data.deal_info[0]?.max}</span>
          
          <EllipsisOutlined /> rate
          <span className="rate-text">
            {data.deal_info[0]?.rate_structure === "percentage"
              ? ""
              : curType(data.deal_info[0]?.destination_currency)}
            {data.deal_info[0]?.rate}
            {data.deal_info[0]?.rate_structure === "percentage"
              ? "%"
              : `/${curType(data.deal_info[0]?.source_currency)}`}
          </span>
          <EllipsisOutlined />
          <span>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/deal/${data?.deal_id}`);
              }}
              type="text"
              style={{
                color: "#ed1450",
                padding: "0px 5px",
                fontSize: "13px",
              }}
              className="view-btn"
            >
              view deal
            </Button>
          </span>
        </span>
        <ArrowRightOutlined className="arrow-icon" color="#ed1450" />
      </div>
    </div>
  );
};

export default ProfileDiscussionItem;
