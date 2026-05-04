import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1A1A1A]">

      {/* Background Image - Parfum Theme Only */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://images.unsplash.com/photo-1616606103915-dea7be788566?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury diffuser background"
          className="w-full h-full object-cover opacity-60 scale-105 transform origin-center animate-[pulse_20s_ease-in-out_infinite_alternate]"
        />
        {/* Gradient overlay agar teks terbaca */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-32 pb-24">
        <div className="max-w-2xl">

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] mb-6 tracking-tight">
            Jadikan Rumah Anda,<br />
            Seharum Hotel Mewah <span className="text-[#C9A96E] italic">Bintang 5.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/80 text-lg md:text-xl font-sans mb-8 leading-relaxed max-w-lg font-light">
            Diffuser aroma tanpa panas dan tanpa air dengan koleksi parfum premium kami. Aroma murni, bersih, dan konsisten setiap hari.
          </p>

          {/* Feature List */}
          <ul className="flex flex-col gap-4 mb-10">
            {[
              "Ciptakan atmosfer resor mewah di ruang tamu Anda.",
              "Aman untuk Anak & Hewan Peliharaan.",
              "Pengisian ulang yang praktis, bebas repot.",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/90 text-base font-sans font-light">
                <span className="w-5 h-5 rounded-full border border-[#C9A96E] bg-[#C9A96E]/10 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <Link
              to="/info/shop-now"
              className="inline-flex items-center gap-3 bg-white text-[#1A1A1A] font-sans text-sm font-medium px-8 py-4 rounded-full hover:bg-[#F3F0E9] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] transition-all duration-300 transform hover:-translate-y-1"
            >
              Rakit Set Anda Sekarang
              <span className="w-7 h-7 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
            
            <div className="flex items-center gap-2 text-white/60 text-sm font-sans">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5.5 8l2 2L10.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Garansi 30 Hari Bebas Risiko
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Badge Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🛡", label: "AMAN UNTUK ANAK & HEWAN" },
            { icon: "🚫", label: "TANPA API & TANPA AIR" },
            { icon: "✦", label: "AROMA KELAS HOTEL" },
            { icon: "🍃", label: "BAHAN NATURAL PREMIUM" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-3 text-white/80 group cursor-default">
              <span className="text-lg group-hover:scale-110 transition-transform duration-300">{icon}</span>
              <span className="text-[10px] tracking-widest font-sans font-semibold text-white/70">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}