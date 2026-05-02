// ─── Central Content Data ───────────────────────────────────────────────
// Setiap kunci = slug URL (/info/:slug)

const contentData = {
  "shop-now": {
    slug: "shop-now",
    title: "Shop Our Collection",
    subtitle: "CURATED LUXURY",
    heroImage: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=600&auto=format&fit=crop",
    description: [
      "Step into a world where scent transcends the ordinary. Our collection has been meticulously curated from the finest fragrance houses around the globe, each piece telling a story of craftsmanship, passion, and the relentless pursuit of olfactory perfection.",
      "Every fragrance in our boutique is an invitation — a whisper of distant gardens, ancient forests, and sun-warmed shores. We believe that the right scent does not merely fill a room; it transforms it into a sanctuary, a memory, a feeling that lingers long after you've left.",
      "From our signature cold-air diffusers to our rare oil concentrates, each product is born from the belief that luxury is not a privilege — it is a daily ritual that everyone deserves to experience.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1616489953149-8f6f598c199e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541643600914-78b084683702?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600612253971-1e7b97b4b048?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=800&auto=format&fit=crop",
    ],
    specifications: [
      { label: "Free Shipping", value: "On orders over $75" },
      { label: "Returns", value: "30-day hassle-free" },
      { label: "Authenticity", value: "IFRA Certified" },
      { label: "Ships From", value: "New York, USA" },
    ],
  },

  "shop-all": {
    slug: "shop-all",
    title: "All Products",
    subtitle: "COMPLETE COLLECTION",
    heroImage: "https://images.unsplash.com/photo-1616489953149-8f6f598c199e?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1616489953149-8f6f598c199e?q=80&w=600&auto=format&fit=crop",
    description: [
      "Our complete catalog is a testament to the art of fine fragrance — a living archive of scents that span continents and centuries of perfumery tradition. Browse freely, explore deeply.",
      "From the quietly intense to the boldly expressive, every product has earned its place through rigorous curation. We carry only what we ourselves would place in our own homes.",
      "Each piece is photographed, described, and priced with complete transparency. We believe you should know exactly what you are bringing into your world.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541643600914-78b084683702?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=800&auto=format&fit=crop",
    ],
    specifications: [
      { label: "Products", value: "120+ SKUs" },
      { label: "Origins", value: "12 Countries" },
      { label: "New Arrivals", value: "Every Month" },
      { label: "Gift Ready", value: "All Items" },
    ],
  },

  "scent-diffusers": {
    slug: "scent-diffusers",
    title: "Scent Diffusers Collection",
    subtitle: "COLD-AIR TECHNOLOGY",
    heroImage: "https://images.unsplash.com/photo-1600612253971-1e7b97b4b048?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1600612253971-1e7b97b4b048?q=80&w=600&auto=format&fit=crop",
    description: [
      "At the heart of our diffuser collection lies a quiet revolution: cold-air nebulizing technology that atomizes fragrance oil into a fine, dry mist — no heat, no water, no compromise. The molecular structure of each scent remains intact, filling your space with a purity that traditional methods simply cannot achieve.",
      "Our diffusers are designed with the same precision and care as the fragrances they carry. Every curve, every material, every internal component has been engineered to perform flawlessly for years. They are objects of beauty that also happen to function extraordinarily well.",
      "Whether you choose the commanding presence of the Stone Pro or the quiet elegance of the Ceramic Mist, you are investing in a daily ritual that transforms the very air you breathe.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1547496502-affa22e38b1c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608181831718-c9e3c34f5c5a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop",
    ],
    specifications: [
      { label: "Technology", value: "Cold-Air Nebulizing" },
      { label: "Coverage", value: "Up to 1,500 sq ft" },
      { label: "Noise Level", value: "< 25 dB (Whisper-Quiet)" },
      { label: "Safety", value: "No Heat · No Water" },
    ],
  },

  "hotel-collection": {
    slug: "hotel-collection",
    title: "Hotel Collection",
    subtitle: "FIVE-STAR AMBIANCE",
    heroImage: "https://images.unsplash.com/photo-1551882547-ff40c63fe1d6?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1551882547-ff40c63fe1d6?q=80&w=600&auto=format&fit=crop",
    description: [
      "The moment you step into a great hotel, something happens before a single word is exchanged — the scent greets you. It is warm, refined, and unmistakably deliberate. Our Hotel Collection was born from years of study into this phenomenon, decoding the olfactory signatures of the world's most celebrated properties.",
      "Collaborated with renowned perfumers and hospitality consultants, each scent in this collection captures the essence of a specific environment: the lobby's quiet grandeur, the spa's meditative stillness, the suite's intimate warmth.",
      "Now, that experience is yours to own. Not as a memory of travel, but as a permanent feature of your daily life.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=800&auto=format&fit=crop",
    ],
    specifications: [
      { label: "Inspired By", value: "World-Class Hotels" },
      { label: "Formulation", value: "Fine Fragrance Grade" },
      { label: "Concentration", value: "15–20% Aromatic Compounds" },
      { label: "Longevity", value: "8–12 Hours per Session" },
    ],
  },

  "designer-collection": {
    slug: "designer-collection",
    title: "Designer Collection",
    subtitle: "ARTISAN CRAFTED",
    heroImage: "https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=600&auto=format&fit=crop",
    description: [
      "Perfumery at its most elevated is an art form equal to painting or sculpture — and our Designer Collection treats it as such. Each fragrance is the result of a collaboration between our master blenders and internationally recognized creative minds who bring unique perspectives to the language of scent.",
      "The results are fragrances that do not merely smell beautiful; they make a statement. They are worn by spaces with confidence, held by the air with intention, and remembered by everyone who enters.",
      "Limited editions. Numbered bottles. Uncommon materials. This is fragrance for those who refuse the ordinary.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613521973937-efcfda6fdd95?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541643600914-78b084683702?q=80&w=800&auto=format&fit=crop",
    ],
    specifications: [
      { label: "Edition", value: "Limited Run" },
      { label: "Bottle", value: "Hand-Blown Glass" },
      { label: "Ingredients", value: "Ethically Sourced" },
      { label: "Certification", value: "IFRA & Vegan" },
    ],
  },

  "perfumes": {
    slug: "perfumes",
    title: "Personal Fragrances",
    subtitle: "WEAR YOUR WORLD",
    heroImage: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=600&auto=format&fit=crop",
    description: [
      "A personal fragrance is the most intimate extension of self — it lingers in rooms after you've left, in the memory of those who love you, in the fabric of who you are. Our perfume line was born from the desire to make that statement with extraordinary precision.",
      "Each of our Eau de Parfum formulations carries a minimum of 18% aromatic concentration — well above industry standard — ensuring that a single application stays with you through every hour of your day.",
      "We have translated our most beloved home scents into wearable luxury. The same ingredients. The same craftsmanship. Now carried close to the skin.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1616489953149-8f6f598c199e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=800&auto=format&fit=crop",
    ],
    specifications: [
      { label: "Concentration", value: "Eau de Parfum (18%+)" },
      { label: "Volume", value: "30ml / 50ml / 100ml" },
      { label: "Longevity", value: "10–14 Hours" },
      { label: "Projection", value: "Moderate to Strong" },
    ],
  },

  "about-us": {
    slug: "about-us",
    title: "About Frägra",
    subtitle: "OUR STORY",
    heroImage: "https://images.unsplash.com/photo-1547496502-affa22e38b1c?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1547496502-affa22e38b1c?q=80&w=600&auto=format&fit=crop",
    description: [
      "Frägra was born from a single question asked in a hotel lobby in Kyoto: why does this place feel so different? The answer, we discovered after months of research and contemplation, was invisible — it was the scent. That discovery became an obsession, and that obsession became a company.",
      "Founded in 2026 by a team of fragrance enthusiasts, engineers, and designers, Frägra set out to democratize the luxury hotel scenting experience. We reverse-engineered the cold-air diffusion systems used in five-star properties worldwide and created versions that belong in every home.",
      "Today, Frägra operates from our studio in New York, where every product is tested, refined, and quality-assured before it reaches you. We are small by choice, meticulous by nature, and passionate about one thing: making your home smell extraordinary.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&auto=format&fit=crop",
    ],
    specifications: [
      { label: "Founded", value: "2026, New York" },
      { label: "Mission", value: "Democratize Luxury Scenting" },
      { label: "Certifications", value: "IFRA · Vegan · Cruelty-Free" },
      { label: "Sustainability", value: "Carbon-Neutral by 2027" },
    ],
  },

  "contact": {
    slug: "contact",
    title: "Get In Touch",
    subtitle: "WE'D LOVE TO HEAR FROM YOU",
    heroImage: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=600&auto=format&fit=crop",
    description: [
      "Every great relationship begins with a conversation. Whether you have a question about a specific fragrance, need guidance choosing the right diffuser, or are interested in our wholesale program, we are here and genuinely happy to hear from you.",
      "Our customer experience team is not a chatbot or a call center — they are fragrance enthusiasts who use our products daily and are positioned to give you honest, knowledgeable answers.",
      "Reach us through any channel below and expect a response within 24 business hours. For urgent matters, our live chat is available Monday through Friday, 9AM to 6PM EST.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=800&auto=format&fit=crop",
    ],
    specifications: [
      { label: "Email", value: "hello@fragra.com" },
      { label: "Phone", value: "+1 (800) 555-7236" },
      { label: "Hours", value: "Mon–Fri, 9AM–6PM EST" },
      { label: "Address", value: "123 Fragrance Lane, NY 10001" },
    ],
  },

  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    subtitle: "YOUR TRUST, OUR COMMITMENT",
    heroImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
    description: [
      "At Frägra, privacy is not a legal formality — it is a foundational value. We collect only the information necessary to provide you with an exceptional experience, and we handle that information with the same care we apply to our fragrances.",
      "We never sell, rent, or trade your personal data. Period. Any third-party service providers who assist us in delivering our products and services are contractually obligated to maintain the same standards we hold ourselves to.",
      "This policy was last updated January 2026. Should anything change in how we handle your data, we will notify you directly via email before those changes take effect.",
    ],
    gallery: [],
    specifications: [
      { label: "Last Updated", value: "January 2026" },
      { label: "Data Sold", value: "Never" },
      { label: "Encryption", value: "256-bit SSL/TLS" },
      { label: "Compliance", value: "GDPR · CCPA" },
    ],
  },

  "terms-of-service": {
    slug: "terms-of-service",
    title: "Terms of Service",
    subtitle: "LEGAL",
    heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop",
    description: [
      "By accessing and using Frägra's website and services, you agree to abide by the following terms. We've written them in plain language because we believe legal documents should be readable by real people.",
      "Our 30-day return policy is unconditional: if you are not satisfied, we will make it right. All intellectual property on this platform — images, copy, brand assets — belongs to Frägra and may not be reproduced without written consent.",
      "We reserve the right to update these terms as our business evolves. Continued use of our services constitutes acceptance of any revised terms.",
    ],
    gallery: [],
    specifications: [
      { label: "Return Window", value: "30 Days, No Questions" },
      { label: "Jurisdiction", value: "New York, USA" },
      { label: "Language", value: "English (Governing)" },
      { label: "Version", value: "v2.1 — Jan 2026" },
    ],
  },

  "cookie-policy": {
    slug: "cookie-policy",
    title: "Cookie Policy",
    subtitle: "TRANSPARENCY FIRST",
    heroImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop",
    description: [
      "Cookies are small data files that help our website remember you and function properly. We use them thoughtfully and only where necessary to deliver a smooth, personalized experience.",
      "You are always in control. You can manage your cookie preferences through your browser settings at any time, though disabling certain cookies may affect site functionality.",
      "We use three categories of cookies: strictly necessary (required for checkout and login), performance (anonymous analytics), and marketing (personalized recommendations). The latter two require your consent.",
    ],
    gallery: [],
    specifications: [
      { label: "Essential Cookies", value: "Always Active" },
      { label: "Analytics", value: "Opt-In" },
      { label: "Marketing", value: "Opt-In" },
      { label: "Consent Tool", value: "Available on Site" },
    ],
  },

  "faq": {
    slug: "faq",
    title: "Frequently Asked Questions",
    subtitle: "WE'VE GOT ANSWERS",
    heroImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    description: [
      "We have gathered the most common questions from our community and answered them as thoroughly and honestly as we can. If your question isn't here, our support team is only one message away.",
      "Cold-air diffusion technology is new to many of our customers, and we understand there is a learning curve. We've made it our mission to ensure that every Frägra customer feels completely confident with their purchase.",
      "From installation to refills, from scent pairing to troubleshooting, this page is your first stop for guidance.",
    ],
    gallery: [],
    specifications: [
      { label: "Oil Bottle Lifespan", value: "2–3 Months (Regular Use)" },
      { label: "Suitable For", value: "Kids, Pets, Pregnancy-Safe" },
      { label: "Power", value: "12V DC Adapter Included" },
      { label: "Shipping Regions", value: "US · CA · UK · EU" },
    ],
  },

  "shipping": {
    slug: "shipping",
    title: "Shipping & Returns",
    subtitle: "FAST & HASSLE-FREE",
    heroImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
    description: [
      "We understand that when you order something beautiful, you want it to arrive quickly and in perfect condition. Every Frägra order is packed by hand in our New York studio, protected with recyclable materials, and dispatched within one business day.",
      "Standard shipping is free on orders over $75. Express options are available at checkout. International shipping is currently available to Canada, the United Kingdom, and selected European Union countries.",
      "Not satisfied? Our 30-day return policy is as simple as sending us an email. No lengthy forms, no restocking fees, no hassle. We want you to love what you buy — and if you don't, we want to make it right.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
    ],
    specifications: [
      { label: "Standard Shipping", value: "Free over $75 · 5–7 Days" },
      { label: "Express Shipping", value: "$12.99 · 2–3 Days" },
      { label: "Return Window", value: "30 Days from Delivery" },
      { label: "Processing Time", value: "1 Business Day" },
    ],
  },

  "gift-sets": {
    slug: "gift-sets",
    title: "Luxury Gift Sets",
    subtitle: "THE ART OF GIFTING",
    heroImage: "https://images.unsplash.com/photo-1513201099705-a9746072f043?q=80&w=1400&auto=format&fit=crop",
    thumbnail: "https://images.unsplash.com/photo-1513201099705-a9746072f043?q=80&w=600&auto=format&fit=crop",
    description: [
      "A Frägra gift set is not merely a collection of products in a box — it is an experience, carefully composed and beautifully presented. Whether for a milestone celebration, a gesture of appreciation, or simply because they deserve the finest things, our gift sets deliver a moment of genuine luxury.",
      "Every set is assembled by hand, wrapped in our signature dark tissue, and nestled within a rigid gift box finished with a magnetic closure. No gifting message? We can include a handwritten card for no additional charge.",
      "Because the best gifts are the ones that change how someone experiences their everyday life.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511895426328-dc8714191011?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513201099705-a9746072f043?q=80&w=800&auto=format&fit=crop",
    ],
    specifications: [
      { label: "Packaging", value: "Rigid Gift Box + Tissue" },
      { label: "Card", value: "Handwritten, Complimentary" },
      { label: "Delivery", value: "Gift-Ready on Arrival" },
      { label: "Customization", value: "Scent Pairing Available" },
    ],
  },
};

