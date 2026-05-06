// ─── 50+ Products Catalog ────────────────────────────────────────────────
const U = 'https://images.unsplash.com';

// Image pools per category
const IMG = {
  diffuser: [
    `${U}/photo-1600612253971-1e7b97b4b048?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1547496502-affa22e38b1c?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1608181831718-c9e3c34f5c5a?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop`,
  ],
  signature: [
    `${U}/photo-1590736969955-71cc94901144?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1551882547-ff40c63fe1d6?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop`,
  ],
  designer: [
    `${U}/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1613521973937-efcfda6fdd95?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1541643600914-78b084683702?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop`,
  ],
  perfume: [
    `${U}/photo-1563170351-be82bc888aa4?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1616489953149-8f6f598c199e?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1587017539504-67cfbddac569?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1488161628813-04466f872be2?q=80&w=800&auto=format&fit=crop`,
  ],
  gift: [
    `${U}/photo-1513201099705-a9746072f043?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1576426863848-c21f53c60b19?q=80&w=800&auto=format&fit=crop`,
    `${U}/photo-1511895426328-dc8714191011?q=80&w=800&auto=format&fit=crop`,
  ],
};

function imgs(pool, i) {
  const n = pool.length;
  return [pool[i % n], pool[(i + 1) % n], pool[(i + 2) % n]];
}

const BRANDS_DIFFUSER  = ['Frägra Signature','Frägra Artisan','Frägra Luxe','Frägra Pro','Frägra Home'];
const BRANDS_SIGNATURE = ['Frägra Botanicals','Frägra Extracts','Frägra Pure','Frägra Essence','Frägra Aura'];
const BRANDS_DESIGNER  = ['Frägra × Maison','Frägra × Atelier','Frägra × Riviera','Frägra × Noir','Frägra × Haute'];
const BRANDS_PERFUME   = ['Frägra No.','Frägra Bloom','Frägra Velvet','Frägra Oud','Frägra Fleur'];
const TAGS_POOL        = ['Best Seller','New Arrival','Limited Edition','Top Rated','Staff Pick','Exclusive',null,null];

function tag(i) { return TAGS_POOL[i % TAGS_POOL.length]; }

// ── Scent Diffusers (15) ─────────────────────────────────────────────────
const DIFFUSER_NAMES = [
  'Stone Nebulizer Pro','Ceramic Mist Elite','Glass Tower Luxe','Mini Travel Diffuser',
  'Onyx Cold-Air Unit','Marble Base Diffuser','Matte Black Nebulizer','Rose Gold Mist',
  'Slate Series Diffuser','Pearl White Diffuser','Bronze Edition Mist','Crystal Clear Tower',
  'Obsidian Pro Diffuser','Sage Green Ceramic','Ivory Linen Diffuser',
];

const diffusers = DIFFUSER_NAMES.map((name, i) => ({
  id: `d-${i + 1}`,
  category: 'scent-diffusers',
  name,
  brand: BRANDS_DIFFUSER[i % 5],
  price: [49, 59, 79, 89, 99, 109, 119, 139, 149, 159, 169, 179, 199, 219, 249][i],
  originalPrice: i % 3 === 0 ? [65, 79, 99, 109, 129, 139, 149, 169, 189, null, null, null, null, null, null][i] : null,
  rating: parseFloat((4.5 + (i % 5) * 0.1).toFixed(1)),
  reviewCount: 150 + i * 187,
  stock: 5 + (i * 7) % 90,
  tags: tag(i),
  sizes: ['Standard'],
  images: imgs(IMG.diffuser, i),
  notes: { top: 'Clean Air · Citrus', heart: 'Vetiver · Cedar', base: 'Warm Musk · Sandalwood' },
  description: `The ${name} delivers cold-air nebulizing technology that atomizes fragrance oil into a fine, dry mist with zero heat and zero water. Designed for spaces from 500–2,000 sq ft.`,
}));

// ── Signature Essential Oils (12) ────────────────────────────────────────────────
const SIGNATURE_NAMES = [
  'Lavender Dream Essence','Citrus Burst Extract','Eucalyptus Pure','Peppermint Clarity',
  'Frankincense Ritual','Myrrh Deep Meditation','Ylang Ylang Romance','Tea Tree Cleanse',
  'Rosemary Focus','Bergamot Sunshine','Lemongrass Zen','Sandalwood Grounding',
];

const signatures = SIGNATURE_NAMES.map((name, i) => ({
  id: `s-${i + 1}`,
  category: 'signature-oils',
  name,
  brand: BRANDS_SIGNATURE[i % 5],
  price: [28, 32, 34, 36, 38, 42, 44, 46, 48, 52, 56, 64][i],
  originalPrice: i % 4 === 0 ? [38, null, 44, null, null, 52, null, null, null, null, null, null][i] : null,
  rating: parseFloat((4.6 + (i % 4) * 0.1).toFixed(1)),
  reviewCount: 320 + i * 221,
  stock: 10 + (i * 11) % 120,
  tags: tag(i + 2),
  sizes: ['15ml', '30ml', '50ml'],
  images: imgs(IMG.signature, i),
  notes: { top: 'Pure Botanicals', heart: 'Distilled Essence', base: 'Natural Extracts' },
  description: `${name} captures the pure essence of carefully sourced botanicals. Highly concentrated and perfect for our cold-air diffusers to transform your environment into a sanctuary.`,
}));

