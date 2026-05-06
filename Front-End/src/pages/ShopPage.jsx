import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, SlidersHorizontal, X } from 'lucide-react';
import { getByCategory, MAX_PRICE } from '../data/products';
import { useAuth } from '../hooks/useAuth';
import FilterPanel from '../components/FilterPanel';
import AuthGateModal from '../components/AuthGateModal';
import ProductDetailOverlay from '../components/ProductDetailOverlay';
import Footer from '../components/Footer';

// ── Constants ────────────────────────────────────────────────────────────
const CATS = [
  { slug: 'all',                 label: 'All'               },
  { slug: 'scent-diffusers',     label: 'Scent Diffusers'   },
  { slug: 'signature-oils',      label: 'Signature Oils'    },
  { slug: 'designer-collection', label: 'Designer'          },
  { slug: 'perfumes',            label: 'Perfumes'          },
  { slug: 'gift-sets',           label: 'Gift Sets'         },
];

const SORT_OPTIONS = [
  { v: 'featured',    l: 'Featured'          },
  { v: 'price-asc',  l: 'Price: Low → High' },
  { v: 'price-desc', l: 'Price: High → Low' },
  { v: 'rating',     l: 'Top Rated'          },
  { v: 'newest',     l: 'Newest'             },
];

const DEFAULT_FILTERS = { priceMin: 0, priceMax: MAX_PRICE, brands: [], minRating: null };

// ── Star row ─────────────────────────────────────────────────────────────
function Stars({ r }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="10" height="10" viewBox="0 0 16 16"
          fill={s <= Math.round(r) ? '#E8A838' : 'none'}
          stroke={s <= Math.round(r) ? 'none' : '#D4D0C8'} strokeWidth="1.2">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z"/>
        </svg>
      ))}
    </div>
  );
}

