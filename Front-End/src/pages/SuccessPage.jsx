import { useEffect, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CartContext } from '../context/CartProvider';

function getEstimatedDelivery() {
  const d = new Date();
  d.setDate(d.getDate() + Math.floor(3 + Math.random() * 4));
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Animated SVG checkmark
function AnimatedCheck() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
      className="relative flex items-center justify-center"
    >
      {/* Glowing ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1.15 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute w-28 h-28 rounded-full bg-emerald-100 blur-xl"
      />
      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg flex items-center justify-center">
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <motion.path
            d="M10 22 L19 31 L34 13"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useContext(CartContext);

  const orderId = location.state?.orderId ?? `ORD-${Math.floor(10000 + Math.random() * 89999)}`;
  const total = location.state?.total ?? 0;
  const estimatedDelivery = getEstimatedDelivery();

  // Ensure cart is cleared the moment this page loads
  useEffect(() => {
    clearCart();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex flex-col items-center justify-center px-4 py-24 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-3xl border border-stone-100 shadow-lg px-8 sm:px-14 py-14 flex flex-col items-center text-center"
      >
        {/* Checkmark */}
        <AnimatedCheck />

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 px-4 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full text-[10px] tracking-widest uppercase text-emerald-600 font-medium"
        >
          Payment Confirmed
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-5 text-2xl sm:text-3xl text-stone-800 leading-snug"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Your bespoke fragrance<br />journey begins soon.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mt-3 text-sm text-stone-400 leading-relaxed"
        >
          Thank you for your order. We are carefully preparing your selection and will notify you by email when it ships.
        </motion.p>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 w-full rounded-2xl bg-stone-50 border border-stone-100 divide-y divide-stone-100"
        >
          <div className="flex justify-between items-center px-5 py-3.5">
            <span className="text-[11px] tracking-widest uppercase text-stone-400">Order ID</span>
            <span className="text-sm font-semibold text-stone-800 tracking-wide">#{orderId}</span>
          </div>
          {total > 0 && (
            <div className="flex justify-between items-center px-5 py-3.5">
              <span className="text-[11px] tracking-widest uppercase text-stone-400">Amount Paid</span>
              <span className="text-sm font-semibold text-stone-800">${total.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center px-5 py-3.5">
            <span className="text-[11px] tracking-widest uppercase text-stone-400">Est. Delivery</span>
            <span className="text-xs font-medium text-stone-700 text-right max-w-[160px]">{estimatedDelivery}</span>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 w-full"
        >
          <Link
            to="/shop/all"
            className="flex-1 py-3.5 bg-[#1A1A1A] hover:bg-black text-white rounded-full text-xs font-medium tracking-widest uppercase transition-all text-center shadow-md"
          >
            Return to Marketplace
          </Link>
          <button
            onClick={() => navigate('/success', { state: { orderId, total } })}
            className="flex-1 py-3.5 border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 rounded-full text-xs font-medium tracking-widest uppercase transition-all"
          >
            Track My Order
          </button>
        </motion.div>

        {/* Divider + Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 flex items-center gap-3 w-full"
        >
          <div className="h-px flex-1 bg-stone-100" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-stone-300">Frägra Marketplace</span>
          <div className="h-px flex-1 bg-stone-100" />
        </motion.div>
        <p className="mt-3 text-[10px] text-stone-300 tracking-wide">A confirmation has been sent to your email address.</p>
      </motion.div>
    </div>
  );
}
