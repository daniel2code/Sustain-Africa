/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  const notificationData = event.notification;

  event.waitUntil(
    clients.matchAll().then(clientList => {
      const client = clientList.find(cur => cur.visibilityState === 'visible');

      console.log(notificationData);
      console.log(client);

      if (client !== undefined) {
        client.focus();
        client.navigate(notificationData.data.link);
      } else {
        clients.openWindow(client.url);
      }
    })
  );
});
