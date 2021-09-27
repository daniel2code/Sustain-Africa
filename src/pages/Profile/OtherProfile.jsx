import React, { useEffect, useState } from "react";
import { Tabs, message, Divider, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import {
  LikeOutlined,
  DislikeOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Loader from "./../../components/Loader/Loader";

import ProfileDealItem from "./../../components/ProfileDealsItem/ProfileDealItem";
import ProfileReviewsItem from "../../components/ProfileReviewsItem/ProfileReviewItem";
import "./profile.scss";
import { instance } from "../../utils/API";

const { TabPane } = Tabs;

export default function OtherProfile({ match }) {
  const [dealsCount, setDealsCount] = useState(3);
  const [otherProfile, setOtherProfile] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getOtherProfile();

    //eslint-disable-next-line
  }, []);

  const getOtherProfile = async () => {
    instance
      .get(`/profile?id=${match.params.id}`)
      .then(function (response) {
        setOtherProfile(response?.data);
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        }
      });
  };

  return (
    <div className="profile-container">
      {!otherProfile && <Loader />}

      {otherProfile && (
        <div className="profile-wrapper">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {otherProfile?.profile_data[0]?.user_name_front}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="user-info">
            <div className="username">
              {otherProfile?.profile_data[0]?.user_name_front}
            </div>
            <div className="rate">
              profile score{" "}
              <span>{otherProfile?.profile_data[0]?.a_score}</span>{" "}
              <EllipsisOutlined /> knows <span>25 dealers</span>{" "}
              <EllipsisOutlined /> from{" "}
              <span>{otherProfile?.profile_data[0]?.user_location}</span>
            </div>

            <div className="like-dislike">
              <span className="like">
                <LikeOutlined />{" "}
                {otherProfile?.profile_data[0]?.total_positive_reviews}
              </span>
              <span className="dislike">
                <DislikeOutlined />{" "}
                {otherProfile?.profile_data[0]?.total_negative_reviews}
              </span>
            </div>
          </div>

          <Divider
            style={{ fontSize: "14px", color: "#999", marginTop: "30px" }}
          >
            {`${otherProfile?.profile_data[0]?.user_name_front}'s deals (${otherProfile?.total_deals_count})`}
          </Divider>

          {otherProfile?.deals_data.length > 0 ? (
            <div className="deals">
              {otherProfile?.deals_data.slice(0, dealsCount).map((item) => (
                <ProfileDealItem
                  item={item}
                  key={item?.d_id}
                  showDelete={false}
                />
              ))}
            </div>
          ) : (
            <div className="no-item">no deal yet</div>
          )}

          {!(dealsCount >= otherProfile?.deals_data.length) && (
            <div
              className="more-items"
              onClick={() => {
                setDealsCount(dealsCount + 5);
              }}
            >
              view more
            </div>
          )}

          <Divider
            style={{ fontSize: "14px", color: "#999", marginTop: "30px" }}
          >
            {`reviews for ${otherProfile?.profile_data[0]?.user_name_front} (${otherProfile?.profile_data[0]?.total_reviews})`}
          </Divider>

          <div className="reviews">
            <Tabs defaultActiveKey="1">
              <TabPane tab="from merchants (90)" key="1">
                <ProfileReviewsItem key="1" />
                <ProfileReviewsItem key="2" />
                <ProfileReviewsItem key="3" />
              </TabPane>
              <TabPane tab="from dealers (155)" key="2">
                <ProfileReviewsItem key="1" />
                <ProfileReviewsItem key="2" />
                <ProfileReviewsItem key="3" />
              </TabPane>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
