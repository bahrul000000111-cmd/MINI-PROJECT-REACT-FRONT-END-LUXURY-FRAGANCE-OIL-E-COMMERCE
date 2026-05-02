import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { paymentMethods } from '../data/contentData';

// ── Star Rating ──────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 16 16"
          fill={s <= Math.round(rating) ? '#E8A838' : 'none'}
          stroke={s <= Math.round(rating) ? 'none' : '#D4D0C8'}
          strokeWidth="1.2">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z" />
        </svg>
      ))}
    </div>
  );
}

// ── Hover-to-Zoom Image ──────────────────────────────────────────────────
function ZoomImage({ src, srcHD, alt }) {
  const [zoomed, setZoomed] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [loaded, setLoaded] = useState(false);

  const handleMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border border-frag-border cursor-zoom-in"
      style={{ aspectRatio: '4/3', background: '#EDE9E1' }}
      onMouseEnter={() => setZoomed(true)}
      onMouseLeave={() => setZoomed(false)}
      onMouseMove={handleMove}
    >
      {/* Skeleton */}
      {!loaded && <div className="absolute inset-0 animate-pulse bg-frag-border rounded-xl" />}

      {/* Normal image */}
      <img
        src={src}
        alt={alt}
        loading="eager"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-contain transition-opacity duration-500"
        style={{ opacity: loaded ? (zoomed ? 0 : 1) : 0 }}
      />

      {/* HD zoom layer */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: zoomed && loaded ? 1 : 0,
          backgroundImage: `url(${srcHD})`,
          backgroundSize: '200%',
          backgroundPosition: `${pos.x}% ${pos.y}%`,
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Zoom hint */}
      {!zoomed && loaded && (
        <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 border border-frag-border">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="1.8">
            <circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" strokeLinecap="round"/>
            <path d="M8 11h6M11 8v6" strokeLinecap="round"/>
          </svg>
          <span className="text-[10px] text-frag-gray tracking-wide">Hover to zoom</span>
        </div>
      )}
    </div>
  );
}

