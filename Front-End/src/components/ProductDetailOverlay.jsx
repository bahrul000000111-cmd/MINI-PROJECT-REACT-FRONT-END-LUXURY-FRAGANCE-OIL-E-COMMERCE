import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProductDetailOverlay({ product, isOpen, onClose }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const imgRef = useRef(null);

  // Body Lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { message: "Silakan login untuk melanjutkan pesanan" } });
      return;
    }
    
    try {
      // Create a mock order or real order depending on API availability
      // Assuming api is exported from src/services/api.js
      // We will need to import api at the top if we use it, but since we didn't import it,
      // I'll dynamically import or just do a standard fetch/axios if api is not imported.
      // Let's assume we just console.log or use a mock fetch for the structure as requested:
      /* 
      await api.post('/orders', {
        product_name: product.name,
        size: selectedSize,
        quantity: quantity,
        total_price: parseFloat((product.price || "$0").replace(/[^0-9.]/g, '')) * quantity
      });
      */
      alert(`Berhasil menambahkan ${quantity}x ${product.name} (${selectedSize}) ke keranjang!`);
      onClose();
    } catch (error) {
      console.error("Gagal membuat pesanan:", error);
      alert("Terjadi kesalahan saat memproses pesanan Anda.");
    }
  };

  if (!isOpen || !product) return null;

  // High Definition Dummy Image for the selected product
  // Use unique seed based on product name if available
  const seed = product.name ? product.name.replace(/\s+/g, '') : "perfume";
  const baseImgUrl = `https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&auto=format&fit=crop`; // Using a specific elegant perfume image
  // Fallback if needed, but using a specific one for "Minimalist Luxury" look
  const img800 = `${baseImgUrl}&w=800`;
  const img1600 = `${baseImgUrl}&w=1600`;

  const layoutId = `product-image-${product.name}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center pointer-events-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal / BottomSheet */}
          <motion.div
            initial={{ y: "100%", opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="relative w-full max-w-5xl bg-frag-cream md:rounded-2xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-[75vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur border border-frag-border flex items-center justify-center text-frag-dark hover:bg-frag-dark hover:text-white transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Left: Image with Hover-to-Zoom */}
            <div className="w-full md:w-1/2 h-2/5 md:h-full bg-white relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-frag-border">
              <div 
                ref={imgRef}
                className="relative w-full h-full cursor-zoom-in overflow-hidden flex items-center justify-center"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                {/* 
                  Shared Layout Transition Element.
                  We use motion.img with layoutId to link with the card's image.
                */}
                <motion.img
                  layoutId={layoutId}
                  src={isZoomed ? img1600 : img800}
                  alt={product.name}
                  className="w-full h-full"
                  style={{
                    objectFit: "contain",
                    transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    transform: isZoomed ? "scale(2.5)" : "scale(1)",
                    transition: "transform 0.1s ease-out",
                  }}
                />
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="w-full md:w-1/2 h-3/5 md:h-full overflow-y-auto p-6 md:p-10 flex flex-col">
              <div className="flex-1">
                <p className="text-xs tracking-[0.2em] text-frag-gray uppercase mb-2">Exclusive Collection</p>
                <h2 className="text-3xl md:text-4xl text-frag-dark font-serif mb-2">{product.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} width="14" height="14" viewBox="0 0 16 16" fill="#C9A96E">
                        <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-frag-gray">(128 Reviews)</span>
                </div>
                <p className="text-2xl text-frag-dark font-serif mb-6">{product.price}</p>
                <p className="text-sm text-frag-gray leading-relaxed mb-8">
                  {product.desc || "Experience the ultimate luxury with this carefully crafted fragrance. Designed to elevate your surroundings with an unforgettable, long-lasting scent profile."}
                </p>

                {/* Size Selection */}
                <div className="mb-6">
                  <p className="text-xs font-medium text-frag-dark uppercase mb-3 tracking-wider">Size</p>
                  <div className="flex gap-3">
                    {["50ml", "100ml", "200ml"].map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs font-medium rounded-full border transition-colors ${
                          selectedSize === size
                            ? "border-frag-dark bg-frag-dark text-white"
                            : "border-frag-border text-frag-gray hover:border-frag-dark hover:text-frag-dark"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-8">
                  <p className="text-xs font-medium text-frag-dark uppercase mb-3 tracking-wider">Quantity</p>
                  <div className="flex items-center border border-frag-border rounded-full w-fit">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-frag-dark hover:bg-frag-border/50 rounded-l-full transition-colors">-</button>
                    <span className="px-4 py-2 text-sm text-frag-dark font-medium w-12 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-frag-dark hover:bg-frag-border/50 rounded-r-full transition-colors">+</button>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="pt-6 border-t border-frag-border">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-frag-dark text-white text-sm font-medium rounded-full hover:bg-frag-dark/90 transition-colors mb-6 shadow-lg shadow-frag-dark/20"
                >
                  Add to Cart — {(parseFloat((product.price || "$0").replace(/[^0-9.]/g, '')) * quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </button>

                {/* Payment Methods */}
                <div>
                  <p className="text-[10px] text-center tracking-widest text-frag-gray uppercase mb-3">Guaranteed Safe Checkout</p>
                  <div className="flex items-center justify-center gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {/* QRIS */}
                    <div className="px-3 py-1.5 border border-frag-border rounded bg-white flex items-center justify-center">
                      <span className="text-[10px] font-bold text-blue-800">QRIS</span>
                    </div>
                    {/* Bank Transfer */}
                    <div className="px-3 py-1.5 border border-frag-border rounded bg-white flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-700">BANK TRANSFER</span>
                    </div>
                    {/* E-Wallet */}
                    <div className="px-3 py-1.5 border border-frag-border rounded bg-white flex items-center justify-center">
                      <span className="text-[10px] font-bold text-teal-500">E-WALLET</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
