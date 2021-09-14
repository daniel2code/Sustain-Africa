export const setUserData = (userData) => ({
  type: "SET_USER_DATA",
  payload: { userData },
});

export const setToken = (token) => ({
  type: "SET_TOKEN",
  payload: { token },
});

export const setProfile = (profile) => ({
  type: "SET_PROFILE",
  payload: { profile },
});
