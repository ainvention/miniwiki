import axios from "axios";

const userApi = axios.create({
  // change the baseURL to integrate with target backend in the future
  // check these info: https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_process_env
  baseURL: process.env.REACT_APP_URL_STRAPI,
  headers: {
    "Content-Type": "application/json",
  },
});

// https://github.com/axios/axios#interceptors
userApi.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default userApi;
