export const setUserData = userData => ({
  type: 'SET_USER_DATA',
  payload: { userData },
});

export const seNotificationCount = num => ({
  type: 'SET_NOTIFICATION_COUNT',
  payload: num,
});
