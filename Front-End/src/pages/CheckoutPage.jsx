import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartProvider';
import toast from 'react-hot-toast';

const SHIPPING_FEE = 12.00;

// ── Payment Method Icons ─────────────────────────────────────────────────
function VisaIcon() {
  return (
    <svg viewBox="0 0 48 16" className="h-5 w-auto" aria-label="Visa">
      <text x="0" y="13" fontFamily="Arial" fontWeight="bold" fontSize="16" fill="#1A1F71">VISA</text>
    </svg>
  );
}
function MastercardIcon() {
  return (
    <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="Mastercard">
      <circle cx="14" cy="12" r="12" fill="#EB001B" />
      <circle cx="24" cy="12" r="12" fill="#F79E1B" fillOpacity="0.9" />
    </svg>
  );
}
function AmexIcon() {
  return (
    <svg viewBox="0 0 48 16" className="h-5 w-auto" aria-label="Amex">
      <rect width="48" height="16" rx="3" fill="#2E77BC"/>
      <text x="5" y="12" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="white">AMEX</text>
    </svg>
  );
}

// ── Field Component ───────────────────────────────────────────────────────
function Field({ label, id, type = 'text', placeholder, value, onChange, error, half }) {
  return (
    <div className={half ? 'flex-1 min-w-0' : 'w-full'}>
      <label htmlFor={id} className="block text-[11px] tracking-widest uppercase text-stone-500 mb-1.5 font-sans">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-stone-800 placeholder-stone-300 outline-none transition-all font-sans
          ${error ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-stone-200 focus:border-stone-400 focus:ring-2 focus:ring-stone-100'}`}
      />
      {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
    </div>
  );
}

// ── Dummy QR Code ─────────────────────────────────────────────────────────
function DummyQR() {
  const cells = [];
  for (let r = 0; r < 21; r++) {
    for (let c = 0; c < 21; c++) {
      const corner = (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7);
      const filled = corner || Math.random() > 0.55;
      cells.push(<rect key={`${r}-${c}`} x={c * 10} y={r * 10} width={9} height={9} fill={filled ? '#1A1A1A' : 'none'} />);
    }
  }
  return (
    <svg viewBox="0 0 210 210" className="w-36 h-36 mx-auto" style={{ shapeRendering: 'crispEdges' }}>
      <rect width="210" height="210" fill="white" />
      {cells}
    </svg>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);

  const [form, setForm] = useState({ fullName: '', email: '', phone: '', address: '', city: '', zip: '', country: '' });
  const [errors, setErrors] = useState({});
  const [payMethod, setPayMethod] = useState('card');
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '' });
  const [loading, setLoading] = useState(false);
  const [vaNumber] = useState(`8001-${Math.floor(1000000 + Math.random() * 9000000)}`);

  const total = cartTotal + SHIPPING_FEE;

  function setF(key) { return (e) => setForm(p => ({ ...p, [key]: e.target.value })); }
  function setC(key) { return (e) => setCard(p => ({ ...p, [key]: e.target.value })); }

  function validate() {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.zip.trim()) e.zip = 'ZIP code is required';
    if (!form.country.trim()) e.country = 'Country is required';
    if (payMethod === 'card') {
      if (card.number.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number';
      if (!card.expiry.match(/^\d{2}\/\d{2}$/)) e.expiry = 'Format: MM/YY';
      if (card.cvv.length < 3) e.cvv = 'CVV required';
    }
    return e;
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('Please fix the highlighted fields before continuing.', { icon: '⚠️' });
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 89999)}`;
    clearCart();
    navigate('/success', { state: { orderId, total } });
  }

  function fmtCard(v) {
    return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }
  function fmtExpiry(v) {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  }

  const tabStyle = (id) =>
    `flex-1 py-3 px-4 text-xs font-medium tracking-wide uppercase transition-all border-b-2 ${
      payMethod === id ? 'border-stone-800 text-stone-800 bg-stone-50' : 'border-transparent text-stone-400 hover:text-stone-600'
    }`;

  return (
    <div className="min-h-screen bg-[#F8F6F2] pt-24 pb-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1">Secure Checkout</p>
          <h1 className="text-3xl text-stone-800" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Complete Your Order
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} noValidate>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* ── LEFT: Shipping + Payment ──────────────────────────────── */}
            <div className="lg:col-span-3 space-y-6">
              {/* Shipping Card */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-base font-medium text-stone-800 mb-6 flex items-center gap-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  <span className="w-6 h-6 rounded-full bg-stone-800 text-white text-[10px] flex items-center justify-center">1</span>
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <Field label="Full Name" id="fullName" placeholder="Your full name" value={form.fullName} onChange={setF('fullName')} error={errors.fullName} />
                  <div className="flex gap-4">
                    <Field label="Email Address" id="email" type="email" placeholder="hello@example.com" value={form.email} onChange={setF('email')} error={errors.email} half />
                    <Field label="Phone Number" id="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={setF('phone')} error={errors.phone} half />
                  </div>
                  <Field label="Street Address" id="address" placeholder="123 Luxury Lane, Apt 4B" value={form.address} onChange={setF('address')} error={errors.address} />
                  <div className="flex gap-4">
                    <Field label="City" id="city" placeholder="New York" value={form.city} onChange={setF('city')} error={errors.city} half />
                    <Field label="ZIP / Postal Code" id="zip" placeholder="10001" value={form.zip} onChange={setF('zip')} error={errors.zip} half />
                  </div>
                  <Field label="Country" id="country" placeholder="United States" value={form.country} onChange={setF('country')} error={errors.country} />
                </div>
              </motion.div>

              {/* Payment Card */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-0">
                  <h2 className="text-base font-medium text-stone-800 mb-5 flex items-center gap-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    <span className="w-6 h-6 rounded-full bg-stone-800 text-white text-[10px] flex items-center justify-center">2</span>
                    Payment Method
                  </h2>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-stone-100 px-4">
                  <button type="button" className={tabStyle('card')} onClick={() => setPayMethod('card')}>💳 Card</button>
                  <button type="button" className={tabStyle('va')} onClick={() => setPayMethod('va')}>🏦 Bank Transfer</button>
                  <button type="button" className={tabStyle('qris')} onClick={() => setPayMethod('qris')}>📱 QRIS</button>
                </div>

                <AnimatePresence mode="wait">
                  {payMethod === 'card' && (
                    <motion.div key="card" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                      className="px-6 sm:px-8 py-6 space-y-4">
                      <div className="flex items-center gap-3 mb-2">
                        <VisaIcon /><MastercardIcon /><AmexIcon />
                        <span className="ml-auto flex items-center gap-1 text-[10px] text-stone-400">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                          256-bit SSL
                        </span>
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-widest uppercase text-stone-500 mb-1.5">Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                          value={card.number} onChange={e => setC('number')({ target: { value: fmtCard(e.target.value) } })}
                          className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-stone-800 placeholder-stone-300 outline-none transition-all tracking-widest
                            ${errors.cardNumber ? 'border-red-400 focus:ring-2 focus:ring-red-100' : 'border-stone-200 focus:border-stone-400 focus:ring-2 focus:ring-stone-100'}`}
                        />
                        {errors.cardNumber && <p className="mt-1 text-[11px] text-red-500">{errors.cardNumber}</p>}
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-[11px] tracking-widest uppercase text-stone-500 mb-1.5">Expiry Date</label>
                          <input type="text" placeholder="MM/YY" maxLength={5}
                            value={card.expiry} onChange={e => setC('expiry')({ target: { value: fmtExpiry(e.target.value) } })}
                            className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-stone-800 placeholder-stone-300 outline-none transition-all
                              ${errors.expiry ? 'border-red-400' : 'border-stone-200 focus:border-stone-400 focus:ring-2 focus:ring-stone-100'}`}
                          />
                          {errors.expiry && <p className="mt-1 text-[11px] text-red-500">{errors.expiry}</p>}
                        </div>
                        <div className="flex-1">
                          <label className="block text-[11px] tracking-widest uppercase text-stone-500 mb-1.5">CVV</label>
                          <input type="password" placeholder="•••" maxLength={4}
                            value={card.cvv} onChange={e => setCard(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                            className={`w-full px-4 py-3 bg-white border rounded-lg text-sm text-stone-800 placeholder-stone-300 outline-none transition-all
                              ${errors.cvv ? 'border-red-400' : 'border-stone-200 focus:border-stone-400 focus:ring-2 focus:ring-stone-100'}`}
                          />
                          {errors.cvv && <p className="mt-1 text-[11px] text-red-500">{errors.cvv}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {payMethod === 'va' && (
                    <motion.div key="va" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                      className="px-6 sm:px-8 py-8 text-center space-y-5">
                      <div className="w-14 h-14 mx-auto rounded-xl bg-blue-50 flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                      </div>
                      <div>
                        <p className="text-[11px] tracking-widest uppercase text-stone-400 mb-2">Your Virtual Account Number</p>
                        <div className="bg-stone-50 border border-stone-200 rounded-xl px-6 py-4 inline-block">
                          <p className="text-2xl font-light tracking-[0.3em] text-stone-800" style={{ fontFamily: 'monospace' }}>{vaNumber}</p>
                        </div>
                      </div>
                      <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                        Transfer the exact amount to the virtual account above. Your order will be confirmed within 1–3 minutes after payment.
                      </p>
                      <div className="flex justify-center gap-4 pt-2">
                        {['BCA', 'BNI', 'Mandiri', 'BRI'].map(b => (
                          <span key={b} className="px-3 py-1.5 border border-stone-200 rounded-lg text-[10px] text-stone-600 font-medium bg-white">{b}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {payMethod === 'qris' && (
                    <motion.div key="qris" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                      className="px-6 sm:px-8 py-8 text-center space-y-4">
                      <p className="text-[11px] tracking-widest uppercase text-stone-400">Scan with any e-Wallet app</p>
                      <div className="border-2 border-dashed border-stone-200 rounded-2xl p-5 inline-block">
                        <DummyQR />
                        <div className="mt-3 flex items-center justify-center gap-1">
                          <div className="h-px flex-1 bg-stone-200"/>
                          <span className="text-[9px] tracking-widest uppercase text-stone-400 px-2">QRIS</span>
                          <div className="h-px flex-1 bg-stone-200"/>
                        </div>
                      </div>
                      <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
                        Open GoPay, OVO, Dana, ShopeePay, or any QRIS-compatible app and scan the code above to complete payment.
                      </p>
                      <div className="flex justify-center gap-3 flex-wrap">
                        {['GoPay', 'OVO', 'Dana', 'ShopeePay'].map(b => (
                          <span key={b} className="px-3 py-1.5 border border-stone-200 rounded-lg text-[10px] text-stone-600 font-medium bg-white">{b}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* ── RIGHT: Order Summary ──────────────────────────────────── */}
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sm:p-8 sticky top-24">
                <h2 className="text-base font-medium text-stone-800 mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-1">
                  {cartItems.map(({ product, quantity }) => {
                    const img = product.images ? product.images[0] : product.image;
                    return (
                      <div key={product.id} className="flex gap-3 items-center">
                        <div className="w-14 h-14 rounded-lg bg-stone-50 overflow-hidden flex-shrink-0 border border-stone-100">
                          <img src={img} alt={product.name} className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-stone-800 truncate line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>{product.name}</p>
                          {product.vendorName && (
                            <p className="text-[10px] text-[#C9A96E] mt-0.5 truncate">{product.vendorName}</p>
                          )}
                          <p className="text-[11px] text-stone-400 mt-0.5">Qty: {quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-stone-800 flex-shrink-0">${(product.price * quantity).toFixed(2)}</p>
                      </div>
                    );
                  })}
                  {cartItems.length === 0 && (
                    <p className="text-sm text-stone-400 text-center py-4">Your cart is empty.</p>
                  )}
                </div>

                <div className="border-t border-stone-100 pt-4 space-y-3">
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Subtotal</span>
                    <span className="text-stone-800">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-500">
                    <span>Shipping</span>
                    <span className="text-stone-800">${SHIPPING_FEE.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-stone-400 pt-1 border-t border-stone-100">
                    <span className="text-[10px] tracking-widest uppercase">Taxes</span>
                    <span className="text-stone-500 text-[11px]">Included</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-stone-200">
                    <span className="text-base font-medium text-stone-800">Total</span>
                    <span className="text-2xl font-light text-stone-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <button type="submit" disabled={loading || cartItems.length === 0}
                  className="mt-6 w-full py-4 bg-[#1A1A1A] hover:bg-black text-white rounded-full text-sm font-medium tracking-widest uppercase transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Processing…
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Place Order
                    </>
                  )}
                </button>

                <p className="mt-4 text-center text-[10px] text-stone-400 tracking-wide">
                  🔒 Your payment information is encrypted and secure.
                </p>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
