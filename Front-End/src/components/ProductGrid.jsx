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
      <div className="animate-pulse bg-frag-border" style={{ height: 220 }} />
      <div className="p-4 space-y-2">
        <div className="animate-pulse bg-frag-border rounded h-3 w-2/3" />
        <div className="animate-pulse bg-frag-border rounded h-4 w-full" />
        <div className="animate-pulse bg-frag-border rounded h-3 w-1/2" />
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
      className="bg-white rounded-2xl border border-frag-border overflow-hidden cursor-pointer group"
      style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#EDE9E1]" style={{ height: 220 }}>
        {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-frag-border" />}
        <img
          src={imgError ? fallback : product.image}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => { setImgError(true); setImgLoaded(true); }}
          className="w-full h-full object-contain transition-all duration-500 group-hover:scale-105"
          style={{ opacity: imgLoaded ? 1 : 0 }}
        />
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ background: product.badgeColor }}>
            {product.badge}
          </div>
        )}
        {/* Stock warning */}
        {product.stock <= 10 && (
          <div className="absolute top-3 right-3 bg-red-50 text-red-600 text-[10px] font-semibold px-2 py-1 rounded-full border border-red-100">
            Only {product.stock} left
          </div>
        )}
        {/* Quick View overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="px-4 py-2 rounded-full text-frag-dark text-xs font-medium flex items-center gap-2 border border-frag-border"
            style={{ background: 'rgba(243,240,233,0.92)', backdropFilter: 'blur(8px)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" strokeLinecap="round"/>
            </svg>
            Quick View
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] tracking-[0.1em] text-frag-gray uppercase mb-1 truncate">{product.brand}</p>
        <h3 className="text-sm font-medium text-frag-dark mb-2 line-clamp-1" style={{ fontFamily: 'Georgia, serif' }}>
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <Stars rating={product.rating} />
          <span className="text-[10px] text-frag-gray">({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-medium text-frag-dark" style={{ fontFamily: 'Georgia, serif' }}>
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-frag-gray line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          {product.originalPrice && (
            <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              {Math.round((1 - product.price / product.originalPrice) * 100)}% off
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
