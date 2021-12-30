import { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { bearerInstance } from '../../utils/API';

//  d_r - discussion request  - handled
//  d_c - discussion completed - handled
//  n_r - new review - handled
//  d_r_r - discussion request rejected - handled
//  c_r - connection request
//  c_a - connection request accepted

const NotificationCard = ({ data }) => {
  const [senderDet, setSenderDet] = useState();
  const user = useSelector(state => state.user.userData);

  useEffect(() => {
    const userid = user.id === data.sender ? data.receiver : data.sender;

    bearerInstance.get(`/profile?id=${userid}`).then(res => {
      setSenderDet({
        user: res.data.profile_data[0].user_name,
        userFront: res.data.profile_data[0].user_name_front,
      });
    });

    return () => {
      setSenderDet({
        user: '',
        userFront: '',
      });
    };
  }, [data.sender, data.receiver, user.id]);

  const dealWriteUp = useMemo(() => {
    return {
      d_r: 'wants to discuss with you regarding your ',
      n_r: 'dropped a review on your ',
      d_r_r: 'rejected your discussion request regarding his ',
    };
  }, []);

  return (
    <div className="notification-card">
      {(data.type === 'd_r' ||
        data.type === 'd_r_r' ||
        data.type === 'n_r') && (
        <div>
          <p
            style={{
              marginBottom: (data.type === 'd_r_r' || data.type === 'n_r') && 0,
            }}
          >
            <Link
              to={`/user/${data.sender}/profile`}
              className="notification-link username-green"
            >
              @{senderDet?.userFront}
            </Link>{' '}
            {dealWriteUp[data.type]}
            <Link
              to={`/deal/${data.deal_id}`}
              className="notification-link username-green"
            >
              deal
            </Link>
          </p>
        </div>
      )}

      {data.type === 'd_c' && (
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
                @{senderDet?.userFront}
              </Link>
            )}
            {data.receiver === user.id && (
              <Link
                to={`/user/${data.sender}/profile`}
                className="notification-link username-green"
              >
                @{senderDet?.userFront}
              </Link>
            )}{' '}
            completed successfully
          </p>
        </div>
      )}

      <div style={{ display: 'flex' }}>
        {data.type === 'd_r' && (
          <div style={{ display: 'flex', marginBottom: '5px' }}>
            <button
              style={{ marginRight: '10px' }}
              className={`notification-card-btn notification-card-btn-pink${
                data.accepted || data.rejected ? ' disabled' : ''
              }`}
              // disabled when the deal is
              disabled={!(data.accepted || data.rejected)}
            >
              accept
            </button>

            <button className="notification-card-btn notification-card-btn-out">
              reject
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
          {format(data?.created_at).split(' ')[0]}
          {format(data?.created_at).split(' ')[1].substring(0, 1)}
        </span>
      </div>
    </div>
  );
};

export default NotificationCard;
