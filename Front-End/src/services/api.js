import axios from 'axios';

// ─── Environment check ───
const isProd = import.meta.env.PROD;

// ─── Resolve Base URL ───
// Production  → VITE_API_URL (set via Vercel Environment Variables dashboard)
//               e.g. https://api.domain-saya.com  or  http://123.45.67.89
// Development → local Laravel server
const resolveBaseURL = () => {
  if (!isProd) {
    return 'http://localhost:8000/api';
  }

  const vpsUrl = import.meta.env.VITE_API_URL;
  if (!vpsUrl) {
    console.error(
      '[Frägra API] ⚠️  VITE_API_URL is not set!\n' +
      'Go to Vercel Dashboard → Project → Settings → Environment Variables\n' +
      'and add: VITE_API_URL = https://<your-vps-ip-or-domain>'
    );
    // Return a clearly broken URL so network errors surface immediately
    return 'http://MISSING_VITE_API_URL/api';
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
