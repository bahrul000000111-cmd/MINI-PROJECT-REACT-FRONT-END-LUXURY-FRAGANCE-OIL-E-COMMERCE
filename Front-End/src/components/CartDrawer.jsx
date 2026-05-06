import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartProvider';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
      />
      <motion.div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-medium text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>Shopping Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p>Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const imageSrc = item.product.images ? item.product.images[0] : item.product.image;
              return (
                <div key={item.product.id} className="flex gap-4 items-center">
                  <div className="w-20 h-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                    <img 
                      src={imageSrc} 
                      alt={item.product.name} 
                      className="w-full h-full object-contain p-2"
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{item.product.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">${item.product.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-gray-200 rounded-full h-8 w-24">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex-1 flex justify-center text-gray-500 hover:text-black transition-colors"
                        >−</button>
                        <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex-1 flex justify-center text-gray-500 hover:text-black transition-colors"
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs text-gray-400 hover:text-red-500 underline transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-gray-600">Subtotal</span>
              <span className="text-lg font-medium text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
            <button className="w-full py-4 bg-[#1A1A1A] hover:bg-black text-white rounded-full font-medium tracking-wide transition-colors flex items-center justify-center gap-2">
              Checkout Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