// ── Designer Collection (10) ─────────────────────────────────────────────
const DESIGNER_NAMES = [
  'Noir Absolu','Jardin Secret',"Côte d'Azur",'Tokyo Minimalist',
  'Sahara Dusk','Alpine Silence','Caribbean Pearl','Nordic Forest',
  'Venetian Accord','Havana Nights',
];

const designers = DESIGNER_NAMES.map((name, i) => ({
  id: `g-${i + 1}`,
  category: 'designer-collection',
  name,
  brand: BRANDS_DESIGNER[i % 5],
  price: [42, 45, 45, 48, 48, 52, 52, 55, 55, 60][i],
  originalPrice: i % 3 === 0 ? [55, null, null, 59, null, null, 64, null, null, null][i] : null,
  rating: parseFloat((4.7 + (i % 3) * 0.1).toFixed(1)),
  reviewCount: 200 + i * 143,
  stock: 8 + (i * 5) % 45,
  tags: tag(i + 1),
  sizes: ['50ml', '100ml'],
  images: imgs(IMG.designer, i),
  notes: { top: 'Saffron · Black Pepper', heart: 'Oud · Leather', base: 'Dark Amber · Labdanum' },
  description: `${name} is a collaboration between Frägra's master blenders and internationally recognized perfumers. A limited edition fragrance that makes a statement, not just a scent.`,
}));

// ── Perfumes (12) ────────────────────────────────────────────────────────
const PERFUME_NAMES = [
  'No. 1 — Elegance','No. 2 — Velvet','No. 3 — Bloom','No. 4 — Amber',
  'Ivory Rose EdP','Midnight Cedar','Carte Blanche','Soleil Blanc',
  'Dark Gardenia','L\'Heure Bleue','White Vetiver','Neroli Portofino',
];

const perfumes = PERFUME_NAMES.map((name, i) => ({
  id: `p-${i + 1}`,
  category: 'perfumes',
  name,
  brand: BRANDS_PERFUME[i % 5],
  price: [75, 85, 85, 89, 92, 95, 95, 99, 99, 105, 109, 115][i],
  originalPrice: i % 4 === 0 ? [95, null, null, null, 110, null, null, null, null, null, null, null][i] : null,
  rating: parseFloat((4.5 + (i % 5) * 0.1).toFixed(1)),
  reviewCount: 400 + i * 178,
  stock: 15 + (i * 9) % 80,
  tags: tag(i + 3),
  sizes: ['30ml', '50ml', '100ml'],
  images: imgs(IMG.perfume, i),
  notes: { top: 'Neroli · Bergamot · Aldehydes', heart: 'Rose · Iris · Jasmine', base: 'Sandalwood · Musk · Ambergris' },
  description: `${name} — Eau de Parfum at 18%+ aromatic concentration. A fragrance of exceptional longevity and projection that reveals itself slowly over 10–14 hours on skin.`,
}));

// ── Gift Sets (6) ────────────────────────────────────────────────────────
const GIFT_NAMES = [
  'Starter Discovery Set','Luxury Scenting Set','Ultimate Essential Collection',
  'The Explorer Edit','Weekend Escape Set','The Connoisseur Box',
];

const gifts = GIFT_NAMES.map((name, i) => ({
  id: `gs-${i + 1}`,
  category: 'gift-sets',
  name,
  brand: 'Frägra Gift',
  price: [79, 99, 149, 119, 139, 249][i],
  originalPrice: [105, 130, 195, 149, 175, 320][i],
  rating: parseFloat((4.8 + (i % 3) * 0.1).toFixed(1)),
  reviewCount: 500 + i * 213,
  stock: 20 + (i * 8) % 60,
  tags: i === 0 ? 'Best Seller' : i === 2 ? 'Limited Edition' : 'Gift Ready',
  sizes: ['One Size'],
  images: imgs(IMG.gift, i),
  notes: { top: 'Curated Selection', heart: 'Exclusive Bundle', base: 'Gift-Wrapped' },
  description: `${name} — A beautifully composed gift experience. Hand-assembled, wrapped in our signature dark tissue, and presented in a rigid box with magnetic closure.`,
}));

// ── Combine & Export ─────────────────────────────────────────────────────
const allProducts = [...diffusers, ...signatures, ...designers, ...perfumes, ...gifts];

export default allProducts;

export function getByCategory(cat) {
  if (!cat || cat === 'all') return allProducts;
  return allProducts.filter((p) => p.category === cat);
}

export function getById(id) {
  return allProducts.find((p) => p.id === id) ?? null;
}

export const BRANDS = [...new Set(allProducts.map((p) => p.brand))].sort();
export const MAX_PRICE = Math.max(...allProducts.map((p) => p.price));
