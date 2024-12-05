import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL || "http://localhost:2000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(localStorage.getItem("token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosInstance;
