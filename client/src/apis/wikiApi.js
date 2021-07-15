import axios from "axios";

const wikiApi = axios.create({
  // change the baseURL to integrate with target backend in the future
  baseURL: process.env.REACT_APP_URL_STRAPI,
  headers: {
    "Content-Type": "application/json",
  },
});

// https://github.com/axios/axios#interceptors
wikiApi.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer" + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default wikiApi;
