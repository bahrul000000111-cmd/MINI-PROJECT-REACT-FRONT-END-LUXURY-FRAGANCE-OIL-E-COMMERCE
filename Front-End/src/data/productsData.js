// ─── Extended Products Catalog ───────────────────────────────────────────
// Data dummy kaya untuk marketplace Frägra

const BASE = 'https://images.unsplash.com';

export const allProducts = [
  // ── Scent Diffusers ──────────────────────────────────────────────────
  {
    id: 'pd-1', category: 'scent-diffusers', badge: 'Best Seller', badgeColor: '#1A1A1A',
    name: 'Stone Diffuser Pro', brand: 'Frägra Signature',
    price: 119.00, originalPrice: 149.00, rating: 4.9, reviewCount: 2341, stock: 48,
    sizes: ['Standard'], inStock: true,
    image: `${BASE}/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1583847268964-b28dc8f51f92?q=80&w=1600&auto=format&fit=crop`,
    gallery: [
      `${BASE}/photo-1547496502-affa22e38b1c?q=80&w=800&auto=format&fit=crop`,
      `${BASE}/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop`,
      `${BASE}/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop`,
    ],
    tagline: 'Cold-Air Nebulizing · Up to 1,500 sq ft',
    description: 'The Stone Diffuser Pro uses whisper-quiet cold-air nebulizing technology to disperse fragrance into a fine, dry mist. No heat, no water, no compromise — just pure scent.',
    notes: { top: 'Fresh Air · Clean Linen', heart: 'White Cedar · Vetiver', base: 'Warm Musk · Sandalwood' },
  },
  {
    id: 'pd-2', category: 'scent-diffusers', badge: 'New', badgeColor: '#C9A96E',
    name: 'Ceramic Mist Diffuser', brand: 'Frägra Artisan',
    price: 89.00, originalPrice: null, rating: 4.7, reviewCount: 987, stock: 22,
    sizes: ['Standard'], inStock: true,
    image: `${BASE}/photo-1608181831718-c9e3c34f5c5a?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1608181831718-c9e3c34f5c5a?q=80&w=1600&auto=format&fit=crop`,
    gallery: [
      `${BASE}/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop`,
      `${BASE}/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop`,
    ],
    tagline: 'Artisan Ceramic · Smart Schedule · < 25 dB',
    description: 'Handcrafted matte ceramic housing with programmable scheduling. Set your morning ritual and evening wind-down. Pairs perfectly with any Frägra fragrance oil.',
    notes: { top: 'Bergamot · Green Tea', heart: 'Jasmine · Bamboo', base: 'White Musk · Cedarwood' },
  },
  {
    id: 'pd-3', category: 'scent-diffusers', badge: null, badgeColor: null,
    name: 'Mini Portable Diffuser', brand: 'Frägra Travel',
    price: 49.00, originalPrice: 65.00, rating: 4.6, reviewCount: 543, stock: 85,
    sizes: ['Compact'], inStock: true,
    image: `${BASE}/photo-1547496502-affa22e38b1c?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1547496502-affa22e38b1c?q=80&w=1600&auto=format&fit=crop`,
    gallery: [`${BASE}/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop`],
    tagline: 'USB-C · 8-Hour Battery · Travel Ready',
    description: 'Your fragrance, wherever you go. The Mini Portable Diffuser fits in a bag pocket, charges via USB-C, and delivers 8 uninterrupted hours of cold-air scenting.',
    notes: { top: 'Citrus Zest · Mint', heart: 'Peony · Violet', base: 'Amber · Tonka Bean' },
  },
  {
    id: 'pd-4', category: 'scent-diffusers', badge: 'Limited', badgeColor: '#C9A96E',
    name: 'Glass Tower Diffuser', brand: 'Frägra Luxe',
    price: 179.00, originalPrice: null, rating: 4.9, reviewCount: 312, stock: 9,
    sizes: ['Standard'], inStock: true,
    image: `${BASE}/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1583847268964-b28dc8f51f92?q=80&w=1600&auto=format&fit=crop`,
    gallery: [`${BASE}/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop`],
    tagline: 'Borosilicate Glass · Ambient LED · 2,000 sq ft',
    description: 'A sculptural statement piece for the discerning home. Hand-blown borosilicate glass with a soft ambient LED ring. Museum-quality aesthetics. Hotel-grade performance.',
    notes: { top: 'Neroli · Pink Pepper', heart: 'Oud Rose · Iris', base: 'Black Amber · Labdanum' },
  },

  // ── Hotel Collection ─────────────────────────────────────────────────
  {
    id: 'ph-1', category: 'hotel-collection', badge: 'Top Rated', badgeColor: '#1A1A1A',
    name: 'Hotel Lobby Signature', brand: 'Frägra Hotel',
    price: 34.00, originalPrice: 42.00, rating: 4.9, reviewCount: 3102, stock: 200,
    sizes: ['100ml', '200ml', '500ml'], inStock: true,
    image: `${BASE}/photo-1590736969955-71cc94901144?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1590736969955-71cc94901144?q=80&w=1600&auto=format&fit=crop`,
    gallery: [
      `${BASE}/photo-1541643600914-78b084683702?q=80&w=800&auto=format&fit=crop`,
      `${BASE}/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop`,
    ],
    tagline: 'Hotel Collection · White Tea & Cedar',
    description: 'The iconic fresh linen and white tea blend used in 5-star hotel lobbies worldwide. A scent that signals arrival — calm, distinguished, and unmistakably deliberate.',
    notes: { top: 'White Tea · Bergamot', heart: 'Cedar · Green Leaves', base: 'Warm Musk · Vetiver' },
  },
  {
    id: 'ph-2', category: 'hotel-collection', badge: 'New', badgeColor: '#C9A96E',
    name: 'Grand Hyatt Suite', brand: 'Frägra Hotel',
    price: 34.00, originalPrice: null, rating: 4.8, reviewCount: 891, stock: 55,
    sizes: ['100ml', '200ml'], inStock: true,
    image: `${BASE}/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1594035910387-fea47794261f?q=80&w=1600&auto=format&fit=crop`,
    gallery: [`${BASE}/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop`],
    tagline: 'Fresh Linen · Jasmine · Warm Amber',
    description: 'Inspired by the private suites of a grand international property. Fresh linen opens into a jasmine heart, settling into warm amber that invites rest and restoration.',
    notes: { top: 'Fresh Linen · Cucumber', heart: 'Jasmine · Gardenia', base: 'Warm Amber · Sandalwood' },
  },
  {
    id: 'ph-3', category: 'hotel-collection', badge: null, badgeColor: null,
    name: 'Four Seasons Spa', brand: 'Frägra Hotel',
    price: 34.00, originalPrice: null, rating: 4.7, reviewCount: 654, stock: 33,
    sizes: ['100ml', '200ml', '500ml'], inStock: true,
    image: `${BASE}/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1588405748880-12d1d2a59f75?q=80&w=1600&auto=format&fit=crop`,
    gallery: [`${BASE}/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop`],
    tagline: 'Eucalyptus · Mint · Calming Lavender',
    description: 'The meditative stillness of a world-class spa, captured in a bottle. Eucalyptus and mint open the airways; lavender and chamomile invite a deeper calm.',
    notes: { top: 'Eucalyptus · Spearmint', heart: 'Lavender · Chamomile', base: 'Cedarwood · Sea Salt' },
  },
  {
    id: 'ph-4', category: 'hotel-collection', badge: 'Premium', badgeColor: '#1A1A1A',
    name: 'Waldorf Evening', brand: 'Frägra Hotel Luxe',
    price: 42.00, originalPrice: null, rating: 4.9, reviewCount: 412, stock: 18,
    sizes: ['100ml', '200ml'], inStock: true,
    image: `${BASE}/photo-1616401784845-180882ba9ba8?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1616401784845-180882ba9ba8?q=80&w=1600&auto=format&fit=crop`,
    gallery: [`${BASE}/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop`],
    tagline: 'Black Orchid · Vanilla Bourbon · Musk',
    description: 'A night at the Waldorf — opulent, theatrical, unforgettable. Black orchid unfurls into vanilla bourbon, leaving a trail of white musk that stays until morning.',
    notes: { top: 'Black Orchid · Saffron', heart: 'Vanilla Bourbon · Patchouli', base: 'White Musk · Benzoin' },
  },

  // ── Designer Collection ───────────────────────────────────────────────
  {
    id: 'pg-1', category: 'designer-collection', badge: 'Exclusive', badgeColor: '#1A1A1A',
    name: 'Noir Absolu', brand: 'Frägra x Maison',
    price: 48.00, originalPrice: null, rating: 4.9, reviewCount: 788, stock: 25,
    sizes: ['50ml', '100ml'], inStock: true,
    image: `${BASE}/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1523293182086-7651a899d37f?q=80&w=1600&auto=format&fit=crop`,
    gallery: [
      `${BASE}/photo-1590736969955-71cc94901144?q=80&w=800&auto=format&fit=crop`,
      `${BASE}/photo-1613521973937-efcfda6fdd95?q=80&w=800&auto=format&fit=crop`,
    ],
    tagline: 'Deep Oud · Black Pepper · Leather Accord',
    description: 'A collaboration with one of Paris\'s most storied niche perfumers. Noir Absolu is unapologetically bold — dark, complex, and intensely memorable.',
    notes: { top: 'Black Pepper · Saffron', heart: 'Oud · Leather Accord', base: 'Dark Amber · Labdanum' },
  },
  {
    id: 'pg-2', category: 'designer-collection', badge: 'New', badgeColor: '#C9A96E',
    name: 'Jardin Secret', brand: 'Frägra x Atelier',
    price: 45.00, originalPrice: 55.00, rating: 4.7, reviewCount: 432, stock: 41,
    sizes: ['50ml', '100ml'], inStock: true,
    image: `${BASE}/photo-1613521973937-efcfda6fdd95?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1613521973937-efcfda6fdd95?q=80&w=1600&auto=format&fit=crop`,
    gallery: [`${BASE}/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop`],
    tagline: 'Tuberose · Ylang-Ylang · Creamy Coconut',
    description: 'A secret garden discovered at dusk. White tuberose and ylang-ylang bloom over a creamy coconut base — romantic, luminous, completely original.',
    notes: { top: 'Green Leaf · Aldehyde', heart: 'Tuberose · Ylang-Ylang', base: 'Coconut · Musk · Vanilla' },
  },
  {
    id: 'pg-3', category: 'designer-collection', badge: null, badgeColor: null,
    name: "Côte d'Azur", brand: 'Frägra x Riviera',
    price: 45.00, originalPrice: null, rating: 4.8, reviewCount: 619, stock: 37,
    sizes: ['50ml', '100ml'], inStock: true,
    image: `${BASE}/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1598300042247-d088f8ab3a91?q=80&w=1600&auto=format&fit=crop`,
    gallery: [`${BASE}/photo-1541643600914-78b084683702?q=80&w=800&auto=format&fit=crop`],
    tagline: 'Mediterranean Fig · Sea Breeze · Driftwood',
    description: 'A sun-drenched afternoon on the Riviera. Mediterranean fig basks over sea breeze, anchored by warm driftwood that conjures a world of effortless elegance.',
    notes: { top: 'Mediterranean Fig · Bergamot', heart: 'Sea Breeze · White Flowers', base: 'Driftwood · Vetiver' },
  },

  // ── Perfumes ──────────────────────────────────────────────────────────
  {
    id: 'pp-1', category: 'perfumes', badge: 'Icon', badgeColor: '#1A1A1A',
    name: 'Frägra No. 1 — Lobby', brand: 'Frägra Eau de Parfum',
    price: 85.00, originalPrice: null, rating: 4.9, reviewCount: 1542, stock: 60,
    sizes: ['30ml', '50ml', '100ml'], inStock: true,
    image: `${BASE}/photo-1563170351-be82bc888aa4?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1563170351-be82bc888aa4?q=80&w=1600&auto=format&fit=crop`,
    gallery: [
      `${BASE}/photo-1616489953149-8f6f598c199e?q=80&w=800&auto=format&fit=crop`,
      `${BASE}/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop`,
    ],
    tagline: 'Eau de Parfum 18% · 10–14 Hour Longevity',
    description: 'Our signature hotel lobby scent, distilled into wearable form. The same crisp, refined opening note that greets guests at the world\'s finest properties — now on your skin.',
    notes: { top: 'White Tea · Bergamot · Neroli', heart: 'Cedar · Iris · Soft Florals', base: 'Warm Musk · Vetiver · Ambergris' },
  },
  {
    id: 'pp-2', category: 'perfumes', badge: 'New', badgeColor: '#C9A96E',
    name: 'Frägra No. 2 — Velvet', brand: 'Frägra Eau de Parfum',
    price: 85.00, originalPrice: null, rating: 4.8, reviewCount: 876, stock: 44,
    sizes: ['30ml', '50ml', '100ml'], inStock: true,
    image: `${BASE}/photo-1587017539504-67cfbddac569?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1587017539504-67cfbddac569?q=80&w=1600&auto=format&fit=crop`,
    gallery: [`${BASE}/photo-1488161628813-04466f872be2?q=80&w=800&auto=format&fit=crop`],
    tagline: 'Warm Vanilla · Oud · Cashmere Musk',
    description: 'A velvety oriental that begins with warmth and never lets go. Rich vanilla and precious oud are softened by a cashmere musk that makes this impossible to forget.',
    notes: { top: 'Cardamom · Dark Rose', heart: 'Oud · Vanilla Orchid', base: 'Cashmere Musk · Sandalwood' },
  },
  {
    id: 'pp-3', category: 'perfumes', badge: null, badgeColor: null,
    name: 'Frägra No. 3 — Bloom', brand: 'Frägra Eau de Parfum',
    price: 85.00, originalPrice: 99.00, rating: 4.7, reviewCount: 723, stock: 52,
    sizes: ['30ml', '50ml', '100ml'], inStock: true,
    image: `${BASE}/photo-1616489953149-8f6f598c199e?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1616489953149-8f6f598c199e?q=80&w=1600&auto=format&fit=crop`,
    gallery: [`${BASE}/photo-1563170351-be82bc888aa4?q=80&w=800&auto=format&fit=crop`],
    tagline: 'Peony · White Rose · Dewy Greens',
    description: 'Morning in a garden you never want to leave. Bloom opens with crisp dewy greens and peony petals, unfolding into a white rose heart that is gentle, radiant, and endlessly feminine.',
    notes: { top: 'Dewy Greens · Pear · Aldehydes', heart: 'Peony · White Rose · Magnolia', base: 'Musk · Cedarwood · White Amber' },
  },

  // ── Gift Sets ─────────────────────────────────────────────────────────
  {
    id: 'pg-g1', category: 'gift-sets', badge: 'Gift Ready', badgeColor: '#1A1A1A',
    name: 'Starter Discovery Set', brand: 'Frägra Gift',
    price: 79.00, originalPrice: 105.00, rating: 4.9, reviewCount: 1287, stock: 75,
    sizes: ['One Size'], inStock: true,
    image: `${BASE}/photo-1513201099705-a9746072f043?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1513201099705-a9746072f043?q=80&w=1600&auto=format&fit=crop`,
    gallery: [
      `${BASE}/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop`,
      `${BASE}/photo-1576426863848-c21f53c60b19?q=80&w=800&auto=format&fit=crop`,
    ],
    tagline: 'Mini Diffuser + 3 Signature Oil Samples',
    description: 'The perfect introduction to the Frägra universe. Discover three of our most beloved scents in a beautifully packaged set that makes an unforgettable first impression.',
    notes: { top: 'Curated Selection', heart: 'Three Exclusive Scents', base: 'Gift-Wrapped, Ready to Send' },
  },
  {
    id: 'pg-g2', category: 'gift-sets', badge: 'Popular', badgeColor: '#1A1A1A',
    name: 'Luxury Home Set', brand: 'Frägra Gift',
    price: 149.00, originalPrice: 195.00, rating: 4.9, reviewCount: 892, stock: 30,
    sizes: ['One Size'], inStock: true,
    image: `${BASE}/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop`,
    imageHD: `${BASE}/photo-1549465220-1a8b9238cd48?q=80&w=1600&auto=format&fit=crop`,
    gallery: [`${BASE}/photo-1513201099705-a9746072f043?q=80&w=800&auto=format&fit=crop`],
    tagline: 'Full-Size Diffuser + 2 Signature Oils',
    description: 'Everything needed to transform a home into a sanctuary. The full-size Stone Diffuser Pro paired with two signature fragrance oils in our rigid gift box with magnetic closure.',
    notes: { top: 'Premium Presentation', heart: 'Stone Diffuser Pro Included', base: 'Handwritten Card, Complimentary' },
  },
];

// ── Helper: get products by category ──
export function getProductsByCategory(category) {
  if (!category || category === 'all') return allProducts;
  return allProducts.filter((p) => p.category === category);
}

// ── Helper: get single product by id ──
export function getProductById(id) {
  return allProducts.find((p) => p.id === id) ?? null;
}

export default allProducts;
