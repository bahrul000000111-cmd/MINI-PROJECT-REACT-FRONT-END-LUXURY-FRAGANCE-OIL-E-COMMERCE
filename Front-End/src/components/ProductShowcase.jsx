import { motion } from 'framer-motion';
import { products } from '../data/contentData';
import ProductCard from './ProductCard';

export default function ProductShowcase() {
  return (
    <section style={{ background: '#F3F0E9', padding: '80px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: '0.2em', color: '#888', textTransform: 'uppercase', marginBottom: 12 }}>
            The Signature Collection
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 36, fontWeight: 400, color: '#1A1A1A', margin: '0 0 16px' }}>
            Meticulously Crafted for the Discerning Estate
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: '#717171', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
            Select a masterpiece below to explore details, choose your preferred volume, and immerse yourself in our signature olfactory experiences.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* Footer link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: 40 }}
        >
          <a
            href="/info/shop-all"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              border: '1px solid #E5E1D8', color: '#1A1A1A',
              borderRadius: 999, padding: '12px 32px',
              fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500, textDecoration: 'none',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              transition: 'all 0.4s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#1A1A1A'; e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1A1A1A'; e.currentTarget.style.borderColor = '#E5E1D8'; e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Explore The Gallery
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
