import { useState } from "react";

const hotels = [
  {
    id: 1,
    name: "How to Choose the Perfect Tea Makeup",
    category: "Guide",
    date: "Jun 15, 2025",
    image: "/assets/hotel-1.jpg",
    tag: "Popular",
    url: "/hotel/tea-makeup",
  },
  {
    id: 2,
    name: "The Distinctive Art to Diffuse: When to Diffuse Scent Daily",
    category: "Nov 21, 2025",
    date: "Nov 21, 2025",
    image: "/assets/hotel-2.jpg",
    tag: "New In",
    url: "/hotel/diffuse-daily",
  },
  {
    id: 3,
    name: "The Best Ingredients for Home Scent Sets used at Hotel",
    category: "Guide",
    date: "Jun 18, 2025",
    image: "/assets/hotel-3.jpg",
    tag: "Editor Pick",
    url: "/hotel/best-ingredients",
  },
];

export default function ShopByHotel() {
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ background: "#F3F0E9", padding: "0 24px 80px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", marginBottom: 6 }}>
              Shop By Hotel
            </p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 30, fontWeight: 400, color: "#1A1A1A", margin: 0 }}>
              Hotel Scent Collections
            </h2>
          </div>
          <a href="/hotel" style={{
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
          {hotels.map((hotel) => (
            <a
              key={hotel.id}
              href={hotel.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(hotel.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderRadius: 18,
                overflow: "hidden",
                background: "white",
                border: "1px solid #E5E1D8",
                textDecoration: "none",
                display: "block",
                transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
                transform: hovered === hotel.id ? "scale(1.04)" : "scale(1)",
                boxShadow: hovered === hotel.id ? "0 20px 50px rgba(0,0,0,0.14)" : "0 2px 10px rgba(0,0,0,0.05)",
              }}
            >
              {/* Image */}
              <div style={{ height: 180, background: "#EDE9E1", overflow: "hidden", position: "relative" }}>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.5s ease",
                    transform: hovered === hotel.id ? "scale(1.06)" : "scale(1)",
                  }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                {/* Tag */}
                {hotel.tag && (
                  <div style={{
                    position: "absolute", top: 12, left: 12,
                    background: "#1A1A1A", color: "white",
                    fontSize: 10, fontWeight: 600,
                    padding: "4px 10px", borderRadius: 999,
                    letterSpacing: "0.05em",
                  }}>
                    {hotel.tag}
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ padding: "16px 16px 18px" }}>
                <p style={{ fontSize: 11, color: "#888", marginBottom: 6, letterSpacing: "0.05em" }}>
                  {hotel.date}
                </p>
                <p style={{ fontSize: 13, color: "#1A1A1A", lineHeight: 1.5, fontWeight: 500, margin: 0 }}>
                  {hotel.name}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}