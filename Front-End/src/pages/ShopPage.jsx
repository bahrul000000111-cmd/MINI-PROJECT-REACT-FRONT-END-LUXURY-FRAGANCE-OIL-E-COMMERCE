import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

const CATEGORIES = [
  { slug: 'all',                label: 'All Products',       emoji: '✦' },
  { slug: 'scent-diffusers',    label: 'Scent Diffusers',    emoji: '💨' },
  { slug: 'hotel-collection',   label: 'Hotel Collection',   emoji: '🏨' },
  { slug: 'designer-collection',label: 'Designer Collection',emoji: '✦' },
  { slug: 'perfumes',           label: 'Perfumes',           emoji: '🌹' },
  { slug: 'gift-sets',          label: 'Gift Sets',          emoji: '🎁' },
];

const CATEGORY_HEROES = {
  'all':                 { title: 'All Products', subtitle: 'THE COMPLETE COLLECTION', desc: 'Browse every piece in our curated luxury lineup.' },
  'scent-diffusers':     { title: 'Scent Diffusers', subtitle: 'COLD-AIR TECHNOLOGY', desc: 'Hotel-grade cold-air diffusers for your home.' },
  'hotel-collection':    { title: 'Hotel Collection', subtitle: 'FIVE-STAR AMBIANCE', desc: 'The exact scents used by the world\'s finest hotels.' },
  'designer-collection': { title: 'Designer Collection', subtitle: 'ARTISAN CRAFTED', desc: 'Limited edition collaborations with master perfumers.' },
  'perfumes':            { title: 'Personal Fragrances', subtitle: 'WEAR YOUR WORLD', desc: 'Wearable luxury at 18%+ aromatic concentration.' },
  'gift-sets':           { title: 'Luxury Gift Sets', subtitle: 'THE ART OF GIFTING', desc: 'Beautifully curated sets for every occasion.' },
};

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -12, transition: { duration: 0.3 } },
};

export default function ShopPage() {
  const { category = 'all' } = useParams();
  const hero = CATEGORY_HEROES[category] ?? CATEGORY_HEROES['all'];

  return (
    <motion.div
      key={category}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-frag-cream min-h-screen"
      style={{ paddingTop: 64 }}
    >
      {/* ── Hero Header ── */}
      <div className="bg-frag-dark text-white py-14 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-[10px] tracking-[0.22em] text-white/50 uppercase mb-3"
          >
            {hero.subtitle}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            className="text-4xl md:text-5xl font-normal text-white mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
            className="text-white/55 text-sm max-w-md mx-auto"
          >
            {hero.desc}
          </motion.p>
        </div>
      </div>

      {/* ── Category Pills ── */}
      <div className="border-b border-frag-border bg-white sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-3 min-w-max">
            {CATEGORIES.map((cat) => {
              const active = cat.slug === category || (cat.slug === 'all' && !category);
              return (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap"
                  style={{
                    background: active ? '#1A1A1A' : 'transparent',
                    color: active ? 'white' : '#717171',
                    border: active ? 'none' : '1px solid #E5E1D8',
                  }}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        <ProductGrid category={category === 'all' ? null : category} />
      </div>

      <Footer />
    </motion.div>
  );
}
