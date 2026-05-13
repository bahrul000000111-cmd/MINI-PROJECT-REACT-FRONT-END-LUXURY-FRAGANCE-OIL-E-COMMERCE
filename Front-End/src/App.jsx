import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import StatsSection from './components/StatsSection';
import ShopByHotel from './components/ShopByHotel';
import ComparisonSection from './components/ComparisonSection';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';

import ProtectedRoute from './components/ProtectedRoute';
import ContentDetailView from './pages/ContentDetailView';
import NotFoundPage from './pages/NotFoundPage';
import ProductShowcase from './components/ProductShowcase';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';

function LandingPage() {
  return (
    <>
      <Hero />
      <ProductShowcase />
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
      <ScrollToTop />
      <Navbar />

      {/* Global Toast Notifications — dark luxury theme */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#ffffff',
            borderRadius: '100px',
            fontSize: '11px',
            letterSpacing: '0.05em',
            fontFamily: "'Inter', sans-serif",
          },
        }}
      />

      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Dynamic Info Pages (/info/:slug) ── */}
        <Route path="/info/:slug" element={<ContentDetailView />} />

        {/* ── Shop / Marketplace ── */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />

        {/* ── 404 ── */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
