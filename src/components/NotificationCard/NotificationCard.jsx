import { format } from 'timeago.js';

const NotificationCard = ({ data }) => {
  return (
    <div className="notification-card">
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
