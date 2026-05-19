# Dokumentasi Proyek - Luxury Fragrance Oil E-Commerce

## Deskripsi Proyek
Proyek ini adalah aplikasi fullstack yang terdiri dari **Front-End** (React) dan **Back-End** (Laravel) dengan sistem autentikasi token-based menggunakan Laravel Sanctum. Proyek ini memiliki landing page e-commerce luxury fragrance oil dan sistem manajemen user yang terintegrasi.

---

## Arsitektur Proyek

```
Root/
├── Back-End/           # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   └── UserController.php
│   │   └── Models/User.php
│   ├── routes/api.php
│   ├── config/cors.php
│   ├── config/sanctum.php
│   └── database/seeders/UserSeeder.php
│
├── Front-End/          # React SPA
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React Context
│   │   ├── hooks/            # Custom hooks
│   │   └── services/         # API services
│   └── package.json
│
└── DOCUMENTATION.md    # File ini
```

---

## Daftar Library yang Digunakan

### Back-End (Laravel)

| Library | Versi | Fungsi |
|---------|-------|--------|
| **PHP** | ^8.3 | Bahasa pemrograman utama |
| **Laravel Framework** | ^13.0 | Framework PHP untuk API |
| **Laravel Sanctum** | ^4.3 | Autentikasi token-based API |
| **Laravel Tinker** | ^3.0 | REPL untuk debugging |
| **Faker PHP** | ^1.23 | Generate data dummy untuk testing |
| **PHPUnit** | ^12.5.12 | Unit testing |
| **Mockery** | ^1.6 | Mocking untuk testing |

#### Penjelasan Library Back-End

**Laravel Sanctum**
- Library autentikasi ringan untuk SPA (Single Page Application)
- Menggunakan Bearer Token untuk melindungi endpoint API
- Token disimpan di tabel `personal_access_tokens`
- Mendukung token expiration dan prefix untuk keamanan

**Laravel Tinker**
- Interactive shell untuk Laravel
- Berguna untuk testing query dan model langsung dari terminal

### Front-End (React + Vite)

| Library | Versi | Fungsi |
|---------|-------|--------|
| **React** | ^19.2.4 | Library UI utama |
| **React DOM** | ^19.2.4 | Rendering React ke DOM |
| **React Router DOM** | ^7.x | Routing dan navigasi SPA |
| **Axios** | ^1.8.4 | HTTP client untuk API calls |
| **Tailwind CSS** | ^4.2.2 | Utility-first CSS framework |
| **@tailwindcss/vite** | ^4.2.2 | Plugin Tailwind untuk Vite |
| **@tailwindcss/postcss** | ^4.2.2 | PostCSS integration untuk Tailwind |
| **Vite** | ^8.0.4 | Build tool dan dev server |
| **@vitejs/plugin-react** | ^6.0.1 | Plugin React untuk Vite |

#### Penjelasan Library Front-End

**React Router DOM**
- Mengelola routing client-side
- Mendukung protected routes dengan `<Navigate>`
- Hook `useNavigate` untuk programmatic navigation
- Dynamic routes dengan `useParams`

**Axios**
- HTTP client dengan interceptors
- Automatic JSON parsing
- Request/response interceptors untuk token injection
- Error handling yang lebih baik dari fetch API

**Tailwind CSS v4**
- Utility-first CSS framework
- Tidak memerlukan file CSS custom yang besar
- Responsive design dengan breakpoint prefix (`md:`, `lg:`)
- Custom color palette sesuai brand identity

**Vite**
- Build tool yang lebih cepat dari webpack
- Hot Module Replacement (HMR) untuk development
- Optimized production build dengan tree-shaking

---

## Fitur Utama (Milestone Requirement)

### Milestone 1 - API Integration

| Endpoint | Method | Auth | Deskripsi |
|----------|--------|------|-----------|
| `/api/register` | POST | ❌ | Registrasi user baru |
| `/api/login` | POST | ❌ | Login dan generate token |
| `/api/logout` | POST | ✅ | Hapus token aktif |
| `/api/users` | GET | ✅ | List users (paginated, default 10/page) |
| `/api/users/{id}` | GET | ✅ | Detail user berdasarkan ID |

### Milestone 2 - React Application

| Halaman | Route | Auth | Deskripsi |
|---------|-------|------|-----------|
| Landing Page | `/` | ❌ | Hero, Social Proof, Stats, Products |
| Login | `/login` | ❌ | Form login dengan validasi |
| Register | `/register` | ❌ | Form registrasi dengan validasi |
| User List | `/users` | ✅ | Daftar user dengan pagination |
| User Detail | `/users/:id` | ✅ | Detail informasi user |

---

## Fitur Tambahan (Di Luar Requirement Utama)

### 1. Responsive Design
- **Desktop**: Tabel data user dengan kolom lengkap
- **Mobile**: Card-based layout untuk daftar user
- **Tablet**: Adaptive padding dan typography
- Navbar dengan hamburger menu untuk mobile
- Form login/register yang responsif di semua ukuran layar

### 2. Form Validation Real-time
- Validasi client-side pada form login dan register
- Error message per field (name, email, password, confirmation)
- Border merah pada field yang error
- Validasi email format dan password minimum 6 karakter

### 3. Loading States
- Animated pulse loader saat fetch data
- Loading text pada tombol submit ("Signing in...", "Creating account...")
- Skeleton-like loading untuk halaman user list

