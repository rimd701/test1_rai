import axios from "axios";

export const api = () => {
  const instance = axios.create({
    headers: {
      "Content-Type": "multipart/form-data",
    },
    baseURL: "http://localhost:8000/api/",
    timeout: 60000,
  });

  instance.interceptors.request.use(
    function (response: any) {
      return response;
    },
    function (error: any) {
      return Promise.reject(error);
    }
  );

  return instance;
};

