import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import ProductDetailOverlay from '../components/ProductDetailOverlay';

// ─── Dummy Data ───
const pageContent = {
  "/shop-now": {
    title: "Shop Now",
    subtitle: "CURATED COLLECTION",
    description: "Discover our full range of premium cold-air diffusers and signature fragrance oils, carefully crafted to bring the essence of luxury hospitality into your home.",
    heroImage: null,
    sections: [
      {
        heading: "Featured Products",
        items: [
          { name: "Signature Home Diffuser", price: "$89.00", desc: "Our best-selling cold-air diffuser for spaces up to 1,000 sq ft." },
          { name: "Mini Portable Diffuser", price: "$49.00", desc: "Perfect for bedrooms, offices, and small spaces." },
          { name: "Luxury Gift Set", price: "$129.00", desc: "Diffuser + 3 signature fragrance oils in an elegant gift box." },
        ],
      },
      {
        heading: "Best Sellers",
        items: [
          { name: "Hotel Lobby Scent Oil", price: "$24.00", desc: "The iconic fresh linen and white tea blend." },
          { name: "Midnight Rose Oil", price: "$28.00", desc: "Rich Damascus rose with warm sandalwood base." },
          { name: "Ocean Breeze Oil", price: "$24.00", desc: "Crisp sea salt with coastal driftwood notes." },
        ],
      },
    ],
  },
  "/shop-all": {
    title: "Shop All Products",
    subtitle: "COMPLETE COLLECTION",
    description: "Browse our entire catalog of premium scenting products. From cold-air diffusers to signature fragrance oils, find everything you need for a luxury home experience.",
    sections: [
      {
        heading: "Diffusers",
        items: [
          { name: "Stone Diffuser Pro", price: "$119.00", desc: "Premium stone-finish diffuser for large living spaces." },
          { name: "Ceramic Mist Diffuser", price: "$89.00", desc: "Handcrafted ceramic with whisper-quiet technology." },
          { name: "Portable Car Diffuser", price: "$39.00", desc: "Clip-on design for your vehicle's air vent." },
        ],
      },
      {
        heading: "Fragrance Oils",
        items: [
          { name: "Velvet Oud", price: "$32.00", desc: "Rich oud wood blended with creamy vanilla." },
          { name: "Garden of Versailles", price: "$28.00", desc: "French lavender, peony, and morning dew." },
          { name: "Tokyo Zen", price: "$28.00", desc: "Green tea, bamboo, and white musk." },
        ],
      },
    ],
  },
  "/scent-diffusers": {
    title: "Scent Diffusers Collection",
    subtitle: "COLD-AIR TECHNOLOGY",
    description: "Explore our premium range of essential oil diffusers designed for elegance. Using advanced cold-air nebulizing technology, our diffusers preserve the integrity of every fragrance note.",
    sections: [
      {
        heading: "Home Diffusers",
        items: [
          { name: "Stone Diffuser", price: "$119.00", desc: "Natural stone finish, covers up to 1,500 sq ft." },
          { name: "Ceramic Mist", price: "$89.00", desc: "Artisan ceramic design with smart scheduling." },
          { name: "Glass Tower", price: "$149.00", desc: "Borosilicate glass with ambient LED lighting." },
        ],
      },
      {
        heading: "Portable Diffusers",
        items: [
          { name: "Mini Travel Diffuser", price: "$49.00", desc: "USB-C rechargeable, 8-hour battery life." },
          { name: "Car Clip Diffuser", price: "$39.00", desc: "Sleek clip-on design for any vehicle." },
          { name: "Desk Diffuser", price: "$59.00", desc: "Compact design perfect for your workspace." },
        ],
      },
    ],
  },
  "/hotel-collection": {
    title: "Hotel Collection",
    subtitle: "LUXURY HOSPITALITY",
    description: "Experience the exact scents used by the world's most prestigious hotels. Our Hotel Collection brings five-star ambiance directly to your home.",
    sections: [
      {
        heading: "Signature Hotel Scents",
        items: [
          { name: "The Ritz Lobby", price: "$34.00", desc: "White tea, cedar, and a hint of bergamot." },
          { name: "Grand Hyatt Suite", price: "$34.00", desc: "Fresh linen, jasmine, and warm amber." },
          { name: "Four Seasons Spa", price: "$34.00", desc: "Eucalyptus, mint, and calming lavender." },
        ],
      },
      {
        heading: "Premium Line",
        items: [
          { name: "Waldorf Evening", price: "$42.00", desc: "Black orchid, vanilla bourbon, and musk." },
          { name: "Peninsula Morning", price: "$42.00", desc: "Citrus blossom, green tea, and white woods." },
          { name: "Aman Retreat", price: "$42.00", desc: "Sandalwood, frankincense, and wild honey." },
        ],
      },
    ],
  },
  "/designer-collection": {
    title: "Designer Collection",
    subtitle: "ARTISAN CRAFTED",
    description: "Our Designer Collection features exclusive fragrance profiles created in collaboration with world-renowned perfumers. Each scent is a masterpiece of olfactory art.",
    sections: [
      {
        heading: "Exclusive Editions",
        items: [
          { name: "Noir Absolu", price: "$48.00", desc: "Deep oud, black pepper, and leather accord." },
          { name: "Jardin Secret", price: "$45.00", desc: "Tuberose, ylang-ylang, and creamy coconut." },
          { name: "Côte d'Azur", price: "$45.00", desc: "Mediterranean fig, sea breeze, and warm driftwood." },
        ],
      },
    ],
  },
  "/perfumes": {
    title: "Perfumes",
    subtitle: "PERSONAL FRAGRANCE",
    description: "Carry the essence of Frägra with you. Our perfume line translates our most beloved home scents into wearable luxury fragrances.",
    sections: [
      {
        heading: "Eau de Parfum",
        items: [
          { name: "Frägra No. 1 — Lobby", price: "$85.00", desc: "Our signature hotel lobby scent, now wearable. 50ml." },
          { name: "Frägra No. 2 — Velvet", price: "$85.00", desc: "Warm vanilla, oud, and cashmere musk. 50ml." },
          { name: "Frägra No. 3 — Bloom", price: "$85.00", desc: "Peony, white rose, and dewy greens. 50ml." },
        ],
      },
    ],
  },
  "/about-us": {
    title: "About Frägra",
    subtitle: "OUR STORY",
    description: "Crafting the finest fragrance oils since 2026, inspired by luxury and nature. We believe every home deserves to smell as extraordinary as the world's finest hotels.",
    sections: [
      {
        heading: "Our Mission",
        items: [
          { name: "Our Story", desc: "Founded with a passion for bringing hotel-level scenting to everyday homes, Frägra was born from the belief that scent has the power to transform spaces and elevate daily life." },
          { name: "The Process", desc: "Every fragrance oil is meticulously crafted using IFRA-certified ingredients, blended by expert perfumers, and tested for optimal diffusion through cold-air technology." },
          { name: "Sustainability", desc: "We are committed to eco-conscious practices — from recyclable packaging to cruelty-free formulations and responsibly sourced raw materials." },
        ],
      },
    ],
  },
  "/contact": {
    title: "Contact Us",
    subtitle: "GET IN TOUCH",
    description: "We'd love to hear from you. Whether you have a question about our products, need help with an order, or want to explore wholesale opportunities.",
    sections: [
      {
        heading: "Reach Out",
        items: [
          { name: "Email", desc: "hello@fragra.com — We respond within 24 hours." },
          { name: "Phone", desc: "+1 (800) 555-SCENT — Mon-Fri, 9AM-6PM EST." },
          { name: "Headquarters", desc: "123 Fragrance Lane, New York, NY 10001, USA." },
        ],
      },
    ],
  },
  "/privacy-policy": {
    title: "Privacy Policy",
    subtitle: "YOUR DATA, YOUR TRUST",
    description: "At Frägra, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.",
    sections: [
      {
        heading: "Key Points",
        items: [
          { name: "Data Collection", desc: "We collect only the information necessary to process your orders and improve your shopping experience." },
          { name: "Data Protection", desc: "All personal data is encrypted using industry-standard SSL/TLS protocols and stored securely." },
          { name: "Third Parties", desc: "We never sell your personal information. Data is shared only with essential service providers for order fulfillment." },
        ],
      },
    ],
  },
  "/terms-of-service": {
    title: "Terms of Service",
    subtitle: "LEGAL",
    description: "Please read these terms carefully before using our website or purchasing our products. By accessing Frägra, you agree to be bound by these terms.",
    sections: [
      {
        heading: "Overview",
        items: [
          { name: "General Terms", desc: "By using this site, you agree to comply with all applicable laws and regulations governing your use of our services." },
          { name: "Returns & Refunds", desc: "We offer a 30-day hassle-free return policy. Products must be in original condition for a full refund." },
          { name: "Intellectual Property", desc: "All content, branding, and product designs are the exclusive property of Frägra and protected by copyright law." },
        ],
      },
    ],
  },
  "/cookie-policy": {
    title: "Cookie Policy",
    subtitle: "LEGAL",
    description: "This policy explains how Frägra uses cookies and similar technologies to enhance your browsing experience.",
    sections: [
      {
        heading: "How We Use Cookies",
        items: [
          { name: "Essential Cookies", desc: "Required for the website to function properly, including cart and checkout features." },
          { name: "Analytics Cookies", desc: "Help us understand how visitors interact with our website so we can improve the experience." },
          { name: "Marketing Cookies", desc: "Used to deliver relevant advertisements and track campaign performance." },
        ],
      },
    ],
  },
  "/faq": {
    title: "Frequently Asked Questions",
    subtitle: "SUPPORT",
    description: "Find answers to the most common questions about our products, shipping, and returns.",
    sections: [
      {
        heading: "Common Questions",
        items: [
          { name: "How long does a fragrance oil last?", desc: "Each 100ml bottle lasts approximately 2-3 months with regular use at medium intensity." },
          { name: "Are your products safe for pets?", desc: "Yes! Our cold-air diffusers and fragrance oils are IFRA-certified and safe for use around children and pets." },
          { name: "Do you offer international shipping?", desc: "We currently ship to the US, Canada, UK, and selected EU countries. More regions coming soon." },
        ],
      },
    ],
  },
  "/shipping": {
    title: "Shipping & Returns",
    subtitle: "SUPPORT",
    description: "Everything you need to know about our shipping options and hassle-free return policy.",
    sections: [
      {
        heading: "Shipping Info",
        items: [
          { name: "Standard Shipping", desc: "Free on orders over $75. Delivery in 5-7 business days." },
          { name: "Express Shipping", desc: "$12.99 flat rate. Delivery in 2-3 business days." },
          { name: "30-Day Returns", desc: "Not satisfied? Return any product within 30 days for a full refund. No questions asked." },
        ],
      },
    ],
  },
  "/gift-sets": {
    title: "Gift Sets",
    subtitle: "LUXURY GIFTING",
    description: "The perfect gift for any occasion. Each set is beautifully packaged and ready to delight.",
    sections: [
      {
        heading: "Our Gift Sets",
        items: [
          { name: "Starter Discovery Set", price: "$79.00", desc: "Mini diffuser + 3 best-selling fragrance oil samples." },
          { name: "Luxury Home Set", price: "$149.00", desc: "Full-size diffuser + 2 signature oils in a premium gift box." },
          { name: "Ultimate Collection", price: "$249.00", desc: "Stone diffuser + 5 oils + exclusive carrying case." },
        ],
      },
    ],
  },
};

