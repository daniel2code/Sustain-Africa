import React, { useEffect } from "react";
import { Avatar, Tabs, Button, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import { Divider } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { LikeOutlined, DislikeOutlined, EllipsisOutlined} from "@ant-design/icons";

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

    if (!userState.profile) {
      history.push("/login");
      message.warning("please login to continue");
    }
  });

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-main-container">
        <div className="quick-actions">
          <div className="username">{userState?.profile?.user_name}</div>

          {/* <Button size="small" type="link">
            <Link to="/login">history</Link>
          </Button> */}
          <div className="rightButtons">
          <Button type="primary" size="normal" style={{marginLeft: "10px"}}>
            <Link to="/new-deal">new deal</Link>
          </Button>
          </div>
        </div>
        <div className="user-info">
          <div className="rate">profile authority <span>88</span> <EllipsisOutlined /> knows <span>25 dealers</span> <EllipsisOutlined /> from <span>Abuja, Nigeria</span></div>

          <div className="like-dislike">
            <span className="like">
              <LikeOutlined /> 410
            </span>
            <span className="dislike">
              <DislikeOutlined /> 140
            </span>
          </div>


        </div>

        <Divider style={{ fontSize: "14px", color: "#999" }}>discussions (16)</Divider>

        <div className="discussions">
          <PrefileDiscussionItem />
          <PrefileDiscussionItem />
          <PrefileDiscussionItem />
        </div>

        <Divider style={{ fontSize: "14px", color: "#999" }}>your deals (22)</Divider>

        <div className="deals">
          <ProfileDealItem />
          <ProfileDealItem />
          <ProfileDealItem />
        </div>

        <Divider style={{ fontSize: "14px", color: "#999" }}>reviews (245)</Divider>

        <div className="reviews">
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
    </div>
  );
}
