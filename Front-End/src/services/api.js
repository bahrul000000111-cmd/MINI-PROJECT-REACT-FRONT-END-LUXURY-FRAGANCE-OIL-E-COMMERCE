import axios from 'axios';

// ─── Environment check ───
const isProd = import.meta.env.PROD;

// ─── Resolve Base URL ───
const resolveBaseURL = () => {
  // Mengambil VITE_API_URL dari .env atau menggunakan URL Cloudflare Tunnel sebagai fallback
  const vpsUrl = import.meta.env.VITE_API_URL || 'https://fields-ought-rose-stewart.trycloudflare.com';
  
  if (!import.meta.env.VITE_API_URL) {
    console.warn('[Frägra API] VITE_API_URL is missing! Using fallback tunnel URL.');
  }

  // Strip any accidental trailing slash, then append /api
  return `${vpsUrl.replace(/\/$/, '')}/api`;
};

const baseURL = resolveBaseURL();
console.log(`[Frägra API] Mode: ${isProd ? 'Production' : 'Development'} | baseURL: ${baseURL}`);

const api = axios.create({
  baseURL,
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
      // Hanya bersihkan token dari storage.
      // Jangan gunakan window.location.href di sini — hard reload akan
      // menghancurkan seluruh React state tree dan menyebabkan login
      // gagal setelah logout. ProtectedRoute & AuthProvider sudah
      // menangani redirect ke /login secara otomatis.
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;
