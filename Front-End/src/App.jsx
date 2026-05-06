import { Routes, Route } from 'react-router-dom';
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
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Protected ── */}


        {/* ── Dynamic Info Pages (/info/:slug) ── */}
        <Route path="/info/:slug" element={<ContentDetailView />} />

        {/* ── Shop / Marketplace ── */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* ── 404 ── */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
