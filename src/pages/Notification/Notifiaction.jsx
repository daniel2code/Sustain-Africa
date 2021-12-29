import { useState, useEffect } from 'react';
import './Notification.scss';
import { bearerInstance } from '../../utils/API';
import Loader from './../../components/Loader/Loader';
import NotificationCard from '../../components/NotificationCard/NotificationCard';
import { useSelector } from 'react-redux';

export default function Notification() {
  const [notifications, setNotification] = useState();
  const [loading, setLoading] = useState(true);

  const userId = useSelector(state => state.user.userData.id);

  useEffect(() => {
    setLoading(true);

    bearerInstance
      .get('/fetch_all_notifications')
      .then(res => {
        console.log(res.data.notification_data);

        setNotification(res.data.notification_data);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  //  d_r - discussion request - only reciever sees this
  //  d_r_r - discussion request rejected - only sender see this
  //  c_r - connection request
  //  c_a - connection request accepted
  //  d_c - discussion completed - both parties sees this

  return (
    <div className="notification">
      <div className="notification-wrapper">
        <h1>notifications</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="notification-body">
            {notifications.map(cur =>
              cur.type === 'd_r' && userId === cur.sender ? null : cur.type ===
                  'd_r_r' && userId === cur.reciever ? null : (
                <NotificationCard key={cur.id} data={cur} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
