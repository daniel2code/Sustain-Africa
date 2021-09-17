import React, { useEffect, useState } from "react";
import { Tabs, Button, message, Divider } from "antd";
import { Link, useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  LikeOutlined,
  DislikeOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Loader from "./../../components/Loader/Loader";

import PrefileDiscussionItem from "../../components/ProfileDiscussionItem/ProfileDiscussionItem";
import ProfileDealItem from "./../../components/ProfileDealsItem/ProfileDealItem";
import ProfileReviewsItem from "../../components/ProfileReviewsItem/ProfileReviewItem";
import "./profile.scss";
import { bearerInstance } from "./../../utils/API";
import { setProfile } from "./../../redux/data/data.actions";

const { TabPane } = Tabs;

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const profileData = useSelector((state) => state.data.profile);
  const [dealsCount, setDealsCount] = useState(3);

  useEffect(() => {
    window.scrollTo(0, 0);
    getProfileInfo();

    if (!userState?.userData) {
      history.push("/login");
      message.warning("please login to continue");
    }
    //eslint-disable-next-line
  }, []);

  const getProfileInfo = async () => {
    bearerInstance
      .get("/profile")
      .then(function (response) {
        dispatch(setProfile(response?.data));
      })
      .catch(function (error) {
        if (error?.response?.data?.message) {
          message.error(error?.response?.data?.message);
        }
      });
  };

  return (
    <div className="profile-container">
      {!profileData && <Loader />}

      {profileData && (
        <div className="profile-wrapper">
          <div className="quick-actions">
            <Button type="primary" size="normal">
              <Link to="/new-deal">new deal</Link>
            </Button>
          </div>
          <div className="user-info">
            <div className="username">{userState?.userData?.user_name}</div>
            <div className="rate">
              profile score <span>{profileData?.profile_data[0]?.a_score}</span>{" "}
              <EllipsisOutlined /> knows <span>25 dealers</span>{" "}
              <EllipsisOutlined /> from{" "}
              <span>{profileData?.profile_data[0]?.user_location}</span>
            </div>

            <div className="like-dislike">
              <span className="like">
                <LikeOutlined />{" "}
                {profileData?.profile_data[0]?.total_positive_reviews}
              </span>
              <span className="dislike">
                <DislikeOutlined />{" "}
                {profileData?.profile_data[0]?.total_negative_reviews}
              </span>
            </div>
          </div>

          <Divider
            style={{ fontSize: "14px", color: "#999", marginTop: "30px" }}
          >
            discussions (16)
          </Divider>

          <div className="discussions">
            <PrefileDiscussionItem />
            <PrefileDiscussionItem />
            <PrefileDiscussionItem />
          </div>

          <Divider
            style={{ fontSize: "14px", color: "#999", marginTop: "30px" }}
          >
            your deals ({profileData?.total_deals_count})
          </Divider>

          {profileData?.deals_data.length > 0 ? (
            <div className="deals">
              {profileData?.deals_data.slice(0, dealsCount).map((item) => (
                <ProfileDealItem item={item} key={item.id} />
              ))}
            </div>
          ) : (
            <div className="no-item">no deal yet</div>
          )}

          {!(dealsCount >= profileData?.deals_data.length) && (
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
            reviews ({profileData?.profile_data[0]?.total_reviews})
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
      )}
    </div>
  );
}
