import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartProvider';
import Footer from '../components/Footer';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);

  return (
    <div className="bg-frag-cream min-h-screen pt-24 pb-12 flex flex-col">
      <div className="max-w-5xl mx-auto px-6 w-full flex-1">
        <h1 className="text-3xl font-normal text-frag-dark mb-8" style={{ fontFamily: 'Georgia, serif' }}>
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-frag-border shadow-sm">
            <svg className="mx-auto mb-4 text-frag-gray" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            <p className="text-frag-gray text-lg mb-6">Your cart is empty.</p>
            <Link to="/shop/all" className="inline-block px-8 py-3 bg-frag-dark text-white rounded-full text-sm font-medium hover:bg-black transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => {
                const imageSrc = item.product.images ? item.product.images[0] : item.product.image;
                return (
                  <div key={item.product.id} className="flex gap-6 items-center bg-white p-4 rounded-2xl border border-frag-border shadow-sm">
                    <div className="w-24 h-32 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                      <img 
                        src={imageSrc} 
                        alt={item.product.name} 
                        className="w-full h-full object-contain p-2"
                        crossOrigin="anonymous"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-medium text-frag-dark truncate" style={{ fontFamily: 'Georgia, serif' }}>{item.product.name}</h3>
                      <p className="text-sm text-frag-gray mt-1">${item.product.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center border border-gray-200 rounded-full h-9 w-28">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="flex-1 flex justify-center text-frag-gray hover:text-frag-dark transition-colors"
                          >−</button>
                          <span className="text-sm font-medium w-8 text-center text-frag-dark">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="flex-1 flex justify-center text-frag-gray hover:text-frag-dark transition-colors"
                          >+</button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-sm text-frag-gray hover:text-red-600 transition-colors underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-lg font-medium text-frag-dark" style={{ fontFamily: 'Georgia, serif' }}>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-frag-border p-6 shadow-sm sticky top-24">
                <h2 className="text-lg font-medium text-frag-dark mb-6" style={{ fontFamily: 'Georgia, serif' }}>Order Summary</h2>
                <div className="flex justify-between items-center mb-4 text-sm text-frag-gray">
                  <span>Subtotal</span>
                  <span className="text-frag-dark font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-6 text-sm text-frag-gray">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-frag-border pt-4 mb-6 flex justify-between items-center">
                  <span className="text-base font-medium text-frag-dark">Total</span>
                  <span className="text-2xl font-normal text-frag-dark" style={{ fontFamily: 'Georgia, serif' }}>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-[#1A1A1A] hover:bg-black text-white rounded-full font-medium tracking-wide transition-colors shadow-md">
                  Checkout Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
