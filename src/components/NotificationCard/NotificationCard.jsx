import { format } from 'timeago.js';

//  d_r - discussion request
//  d_r_r - discussion request rejected
//  c_r - connection request
//  c_a - connection request accepted
//  d_c - discussion completed

const NotificationCard = ({ data }) => {
  return (
    <div className="notification-card">
      <div></div>

      <div style={{ display: 'flex' }}>
        {data.type === 'd_r' && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
            <button className="notification-card-btn notification-card-btn-pink">
              accept
            </button>

            <button className="notification-card-btn notification-card-btn-out">
              reject
            </button>
          </div>
        )}
        {data.type === 'd_c' && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '5px' }}>
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
          {format(data?.created_at)}
        </span>
      </div>
    </div>
  );
};

export default NotificationCard;