// ── Thumbnail Strip ─────────────────────────────────────────────────────
function ThumbStrip({ images, active, onSelect }) {
  return (
    <div className="flex gap-2 mt-3">
      {images.map((img, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200"
          style={{
            width: 60, height: 60,
            borderColor: active === i ? '#1A1A1A' : '#E5E1D8',
          }}
        >
          <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  );
}

// ── Main Overlay ─────────────────────────────────────────────────────────
export default function ProductDetailOverlay({ product, layoutId, onClose }) {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] ?? '');
  const [activeImg, setActiveImg] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const allImages = product ? [product.image, ...(product.gallery || [])] : [];

  // ── Body scroll lock ──
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ── Escape key ──
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleAddToCart = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      onClose();
      navigate('/login', { state: { from: '/', message: 'Silakan login untuk melanjutkan pesanan.' } });
      return;
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  if (!product) return null;

  const currentImg = allImages[activeImg] ?? product.image;
  const currentHD  = activeImg === 0 ? product.imageHD : currentImg.replace('w=800', 'w=1600');

  return (
    <AnimatePresence>
      {/* ── Backdrop ── */}
      <motion.div
        key="backdrop"
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      {/* ── Panel — Desktop: center modal / Mobile: bottom sheet ── */}
      <motion.div
        key="panel"
        layoutId={layoutId}
        className={[
          'fixed z-[70] bg-frag-cream overflow-y-auto',
          // Mobile: bottom sheet
          'bottom-0 left-0 right-0 rounded-t-3xl max-h-[92vh]',
          // Desktop: center modal
          'md:top-1/2 md:left-1/2 md:bottom-auto md:right-auto md:-translate-x-1/2 md:-translate-y-1/2',
          'md:w-[880px] md:max-w-[95vw] md:max-h-[88vh] md:rounded-2xl',
        ].join(' ')}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.22)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Desktop slide-in from scale */}
        <motion.div
          className="hidden md:block"
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* ── Mobile drag handle ── */}
        <div className="flex justify-center pt-3 pb-1 md:hidden">
          <div className="w-10 h-1 rounded-full bg-frag-border" />
        </div>

        {/* ── Close button ── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-frag-border bg-white flex items-center justify-center hover:bg-frag-dark hover:text-white hover:border-frag-dark transition-all duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
          </svg>
        </button>

        {/* ── Content Grid ── */}
        <div className="grid md:grid-cols-2 gap-0">

          {/* Left — Image Panel */}
          <div className="p-5 md:p-7 border-b md:border-b-0 md:border-r border-frag-border">
            {/* Badge */}
            {product.badge && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[10px] font-semibold tracking-widest uppercase mb-3"
                style={{ background: product.badgeColor }}>
                {product.badge}
              </div>
            )}

            <ZoomImage
              src={currentImg}
              srcHD={currentHD}
              alt={product.name}
            />

            <ThumbStrip
              images={allImages}
              active={activeImg}
              onSelect={setActiveImg}
            />
          </div>

          {/* Right — Product Info Panel */}
          <div className="p-5 md:p-7 flex flex-col gap-5">

            {/* Name + tagline */}
            <div>
              <p className="text-[10px] tracking-[0.18em] text-frag-gray uppercase mb-1">
                {product.tagline}
              </p>
              <h2 className="text-2xl md:text-3xl font-normal text-frag-dark" style={{ fontFamily: 'Georgia, serif' }}>
                {product.name}
              </h2>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-xs text-frag-gray">
                {product.rating} <span className="text-frag-border">·</span> {product.reviewCount.toLocaleString()} reviews
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-normal text-frag-dark" style={{ fontFamily: 'Georgia, serif' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-frag-gray line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-frag-gray leading-relaxed border-t border-frag-border pt-4">
              {product.description}
            </p>

            {/* Size selector */}
            {product.sizes.length > 1 && (
              <div>
                <p className="text-xs tracking-widest text-frag-gray uppercase mb-2">Select Size</p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className="px-4 py-2 rounded-full text-sm border transition-all duration-200"
                      style={{
                        borderColor: selectedSize === s ? '#1A1A1A' : '#E5E1D8',
                        background: selectedSize === s ? '#1A1A1A' : 'white',
                        color: selectedSize === s ? 'white' : '#717171',
                        fontWeight: selectedSize === s ? 500 : 400,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <p className="text-xs tracking-widest text-frag-gray uppercase mb-2">Quantity</p>
              <div className="inline-flex items-center border border-frag-border rounded-full overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-frag-gray hover:bg-frag-cream transition-colors text-lg"
                >−</button>
                <span className="w-10 text-center text-sm font-medium text-frag-dark">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="w-9 h-9 flex items-center justify-center text-frag-gray hover:bg-frag-cream transition-colors text-lg"
                >+</button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <motion.button
              onClick={handleAddToCart}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                background: addedToCart ? '#16a34a' : '#1A1A1A',
                color: 'white',
              }}
            >
              {addedToCart ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2">
                    <path d="M2 8l4 4 8-8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round"/>
                    <path d="M3 6h18M16 10a4 4 0 01-8 0" strokeLinecap="round"/>
                  </svg>
                  Add to Cart · ${(product.price * qty).toFixed(2)}
                </>
              )}
            </motion.button>

            {/* Outline "Save for Later" */}
            <button className="w-full py-3 rounded-full text-sm font-medium text-frag-dark border border-frag-border hover:border-frag-dark hover:bg-white transition-all duration-200">
              ♡ &nbsp;Save for Later
            </button>

            {/* Payment Methods */}
            <div className="border-t border-frag-border pt-4">
              <p className="text-[10px] tracking-[0.15em] text-frag-gray uppercase mb-3">
                Accepted Payment Methods
              </p>
              <div className="grid grid-cols-5 gap-2">
                {paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    title={pm.label}
                    className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg border border-frag-border bg-white grayscale hover:grayscale-0 hover:border-frag-dark transition-all duration-200 cursor-default"
                  >
                    <span className="text-lg leading-none">{pm.icon}</span>
                    <span className="text-[9px] text-frag-gray">{pm.label}</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-frag-gray mt-2">
                🔒 Secured by 256-bit SSL encryption
              </p>
            </div>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
