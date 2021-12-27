import { useState, useEffect } from 'react';
import './Notification.scss';
import { bearerInstance } from '../../utils/API';
import Loader from './../../components/Loader/Loader';
import NotificationCard from '../../components/NotificationCard/NotificationCard';

export default function Notification() {
  const [notifications, setNotification] = useState();
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="notification">
      <div className="notification-wrapper">
        <h1>Notifications</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="notification-body">
            {notifications.map(cur => (
              <NotificationCard key={cur.id} data={cur} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
