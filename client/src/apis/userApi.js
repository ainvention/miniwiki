import axios from "axios";

const userApi = axios.create({
  // change the baseURL to integrate with target backend in the future
  baseURL: process.env.REACT_APP_URL_STRAPI,
  headers: {
    "Content-Type": "application/json",
  },
});

userApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default userApi;
