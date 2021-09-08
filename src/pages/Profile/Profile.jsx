import React, { useEffect } from "react";
import { Avatar, Tabs, Button, message } from "antd";
import { Link, useHistory } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

import PrefileDiscussionItem from "../../components/ProfileDiscussionItem/ProfileDiscussionItem";
import ProfileDealItem from "./../../components/ProfileDealsItem/ProfileDealItem";
import ProfileReviewsItem from "../../components/ProfileReviewsItem/ProfileReviewItem";
import "./profile.scss";

const { TabPane } = Tabs;

export default function Profile() {
  const history = useHistory();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!userState) {
      history.push("/login");
      message.warning("please login to continue");
    }
  });

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="quick-actions">
          {/* <Button size="small" type="link">
            <Link to="/login">history</Link>
          </Button> */}
          <Button type="primary" size="small">
            <Link to="/new-deal">new deal</Link>
          </Button>
        </div>
        <div className="user-info">
          <div className="avatar">
            <Avatar size={74} icon={<UserOutlined />} />
          </div>
          <div className="username">{userState?.profile?.user_name}</div>

          <div className="rate">Rate: 88%</div>

          <div className="like-dislike">
            <span className="like">
              <LikeOutlined /> 410
            </span>
            <span className="dislike">
              <DislikeOutlined /> 140
            </span>
          </div>

          <div className="connect">
            knows <span>25 dealers</span>
          </div>
        </div>

        <div className="discussions">
          <div className="profile-section-title">discussions (16)</div>
          <PrefileDiscussionItem />
          <PrefileDiscussionItem />
          <PrefileDiscussionItem />
        </div>

        <div className="deals">
          <div className="profile-section-title">your deals (22)</div>
          <ProfileDealItem />
          <ProfileDealItem />
          <ProfileDealItem />
        </div>

        <div className="reviews">
          <div className="profile-section-title">reviews (245)</div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="from merchants (90)" key="1">
              <ProfileReviewsItem />
              <ProfileReviewsItem />
              <ProfileReviewsItem />
            </TabPane>
            <TabPane tab="from dealers (155)" key="2">
              <ProfileReviewsItem />
              <ProfileReviewsItem />
              <ProfileReviewsItem />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