export default contentData;

// ─── Label → slug mapper ───
export const labelToSlug = {
  "Shop Now": "shop-now",
  "Shop All": "shop-all",
  "All Products": "shop-all",
  "Best Sellers": "shop-all",
  "New Arrivals": "shop-all",
  "Gift Sets": "gift-sets",
  "Scent Diffusers": "scent-diffusers",
  "Cold-Air Diffusers": "scent-diffusers",
  "Mini Diffusers": "scent-diffusers",
  "Car Diffusers": "scent-diffusers",
  "Hotel Collection": "hotel-collection",
  "Hotel Scents": "hotel-collection",
  "Lobby Collection": "hotel-collection",
  "Premium Line": "hotel-collection",
  "Designer Collection": "designer-collection",
  "Perfumes": "perfumes",
  "About Frägra": "about-us",
  "Our Story": "about-us",
  "Press": "about-us",
  "Careers": "about-us",
  "Sustainability": "about-us",
  "Contact Us": "contact",
  "FAQ": "faq",
  "Shipping & Returns": "shipping",
  "Track My Order": "shipping",
  "Warranty": "faq",
  "Privacy Policy": "privacy-policy",
  "Terms of Service": "terms-of-service",
  "Terms": "terms-of-service",
  "Cookie Policy": "cookie-policy",
  "Cookies": "cookie-policy",
};
