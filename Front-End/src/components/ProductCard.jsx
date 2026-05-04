import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductDetailOverlay from './ProductDetailOverlay';

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 16 16"
          fill={s <= Math.round(rating) ? '#E8A838' : 'none'}
          stroke={s <= Math.round(rating) ? 'none' : '#D4D0C8'}
          strokeWidth="1.2">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z"/>
        </svg>
      ))}
    </div>
  );
}

// Helper to translate english badges to Indonesian
const translateBadge = (badgeText) => {
  if (!badgeText) return null;
  const lower = badgeText.toLowerCase();
  if (lower.includes('best seller')) return 'Terlaris';
  if (lower.includes('new')) return 'Baru';
  if (lower.includes('limited')) return 'Terbatas';
  if (lower.includes('top rated')) return 'Pilihan Utama';
  return badgeText;
};

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const layoutId = `product-img-${product.id}`;

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        onClick={() => setOpen(true)}
        className="bg-white rounded-2xl border border-transparent hover:border-[#E5E1D8] overflow-hidden cursor-pointer group flex flex-col h-full"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'box-shadow 0.4s ease, border-color 0.4s ease' }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.12)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)'}
      >
        {/* Image Area */}
        <div className="relative overflow-hidden bg-[#FAFAF8] p-4 flex items-center justify-center flex-shrink-0" style={{ height: 260 }}>
          {/* Skeleton */}
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-[#F3F0E9]" />
          )}
          <motion.img
            layoutId={layoutId}
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ opacity: imgLoaded ? 1 : 0 }}
          />
          
          {/* Badge */}
          {product.badge && (
            <div
              className="absolute top-4 left-4 text-white text-[10px] font-sans font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full shadow-sm z-10"
              style={{ background: product.badgeColor || '#C9A96E' }}
            >
              {translateBadge(product.badge)}
            </div>
          )}
          
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-10 pointer-events-none">
            <div
              className="bg-white/95 backdrop-blur-md text-[#1A1A1A] font-sans text-xs font-semibold px-5 py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" strokeLinecap="round"/>
              </svg>
              Pratinjau
            </div>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-6 flex flex-col flex-1 bg-white">
          <p className="font-sans text-[10px] font-medium tracking-[0.15em] text-[#C9A96E] uppercase mb-2 line-clamp-1">
            {product.tagline}
          </p>
          <h3 className="font-serif text-lg text-[#1A1A1A] mb-3 leading-snug group-hover:text-[#C9A96E] transition-colors duration-300">
            {product.name}
          </h3>
          
          <div className="mt-auto flex items-end justify-between">
            <div className="flex flex-col gap-1.5">
              <Stars rating={product.rating} />
              <span className="font-sans text-[11px] text-[#888]">({product.reviewCount.toLocaleString()} Ulasan)</span>
            </div>
            <div className="flex flex-col items-end gap-0.5">
              {product.originalPrice && (
                <span className="font-sans text-[12px] text-[#A09D96] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="font-serif text-xl text-[#1A1A1A]">
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Overlay ── */}
      {open && (
        <ProductDetailOverlay
          product={product}
          layoutId={layoutId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
