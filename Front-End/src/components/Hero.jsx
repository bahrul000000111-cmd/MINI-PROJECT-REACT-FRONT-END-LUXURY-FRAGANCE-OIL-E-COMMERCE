import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg.png';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1A1A1A]">

      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury diffuser background"
          className="w-full h-full object-cover opacity-70"
        />
        {/* Gradient overlay kiri agar teks terbaca */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24 pb-16">
        <div className="max-w-xl">

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight mb-4">
            Your Sanctuary,<br />
            Scented Like a 5-Star{" "}
            <span className="text-[#C9A96E] italic">Luxury Resort.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/70 text-base mb-6 leading-relaxed max-w-md font-sans">
            Exquisite cold-air diffusers paired with our most coveted fragrance oils.
            No Heat, No Water, just pure, uncompromising ambiance.
          </p>

          {/* Feature List */}
          <ul className="flex flex-col gap-3 mb-8">
            {[
              "Curate an atmosphere of uncompromising luxury.",
              "Formulated safely for children and pets.",
              "Effortless scent replenishment, pure tranquility.",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80 text-sm font-sans tracking-wide">
                <span className="w-4 h-4 rounded-full border border-white/40 flex items-center justify-center flex-shrink-0">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-3">
              <Link
                to="/info/shop-now"
                className="inline-flex items-center gap-2 bg-[#F3F0E9] text-[#1A1A1A] text-sm font-medium px-8 py-3.5 rounded-full hover:bg-white hover:scale-105 hover:shadow-lg transition-all duration-500 ease-in-out font-sans uppercase tracking-wider"
              >
                Curate Your Collection
                <span className="w-6 h-6 bg-[#1A1A1A] rounded-full flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2v6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </Link>
            </div>
            <p className="flex items-center gap-1 text-white/50 text-xs">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5.5 8l2 2L10.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              30-Day Risk-Free Guarantee
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Badge Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🛡", label: "SAFE FOR KIDS & PETS" },
            { icon: "🚫", label: "NO FLAMES NO WATER" },
            { icon: "✦", label: "HOTEL LEVEL SCENTING" },
            { icon: "🇺🇸", label: "MADE IN THE USA" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-white/70">
              <span className="text-sm">{icon}</span>
              <span className="text-xs tracking-widest font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}