// ── Product Card ─────────────────────────────────────────────────────────
function PCard({ p, onView, onCart, wishlist, toggleWish }) {
  const [loaded, setLoaded] = useState(false);
  const [err, setErr] = useState(false);
  const fallback = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop';
  const wished = wishlist.includes(p.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', damping: 22, stiffness: 260 }}
      className="bg-white rounded-xl border border-frag-border overflow-hidden cursor-pointer group relative"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-gray-50 aspect-[4/5] flex items-center justify-center"
        onClick={() => onView(p)}
      >
        {!loaded && <div className="absolute inset-0 animate-pulse bg-frag-border" />}
        <img
          src={err ? fallback : p.images[0]}
          alt={p.name}
          loading="lazy"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => { setErr(true); setLoaded(true); }}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          style={{ opacity: loaded ? 1 : 0 }}
        />

        {/* Tag badge */}
        {p.tags && (
          <div
            className="absolute top-2 left-2 text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{ background: p.tags === 'Limited Edition' ? '#C9A96E' : '#1A1A1A' }}
          >
            {p.tags}
          </div>
        )}

        {/* Low stock */}
        {p.stock <= 8 && (
          <div className="absolute top-2 right-10 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
            {p.stock} left
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          <button
            onClick={(e) => { e.stopPropagation(); toggleWish(p.id); }}
            className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm border border-frag-border flex items-center justify-center hover:bg-frag-dark hover:text-white hover:border-frag-dark transition-all"
          >
            <Heart size={12} fill={wished ? '#E8A838' : 'none'} stroke={wished ? '#E8A838' : 'currentColor'} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onCart(p); }}
            className="w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm border border-frag-border flex items-center justify-center hover:bg-frag-dark hover:text-white hover:border-frag-dark transition-all"
          >
            <ShoppingBag size={12} />
          </button>
        </div>

        {/* Quick view gradient */}
        <div className="absolute inset-x-0 bottom-0 h-10 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'linear-gradient(to top, rgba(26,26,26,0.5), transparent)' }}>
          <span className="text-white text-[10px] font-medium tracking-wider">Quick View</span>
        </div>

        {/* Discount badge */}
        {p.originalPrice && (
          <div className="absolute bottom-2 left-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
            -{Math.round((1 - p.price / p.originalPrice) * 100)}%
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3" onClick={() => onView(p)}>
        <p className="text-[9px] text-frag-gray uppercase tracking-wider mb-0.5 truncate">{p.brand}</p>
        <h3 className="text-xs font-medium text-frag-dark mb-1.5 line-clamp-1" style={{ fontFamily: 'Georgia, serif' }}>
          {p.name}
        </h3>
        <Stars r={p.rating} />
        <div className="flex items-baseline justify-between mt-1.5">
          <span className="text-sm font-semibold text-frag-dark" style={{ fontFamily: 'Georgia, serif' }}>
            ${p.price}
          </span>
          {p.originalPrice && (
            <span className="text-[10px] text-frag-gray line-through">${p.originalPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Skeleton ─────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="bg-white rounded-xl border border-frag-border overflow-hidden">
      <div className="animate-pulse bg-frag-border" style={{ height: 200 }} />
      <div className="p-3 space-y-2">
        <div className="animate-pulse bg-frag-border rounded h-2 w-1/2" />
        <div className="animate-pulse bg-frag-border rounded h-3 w-3/4" />
        <div className="animate-pulse bg-frag-border rounded h-3 w-1/3" />
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────
export default function ShopPage() {
  const { category = 'all' } = useParams();
  const { isAuthenticated } = useAuth();

  const [filters, setFilters]         = useState(DEFAULT_FILTERS);
  const [sort, setSort]               = useState('featured');
  const [loading]                     = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedP, setSelectedP]     = useState(null);
  const [authGate, setAuthGate]       = useState(false);
  const [wishlist, setWishlist]       = useState([]);

  const base = useMemo(() => getByCategory(category === 'all' ? null : category), [category]);

  const filtered = useMemo(() => {
    let arr = base.filter((p) => {
      if (p.price < filters.priceMin || p.price > filters.priceMax) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (filters.minRating && p.rating < filters.minRating) return false;
      return true;
    });
    if (sort === 'price-asc')  arr = [...arr].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') arr = [...arr].sort((a, b) => b.price - a.price);
    if (sort === 'rating')     arr = [...arr].sort((a, b) => b.rating - a.rating);
    return arr;
  }, [base, filters, sort]);

  const toggleWish = (id) =>
    setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);

  const handleCart = (p) => {
    if (!isAuthenticated && !localStorage.getItem('token')) {
      setAuthGate(true);
    } else {
      setSelectedP(p);
    }
  };

  const activeCat = CATS.find((c) => c.slug === category) ?? CATS[0];

  return (
    <div className="bg-frag-cream min-h-screen" style={{ paddingTop: 64 }}>

      {/* ── Dark Hero Banner ── */}
      <div className="bg-frag-dark text-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[10px] tracking-[0.22em] text-white/40 uppercase mb-2">Frägra Marketplace</p>
            <h1 className="text-3xl md:text-4xl font-normal" style={{ fontFamily: 'Georgia, serif' }}>
              {activeCat.label}
            </h1>
            <p className="text-white/50 text-xs mt-1">{base.length} products in this category</p>
          </div>
          {wishlist.length > 0 && (
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
              <Heart size={13} fill="#E8A838" stroke="#E8A838" />
              <span className="text-xs text-white/70">{wishlist.length} saved</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="bg-white border-b border-frag-border sticky top-16 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 py-2.5 overflow-x-auto no-scrollbar">
            {CATS.map((c) => {
              const active = c.slug === category || (c.slug === 'all' && category === 'all');
              return (
                <Link
                  key={c.slug}
                  to={`/shop/${c.slug}`}
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                  style={{
                    background: active ? '#1A1A1A' : 'transparent',
                    color: active ? 'white' : '#717171',
                    border: active ? 'none' : '1px solid #E5E1D8',
                  }}
                >
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-6">

          {/* Sidebar — desktop */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <FilterPanel filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                {/* Mobile filter button */}
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 text-xs border border-frag-border rounded-full px-3 py-1.5 bg-white hover:border-frag-dark transition-colors"
                >
                  <SlidersHorizontal size={12} />
                  Filters
                </button>
                <span className="text-xs text-frag-gray">
                  {filtered.length} of {base.length} products
                </span>
                {/* Active filter chips */}
                {filters.brands.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {filters.brands.map((b) => (
                      <span key={b} className="flex items-center gap-1 text-[10px] bg-frag-dark text-white px-2 py-0.5 rounded-full">
                        {b.split(' ').slice(-1)[0]}
                        <button onClick={() => setFilters((f) => ({ ...f, brands: f.brands.filter((x) => x !== b) }))}>
                          <X size={8} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs border border-frag-border rounded-full px-3 py-1.5 bg-white text-frag-dark outline-none hover:border-frag-dark transition-colors cursor-pointer"
              >
                {SORT_OPTIONS.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
              </select>
            </div>

            {/* Grid — dense 2/3/4/5 cols */}
            <motion.div
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: 14,
              }}
            >
              <AnimatePresence mode="popLayout">
                {loading
                  ? Array.from({ length: 10 }).map((_, i) => <Skeleton key={`sk-${i}`} />)
                  : filtered.map((p) => (
                      <PCard
                        key={p.id}
                        p={p}
                        onView={setSelectedP}
                        onCart={handleCart}
                        wishlist={wishlist}
                        toggleWish={toggleWish}
                      />
                    ))
                }
              </AnimatePresence>
            </motion.div>

            {!loading && filtered.length === 0 && (
              <div className="text-center py-24 text-frag-gray text-sm">
                No products match your filters.{' '}
                <button onClick={() => setFilters(DEFAULT_FILTERS)} className="underline hover:text-frag-dark">
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[50] bg-black/40"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 z-[60] w-72 bg-frag-cream overflow-y-auto p-5"
              initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-medium text-frag-dark tracking-widest uppercase">Filters</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <X size={16} className="text-frag-gray hover:text-frag-dark transition-colors" />
                </button>
              </div>
              <FilterPanel filters={filters} onChange={setFilters} onReset={() => { setFilters(DEFAULT_FILTERS); setSidebarOpen(false); }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Overlay */}
      {selectedP && (
        <ProductDetailOverlay
          product={selectedP}
          layoutId={`shop-${selectedP.id}`}
          onClose={() => setSelectedP(null)}
        />
      )}

      {/* Auth Gate */}
      {authGate && (
        <AuthGateModal
          returnPath={window.location.pathname}
          onClose={() => setAuthGate(false)}
        />
      )}

      <Footer />
    </div>
  );
}
