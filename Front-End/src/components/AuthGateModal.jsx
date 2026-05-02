import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function AuthGateModal({ onClose, returnPath }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape key
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  const goTo = (path) => {
    onClose();
    navigate(path, {
      state: {
        from: returnPath || location.pathname,
        message: 'Silakan masuk untuk melanjutkan pesanan Anda.',
      },
    });
  };

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="auth-backdrop"
        className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        key="auth-modal"
        className="fixed z-[90] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm bg-frag-cream rounded-3xl border border-frag-border p-8 text-center"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.20)' }}
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 24 }}
        transition={{ type: 'spring', damping: 26, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-full border border-frag-border bg-white flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>

        {/* Text */}
        <p className="text-[10px] tracking-[0.2em] text-frag-gray uppercase mb-3">
          Members Only
        </p>
        <h2 className="text-2xl font-normal text-frag-dark mb-3" style={{ fontFamily: 'Georgia, serif' }}>
          Sign In to Complete<br />Your Order
        </h2>
        <p className="text-sm text-frag-gray leading-relaxed mb-7">
          Create a free account or sign in to access exclusive pricing, track your orders, and enjoy a seamless checkout experience.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => goTo('/login')}
            className="w-full py-3 rounded-full bg-frag-dark text-white text-sm font-medium tracking-wide hover:bg-frag-dark/90 transition-colors"
          >
            Sign In to My Account
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => goTo('/register')}
            className="w-full py-3 rounded-full border border-frag-border text-frag-dark text-sm font-medium hover:border-frag-dark hover:bg-white transition-all"
          >
            Create Free Account
          </motion.button>
          <button onClick={onClose} className="text-xs text-frag-gray hover:text-frag-dark transition-colors mt-1">
            Continue Browsing
          </button>
        </div>

        {/* Trust signal */}
        <div className="mt-6 pt-5 border-t border-frag-border flex items-center justify-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#717171" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span className="text-[10px] text-frag-gray">256-bit SSL · Your data is safe</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
