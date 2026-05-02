import axios from 'axios';

// ─── Environment check ───
const isProd = import.meta.env.PROD;

// Debug log (visible in browser console during development)
console.log(`[Frägra API] Mode: ${isProd ? 'Production' : 'Development'}`);

const api = axios.create({
  baseURL: isProd
    ? import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL}/api`
      : 'https://api-luxury.vercel.app/api'
    : 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
