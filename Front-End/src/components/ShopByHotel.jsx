import { useState } from "react";

const articles = [
  {
    id: 1,
    name: "Cara Memilih Aroma Mewah yang Tepat untuk Ruang Tamu Anda",
    category: "Panduan",
    date: "15 Jun 2025",
    // Image strictly perfume/diffuser themed
    image: "https://images.unsplash.com/photo-1541643600914-78b084683702?q=80&w=600&auto=format&fit=crop",
    tag: "Populer",
    url: "/info/hotel-collection",
  },
  {
    id: 2,
    name: "Seni Difusi: Waktu Terbaik Menyebarkan Aroma di Rumah",
    category: "Artikel",
    date: "21 Nov 2025",
    // Image strictly perfume/diffuser themed
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600&auto=format&fit=crop",
    tag: "Baru",
    url: "/info/scent-diffusers",
  },
  {
    id: 3,
    name: "Bahan Keharuman Premium yang Digunakan oleh Resor Bintang 5",
    category: "Panduan",
    date: "18 Jun 2025",
    // Image strictly perfume/diffuser themed
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=600&auto=format&fit=crop",
    tag: "Pilihan Editor",
    url: "/info/designer-collection",
  },
];

export default function ShopByHotel() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="bg-white py-24 px-6 border-t border-[#E5E1D8]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="font-sans text-xs tracking-[0.2em] text-[#C9A96E] uppercase mb-4 font-medium">
              Eksplorasi Jurnal
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-tight tracking-tight">
              Panduan Keharuman
            </h2>
          </div>
          <a
            href="/info/shop-all"
            className="inline-flex items-center gap-3 border border-[#D4D0C8] text-[#1A1A1A] rounded-full px-6 py-2.5 font-sans text-sm font-semibold hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300 group shadow-sm hover:shadow-lg"
          >
            Baca Semua Jurnal
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item) => (
            <a
              key={item.id}
              href={item.url}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              className="block rounded-3xl overflow-hidden bg-white border border-[#E5E1D8] transition-all duration-500 ease-out group hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
            >
              {/* Image */}
              <div className="h-60 bg-[#FAFAF8] overflow-hidden relative">
                <div className="absolute inset-0 bg-black/5 z-10 group-hover:opacity-0 transition-opacity duration-500" />
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${hovered === item.id ? 'scale-110' : 'scale-100'}`}
                />
                {/* Tag */}
                {item.tag && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#1A1A1A] font-sans text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full shadow-sm z-20">
                    {item.tag}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-sans text-[11px] font-medium tracking-[0.1em] text-[#C9A96E] uppercase">
                    {item.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#E5E1D8]" />
                  <span className="font-sans text-[11px] text-[#A09D96] tracking-wider uppercase">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[#1A1A1A] leading-snug group-hover:text-[#C9A96E] transition-colors duration-300">
                  {item.name}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}