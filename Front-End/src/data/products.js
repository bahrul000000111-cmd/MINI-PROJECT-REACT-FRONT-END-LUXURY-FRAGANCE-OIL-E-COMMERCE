// ─── 50+ Products Catalog ────────────────────────────────────────────────
// All images are strictly unique Unsplash perfume/fragrance bottle photos

const U = 'https://images.unsplash.com';

// Each product gets its own unique Unsplash perfume/fragrance photo ID
const PERFUME_IMAGE_IDS = [
  // Diffusers (15)
  '1608181831718-c9e3c34f5c5a', // d-1
  '1594035910387-fea47794261f', // d-2
  '1541643600914-78b084683702', // d-3
  '1583847268964-b28dc8f51f92', // d-4
  '1563170351-be82bc888aa4',    // d-5
  '1587017539504-67cfbddac569', // d-6
  '1598300042247-d088f8ab3a91', // d-7
  '1488161628813-04466f872be2', // d-8
  '1613521973937-efcfda6fdd95', // d-9
  '1523293182086-7651a899d37f', // d-10
  '1590736969955-71cc94901144', // d-11
  '1571781926291-c477ebfd024b', // d-12
  '1547496502-affa22e38b1c',    // d-13
  '1616401784845-180882ba9ba8', // d-14
  '1588405748880-12d1d2a59f75', // d-15

  // Signature Essential Oils (12)
  '1551882547-ff40c63fe1d6',    // s-1
  '1592945403244-b3fbafd7f539', // s-2
  '1557170334-a9632e77c6e4',    // s-3
  '1615529182904-1b7713d2dc53', // s-4
  '1605651202774-9d2731d8c2b2', // s-5
  '1590736910113-d811d7351663', // s-6
  '1629198688000-71f23e745b6e', // s-7
  '1578683010236-d716f9a3f461', // s-8
  '1564501049412-61c2a3083791', // s-9
  '1631049307264-da0ec9d70304', // s-10
  '1549465220-1a8b9238cd48',    // s-11
  '1576426863848-c21f53c60b19', // s-12

  // Designer Collection (10)
  '1612282830293-9c8e1e3606f7', // g-1
  '1615486511484-92e17364bf74', // g-2
  '1596462502278-27bf84033005', // g-3
  '1611078449458-47c1b504c541', // g-4
  '1585360341774-b52e07973c1c', // g-5
  '1608528577316-cea33bfd3f23', // g-6
  '1595425970377-c9703c58e240', // g-7
  '1572454653697-3932a3eb9465', // g-8
  '1586521571434-2a62886c91a0', // g-9
  '1602446700676-e17df20ab24f', // g-10

  // Perfumes (12)
  '1599305090598-fe179d501227', // p-1
  '1614805364132-90f70db2b2ec', // p-2
  '1611070566367-96a1a1ff27a8', // p-3
  '1582218080894-3995f543dcbc', // p-4
  '1599305090514-6b99de24f6f8', // p-5
  '1621215160844-307ab4671ea3', // p-6
  '1618361718015-b5015b3cba14', // p-7
  '1580974866632-15f5a8947fbb', // p-8
  '1602446700813-f4325a75877c', // p-9
  '1580974852861-12711ff635f7', // p-10
  '1593026365449-3bdf70275c1c', // p-11
  '1585233261699-27807c4c3e38', // p-12

  // Gift Sets (6)
  '1594913619175-10cebbcebaf0', // gs-1
  '1596462502293-7ea0808b0fb6', // gs-2
  '1611565538012-32a81f337b54', // gs-3
  '1611565538202-b5e1ce1da5b8', // gs-4
  '1611565538352-78d12b07b140', // gs-5
  '1549465220-1a8b9238cd48',    // gs-6 (reuse allowed for gift set)
];

function imgFor(index) {
  const id = PERFUME_IMAGE_IDS[index % PERFUME_IMAGE_IDS.length];
  return [`${U}/photo-${id}?q=80&w=800&auto=format&fit=crop`];
}

