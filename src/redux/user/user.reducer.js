const INITIAL_STATE = {
  profile: null,
  token: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_PROFILE_INFO":
      return {
        ...state,
        profile: action.payload.profile,
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
