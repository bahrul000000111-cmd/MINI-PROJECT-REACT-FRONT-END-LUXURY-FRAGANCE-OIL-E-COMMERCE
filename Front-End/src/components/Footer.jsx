import { Link } from "react-router-dom";
import { labelToSlug } from "../data/contentData";

const footerLinks = {
  Belanja: ["Belanja Semua", "Diffuser Aroma", "Koleksi Premium", "Koleksi Desainer", "Parfum", "Set Hadiah"],
  Dukungan: ["FAQ", "Pengiriman & Pengembalian", "Lacak Pesanan", "Hubungi Kami", "Garansi"],
  Perusahaan: ["Tentang Frägra", "Cerita Kami", "Pers", "Karir", "Keberlanjutan"],
  Legal: ["Kebijakan Privasi", "Syarat Layanan", "Kebijakan Cookie"],
};

const socials = [
  {
    label: "Instagram", url: "https://instagram.com",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>),
  },
  {
    label: "TikTok", url: "https://tiktok.com",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z"/></svg>),
  },
  {
    label: "Pinterest", url: "https://pinterest.com",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.26-5.33 1.26-5.33s-.32-.64-.32-1.59c0-1.49.86-2.6 1.93-2.6.91 0 1.35.68 1.35 1.5 0 .91-.58 2.28-.88 3.55-.25 1.06.53 1.92 1.56 1.92 1.87 0 3.13-2.4 3.13-5.24 0-2.16-1.46-3.77-4.1-3.77-2.99 0-4.85 2.24-4.85 4.74 0 .86.25 1.46.64 1.92.18.21.21.29.14.53-.05.17-.15.58-.19.74-.06.24-.25.33-.46.24-1.32-.54-1.93-1.99-1.93-3.62 0-2.69 2.27-5.93 6.79-5.93 3.63 0 6.02 2.63 6.02 5.45 0 3.73-2.07 6.53-5.12 6.53-1.02 0-1.99-.55-2.32-1.18l-.63 2.45c-.23.87-.84 1.96-1.25 2.62.94.28 1.94.44 2.97.44 5.52 0 10-4.48 10-10S17.52 2 12 2z"/></svg>),
  },
];

const bottomLinks = [
  { label: "Kebijakan Privasi", slug: "privacy-policy" },
  { label: "Syarat Layanan", slug: "terms-of-service" },
  { label: "Kebijakan Cookie", slug: "cookie-policy" },
];

// Re-map the indonesian translation to the english labels for slug mapping
const idToEnMap = {
  "Belanja Semua": "Shop All",
  "Diffuser Aroma": "Scent Diffusers",
  "Koleksi Premium": "Hotel Collection",
  "Koleksi Desainer": "Designer Collection",
  "Parfum": "Perfumes",
  "Set Hadiah": "Gift Sets",
  "FAQ": "FAQ",
  "Pengiriman & Pengembalian": "Shipping & Returns",
  "Lacak Pesanan": "Track My Order",
  "Hubungi Kami": "Contact Us",
  "Garansi": "Warranty",
  "Tentang Frägra": "About Frägra",
  "Cerita Kami": "Our Story",
  "Pers": "Press",
  "Karir": "Careers",
  "Keberlanjutan": "Sustainability",
  "Kebijakan Privasi": "Privacy Policy",
  "Syarat Layanan": "Terms of Service",
  "Kebijakan Cookie": "Cookie Policy",
};

function toHref(label) {
  const enLabel = idToEnMap[label] || label;
  const slug = labelToSlug[enLabel] ?? enLabel.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
  return `/info/${slug}`;
}

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-24 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1.5">
            <div className="font-serif text-3xl mb-4 text-[#C9A96E]">
              Fr<em className="font-normal italic">ä</em>gra.
            </div>
            <p className="font-sans text-sm text-white/60 leading-relaxed mb-8 max-w-xs font-light">
              Diffuser udara dingin premium yang menghadirkan keharuman setaraf hotel ke rumah Anda.
            </p>
            <div className="flex gap-4">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300 hover:scale-110"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-sans text-xs tracking-[0.15em] text-[#C9A96E] uppercase mb-6 font-semibold">
                {heading}
              </p>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={toHref(link)}
                      className="font-sans text-sm text-white/60 hover:text-white transition-colors duration-300 font-light block"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A96E]/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="text-center lg:text-left relative z-10">
            <h4 className="font-serif text-2xl text-white mb-2">Dapatkan diskon 10% untuk pesanan pertama Anda</h4>
            <p className="font-sans text-sm text-white/60 font-light">Berlangganan untuk penawaran eksklusif dan inspirasi aroma langsung ke kotak masuk Anda.</p>
          </div>
          <div className="flex w-full lg:w-auto gap-3 relative z-10 flex-col sm:flex-row">
            <input type="email" placeholder="Alamat email Anda"
              className="bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white font-sans text-sm focus:outline-none focus:border-[#C9A96E] transition-colors duration-300 w-full sm:w-72 placeholder:text-white/30"
            />
            <button className="bg-white text-[#1A1A1A] rounded-full px-8 py-4 font-sans text-sm font-semibold hover:bg-[#C9A96E] hover:text-white transition-all duration-300 shadow-[0_4px_14px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_14px_rgba(201,169,110,0.4)] whitespace-nowrap">
              Langganan
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
          <p className="font-sans text-xs text-white/40 font-light">
            © 2026 Frägra. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex gap-6">
            {bottomLinks.map(({ label, slug }) => (
              <Link key={label} to={`/info/${slug}`}
                className="font-sans text-xs text-white/40 hover:text-white transition-colors duration-300 font-light"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}