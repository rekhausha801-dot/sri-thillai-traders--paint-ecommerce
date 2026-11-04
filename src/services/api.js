import axios from 'axios';

// Base Axios instance configured for Sri Thillai Traders API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.srithillaitraders.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: Attach authentication token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('thillai_auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Global response handling & error processing
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if expired or unauthorized
      localStorage.removeItem('thillai_auth_token');
      localStorage.removeItem('thillai_user');
    }
    return Promise.reject(error);
  }
);

export default api;
