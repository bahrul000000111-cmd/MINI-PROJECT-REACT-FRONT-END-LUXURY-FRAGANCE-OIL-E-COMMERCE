import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductDetailOverlay from './ProductDetailOverlay';

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 16 16"
          fill={s <= Math.round(rating) ? '#E8A838' : 'none'}
          stroke={s <= Math.round(rating) ? 'none' : '#D4D0C8'}
          strokeWidth="1.2">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const layoutId = `product-img-${product.id}`;

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.11)' }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        onClick={() => setOpen(true)}
        className="bg-white rounded-2xl border border-frag-border overflow-hidden cursor-pointer group flex flex-col"
        style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50 aspect-[4/5] flex items-center justify-center">
          {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-gray-100" />}
          <motion.img
            layoutId={layoutId}
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
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
              {product.tagline || product.brand || product.category?.replace('-', ' ')}
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