// ─── Helper: slug from label ───
export function labelToPath(label) {
  const map = {
    "Shop Now": "/shop-now",
    "Shop All": "/shop-all",
    "All Products": "/shop-all",
    "Best Sellers": "/shop-all",
    "New Arrivals": "/shop-all",
    "Gift Sets": "/gift-sets",
    "Scent Diffusers": "/scent-diffusers",
    "Cold-Air Diffusers": "/scent-diffusers",
    "Mini Diffusers": "/scent-diffusers",
    "Car Diffusers": "/scent-diffusers",
    "Hotel Collection": "/hotel-collection",
    "Hotel Scents": "/hotel-collection",
    "Lobby Collection": "/hotel-collection",
    "Premium Line": "/hotel-collection",
    "Designer Collection": "/designer-collection",
    "Perfumes": "/perfumes",
    "About Frägra": "/about-us",
    "Our Story": "/about-us",
    "Press": "/about-us",
    "Careers": "/about-us",
    "Sustainability": "/about-us",
    "Contact Us": "/contact",
    "FAQ": "/faq",
    "Shipping & Returns": "/shipping",
    "Track My Order": "/shipping",
    "Warranty": "/faq",
    "Privacy Policy": "/privacy-policy",
    "Terms of Service": "/terms-of-service",
    "Terms": "/terms-of-service",
    "Cookie Policy": "/cookie-policy",
    "Cookies": "/cookie-policy",
  };
  return map[label] || "/" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
}

