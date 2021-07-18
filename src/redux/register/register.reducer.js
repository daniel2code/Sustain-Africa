const INITIAL_STATE = {
  userInfo: {},
};

const registerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    default:
      return state;
  }
};

export default registerReducer;
