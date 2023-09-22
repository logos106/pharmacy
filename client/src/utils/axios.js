import axios from "axios";
import { baseURL } from "./constants";

export const getAxios = () => {
  let axiosInstance;

  const tokensData = window.sessionStorage.getItem("tokens");
  const tokens = JSON.parse(tokensData);
  const token = tokens.access.token;

  const headers = token
    ? {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      }
    : {
        Accept: "application/json",
      };

  axiosInstance = axios.create({
    headers,
    timeout: 30000,
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      return Promise.resolve(response);
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export const get = (uri) => {
  return new Promise((resolve, reject) => {
    getAxios()
      .get(baseURL + uri)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const post = (uri, data) => {
  return new Promise((resolve, reject) => {
    getAxios()
      .post(baseURL + uri, data)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
