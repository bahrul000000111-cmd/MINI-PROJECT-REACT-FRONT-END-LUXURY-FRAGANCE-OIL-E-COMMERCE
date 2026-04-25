import { useState } from "react";

function Check() {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: "50%",
      background: "rgba(255,255,255,0.15)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function Cross() {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: "50%",
      background: "#FDDDD9",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
        <path d="M3 3l6 6M9 3l-6 6" stroke="#E53935" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

const cards = [
  {
    id: "fragra",
    dark: true,
    imageSrc: "/assets/fragra-product.png",
    imageAlt: "Frägra Diffuser",
    features: [
      { label: "Cold Air Diffusion Technology", has: true },
      { label: "Safe For Kids & Pets", has: true },
      { label: "Clean, Residue-Free Scenting", has: true },
      { label: "Neutralizes Odors", has: true },
    ],
    price: "$89.00",
    originalPrice: "$120.00",
    productUrl: "/products/fragra-diffuser",
    cta: "Shop Frägra",
  },
  {
    id: "candle",
    dark: false,
    imageSrc: "/assets/candle-product.png",
    imageAlt: "Candle",
    productName: "Candle",
    features: [
      { label: "Requires heat and open flame", has: false },
      { label: "Can produce soot and residue", has: false },
      { label: "Scent fades quickly after extinguishing", has: false },
      { label: "Not ideal around kids or pets", has: false },
    ],
    price: "$35.00",
    productUrl: "/products/candle",
  },
  {
    id: "spray",
    dark: false,
    imageSrc: "/assets/spray-product.png",
    imageAlt: "Air Spray",
    productName: "Air Spray",
    features: [
      { label: "Aerosol or heated release", has: false },
      { label: "Feels sharp or overpowering", has: false },
      { label: "Short-lived coverage", has: false },
      { label: "Frequent re-spraying or refills", has: false },
    ],
    price: "$12.00",
    productUrl: "/products/air-spray",
  },
];

const certBadges = [
  "IFRA certified Badge",
  "Vegan",
  "Cruelty Free",
  "No Phthalphates",
  "No Parabens",
  "Safe For Kids & Pets",
];

export default function ComparisonSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBanner, setHoveredBanner] = useState(false);

  const cardScale = (id) => ({
    transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
    transform: hoveredCard === id ? "scale(1.04)" : "scale(1)",
    boxShadow: hoveredCard === id
      ? "0 24px 60px rgba(0,0,0,0.28)"
      : id === "fragra" ? "0 12px 40px rgba(0,0,0,0.18)" : "0 2px 12px rgba(0,0,0,0.06)",
    cursor: "pointer",
  });

  return (
    <section style={{ background: "#EDE9E1", padding: "80px 24px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#888", textTransform: "uppercase", marginBottom: 10 }}>
            Not All Home Fragrance Is Equal
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34, fontWeight: 400, color: "#1A1A1A", margin: "0 0 12px" }}>
            The Scenting System Designed For Real Homes
          </h2>
          <p style={{ fontSize: 13, color: "#717171", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
            Frägra helps neutralize everyday odors while delivering a clean, consistent scent—without flames or sprays.
          </p>
        </div>

        {/* ── 3 Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, alignItems: "stretch" }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: card.dark ? "#1A1A1A" : "white",
                borderRadius: 20,
                overflow: "hidden",
                border: card.dark ? "none" : "1px solid #E5E1D8",
                display: "flex",
                flexDirection: "column",
                ...cardScale(card.id),
              }}
            >
              {/* Photo — same height for all */}
              <div style={{ height: 200, background: card.dark ? "#111" : "#EDE9E1", overflow: "hidden", flexShrink: 0 }}>
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>

              {/* Features */}
              <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                {card.features.map((f) => (
                  <div key={f.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
                    {f.has ? <Check /> : <Cross />}
                    <span style={{ color: card.dark ? "rgba(255,255,255,0.75)" : "#717171", fontSize: 12, lineHeight: 1.4 }}>
                      {f.label}
                    </span>
                  </div>
                ))}

                {/* Price */}
                <div style={{ marginTop: "auto", paddingTop: 16, borderTop: `1px solid ${card.dark ? "rgba(255,255,255,0.08)" : "#E5E1D8"}` }}>
                  {/* Clickable price → new tab */}
                  <a
                    href={card.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Lihat detail & beli ${card.imageAlt}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      textDecoration: "none",
                      marginBottom: card.cta ? 12 : 0,
                      padding: "6px 0",
                      borderRadius: 8,
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                  >
                    <span style={{ fontFamily: "Georgia, serif", fontSize: card.dark ? 22 : 18, color: card.dark ? "white" : "#1A1A1A" }}>
                      {card.price}
                    </span>
                    {card.originalPrice && (
                      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, textDecoration: "line-through" }}>
                        {card.originalPrice}
                      </span>
                    )}
                    {/* external link icon */}
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ opacity: 0.4 }}>
                      <path d="M2 10L10 2M10 2H4M10 2v6" stroke={card.dark ? "white" : "#1A1A1A"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>

                  {/* CTA button (Frägra only) */}
                  {card.cta && (
                    <a
                      href={card.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                        background: "white", color: "#1A1A1A",
                        borderRadius: 999, fontSize: 12, fontWeight: 600,
                        padding: "10px 0", textDecoration: "none",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#F3F0E9"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "white"}
                    >
                      {card.cta}
                      <span style={{
                        width: 18, height: 18, background: "#1A1A1A", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                          <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── 30-Day Banner ── */}
        <div
          onMouseEnter={() => setHoveredBanner(true)}
          onMouseLeave={() => setHoveredBanner(false)}
          style={{
            marginTop: 20,
            borderRadius: 20,
            overflow: "hidden",
            position: "relative",
            minHeight: 220,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
            transform: hoveredBanner ? "scale(1.02)" : "scale(1)",
            boxShadow: hoveredBanner ? "0 24px 60px rgba(0,0,0,0.25)" : "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src="/assets/hero-bg.jpg"
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center",
              transition: "transform 0.6s ease",
              transform: hoveredBanner ? "scale(1.04)" : "scale(1)",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.background = "#2A2520";
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(20,18,15,0.55)" }} />

          <div style={{ position: "relative", zIndex: 1, padding: "40px 40px" }}>
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "#1A1A1A", border: "2px solid rgba(255,255,255,0.2)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              marginBottom: 16,
            }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: 18, lineHeight: 1 }}>30</span>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>DAYS</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>
              Scent the Difference.
            </p>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: "white", fontWeight: 400, margin: "0 0 10px" }}>
              30-Day Hassle Free Returns
            </h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, lineHeight: 1.7, maxWidth: 340, marginBottom: 20 }}>
              If Frägra doesn't noticeably improve how your home smells and feels within 30 days, return it for a full refund. *Conditions Apply.
            </p>
            <a
              href="/guarantee"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#EDE9E1", color: "#1A1A1A",
                borderRadius: 999, padding: "10px 20px",
                fontSize: 12, fontWeight: 600, textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "white"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#EDE9E1"}
            >
              Try Frägra Risk-Free
              <span style={{
                width: 22, height: 22, background: "#1A1A1A", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* ── Badge Bar ── */}
        <div style={{
          marginTop: 24,
          display: "flex", flexWrap: "wrap",
          alignItems: "center", justifyContent: "center",
          gap: "8px 28px",
        }}>
          {certBadges.map((b) => (
            <div key={b} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%", background: "#1A1A1A",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 11, color: "#717171" }}>{b}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}