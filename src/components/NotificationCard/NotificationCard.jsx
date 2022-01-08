import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, register } from 'timeago.js';
import locale from '../../utils/timeagoLocale';
import { /* message, Tooltip,*/ Modal /* Avatar  */ } from 'antd';
import { bearerInstance } from '../../utils/API';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// import { showConfirm } from '../../utils/confirm';

const { confirm } = Modal;

//  d_r - discussion request  - handled
//  d_c - discussion completed - handled
//  n_r - new review - handled
//  d_r_r - discussion request rejected - handled
//  c_r - connection request
//  c_a - connection request accepted

register('sus-AF', locale);

const NotificationCard = ({ data }) => {
  const user = useSelector(state => state.user.userData);
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [view, setView] = useState(false);
  const [stamp, setStamp] = useState();

  const history = useHistory();

  useEffect(() => {
    if (user.id === data.receiver) setStamp(data.created_at);
    else if (user.id === data.sender) {
      if (data.rejected === 1) setStamp(data.rejected_at);
      else if (data.accepted === 1) setStamp(data.accepted_at);
    }
  }, [
    data.accepted,
    data.accepted_at,
    data.rejected,
    data.rejected_at,
    data.sender,
    data.created_at,
    data.receiver,
    user.id,
  ]);

  useEffect(() => {
    if (user.id === data.receiver) setView(data.viewed_receiver === 1);
    else if (user.id === data.sender) setView(data.viewed_sender === 1);
  }, [
    user.id,
    data.receiver,
    data.sender,
    data.viewed_receiver,
    data.viewed_sender,
  ]);

  const dealWriteUp = useMemo(() => {
    return {
      d_r: 'wants to discuss with you regarding your ',
      d_r_r: 'rejected your discussion request regarding his ',
      d_r_a: 'accepted your discussion request regarding his ',
      n_r: 'dropped a review on your ',
      c_r: 'sent you a request to connect',
      c_a: 'accepted your request to connect. Take note of the terms ',
    };
  }, []);

  const viewed = () => {
    const notData = new FormData();
    notData.append('notification_id', data.id);
    notData.append('viewed', '1');
    notData.append('accepted', '');
    notData.append('rejected', '');
    notData.append('reviewed', '');

    if (!view)
      bearerInstance
        .post(`/update_notification`, notData)
        .then(res => {
          setView(true);
          console.log('came here');
        })
        .catch(err => {
          console.log(err);
        });
  };

  // const handleOk = () => {
  //   const notData = new FormData();
  //   notData.append('notification_id', data.id);
  //   notData.append('viewed', '');
  //   notData.append('accepted', '1');
  //   notData.append('rejected', '');
  //   notData.append('reviewed', '');

  //   bearerInstance
  //     .post(`/update_notification`, notData)
  //     .then(res => {
  //       history.push('/message');
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  function showPromiseConfirm() {
    confirm({
      title: (
        <>
          reject a discussion request from{' '}
          <span className="username-green">
            @{data.sender_details[0].user_name_front}
          </span>
          ?
        </>
      ),
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to reject this discussion request?',
      onOk() {
        return new Promise((resolve, reject) => {
          const notData = new FormData();
          notData.append('notification_id', data.id);
          notData.append('viewed', '');
          notData.append('accepted', '');
          notData.append('rejected', '1');
          notData.append('reviewed', '');

          resolve(bearerInstance.post(`/update_notification`, notData));
        })
          .then(res => {
            history.replace('/notifications');
          })
          .catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  function showAcceptConfirm() {
    confirm({
      title: (
        <>
          start a discussion with{' '}
          <span className="username-green">
            @{data.sender_details[0].user_name_front}
          </span>
          ?
        </>
      ),
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          <div>source: {}</div>
          <div>destination: {}</div>
          <div>rate: {}%</div>
        </div>
      ),
      onOk() {
        return new Promise((resolve, reject) => {
          const notData = new FormData();
          notData.append('notification_id', data.id);
          notData.append('viewed', '');
          notData.append('accepted', '1');
          notData.append('rejected', '');
          notData.append('reviewed', '');

          resolve(bearerInstance.post(`/update_notification`, notData));
        })
          .then(res => {
            history.replace('/message');
          })
          .catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  return (
    <>
      {/* <Modal
        title={
          <div className="avatar">
            <Avatar
              style={{
                color: '#14a014',
                backgroundColor: '#a9fca9',
                fontWeight: '500',
              }}
            >
              {data.sender_details[0].user_name_front.charAt(0).toUpperCase()}
            </Avatar>{' '}
            {data.sender_details[0].user_name_front}{' '}
            <span style={{ color: '#14a014' }}>&#9679;</span>
          </div>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          start a discussion with{' '}
          <Link
            to={`/user/${data.sender}/profile`}
            className="notification-link username-green"
          >
            @{data.sender_details[0].user_name_front}
          </Link>
        </p>
      </Modal> */}

      <div
        className={`notification-card${
          view ? ' notification-card-disabled' : ''
        }`}
        onClick={viewed}
      >
        {data.type === 'd_r' && user.id === data.receiver && (
          <div>
            <p>
              <Link
                to={`/user/${data.sender}/profile`}
                className="notification-link username-green"
              >
                @{data.sender_details[0].user_name_front}
              </Link>{' '}
              {dealWriteUp[data.type]}
              {data.type === 'c_r' || data.type === 'c_a' ? null : (
                <Link
                  to={`/deal/${data.deal_id}`}
                  className="notification-link username-green"
                >
                  deal
                </Link>
              )}
              {data.type === 'c_a' && (
                <Link
                  to={`/terms`}
                  className="notification-link username-green"
                >
                  Terms
                </Link>
              )}
            </p>
          </div>
        )}

        {data.type === 'd_r' && user.id === data.sender ? (
          <div>
            <p style={{ marginBottom: 0 }}>
              <Link
                to={`/user/${data.receiver}/profile`}
                className="notification-link username-green"
              >
                @{data.receiver_details[0].user_name_front}
              </Link>{' '}
              {data.rejected ? dealWriteUp['d_r_r'] : null}
              {data.accepted ? dealWriteUp['d_r_a'] : null}
              <Link
                to={`/deal/${data.deal_id}`}
                className="notification-link username-green"
              >
                deal
              </Link>
            </p>
          </div>
        ) : null}

        {/* {data.type === 'd_c' && (
          <div>
            <p>
              <Link
                to={`/deal/${data.deal_id}`}
                className="notification-link username-green"
              >
                deal
              </Link>{' '}
              with{' '}
              {data.sender === user.id && (
                <Link
                  to={`/user/${data.receiver}/profile`}
                  className="notification-link username-green"
                >
                  @{data.receiver_details[0].user_name_front}
                </Link>
              )}
              {data.receiver === user.id && (
                <Link
                  to={`/user/${data.sender}/profile`}
                  className="notification-link username-green"
                >
                  @{data.sender_details[0].user_name_front}
                </Link>
              )}{' '}
              completed successfully
            </p>
          </div>
        )} */}

        <div style={{ display: 'flex' }}>
          {((data.type === 'd_r' && data.receiver === user.id) ||
            data.type === 'c_r') && (
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <button
                style={{ marginRight: '10px' }}
                className={`notification-card-btn notification-card-btn-pink${
                  data.accepted || data.rejected ? ' notification-disabled' : ''
                }`}
                // disabled when the deal is
                disabled={data.accepted || data.rejected}
                onClick={showAcceptConfirm}
              >
                {data.accepted === 1 ? 'accepted' : 'accept'}
              </button>

              <button
                className={`notification-card-btn notification-card-btn-out${
                  data.accepted || data.rejected
                    ? ' notification-disabled-rej'
                    : ''
                }`}
                // disabled when the deal is
                disabled={data.accepted || data.rejected}
                onClick={showPromiseConfirm}
              >
                {data.rejected === 1 ? 'rejected' : 'reject'}
              </button>
            </div>
          )}

          {data.type === 'd_c' && (
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <button
                className={`notification-card-btn notification-card-btn-pink${
                  data.accepted || data.rejected ? '' : ''
                }`}
                // disabled when the deal is
                disabled={!(data.accepted || data.rejected)}
              >
                review
              </button>
            </div>
          )}

          <span
            style={{
              fontSize: '11px',
              color: 'rgb(153, 153, 153)',
              alignSelf: 'flex-end',
              marginLeft: 'auto',
            }}
          >
            {format(stamp, 'sus-AF')}
          </span>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
