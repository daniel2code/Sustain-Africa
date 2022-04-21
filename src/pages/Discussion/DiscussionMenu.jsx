import { DownOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Select } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileDiscussionItem from '../../components/ProfileDiscussionItem/ProfileDiscussionItem';
import './discussion.scss';

const { Option } = Select;

export default function DiscussionMenu() {
  const [filterValue, setFilterValue] = useState(null);

  const onFilterChange = value => {
    setFilterValue(null);
    if (value === 'resolved') {
    } else if (value === 'ongoing') {
    }
  };
  return (
    <div className="msg">
      <div className="msg-wrapper">
        <div className="msg-head">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">
                <HomeOutlined />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>chats (5)</Breadcrumb.Item>
          </Breadcrumb>

          <Select
            value={filterValue}
            suffixIcon={<DownOutlined />}
            placeholder="filter by..."
            optionFilterProp="children"
            onChange={onFilterChange}
          >
            <Option value="resolved">resolved</Option>
            <Option value="ongoing">ongoing</Option>
          </Select>
        </div>

        <p>click on anyone to continue where you left off.</p>

        <div className="msg-discussions">
          <ProfileDiscussionItem key="1" />
          <ProfileDiscussionItem key="3" />
          <ProfileDiscussionItem key="2" />
        </div>
      </div>
    </div>
  );
}
