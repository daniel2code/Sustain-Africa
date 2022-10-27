import React, { useEffect, useState } from 'react';
import { Tabs, Button, message, Divider, Breadcrumb } from 'antd';
import { Link, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import {
  LikeOutlined,
  DislikeOutlined,
  EllipsisOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import Loader from './../../components/Loader/Loader';

import ProfileDiscussionItem from '../../components/ProfileDiscussionItem/ProfileDiscussionItem';
import ProfileDealItem from './../../components/ProfileDealsItem/ProfileDealItem';
import ProfileReviewsItem from '../../components/ProfileReviewsItem/ProfileReviewItem';
import './profile.scss';
import useProfile from '../../hooks/useProfile';
import { bearerInstance } from '../../utils/API';

const { TabPane } = Tabs;

export default function Profile() {
  const { getProfileInfo } = useProfile();

  const history = useHistory();
  const userState = useSelector(state => state.user);
  const profileData = useSelector(state => state.data.profile);
  const [dealsCount, setDealsCount] = useState(3);
  const [loading, setLoading] = useState([]);
  const [discussions, setDiscussions] = useState([]);

  const getAllChats = () => {
    setLoading(true);

    bearerInstance
      .get('/fetch_all_discussions')
      .then(res => {
        setDiscussions(res.data.discussion_data);
      })
      .catch(err => {
        message.error(err.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!userState?.userData) {
      history.push('/login');
      message.warning('please login to continue');
    } else {
      getProfileInfo();
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAllChats();
  }, []);

  return (
    <div className="profile-container">
      {!profileData && loading && <Loader />}

      {profileData && (
        <div className="profile-wrapper">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">
                <HomeOutlined />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>profile</Breadcrumb.Item>
          </Breadcrumb>

          <div className="quick-actions">
            <Button type="primary" size="normal">
              <Link to="/new-deal">new deal</Link>
            </Button>
          </div>
          <div className="user-info">
            <div className="username">
              {profileData?.profile_data[0]?.user_name  }
            </div>
            <div className="rate">
              profile score <span>{profileData?.profile_data[0]?.a_score}</span>{' '}
              <EllipsisOutlined /> knows <span>25 dealers</span>{' '}
              <EllipsisOutlined /> from{' '}
              <span>{profileData?.profile_data[0]?.user_location}</span>
            </div>

            <div className="like-dislike">
              <span className="like">
                <LikeOutlined />{' '}
                {profileData?.profile_data[0]?.total_positive_reviews}
              </span>
              <span className="dislike">
                <DislikeOutlined />{' '}
                {profileData?.profile_data[0]?.total_negative_reviews}
              </span>
            </div>
          </div>

          <Divider
            style={{ fontSize: '14px', color: '#999', marginTop: '30px' }}
          >
            chats ({discussions.length})
          </Divider>

          <div className="discussions">
            {discussions.slice(0, 3).map((cur, i) => (
              <ProfileDiscussionItem key={i} data={cur} />
            ))}
          </div>

          <Button
            onClick={() => {
              history.push('/chat');
            }}
            type="text"
            style={{
              color: '#ed1450',
              display: 'block',
              margin: '0 auto',
              marginTop: '8px',
            }}
          >
            view all
          </Button>

          <Divider
            style={{ fontSize: '14px', color: '#999', marginTop: '30px' }}
          >
            your deals ({profileData?.total_deals_count})
          </Divider>

          {profileData?.deals_data.length > 0 ? (
            <div className="deals">
              {profileData?.deals_data.slice(0, dealsCount).map(item => (
                <ProfileDealItem
                  item={item}
                  key={item?.d_id}
                  showDelete={true}
                />
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
            style={{ fontSize: '14px', color: '#999', marginTop: '30px' }}
          >
            reviews ({profileData?.profile_data[0]?.total_reviews})
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
