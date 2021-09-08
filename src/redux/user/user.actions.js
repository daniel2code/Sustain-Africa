export const setProfileInfo = (profile) => ({
  type: "SET_PROFILE_INFO",
  payload: { profile },
});

export const setToken = (token) => ({
  type: "SET_TOKEN",
  payload: { token },
});
