import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import StatsSection from './components/StatsSection';
import ShopByHotel from './components/ShopByHotel';
import ComparisonSection from './components/ComparisonSection';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import UserDetail from './pages/UserDetail';
import ProtectedRoute from './components/ProtectedRoute';
import GeneralContentPage from './pages/GeneralContentPage';

function LandingPage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ComparisonSection />
      <StatsSection />
      <ShopByHotel />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <UserDetail />
            </ProtectedRoute>
          }
        />

        {/* ── Dynamic Content Pages ── */}
        <Route path="/shop-now" element={<GeneralContentPage />} />
        <Route path="/shop-all" element={<GeneralContentPage />} />
        <Route path="/scent-diffusers" element={<GeneralContentPage />} />
        <Route path="/hotel-collection" element={<GeneralContentPage />} />
        <Route path="/designer-collection" element={<GeneralContentPage />} />
        <Route path="/perfumes" element={<GeneralContentPage />} />
        <Route path="/about-us" element={<GeneralContentPage />} />
        <Route path="/contact" element={<GeneralContentPage />} />
        <Route path="/privacy-policy" element={<GeneralContentPage />} />
        <Route path="/terms-of-service" element={<GeneralContentPage />} />
        <Route path="/cookie-policy" element={<GeneralContentPage />} />
        <Route path="/faq" element={<GeneralContentPage />} />
        <Route path="/shipping" element={<GeneralContentPage />} />
        <Route path="/gift-sets" element={<GeneralContentPage />} />

        {/* Catch-all for unknown pages → Coming Soon */}
        <Route path="*" element={<GeneralContentPage />} />
      </Routes>
    </>
  );
}

export default App;
