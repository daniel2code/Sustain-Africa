export const setDealsList = (dealsList) => ({
  type: "SET_DEALS_LIST",
  payload: { dealsList },
});

export const setProfile = (profile) => ({
  type: "SET_PROFILE",
  payload: { profile },
});

export const setHasError = (hasError) => ({
  type: "SET_HAS_ERROR",
  payload: { hasError },
});
