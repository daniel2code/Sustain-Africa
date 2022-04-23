import React from 'react';
import './discussionitem.scss';
import { ArrowRightOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { curType } from '../../utils/datasource';
import { Tag } from 'antd';

const ProfileDiscussionItem = ({ data }) => {
  const history = useHistory();
  const user = useSelector(state => state?.user?.userData);

  return (
    <div
      className="discussion-item-container"
      onClick={() => history.push(`/chat/${data.id}`)}
    >
      <div className="top">
        <div className="username-green">
          <span className="with-indicator">with </span>@
          {user.id === data.dealer
            ? data.merchant_data[0].user_name_front
            : data.dealer_data[0].user_name_front}
        </div>
        {data.status === 'progress' && <Tag color="blue">in progress</Tag>}
        {data.status === 'canceled' && <Tag color="red">canceled</Tag>}
        {data.status === 'completed' && <Tag color="green">completed</Tag>}
        {data.status === 'dispute' && <Tag color="orange">dispute</Tag>}
      </div>
      <div className="bottom">
        <div className="source-destination">
          {data.deal_info[0].source}{' '}
          <ArrowRightOutlined
            style={{
              strokeWidth: '50',
              stroke: 'white',
            }}
          />{' '}
          {data.deal_info[0].destination}
        </div>
        <div className="info">
          min <span className="bold">{data.deal_info[0].min}</span>{' '}
          <EllipsisOutlined /> max{' '}
          <span className="bold">{data.deal_info[0].max}</span>{' '}
          <EllipsisOutlined /> rate{' '}
          <span className="bold">
            {data.deal_info[0].rate_structure === 'percentage'
              ? ''
              : curType(data.deal_info[0].destination_currency)}
            {data.deal_info[0].rate}
            {data.deal_info[0].rate_structure === 'percentage'
              ? '%'
              : `/${curType(data.deal_info[0].source_currency)}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDiscussionItem;