### 4. Error Handling
- Try-catch pada semua API calls
- Error message yang user-friendly
- 401 Unauthorized handling dengan redirect ke login
- Network error handling
- Validation error mapping dari Laravel ke React form

### 5. Global State Management
- React Context API untuk auth state
- Custom hook `useAuth` untuk akses mudah ke auth functions
- Auth state persists di localStorage (token & user data)
- Auto-login saat refresh page jika token masih valid

### 6. Axios Interceptors
- Request interceptor: Otomatis menambahkan `Authorization: Bearer <token>`
- Response interceptor: Handle 401 errors dan auto-logout
- Base URL konfigurasi untuk development/production

### 7. Logout Functionality
- API endpoint `/api/logout` untuk menghapus token di database
- Frontend logout yang menghapus localStorage
- Redirect ke halaman login setelah logout
- Navbar dinamis: tampilkan Logout jika authenticated

### 8. Protected Routes
- Component `<ProtectedRoute>` yang wrap halaman yang memerlukan auth
- Redirect otomatis ke `/login` jika belum login
- Redirect otomatis ke `/users` jika sudah login dan akses login page

### 9. Custom UI/UX
- **Luxury Color Palette**: Cream (#F3F0E9), Dark (#1A1A1A), Gray (#717171), Border (#E5E1D8)
- **Typography**: Font serif (Optima, Didot) untuk heading, sans-serif (Inter) untuk body
- **Hover Effects**: Transisi halus pada tombol dan link
- **Shadow & Border**: Rounded corners (rounded-2xl, rounded-xl) dengan shadow subtle
- **Avatar Placeholder**: Inisial nama user sebagai avatar default

### 10. Pagination Component
- Pagination dengan nomor halaman yang bisa diklik
- Previous/Next button dengan disabled state
- Info showing "Showing X to Y of Z users"
- Pagination info dari Laravel's LengthAwarePaginator

### 11. Dynamic Navbar
- Menu "Users" muncul hanya saat authenticated
- Tombol Login/Register untuk guest
- Tombol Logout + nama user untuk authenticated user
- Mobile menu dengan auth links yang responsif

### 12. Database Seeder
- 15 user dummy dengan data realistis
- Password hashed dengan Bcrypt
- Berbeda-beda nama dan email untuk testing

### 13. CORS Configuration
- Allowed origins: `http://localhost:5173` dan `http://localhost:3000`
- Support semua HTTP methods
- Support credentials untuk future cookie-based auth

### 14. Sanctum Configuration
- Stateful domains untuk SPA authentication
- Token prefix untuk keamanan
- Session-based auth guard configuration

### 15. Landing Page Integration
- Landing page e-commerce tetap dipertahankan
- Routing yang memisahkan landing page dan auth pages
- Navbar konsisten di semua halaman

---

## Struktur Autentikasi Token Flow

```
1. User Register/Login
   ↓
2. Backend generate Sanctum token
   ↓
3. Token dikirim ke Frontend
   ↓
4. Frontend simpan token di localStorage
   ↓
5. Axios interceptor otomatis tambahkan token ke setiap request
   ↓
6. Backend verifikasi token via auth:sanctum middleware
   ↓
7. Jika token valid → akses diberikan
   ↓
8. Jika token invalid/expired → 401 Unauthorized → redirect login
```

---

## Environment Variables

### Back-End (.env)
```
APP_URL=http://localhost
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=Laravel_back_end
DB_USERNAME=root
DB_PASSWORD=b000000788
```

### Front-End (hardcoded in api.js)
```javascript
baseURL: 'http://localhost:8000/api'
```

---

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": { ... } // untuk validation errors
}
```

---

## Cara Menjalankan Proyek

### 1. Back-End
```bash
cd Back-End
composer install
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```

### 2. Front-End
```bash
cd Front-End
npm install
npm run dev
```

### 3. Akses Aplikasi
- Front-End: http://localhost:5173
- Back-End API: http://localhost:8000

---

## User Testing (Seeded Data)

| Email | Password | Keterangan |
|-------|----------|------------|
| admin@example.com | password | Admin User |
| john@example.com | password | John Doe |
| jane@example.com | password | Jane Smith |
| (dan 12 user lainnya) | password | Lihat UserSeeder |

---

## Commit History

| # | Commit Message | Progress |
|---|----------------|----------|
| 1 | feat(back-end): add Auth & User API controllers with Sanctum routes | 10% |
| 2 | feat(back-end): configure CORS, Sanctum, and API middleware | 20% |
| 3 | feat(back-end): add migrations and user seeders | 30% |
| 4 | feat(front-end): add axios, react-router-dom, and API service | 40% |
| 5 | feat(front-end): implement authentication context | 50% |
| 6 | feat(front-end): add Login and Register pages | 60% |
| 7 | feat(front-end): add user list page with pagination | 70% |
| 8 | feat(front-end): add user detail page | 80% |
| 9 | feat(front-end): implement protected routes and navigation auth state | 90% |
| 10 | style(front-end): responsive design and final integration polish | 100% |

---

## Kesimpulan

Proyek ini menunjukkan implementasi fullstack modern dengan:
- **Back-End**: RESTful API yang aman dengan token-based authentication
- **Front-End**: SPA dengan state management, routing, dan responsive design
- **Integration**: Seamless connection antara frontend dan backend dengan proper error handling
- **UX**: User experience yang polished dengan loading states, validation, dan feedback

Total fitur: **5 fitur utama** (milestone) + **15 fitur tambahan** = **20 fitur lengkap**.

