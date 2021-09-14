const INITIAL_STATE = {
  userData: null,
  token: null,
  profile: null,
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
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload.profile,
      };
    default:
      return state;
  }
};

export default userReducer;
