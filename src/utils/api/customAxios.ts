import axios from "axios";

console.log(process.env.REACT_APP_GH_TOKEN);
const token = process.env.REACT_APP_GH_TOKEN;

interface CustomError {
  status: number;
  message: string;
}

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28"
  }
});

//요청 API
api.interceptors.request.use(
  config => {
    return config;
  },
  err => {
    if (err.response) {
      const { status, data } = err.response;
      const errResponse: CustomError = {
        status,
        message: data.message
      };
      return Promise.reject(errResponse);
    }
    return Promise.reject(err);
  }
);

//응답 API
api.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    if (err.response) {
      const { status, data } = err.response;
      const errResponse: CustomError = {
        status,
        message: data.message
      };
      return Promise.reject(errResponse);
    }
    return Promise.reject(err);
  }
);

export default api;
