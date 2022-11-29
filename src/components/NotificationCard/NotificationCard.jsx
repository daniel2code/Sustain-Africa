import { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format, register } from 'timeago.js';
import locale from '../../utils/timeagoLocale';
import { /* message, Tooltip,*/ Modal /* Avatar  */ } from 'antd';
import { bearerInstance } from '../../utils/API';
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
  const [rejected, setRejected] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const router = useHistory();

  useEffect(() => {
    if (user.id === data.sender) setStamp(data.created_at);
    else if (user.id === data.receiver) {
      if (data.rejected === 1) setStamp(data.rejected_at);
      else if (data.accepted === 1) setStamp(data.accepted_at);
      else setStamp(data.created_at);
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

  function showPromiseConfirm() {
    confirm({
      title: (
        <>
          reject a discussion request from{' '}
          <span className="username-green">
            @{data.sender_details[0].user_name}
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
            setRejected(true);
            router.push('/notifications');
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
            @{data.sender_details[0].user_name}
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
            setAccepted(true);
            router.replace('/chat');
          })
          .catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  return (
    <>
      <div
        className={`notification-card${
          view ? ' notification-card-disabled' : ''
        }`}
        onClick={viewed}
      >
        {data.type === 'd_r' && user.id === data.receiver && (
          <div>
            <p
              style={{
                marginBottom: data.accepted || data.rejected ? 0 : '1em',
              }}
            >
              {data.accepted
                ? 'you accepted '
                : data.rejected
                ? 'you rejected '
                : null}
              <Link
                to={`/user/${data.sender}/profile`}
                className="notification-link username-green"
              >
                @{data.sender_details[0].user_name}
              </Link>{' '}
              {data.accepted || data.rejected
                ? ' discussion request regarding his '
                : dealWriteUp[data.type]}
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
                @{data.receiver_details[0].user_name}
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

        {data.type === 'w_in' && (
          <div>
            <p>
              <span className="notification-pink">
                {Number(parseFloat(data.amount).toFixed(7))}
              </span>{' '}
              btc was deposited into your sustain wallet at address{' '}
              <span
                className="notification-pink"
                style={{ wordWrap: 'break-word' }}
              >
                {data.address}
              </span>
            </p>
          </div>
        )}

        <div style={{ display: 'flex' }}>
          {((data.type === 'd_r' &&
            data.receiver === user.id &&
            (data.accepted === 0 || accepted) &&
            (data.rejected === 0 || rejected)) ||
            data.type === 'c_r') && (
            <div style={{ display: 'flex', marginBottom: '5px' }}>
              <button
                style={{ marginRight: '10px' }}
                className={`notification-card-btn notification-card-btn-pink${
                  data.accepted || data.rejected || accepted || rejected
                    ? ' notification-disabled'
                    : ''
                }`}
                // disabled when the deal is
                disabled={
                  data.accepted || data.rejected || accepted || rejected
                }
                onClick={showAcceptConfirm}
              >
                {data.accepted === 1 || accepted ? 'accepted' : 'accept'}
              </button>

              <button
                className={`notification-card-btn notification-card-btn-out${
                  data.accepted || data.rejected || accepted || rejected
                    ? ' notification-disabled-rej'
                    : ''
                }`}
                // disabled when the deal is
                disabled={
                  data.accepted || data.rejected || accepted || rejected
                }
                onClick={showPromiseConfirm}
              >
                {data.rejected === 1 || rejected ? 'rejected' : 'reject'}
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
