<?php

/*
|--------------------------------------------------------------------------
| CORS Configuration — Luxury Fragrance Oil API (VPS Backend)
|--------------------------------------------------------------------------
| Front-End di-host di Vercel. Back-End di-host di VPS Linux.
|
| allowed_origins menggunakan env variable FRONTEND_URL yang di-set
| di file .env VPS. Jangan hardcode domain di sini.
|
| Set di .env VPS:
|   FRONTEND_URL=https://mini-project-react-front-end-luxury.vercel.app
|--------------------------------------------------------------------------
*/

return [

    /*
    |------------------------------------------------------------------
    | Paths: Route mana yang dicakup CORS middleware
    |------------------------------------------------------------------
    */
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    /*
    |------------------------------------------------------------------
    | Allowed Methods
    |------------------------------------------------------------------
    | OPTIONS wajib ada agar Preflight Request dapat direspons dengan
    | benar. Tanpa ini, browser akan memblokir semua POST/PUT/DELETE.
    */
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    /*
    |------------------------------------------------------------------
    | Allowed Origins
    |------------------------------------------------------------------
    | Menggunakan env variable agar mudah diganti tanpa ubah kode.
    | localhost:5173 = Vite dev server untuk development lokal.
    */
    'allowed_origins' => [
        env('FRONTEND_URL', 'https://mini-project-react-front-end-luxury.vercel.app'),
        'http://localhost:5173',
        'http://localhost:3000',
        'http://127.0.0.1:5173',
    ],

    /*
    |------------------------------------------------------------------
    | Allowed Origins Patterns (Regex)
    |------------------------------------------------------------------
    | Mengizinkan semua preview deployment URL dari Vercel.
    | Berguna saat testing di branch PR (preview deployments).
    */
    'allowed_origins_patterns' => [
        '#^https://mini-project-react.*\.vercel\.app$#',
    ],

    /*
    |------------------------------------------------------------------
    | Allowed Headers
    |------------------------------------------------------------------
    | 'Authorization' wajib ada untuk Bearer Token (Sanctum).
    | 'Content-Type' wajib ada untuk JSON request body.
    */
    'allowed_headers' => [
        'Content-Type',
        'Authorization',
        'Accept',
        'X-Requested-With',
        'X-XSRF-TOKEN',
        'Origin',
    ],

    /*
    |------------------------------------------------------------------
    | Exposed Headers
    |------------------------------------------------------------------
    */
    'exposed_headers' => [],

    /*
    |------------------------------------------------------------------
    | Max Age (Cache Preflight)
    |------------------------------------------------------------------
    | 86400 = 24 jam → browser tidak perlu kirim OPTIONS berulang kali.
    */
    'max_age' => 86400,

    /*
    |------------------------------------------------------------------
    | Supports Credentials
    |------------------------------------------------------------------
    | false → Token-based auth (Sanctum Bearer Token) ← DIGUNAKAN INI
    | true  → Cookie/session-based auth
    |
    | ⚠️ Jika diubah ke true, 'allowed_origins' TIDAK BOLEH mengandung
    |    wildcard atau pola terlalu lebar. Harus URL spesifik.
    */
    'supports_credentials' => false,

];
