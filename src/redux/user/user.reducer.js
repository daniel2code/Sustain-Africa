const INITIAL_STATE = {
  userData: null,
  notificationCount: 0,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload.userData,
      };
    case 'SET_NOTIFICATION_COUNT':
      return {
        ...state,
        notificationCount: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
