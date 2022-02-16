export const setUserData = userData => ({
  type: 'SET_USER_DATA',
  payload: { userData },
});

export const setNotificationCount = num => ({
  type: 'SET_NOTIFICATION_COUNT',
  payload: num,
});
