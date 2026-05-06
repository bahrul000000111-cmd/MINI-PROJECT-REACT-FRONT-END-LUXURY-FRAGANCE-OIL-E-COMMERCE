<?php

/*
|--------------------------------------------------------------------------
| CORS Configuration — Luxury Fragrance Oil API (VPS Backend)
|--------------------------------------------------------------------------
| Front-End di-host di Vercel. Back-End di-host di VPS Linux.
|
| allowed_origins harus mencantumkan domain Vercel Front-End secara presisi.
| Tambahkan domain baru tanpa trailing slash.
|
| FRONTEND_URL di-set di .env VPS:
|   FRONTEND_URL=https://mini-project-react-front-end-luxury-fragance-oil-e-goyy2ptnu.vercel.app
|--------------------------------------------------------------------------
*/

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    // Pattern untuk subdomain Vercel preview deployments (opsional)
    'allowed_origins_patterns' => [
        // '#^https://.*\.vercel\.app$#',  // Aktifkan jika perlu preview URLs
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 86400,

    // Gunakan false jika memakai token-based auth (Sanctum Bearer Token)
    // Gunakan true jika memakai cookie/session-based auth
    'supports_credentials' => false,
];

