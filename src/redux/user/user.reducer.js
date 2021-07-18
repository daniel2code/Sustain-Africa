const INITIAL_STATE = {
  profile: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_PROFILE_INFO":
      return {
        ...state,
        profile: action.payload.profile,
      };
    default:
      return state;
  }
};

export default userReducer;