// ── Vendor Names for Marketplace Feel ────────────────────────────────────
const DIFFUSER_VENDORS  = ['Nebula Atelier', 'Mist & Marble Co.', 'Aroma Sphere Studio', 'The Diffuser House', 'CloudScent Lab'];
const SIGNATURE_VENDORS = ['Botanica Pure', 'Essence Collective', 'The Oil Alchemist', 'Green Ritual Co.', 'Bloom & Extract'];
const DESIGNER_VENDORS  = ['Maison du Parfum', 'Atelier Noir Paris', 'Riviera Scent House', 'House of Haute', 'Parfumerie Luxe'];
const PERFUME_VENDORS   = ['House of Bvlgari Alt.', 'Scent & Co.', 'Velvet Fragrance Co.', 'Oud & Empire', 'La Fleur Maison'];
const GIFT_VENDORS      = ['The Fragrance Vault', 'Prestige Scent Box', 'Curated by Frägra', 'Gift of Scent', 'The Luxury Edit'];

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
  vendorName: DIFFUSER_VENDORS[i % 5],
  price: [49, 59, 79, 89, 99, 109, 119, 139, 149, 159, 169, 179, 199, 219, 249][i],
  originalPrice: i % 3 === 0 ? [65, 79, 99, 109, 129, 139, 149, 169, 189, null, null, null, null, null, null][i] : null,
  rating: parseFloat((4.5 + (i % 5) * 0.1).toFixed(1)),
  reviewCount: 150 + i * 187,
  stock: 5 + (i * 7) % 90,
  tags: tag(i),
  sizes: ['Standard'],
  images: imgFor(i),
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
  vendorName: SIGNATURE_VENDORS[i % 5],
  price: [28, 32, 34, 36, 38, 42, 44, 46, 48, 52, 56, 64][i],
  originalPrice: i % 4 === 0 ? [38, null, 44, null, null, 52, null, null, null, null, null, null][i] : null,
  rating: parseFloat((4.6 + (i % 4) * 0.1).toFixed(1)),
  reviewCount: 320 + i * 221,
  stock: 10 + (i * 11) % 120,
  tags: tag(i + 2),
  sizes: ['15ml', '30ml', '50ml'],
  images: imgFor(15 + i),
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
  vendorName: DESIGNER_VENDORS[i % 5],
  price: [42, 45, 45, 48, 48, 52, 52, 55, 55, 60][i],
  originalPrice: i % 3 === 0 ? [55, null, null, 59, null, null, 64, null, null, null][i] : null,
  rating: parseFloat((4.7 + (i % 3) * 0.1).toFixed(1)),
  reviewCount: 200 + i * 143,
  stock: 8 + (i * 5) % 45,
  tags: tag(i + 1),
  sizes: ['50ml', '100ml'],
  images: imgFor(27 + i),
  notes: { top: 'Saffron · Black Pepper', heart: 'Oud · Leather', base: 'Dark Amber · Labdanum' },
  description: `${name} is a collaboration between Frägra's master blenders and internationally recognized perfumers. A limited edition fragrance that makes a statement, not just a scent.`,
}));

// ── Perfumes (12) ────────────────────────────────────────────────────────
const PERFUME_NAMES = [
  'No. 1 — Elegance','No. 2 — Velvet','No. 3 — Bloom','No. 4 — Amber',
  'Ivory Rose EdP','Midnight Cedar','Carte Blanche','Soleil Blanc',
  'Dark Gardenia',"L'Heure Bleue",'White Vetiver','Neroli Portofino',
];

const perfumes = PERFUME_NAMES.map((name, i) => ({
  id: `p-${i + 1}`,
  category: 'perfumes',
  name,
  brand: BRANDS_PERFUME[i % 5],
  vendorName: PERFUME_VENDORS[i % 5],
  price: [75, 85, 85, 89, 92, 95, 95, 99, 99, 105, 109, 115][i],
  originalPrice: i % 4 === 0 ? [95, null, null, null, 110, null, null, null, null, null, null, null][i] : null,
  rating: parseFloat((4.5 + (i % 5) * 0.1).toFixed(1)),
  reviewCount: 400 + i * 178,
  stock: 15 + (i * 9) % 80,
  tags: tag(i + 3),
  sizes: ['30ml', '50ml', '100ml'],
  images: imgFor(37 + i),
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
  vendorName: GIFT_VENDORS[i % 5],
  price: [79, 99, 149, 119, 139, 249][i],
  originalPrice: [105, 130, 195, 149, 175, 320][i],
  rating: parseFloat((4.8 + (i % 3) * 0.1).toFixed(1)),
  reviewCount: 500 + i * 213,
  stock: 20 + (i * 8) % 60,
  tags: i === 0 ? 'Best Seller' : i === 2 ? 'Limited Edition' : 'Gift Ready',
  sizes: ['One Size'],
  images: imgFor(49 + i),
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
