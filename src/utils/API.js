import axios from "axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3VzdGFpbi5hZnJpY2EiLCJhdWQiOiJodHRwczpcL1wvc3VzdGFpbi5hZnJpY2EiLCJpYXQiOjE2NjYzMTc4NjgsIm5iZiI6MTY2NjMxNzg3OCwiZXhwIjoxNjY2OTIyNjY4LCJkYXRhIjp7ImlkIjoiNTk3YzY2YmItZjM3YS00OTI0LWE3OTQtODkwYjg5MzY5ZTRjIiwiZW1haWwiOiJkYW5pZWxud29rZTIwQGdtYWlsLmNvbSIsInVzZXJfbmFtZSI6IkRhbmllbCJ9fQ.uSgyamTr7jqoCcaBqKuLxxoQIA90MVIyugn-kfhRgrE";

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
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${token}`
    },
  });
};
