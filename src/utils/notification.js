export const sendNotification = (amount, sender) => {
  const options = {
    body: `you just got CREDITED with ${amount} by ${sender}`,
    // icon: '/iconbig.png',
    lang: 'en-US',
    vibrate: [100],
    // badge: '/iconbig.png'
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(swreg => {
      swreg.showNotification('new chat message', options);
    });
  }
};
