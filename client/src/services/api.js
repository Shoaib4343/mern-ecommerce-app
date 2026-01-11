import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001/api/v1",
});


/* =============================
   REQUEST INTERCEPTOR
============================= */
API.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* =============================
   RESPONSE INTERCEPTOR (optional)
============================= */
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: handle global auth errors
    if (error.response?.status === 401) {
      localStorage.removeItem("auth");
      // window.location.href = "/login"; // optional redirect
    }
    return Promise.reject(error);
  }
);

export default API;