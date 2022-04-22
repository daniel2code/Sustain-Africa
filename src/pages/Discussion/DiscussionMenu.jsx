import { DownOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ProfileDiscussionItem from '../../components/ProfileDiscussionItem/ProfileDiscussionItem';
import { bearerInstance } from '../../utils/API';
import './discussion.scss';

const { Option } = Select;

export default function DiscussionMenu() {
  const [filterValue, setFilterValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [discussionsFilter, setDiscussionsFilter] = useState([]);

  const getAllChats = () => {
    setLoading(true);

    bearerInstance
      .get('/fetch_all_discussions')
      .then(res => {
        setDiscussions(res.data.discussion_data);
        console.log(res.data.discussion_data);
        setDiscussionsFilter(res.data.discussion_data);
      })
      .catch(err => {
        message.error(err.response?.data?.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAllChats();
  }, []);

  const onFilterChange = value => {
    const filt = [...discussionsFilter];

    if (value === 'resolved') {
      setFilterValue(value);
      setDiscussions(filt.filter(cur => cur.status === 'resolved'));
    } else if (value === 'ongoing') {
      setFilterValue(value);
      setDiscussions(filt.filter(cur => cur.status === 'progress'));
    } else {
      setFilterValue(null);
      setDiscussions(filt);
    }
  };

  return (
    <div className="msg">
      <div className="msg-wrapper">
        {loading && <Loader />}
        {!loading && (
          <>
            <div className="msg-head">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">
                    <HomeOutlined />
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>chats ({discussions.length})</Breadcrumb.Item>
              </Breadcrumb>

              <Select
                style={{ flex: '0 0 160px' }}
                value={filterValue}
                suffixIcon={<DownOutlined />}
                placeholder="filter by..."
                optionFilterProp="children"
                onChange={onFilterChange}
              >
                <Option value="">clear filter</Option>
                <Option value="resolved">resolved</Option>
                <Option value="ongoing">ongoing</Option>
              </Select>
            </div>

            <p>click on anyone to continue where you left off.</p>

            <div className="msg-discussions">
              {discussions.map((cur, i) => (
                <ProfileDiscussionItem key={i} data={cur} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
