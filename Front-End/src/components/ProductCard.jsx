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
        whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.12)' }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        onClick={() => setOpen(true)}
        className="bg-white rounded-2xl border border-frag-border overflow-hidden cursor-pointer group"
        style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-[#EDE9E1]" style={{ height: 220 }}>
          {/* Skeleton */}
          {!imgLoaded && (
            <div className="absolute inset-0 animate-pulse bg-frag-border" />
          )}
          <motion.img
            layoutId={layoutId}
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            style={{ opacity: imgLoaded ? 1 : 0 }}
          />
          {/* Badge */}
          {product.badge && (
            <div
              className="absolute top-3 left-3 text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full"
              style={{ background: product.badgeColor }}
            >
              {product.badge}
            </div>
          )}
          {/* Quick view hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="bg-white/90 backdrop-blur-sm text-frag-dark text-xs font-medium px-4 py-2 rounded-full border border-frag-border flex items-center gap-2"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" strokeLinecap="round"/>
              </svg>
              Quick View
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-[10px] tracking-[0.12em] text-frag-gray uppercase mb-1 truncate">
            {product.tagline}
          </p>
          <h3 className="text-base font-medium text-frag-dark mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-[10px] text-frag-gray">({product.reviewCount.toLocaleString()})</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-medium text-frag-dark" style={{ fontFamily: 'Georgia, serif' }}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-frag-gray line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
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
