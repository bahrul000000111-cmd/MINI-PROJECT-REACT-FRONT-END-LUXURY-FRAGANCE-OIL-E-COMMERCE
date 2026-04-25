const footerLinks = {
  Shop: ["Shop All", "Scent Diffusers", "Hotel Collection", "Designer Collection", "Perfumes", "Gift Sets"],
  Support: ["FAQ", "Shipping & Returns", "Track My Order", "Contact Us", "Warranty"],
  Company: ["About Frägra", "Our Story", "Press", "Careers", "Sustainability"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const socials = [
  {
    label: "Instagram",
    url: "https://instagram.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "TikTok",
    url: "https://tiktok.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z"/>
      </svg>
    ),
  },
  {
    label: "Pinterest",
    url: "https://pinterest.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.26-5.33 1.26-5.33s-.32-.64-.32-1.59c0-1.49.86-2.6 1.93-2.6.91 0 1.35.68 1.35 1.5 0 .91-.58 2.28-.88 3.55-.25 1.06.53 1.92 1.56 1.92 1.87 0 3.13-2.4 3.13-5.24 0-2.16-1.46-3.77-4.1-3.77-2.99 0-4.85 2.24-4.85 4.74 0 .86.25 1.46.64 1.92.18.21.21.29.14.53-.05.17-.15.58-.19.74-.06.24-.25.33-.46.24-1.32-.54-1.93-1.99-1.93-3.62 0-2.69 2.27-5.93 6.79-5.93 3.63 0 6.02 2.63 6.02 5.45 0 3.73-2.07 6.53-5.12 6.53-1.02 0-1.99-.55-2.32-1.18l-.63 2.45c-.23.87-.84 1.96-1.25 2.62.94.28 1.94.44 2.97.44 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1A1A1A", color: "white", padding: "60px 24px 32px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Top: Logo + Links */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 1fr", gap: 32, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 22, marginBottom: 14 }}>
              Fr<em>ä</em>gra.
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 20, maxWidth: 200 }}>
              Premium cold-air diffusers that bring hotel-level scenting to your home.
            </p>
            {/* Socials */}
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.55)", textDecoration: "none",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "white"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>
                {heading}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.55)"}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: 16, padding: "24px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 20, marginBottom: 40,
          border: "1px solid rgba(255,255,255,0.08)",
          flexWrap: "wrap",
        }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Get 10% off your first order</p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Subscribe for exclusive offers and scent inspiration.</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999, padding: "10px 18px",
                color: "white", fontSize: 12, outline: "none",
                width: 220,
              }}
            />
            <button style={{
              background: "white", color: "#1A1A1A",
              borderRadius: 999, padding: "10px 20px",
              fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer",
              transition: "background 0.2s",
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#F3F0E9"}
              onMouseLeave={(e) => e.currentTarget.style.background = "white"}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
            © 2025 Frägra. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms", "Cookies"].map((item) => (
              <a key={item} href="#" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}
              >
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}