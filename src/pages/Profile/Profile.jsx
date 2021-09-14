import React, { useEffect } from "react";
import { Tabs, Button, message } from "antd";
import { Link, useHistory } from "react-router-dom";
import { Divider } from "antd";

import { useSelector } from "react-redux";
import {
  LikeOutlined,
  DislikeOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import PrefileDiscussionItem from "../../components/ProfileDiscussionItem/ProfileDiscussionItem";
import ProfileDealItem from "./../../components/ProfileDealsItem/ProfileDealItem";
import ProfileReviewsItem from "../../components/ProfileReviewsItem/ProfileReviewItem";
import "./profile.scss";
import { bearerInstance } from "./../../utils/API";

const { TabPane } = Tabs;

export default function Profile() {
  const history = useHistory();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProfileInfo();

    if (!userState?.userData) {
      history.push("/login");
      message.warning("please login to continue");
    }
  });

  useEffect(() => {
    //eslint-disable-next-line
  }, []);

  const getProfileInfo = async () => {
    bearerInstance
      .get("/profile")
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        }
      });
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="quick-actions">
          <Button type="primary" size="normal">
            <Link to="/new-deal">new deal</Link>
          </Button>
        </div>
        <div className="user-info">
          <div className="username">{userState?.userData?.user_name}</div>
          <div className="rate">
            profile score <span>88</span> <EllipsisOutlined /> knows{" "}
            <span>25 dealers</span> <EllipsisOutlined /> from{" "}
            <span>Abuja, Nigeria</span>
          </div>

          <div className="like-dislike">
            <span className="like">
              <LikeOutlined /> 410
            </span>
            <span className="dislike">
              <DislikeOutlined /> 140
            </span>
          </div>
        </div>

        <Divider style={{ fontSize: "14px", color: "#999", marginTop: "30px" }}>
          discussions (16)
        </Divider>

        <div className="discussions">
          <PrefileDiscussionItem />
          <PrefileDiscussionItem />
          <PrefileDiscussionItem />
        </div>

        <Divider style={{ fontSize: "14px", color: "#999", marginTop: "30px" }}>
          your deals (22)
        </Divider>

        <div className="deals">
          <ProfileDealItem />
          <ProfileDealItem />
          <ProfileDealItem />
        </div>

        <Divider style={{ fontSize: "14px", color: "#999", marginTop: "30px" }}>
          reviews (245)
        </Divider>

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
  );
}
