import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductsByCategory } from '../data/productsData';
import { useAuth } from '../hooks/useAuth';
import AuthGateModal from './AuthGateModal';
import ProductDetailOverlay from './ProductDetailOverlay';

// ── Skeleton Card ────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-frag-border overflow-hidden">
      <div className="animate-pulse bg-gray-100 aspect-[4/5]" />
      <div className="p-5 flex flex-col items-center space-y-3">
        <div className="animate-pulse bg-gray-200 rounded h-2 w-1/3" />
        <div className="animate-pulse bg-gray-200 rounded h-4 w-3/4" />
        <div className="animate-pulse bg-gray-200 rounded h-3 w-1/4" />
      </div>
    </div>
  );
}

// ── Stars ────────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 16 16"
          fill={s <= Math.round(rating) ? '#E8A838' : 'none'}
          stroke={s <= Math.round(rating) ? 'none' : '#D4D0C8'} strokeWidth="1.2">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z"/>
        </svg>
      ))}
    </div>
  );
}

// ── Product Card ─────────────────────────────────────────────────────────
function ProductCard({ product, onQuickView }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const fallback = 'https://images.unsplash.com/photo-1616489953149-8f6f598c199e?q=80&w=800&auto=format&fit=crop';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.11)' }}
      transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      onClick={() => onQuickView(product)}
      className="bg-white rounded-2xl border border-frag-border overflow-hidden cursor-pointer group flex flex-col"
      style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/5] flex items-center justify-center">
        {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-gray-100" />}
        <img
          src={imgError ? fallback : product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />
        {/* Minimalist Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <div className="bg-[#1A1A1A]/90 backdrop-blur-md text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-sm"
              style={{ background: product.badgeColor === '#C9A96E' ? 'rgba(201,169,110,0.95)' : 'rgba(26,26,26,0.95)' }}>
              {product.badge}
            </div>
          )}
          {product.stock <= 10 && (
            <div className="bg-[#8C2B2B]/90 backdrop-blur-md text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm shadow-sm">
              Only {product.stock} left
            </div>
          )}
        </div>
        
        {/* Quick View overlay */}
        <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pb-6">
          <div className="px-6 py-2.5 rounded-full text-frag-dark text-xs font-semibold uppercase tracking-widest flex items-center gap-2 border border-[#E5E1D8] shadow-lg transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0"
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', fontFamily: "'Inter', sans-serif" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" strokeLinecap="round"/>
            </svg>
            Quick View
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col items-center flex-1 justify-between text-center bg-white">
        <div className="w-full">
          <p className="text-[10px] tracking-[0.15em] font-medium text-frag-gray uppercase mb-1.5 truncate font-sans">
            {product.brand || product.category?.replace('-', ' ')}
          </p>
          <h3 className="text-[15px] font-medium text-frag-dark mb-2.5 line-clamp-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {product.name}
          </h3>
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <Stars rating={product.rating} />
            <span className="text-[10px] text-frag-gray font-sans">({product.reviewCount.toLocaleString()})</span>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-2.5">
          <span className="text-sm font-medium text-frag-dark font-sans tracking-wide">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-frag-gray line-through font-sans">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Sort Options ─────────────────────────────────────────────────────────
const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];

function sortProducts(products, sort) {
  const arr = [...products];
  if (sort === 'price-asc')  return arr.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') return arr.sort((a, b) => b.price - a.price);
  if (sort === 'rating')     return arr.sort((a, b) => b.rating - a.rating);
  return arr;
}

// ── ProductGrid ──────────────────────────────────────────────────────────
export default function ProductGrid({ category }) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAuthGate, setShowAuthGate] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);

  // Simulate async load
  useEffect(() => {
    setLoading(true);
    setProducts([]);
    const timer = setTimeout(() => {
      setProducts(getProductsByCategory(category));
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [category]);

  const handleQuickView = (product) => setSelectedProduct(product);

  const handleAddToCart = (product) => {
    // Validate token each time
    const token = localStorage.getItem('token');
    if (!token || !isAuthenticated) {
      setPendingProduct(product);
      setShowAuthGate(true);
      return;
    }
    // Already authenticated → open overlay
    setSelectedProduct(product);
  };

  const sorted = sortProducts(products, sort);

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <p className="text-sm text-frag-gray">
          {loading ? 'Loading…' : `${sorted.length} product${sorted.length !== 1 ? 's' : ''}`}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-frag-gray tracking-wider">Sort by:</label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs border border-frag-border rounded-full px-3 py-1.5 bg-white text-frag-dark outline-none hover:border-frag-dark transition-colors cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-5"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
      >
        <AnimatePresence mode="popLayout">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)
            : sorted.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={handleQuickView}
                />
              ))
          }
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {!loading && sorted.length === 0 && (
        <div className="text-center py-20">
          <p className="text-frag-gray text-sm">No products found in this category.</p>
        </div>
      )}

      {/* Product Detail Overlay */}
      {selectedProduct && (
        <ProductDetailOverlay
          product={selectedProduct}
          layoutId={`grid-${selectedProduct.id}`}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Auth Gate Modal */}
      {showAuthGate && (
        <AuthGateModal
          returnPath={window.location.pathname}
          onClose={() => { setShowAuthGate(false); setPendingProduct(null); }}
        />
      )}
    </div>
  );
}
