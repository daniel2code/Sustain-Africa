import axios from "axios";

export const instance = axios.create({
  baseURL: "https://sustain.africa/factory",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const bearerInstance = axios.create({
  baseURL: "https://sustain.africa/factory",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// export const bearerInstanceWithToken = axios.create({
//   baseURL: "https://sustain.africa/factory",
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/x-www-form-urlencoded",
//     Authorization: `Bearer ${token}`,
//   },
// });

export const bearerInstanceWithToken = (token) => {
  return axios.create({
    baseURL: "https://sustain.africa/factory",
    headers: {
      // Accept: "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
