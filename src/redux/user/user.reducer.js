const INITIAL_STATE = {
  userData: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload.userData,
      };

    default:
      return state;
  }
};

export default userReducer;
