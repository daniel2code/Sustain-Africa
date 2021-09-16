const INITIAL_STATE = {
  profile: null,
  dealsList: null,
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.payload.profile,
      };
    case "SET_DEALS_LIST":
      return {
        ...state,
        dealsList: action.payload.dealsList,
      };
    default:
      return state;
  }
};

export default dataReducer;
