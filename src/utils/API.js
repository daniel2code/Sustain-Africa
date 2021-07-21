import axios from "axios";

export const instance = axios.create({
  baseURL:
    "https://astro-cors-server.herokuapp.com/fetch/https://sustain.herogloballogistics.com/factory",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const bearerInstance = axios.create({
  baseURL: "https://sustain.herogloballogistics.com/factory",
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
});