// ─── Component ───
export default function GeneralContentPage() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const data = pageContent[location.pathname];

  useEffect(() => {
    setVisible(false);
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // ── Coming Soon fallback ──
  if (!data) {
    return (
      <>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#F3F0E9",
            paddingTop: 96,
            textAlign: "center",
            padding: "96px 24px 80px",
          }}
        >
          <div
            style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "#1A1A1A", display: "flex",
              alignItems: "center", justifyContent: "center",
              marginBottom: 28,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", marginBottom: 10 }}>
            COMING SOON
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 36, fontWeight: 400, color: "#1A1A1A", margin: "0 0 14px" }}>
            Content Coming Soon
          </h1>
          <p style={{ color: "#717171", fontSize: 14, maxWidth: 420, lineHeight: 1.7, marginBottom: 32 }}>
            We're working hard to bring you something beautiful. Check back soon for updates.
          </p>
          <Link
            to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#1A1A1A", color: "white",
              borderRadius: 999, padding: "12px 24px",
              fontSize: 13, fontWeight: 500, textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
          >
            Back to Home
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // ── Main content ──
  return (
    <>
      <div
        style={{
          background: "#F3F0E9",
          minHeight: "100vh",
          paddingTop: 96,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.6s ease-in-out, transform 0.6s ease-in-out",
        }}
      >
        {/* ── Hero Header ── */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 60px", textAlign: "center" }}>
          {data.subtitle && (
            <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", marginBottom: 12 }}>
              {data.subtitle}
            </p>
          )}
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 400, color: "#1A1A1A", margin: "0 0 16px" }}>
            {data.title}
          </h1>
          <p style={{ color: "#717171", fontSize: 14, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            {data.description}
          </p>

          {/* Decorative divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <div style={{ width: 40, height: 1, background: "#D4D0C8" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C9A96E" }} />
            <div style={{ width: 40, height: 1, background: "#D4D0C8" }} />
          </div>
        </div>

        {/* ── Sections ── */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
          {data.sections.map((section, si) => (
            <div
              key={si}
              style={{
                marginBottom: 48,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease-in-out ${si * 0.15}s, transform 0.6s ease-in-out ${si * 0.15}s`,
              }}
            >
              <h2 style={{
                fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 400,
                color: "#1A1A1A", marginBottom: 20, paddingBottom: 12,
                borderBottom: "1px solid #E5E1D8",
              }}>
                {section.heading}
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                {section.items.map((item, ii) => (
                  <ItemCard 
                    key={ii} 
                    item={item} 
                    index={ii} 
                    visible={visible} 
                    sectionIndex={si} 
                    onClick={() => setSelectedProduct(item)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Back to Home ── */}
        <div style={{ textAlign: "center", paddingBottom: 60 }}>
          <Link
            to="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#1A1A1A", color: "white",
              borderRadius: 999, padding: "12px 24px",
              fontSize: 13, fontWeight: 500, textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
          >
            Back to Home
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
      <Footer />
      <ProductDetailOverlay 
        product={selectedProduct} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
}

// ─── Item Card ───
function ItemCard({ item, index, visible, sectionIndex, onClick }) {
  const [hovered, setHovered] = useState(false);

  const baseImgUrl = `https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&auto=format&fit=crop`;
  const img800 = `${baseImgUrl}&w=800`;
  const layoutId = `product-image-${item.name}`;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        borderRadius: 18,
        padding: "24px 22px",
        border: "1px solid #E5E1D8",
        transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease, opacity 0.5s ease-in-out, translateY 0.5s ease-in-out",
        transform: hovered ? "scale(1.03)" : "scale(1)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div className="w-full h-48 mb-6 relative rounded-lg overflow-hidden bg-frag-cream flex items-center justify-center">
        <motion.img 
          layoutId={layoutId}
          src={img800}
          alt={item.name}
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      <div style={{
        width: 10, height: 10, borderRadius: "50%",
        background: "#C9A96E", marginBottom: 14, opacity: 0.7,
      }} />

      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1A1A1A", marginBottom: 6 }}>
        {item.name}
      </h3>

      {item.price && (
        <p style={{ fontFamily: "Georgia, serif", fontSize: 18, color: "#1A1A1A", marginBottom: 8 }}>
          {item.price}
        </p>
      )}

      <p style={{ fontSize: 13, color: "#717171", lineHeight: 1.6, margin: 0 }}>
        {item.desc}
      </p>
    </div>
  );
}
