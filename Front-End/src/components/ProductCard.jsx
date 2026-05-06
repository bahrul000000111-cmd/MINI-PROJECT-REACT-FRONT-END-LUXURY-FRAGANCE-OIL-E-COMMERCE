import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import ProductDetailOverlay from './ProductDetailOverlay';
import { CartContext } from '../context/CartProvider';

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
  const [imgErr, setImgErr] = useState(false);
  const { addToCart } = useContext(CartContext);
  
  const fallbackImg = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop';
  const layoutId = `product-img-${product.id}`;
  const imageSrc = product.images ? product.images[0] : product.image;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <>
      {/* ── Card ── */}
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
        transition={{ type: 'spring', damping: 22, stiffness: 260 }}
        onClick={() => setOpen(true)}
        className="bg-white rounded-xl overflow-hidden cursor-pointer group flex flex-col transition-all duration-300"
        style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-50 aspect-[4/5] flex items-center justify-center">
          {!imgLoaded && <div className="absolute inset-0 animate-pulse bg-gray-100" />}
          <motion.img
            layoutId={layoutId}
            src={imgErr ? fallbackImg : imageSrc}
            alt={product.name}
            loading="lazy"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgErr(true); setImgLoaded(true); }}
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
          
          {/* Quick Add overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={handleQuickAdd}
              className="w-full py-2.5 bg-white/95 backdrop-blur text-frag-dark text-xs font-medium tracking-wide border border-gray-200 rounded shadow-lg hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              + Quick Add
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col items-center flex-1 justify-between text-center bg-white">
          <div className="w-full">
            <p className="text-[10px] tracking-[0.15em] font-medium text-frag-gray uppercase mb-1.5 truncate font-sans">
              {product.tagline || product.brand || product.category?.replace('-', ' ')}
            </p>
            <h3 className="text-sm font-medium text-frag-dark mb-2.5 line-clamp-1" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
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
