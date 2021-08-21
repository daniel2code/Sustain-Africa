const INITIAL_STATE = {
  dealsList: null,
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
