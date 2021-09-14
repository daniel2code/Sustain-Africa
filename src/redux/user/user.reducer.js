const INITIAL_STATE = {
  userData: null,
  token: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload.userData,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

export default userReducer;
