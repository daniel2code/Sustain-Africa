import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://sustain.africa/factory',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const bearerInstance = axios.create({
  baseURL: 'https://sustain.africa/factory',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
