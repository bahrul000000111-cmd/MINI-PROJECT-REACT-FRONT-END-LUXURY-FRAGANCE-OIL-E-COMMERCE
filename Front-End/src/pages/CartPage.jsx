import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartProvider';
import Footer from '../components/Footer';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="bg-[#F8F6F2] min-h-screen pt-24 pb-12 flex flex-col font-sans">
      <div className="max-w-5xl mx-auto px-6 w-full flex-1">
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1">Your Selection</p>
          <h1 className="text-3xl font-normal text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
            Shopping Cart
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white rounded-2xl border border-stone-100 shadow-sm"
          >
            <svg className="mx-auto mb-4 text-stone-300" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p className="text-stone-400 text-lg mb-6">Your cart is empty.</p>
            <Link to="/shop/all" className="inline-block px-8 py-3 bg-[#1A1A1A] text-white rounded-full text-sm font-medium hover:bg-black transition-colors tracking-wide">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, idx) => {
                const imageSrc = item.product.images ? item.product.images[0] : item.product.image;
                return (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="flex gap-5 items-center bg-white p-4 rounded-2xl border border-stone-100 shadow-sm"
                  >
                    <div className="w-24 h-28 bg-stone-50 rounded-xl overflow-hidden border border-stone-100 flex-shrink-0">
                      <img src={imageSrc} alt={item.product.name} className="w-full h-full object-contain p-2"
                        crossOrigin="anonymous" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-stone-800 truncate" style={{ fontFamily: 'Georgia, serif' }}>
                        {item.product.name}
                      </h3>
                      {item.product.vendorName && (
                        <div className="flex items-center gap-1 mt-0.5 mb-1">
                          <svg width="9" height="9" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="8" fill="#C9A96E" />
                            <polyline points="4.5,8.5 7,11 11.5,5.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                          </svg>
                          <span className="text-[10px] text-[#C9A96E] tracking-wide">{item.product.vendorName}</span>
                        </div>
                      )}
                      <p className="text-sm text-stone-400 mt-1">${item.product.price.toFixed(2)}</p>
                      <div className="flex items-center gap-5 mt-3">
                        <div className="flex items-center border border-stone-200 rounded-full h-9 w-28">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="flex-1 flex justify-center text-stone-400 hover:text-stone-700 transition-colors text-lg leading-none">−</button>
                          <span className="text-sm font-medium w-8 text-center text-stone-800">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="flex-1 flex justify-center text-stone-400 hover:text-stone-700 transition-colors text-lg leading-none">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)}
                          className="text-xs text-stone-400 hover:text-red-500 transition-colors underline underline-offset-2">Remove</button>
                      </div>
                    </div>
                    <div className="text-base font-medium text-stone-800 flex-shrink-0" style={{ fontFamily: 'Georgia, serif' }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-medium text-stone-800 mb-6" style={{ fontFamily: 'Georgia, serif' }}>Order Summary</h2>
                <div className="flex justify-between items-center mb-3 text-sm text-stone-500">
                  <span>Subtotal</span>
                  <span className="text-stone-800 font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-5 text-sm text-stone-500">
                  <span>Shipping</span>
                  <span className="text-stone-600">$12.00</span>
                </div>
                <div className="border-t border-stone-100 pt-4 mb-6 flex justify-between items-center">
                  <span className="text-sm font-medium text-stone-800">Total</span>
                  <span className="text-2xl font-normal text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
                    ${(cartTotal + 12).toFixed(2)}
                  </span>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 bg-[#1A1A1A] hover:bg-black text-white rounded-full font-medium tracking-widest uppercase text-xs transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Checkout Now
                </button>
                <Link to="/shop/all" className="mt-3 block text-center text-xs text-stone-400 hover:text-stone-600 transition-colors">
                  ← Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-20"><Footer /></div>
    </div>
  );
}
