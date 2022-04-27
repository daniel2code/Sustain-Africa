export const sendNotification = (user, msg, link) => {
  const options = {
    body: `${user}: ${msg}`,
    // icon: '/iconbig.png',
    lang: 'en-US',
    vibrate: [100],
    // badge: '/iconbig.png',
    data: {
      link,
    },
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(swreg => {
      swreg.showNotification('new chat message', options);
    });
  }
};
