import { useState } from "react";

const collections = [
  {
    id: 1,
    name: "The Riviera Collection: Mediterranean Citrus & Fig",
    category: "Guide",
    date: "Summer Exclusive",
    // Premium perfume bottle aesthetic
    image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=600&auto=format&fit=crop",
    tag: "Popular",
    url: "/shop/signature-oils",
  },
  {
    id: 2,
    name: "The Chalet Collection: Smoked Oud & Vanilla",
    category: "Nov 21, 2025",
    date: "Winter Essential",
    // Essential oil drops / amber bottle
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
    tag: "New In",
    url: "/shop/scent-diffusers",
  },
  {
    id: 3,
    name: "The Grand Plaza Collection: White Tea & Thyme",
    category: "Guide",
    date: "Signature Series",
    // Abstract elegant smoke/perfume display
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600&auto=format&fit=crop",
    tag: "Editor Pick",
    url: "/shop/designer-collection",
  },
];

export default function ShopByHotel() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ background: "#F3F0E9", padding: "0 24px 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.2em", color: "#888", textTransform: "uppercase", marginBottom: 10 }}>
              Curated Masterpieces
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 34, fontWeight: 400, color: "#1A1A1A", margin: 0 }}>
              The Signature Collections
            </h2>
          </div>
          <a href="/shop/signature-oils" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#1A1A1A", color: "white",
            borderRadius: 999, padding: "9px 18px",
            fontSize: 12, fontWeight: 500, textDecoration: "none",
            transition: "background 0.2s",
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#333"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#1A1A1A"}
          >
            Explore All
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {collections.map((collection) => (
            <a
              key={collection.id}
              href={collection.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(collection.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                background: "white",
                border: "1px solid #E5E1D8",
                textDecoration: "none",
                display: "block",
                transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
                transform: hovered === collection.id ? "scale(1.04)" : "scale(1)",
                boxShadow: hovered === collection.id ? "0 20px 50px rgba(0,0,0,0.14)" : "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              {/* Image */}
              <div style={{ height: 180, background: "#EDE9E1", overflow: "hidden", position: "relative" }}>
                <img
                  src={collection.image}
                  alt={`${collection.name} — Signature Collection`}
                  loading="lazy"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.5s ease, filter 0.4s ease",
                    transform: hovered === collection.id ? "scale(1.06)" : "scale(1)",
                    filter: hovered === collection.id ? "grayscale(0%)" : "grayscale(15%)",
                  }}
                  onError={(e) => {
                    e.target.src = `https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600&auto=format&fit=crop`;
                  }}
                />
                {/* Tag */}
                {collection.tag && (
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    background: "#1A1A1A", color: "white",
                    fontSize: 10, fontWeight: 600,
                    padding: "4px 10px", borderRadius: 999,
                    letterSpacing: "0.05em",
                  }}>
                    {collection.tag}
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: "20px 20px 24px" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#888", marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {collection.date}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#1A1A1A", lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
                  {collection.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}