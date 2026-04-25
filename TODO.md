# TODO - Back-End & Front-End Integration

## Phase 1: Back-End Foundation (0% - 40%)
- [x] Commit 1 – Back-End Core API (Controllers & Routes)
  - Verify/finalize AuthController.php, UserController.php, api.php, User.php
  - Push: "feat(back-end): add Auth & User API controllers with Sanctum routes"
- [x] Commit 2 – Back-End Configuration & CORS
  - Finalize bootstrap/app.php, config/cors.php, publish sanctum config
  - Push: "feat(back-end): configure CORS, Sanctum, and API middleware"
- [x] Commit 3 – Database Migration & Seeders
  - Verify migrations, UserSeeder.php, DatabaseSeeder.php
  - Push: "feat(back-end): add migrations and user seeders"

## Phase 2: Front-End Setup (40% - 55%)
- [x] Commit 4 – Install Dependencies & API Service
  - Install react-router-dom, axios
  - Create src/services/api.js
  - Push: "feat(front-end): add axios, react-router-dom, and API service"
- [x] Commit 5 – Auth Context (Global State)
  - Create src/context/AuthContext.jsx
  - Push: "feat(front-end): implement authentication context"

## Phase 3: Front-End Pages (55% - 85%)
- [x] Commit 6 – Login & Register Pages
  - Create src/pages/Login.jsx, src/pages/Register.jsx
  - Push: "feat(front-end): add Login and Register pages"
- [x] Commit 7 – User List Page (Home) with Pagination
  - Create src/pages/UserList.jsx
  - Push: "feat(front-end): add user list page with pagination"
- [x] Commit 8 – User Detail Page
  - Create src/pages/UserDetail.jsx
  - Push: "feat(front-end): add user detail page"

## Phase 4: Integration & Routing (85% - 100%)
- [x] Commit 9 – Protected Routes & App Router
  - Rewrite App.jsx with BrowserRouter, Routes, ProtectedRoute
  - Update Navbar.jsx for auth state
  - Push: "feat(front-end): implement protected routes and navigation auth state"
- [x] Commit 10 – Responsive Design Polish & Final Integration
  - Ensure all pages responsive
  - Final test integration
  - Push: "style(front-end): responsive design and final integration polish"

## Follow-up Steps
- [ ] Run composer install + php artisan migrate:fresh --seed in Back-End
- [ ] Run php artisan serve (port 8000)
- [ ] Run npm run dev in Front-End (port 5173)
- [ ] Test end-to-end integration

