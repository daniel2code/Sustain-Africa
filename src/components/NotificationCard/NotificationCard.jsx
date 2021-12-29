import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { bearerInstance } from '../../utils/API';

//  d_r - discussion request
//  d_r_r - discussion request rejected
//  c_r - connection request
//  c_a - connection request accepted
//  d_c - discussion completed

const NotificationCard = ({ data }) => {
  const [senderDet, setSenderDet] = useState();
  const user = useSelector(state => state.user.userData);
  // const userNameFront = useSelector(
  //   state => state.data.profile.profile_data[0].user_name_front
  // );

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

  return (
    <div className="notification-card">
      {data.type === 'd_r' && (
        <div>
          <p>
            <Link
              to={`/user/${data.sender}/profile`}
              className="notification-link username-green"
            >
              @{senderDet?.userFront}
            </Link>{' '}
            wants to discuss with you regarding your{' '}
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
              className="notification-card-btn notification-card-btn-pink"
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
            <button className="notification-card-btn notification-card-btn-pink">
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
