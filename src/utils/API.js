import axios from "axios";

const token = localStorage.getItem("token");

export const instance = axios.create({
  baseURL: "https://sustain.herogloballogistics.com/factory",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const bearerInstance = axios.create({
  baseURL: "https://sustain.herogloballogistics.com/factory",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Bearer ${token}`,
  },
});
