import { useState, useEffect } from 'react';
import './Notification.scss';
import { bearerInstance } from '../../utils/API';
import Loader from './../../components/Loader/Loader';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import { useSelector } from 'react-redux';
import { ReactComponent as EmptyImage } from './../../assets/empty.svg';

export default function Notification() {
  const [notifications, setNotification] = useState();
  const [loading, setLoading] = useState(true);

  const userId = useSelector(state => state.user.userData.id);

  useEffect(() => {
    setLoading(true);

    bearerInstance
      .get('/fetch_all_notifications')
      .then(res => {
        console.log(res.data.notification_data, userId);

        // to be kept
        const notif = res.data.notification_data.filter(
          cur => userId === cur.receiver || cur.rejected || cur.accepted
        );
        console.log(notif);

        setNotification(notif);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  //  d_r - discussion request - only reciever sees this
  //  n_r - new review - only reciever see this
  //  c_r - connection request  - only reciever sees this

  //  c_a - connection request accepted - only sender see this

  //  d_c - discussion completed - both parties sees this

  return (
    <div className="notification">
      <div className="notification-wrapper">
        <h1>notifications</h1>
        {loading && <Loader />}
        {notifications && notifications.length === 0 ? (
          <div className="no-result">
            <div className="svg-container">
              <EmptyImage />
            </div>

            <div className="no-result-text" style={{ fontSize: '16px' }}>
              no notification here
            </div>
            {/* <div className="no-result-text-bottom">
                try another combination
              </div> */}
          </div>
        ) : (
          <div className="notification-body">
            {notifications?.map(cur => (
              <NotificationCard key={cur.id} data={cur} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}