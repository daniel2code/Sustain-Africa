/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll().then(clientList => {
      const client = clientList.find(cur => cur.visibilityState === 'visible');

      if (client !== undefined) {
        client.navigate('/');
        client.focus();
      } else {
        clients.openWindow('/');
      }
    })
  );
});
