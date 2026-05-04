import { useState } from "react";

function Check() {
  return (
    <div className="w-6 h-6 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0 shadow-sm">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function Cross() {
  return (
    <div className="w-6 h-6 rounded-full bg-[#F3F0E9] flex items-center justify-center flex-shrink-0 border border-[#E5E1D8]">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
        <path d="M3 3l6 6M9 3l-6 6" stroke="#9B3B3B" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

const cards = [
  {
    id: "fragra",
    dark: true,
    imageSrc: "https://images.unsplash.com/photo-1600612253971-1e7b97b4b048?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Frägra Cold-Air Diffuser",
    productName: "Frägra Diffuser",
    features: [
      { label: "Teknologi Difusi Udara Dingin", has: true },
      { label: "Aman untuk Anak & Hewan Peliharaan", has: true },
      { label: "Aroma Bersih, Tanpa Residu", has: true },
      { label: "Menetralkan Bau Tidak Sedap", has: true },
    ],
    price: "$89.00",
    originalPrice: "$120.00",
    productUrl: "/info/scent-diffusers",
    cta: "Beli Frägra",
  },
  {
    id: "candle",
    dark: false,
    imageSrc: "https://images.unsplash.com/photo-1608181831718-c9e3c34f5c5a?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Traditional Scented Candle",
    productName: "Lilin Aroma (Candle)",
    features: [
      { label: "Membutuhkan panas dan api terbuka", has: false },
      { label: "Dapat menghasilkan jelaga dan residu", has: false },
      { label: "Aroma cepat memudar setelah dimatikan", has: false },
      { label: "Kurang aman di sekitar anak atau hewan", has: false },
    ],
    price: "$35.00",
    productUrl: "/info/shop-all",
  },
  {
    id: "spray",
    dark: false,
    imageSrc: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop",
    imageAlt: "Generic Air Freshener Spray",
    productName: "Semprotan Udara (Spray)",
    features: [
      { label: "Pelepasan aerosol atau dipanaskan", has: false },
      { label: "Terasa tajam atau menyengat", has: false },
      { label: "Cakupan wangi hanya sebentar", has: false },
      { label: "Sering perlu disemprot ulang", has: false },
    ],
    price: "$12.00",
    productUrl: "/info/shop-all",
  },
];

const certBadges = [
  "IFRA Tersertifikasi",
  "Vegan",
  "Bebas Kekejaman",
  "Tanpa Phthalate",
  "Tanpa Paraben",
  "Aman untuk Anak & Hewan",
];

export default function ComparisonSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBanner, setHoveredBanner] = useState(false);

  return (
    <section className="bg-[#F9F8F6] py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.2em] text-[#C9A96E] uppercase mb-4 font-medium">
            Tidak Semua Pengharum Ruangan Diciptakan Sama
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-5 tracking-tight">
            Sistem Pewangian yang Dirancang untuk Hunian Anda
          </h2>
          <p className="font-sans text-base text-[#717171] max-w-2xl mx-auto leading-relaxed font-light">
            Frägra membantu menetralkan bau sehari-hari sambil memberikan aroma yang bersih dan konsisten — tanpa api atau semprotan aerosol.
          </p>
        </div>

        {/* ── 3 Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {cards.map((card) => (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`rounded-3xl overflow-hidden flex flex-col transition-all duration-500 ease-out ${
                card.dark ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A] border border-[#E5E1D8]'
              }`}
              style={{
                transform: hoveredCard === card.id ? "scale(1.03) translateY(-8px)" : "scale(1) translateY(0)",
                boxShadow: hoveredCard === card.id
                  ? "0 30px 60px rgba(0,0,0,0.15)"
                  : card.dark ? "0 10px 40px rgba(26,26,26,0.15)" : "0 4px 20px rgba(0,0,0,0.03)",
                zIndex: hoveredCard === card.id ? 10 : 1,
              }}
            >
              {/* Image Container */}
              <div className={`h-64 overflow-hidden flex-shrink-0 flex items-center justify-center relative p-6 ${card.dark ? 'bg-[#111]' : 'bg-[#FAFAF8]'}`}>
                {card.dark && <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none" />}
                <img
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  loading="lazy"
                  className={`w-full h-full object-contain transition-transform duration-700 ease-out ${hoveredCard === card.id ? 'scale-110' : 'scale-100'}`}
                  style={{ filter: card.dark ? "drop-shadow(0 20px 30px rgba(0,0,0,0.5))" : "drop-shadow(0 10px 20px rgba(0,0,0,0.08))" }}
                />
              </div>

              {/* Title & Features */}
              <div className="p-8 flex flex-col gap-6 flex-1">
                <h3 className="font-serif text-2xl text-center border-b border-white/10 pb-4">
                  {card.productName}
                </h3>
                
                <div className="flex flex-col gap-4">
                  {card.features.map((f) => (
                    <div key={f.label} className="flex items-start gap-4">
                      {f.has ? <Check /> : <Cross />}
                      <span className={`font-sans text-sm leading-relaxed pt-0.5 ${card.dark ? "text-white/90" : "text-[#717171]"}`}>
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className={`mt-auto pt-8 border-t ${card.dark ? "border-white/10" : "border-[#E5E1D8]"}`}>
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <span className="font-serif text-3xl">
                      {card.price}
                    </span>
                    {card.originalPrice && (
                      <span className={`font-sans text-sm line-through ${card.dark ? 'text-white/40' : 'text-[#A09D96]'}`}>
                        {card.originalPrice}
                      </span>
                    )}
                  </div>

                  {card.cta && (
                    <a
                      href={card.productUrl}
                      className={`group flex items-center justify-center gap-3 w-full py-4 rounded-full font-sans text-sm font-semibold transition-all duration-300 ${
                        card.dark ? 'bg-[#C9A96E] text-white hover:bg-[#B5955A] shadow-[0_4px_14px_rgba(201,169,110,0.4)]' : 'bg-[#1A1A1A] text-white hover:bg-[#333]'
                      }`}
                    >
                      {card.cta}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
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
          className="mt-12 rounded-3xl overflow-hidden relative min-h-[280px] flex items-center cursor-pointer transition-all duration-500"
          style={{
            transform: hoveredBanner ? "scale(1.02)" : "scale(1)",
            boxShadow: hoveredBanner ? "0 30px 60px rgba(0,0,0,0.2)" : "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1616489953149-8f6f598c199e?q=80&w=1200&auto=format&fit=crop"
            alt="Frägra Guarantee Background"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out ${hoveredBanner ? 'scale-105' : 'scale-100'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

          <div className="relative z-10 p-10 md:p-14 max-w-lg">
            <div className="w-16 h-16 rounded-full border border-[#C9A96E] bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center mb-6">
              <span className="text-white font-serif text-2xl leading-none">30</span>
              <span className="text-[#C9A96E] font-sans text-[9px] tracking-widest uppercase mt-1">HARI</span>
            </div>
            
            <p className="text-[#C9A96E] font-sans text-xs tracking-[0.2em] uppercase mb-3 font-medium">
              Rasakan Perbedaannya.
            </p>
            <h3 className="font-serif text-3xl md:text-4xl text-white mb-4">
              30 Hari Pengembalian Bebas Repot
            </h3>
            <p className="text-white/70 font-sans text-sm leading-relaxed mb-8 font-light">
              Jika Frägra tidak secara signifikan meningkatkan kualitas aroma ruangan Anda dalam 30 hari, kembalikan untuk pengembalian dana penuh. *Syarat & Ketentuan Berlaku.
            </p>
            <a
              href="/info/faq"
              className="inline-flex items-center gap-3 bg-white text-[#1A1A1A] rounded-full px-6 py-3 font-sans text-sm font-semibold hover:bg-[#F3F0E9] transition-colors duration-300 shadow-lg group"
            >
              Coba Frägra Tanpa Risiko
              <span className="w-6 h-6 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* ── Badge Bar ── */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-[#E5E1D8] pt-8">
          {certBadges.map((b) => (
            <div key={b} className="flex items-center gap-2.5 opacity-70 hover:opacity-100 transition-opacity duration-300">
              <div className="w-5 h-5 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-sans text-xs font-medium tracking-wide text-[#717171] uppercase">{b}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}