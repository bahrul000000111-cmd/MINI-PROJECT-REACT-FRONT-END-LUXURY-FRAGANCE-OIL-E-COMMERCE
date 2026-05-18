import axios from 'axios';

// ─── Environment check ───
const isProd = import.meta.env.PROD;

// ─── Resolve Base URL ───
const resolveBaseURL = () => {
  const rawUrl = import.meta.env.VITE_API_URL;

  if (!rawUrl) {
    console.warn(
      '[Frägra API] ⚠️  VITE_API_URL tidak di-set!\n' +
      '  → Untuk development lokal: set VITE_API_URL=http://localhost:8000/api di .env\n' +
      '  → Untuk production: set di Vercel Dashboard → Settings → Environment Variables'
    );
    // Fallback ke tunnel jika tersedia (development only)
    return 'https://fields-ought-rose-stewart.trycloudflare.com/api';
  }

  // ⚠️ Mixed Content Guard: Peringatkan jika frontend HTTPS → backend HTTP
  if (isProd && rawUrl.startsWith('http://')) {
    console.error(
      '[Frägra API] ❌ MIXED CONTENT TERDETEKSI!\n' +
      '  Frontend berjalan di HTTPS (Vercel), tetapi VITE_API_URL masih HTTP.\n' +
      '  Browser akan memblokir semua request. Pasang SSL di VPS terlebih dahulu.'
    );
  }

  // Strip trailing slash
  return rawUrl.replace(/\/$/, '');
};

const baseURL = resolveBaseURL();
console.log(`[Frägra API] Mode: ${isProd ? 'Production' : 'Development'} | baseURL: ${baseURL}`);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // ─── PENTING: false = Token-based auth (Sanctum Bearer Token)
  // Jangan ubah ke true kecuali beralih ke cookie-based auth,
  // karena akan membutuhkan allowed_origins spesifik (bukan '*') di cors.php
  withCredentials: false,
  // ─── Timeout 15 detik agar error lebih cepat terdeteksi
  timeout: 15000,
});

// ─── Request Interceptor ────────────────────────────────────────────────────
// Otomatis sisipkan Bearer Token ke setiap request yang membutuhkan auth
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

// ─── Response Interceptor ───────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('[Frägra API] ⏱️  Request timeout. Server VPS tidak merespons dalam 15 detik.');
    } else if (!error.response) {
      // error.request ada tapi error.response tidak ada → Network/CORS/Mixed Content error
      console.error(
        '[Frägra API] 🔴 Network error — tidak ada respons dari server.\n' +
        '  Kemungkinan penyebab:\n' +
        '  1. Mixed Content: Frontend HTTPS → Backend HTTP (pasang SSL di VPS!)\n' +
        '  2. CORS: Preflight OPTIONS request diblokir server\n' +
        '  3. Server VPS down atau firewall memblokir port 80/443\n' +
        `  4. URL salah: ${baseURL}`
      );
    } else if (error.response.status === 401) {
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
