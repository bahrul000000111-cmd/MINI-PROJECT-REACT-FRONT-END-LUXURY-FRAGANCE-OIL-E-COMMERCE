import { useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Suzanne B.",
    rating: 5,
    text: "Awalnya saya ragu, tetapi diffuser ini benar-benar mengubah suasana rumah saya. Aromanya memiliki kedalaman dan kompleksitas yang tidak bisa Anda dapatkan dari pengharum ruangan biasa. Anda layak mendapatkan ini.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=300&h=300&auto=format&fit=crop",
    verified: true,
  },
  {
    id: 2,
    name: "Michelle R.",
    rating: 5,
    text: "Setiap kali saya masuk ke ruang tamu, rasanya seperti di resor bintang 5. Tamu saya selalu bertanya lilin apa yang saya bakar — ini bukan lilin, ini Frägra.",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=300&h=300&auto=format&fit=crop",
    verified: true,
  },
  {
    id: 3,
    name: "James T.",
    rating: 5,
    text: "Aman untuk anjing dan anak-anak saya, dan wanginya bertahan SEPANJANG hari. Saya sudah mencoba semuanya — ini satu-satunya yang benar-benar bekerja secara konsisten.",
    image: "https://images.unsplash.com/photo-1608528577891-eb0559d6ba10?q=80&w=300&h=300&auto=format&fit=crop",
    verified: true,
  },
  {
    id: 4,
    name: "Diana K.",
    rating: 5,
    text: "Saya membelinya sebagai hadiah dan akhirnya memesan satu untuk saya sendiri di minggu yang sama. Koleksi aroma hotelnya sungguh luar biasa.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=300&h=300&auto=format&fit=crop",
    verified: true,
  },
  {
    id: 5,
    name: "Robert A.",
    rating: 5,
    text: "Tidak ada lagi tumpahan lilin, tidak perlu lagi khawatir dengan api. Hanya keharuman yang bersih dan tahan lama. Sepadan dengan setiap sen yang dikeluarkan.",
    image: "https://images.unsplash.com/photo-1612015091720-d4fa2dd17e17?q=80&w=300&h=300&auto=format&fit=crop",
    verified: true,
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="#C9A96E">
          <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z" />
        </svg>
      ))}
    </div>
  );
}

export default function SocialProof() {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const CARD_WIDTH = 356; // 340 width + 16 gap

  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeft - (x - startX);
  };
  const onMouseUp = () => setIsDragging(false);

  const scrollTo = (index) => {
    const clamped = Math.max(0, Math.min(index, testimonials.length - 1));
    setActiveIndex(clamped);
    sliderRef.current.scrollTo({ left: clamped * CARD_WIDTH, behavior: "smooth" });
  };

  const onScroll = () => {
    if (!sliderRef.current) return;
    const index = Math.round(sliderRef.current.scrollLeft / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <section className="bg-white py-24 overflow-hidden border-t border-[#F3F0E9]">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs tracking-[0.2em] text-[#C9A96E] uppercase mb-4 font-medium">
            50.000+ Ulasan Bintang 5
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] leading-[1.2] mb-5">
            Mengapa Ribuan Rumah<br className="hidden md:block" /> Beralih ke Frägra
          </h2>
          <p className="font-sans text-[#717171] text-base max-w-lg mx-auto leading-relaxed font-light">
            Pelanggan asli, hasil nyata. Lihat apa yang mereka katakan setelah merasakan keajaiban aroma di rumah mereka.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="flex items-center justify-center gap-3 mb-14 bg-[#FAFAF8] w-fit mx-auto px-6 py-3 rounded-full border border-[#E5E1D8]">
          <StarRating count={5} />
          <p className="font-sans text-sm text-[#717171] font-medium">
            <span className="text-[#1A1A1A]">4.9 / 5</span> — Berdasarkan 50.000+ ulasan
          </p>
        </div>
      </div>

      {/* Slider Track */}
      <div
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto pb-10 pt-4"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          userSelect: "none",
          paddingLeft: "calc((100vw - 1152px) / 2 + 24px)",
          paddingRight: "calc((100vw - 1152px) / 2 + 24px)",
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex-shrink-0 bg-[#FAFAF8] rounded-2xl overflow-hidden border border-[#E5E1D8] flex flex-col group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-2"
            style={{ width: 340 }}
          >
            {/* Photo - Abstract Perfume Imagery */}
            <div
              className="h-56 overflow-hidden flex items-center justify-center relative"
              style={{ background: "#EAE6DF" }}
            >
              <div className="absolute inset-0 bg-black/10 z-10 group-hover:opacity-0 transition-opacity duration-500" />
              <img
                src={t.image}
                alt="Frägra customer review scent abstract"
                loading="lazy"
                draggable="false"
                className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col gap-4 flex-1 bg-white">
              <StarRating count={t.rating} />
              <p className="text-[#1A1A1A] font-serif text-base leading-relaxed flex-1 pt-2">
                "{t.text}"
              </p>
              <div className="flex items-center justify-between pt-6 mt-4 border-t border-[#E5E1D8]">
                <span className="font-sans text-sm font-semibold text-[#1A1A1A] tracking-wide">— {t.name}</span>
                {t.verified && (
                  <span className="flex items-center gap-1.5 font-sans text-xs text-[#C9A96E] font-medium tracking-wide uppercase">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#C9A96E" strokeWidth="1.5" />
                      <path d="M5 8l2 2L11 6" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Terverifikasi
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        {/* Spacer for proper right padding on scroll */}
        <div className="flex-shrink-0 w-4" />
      </div>

      {/* Dots + Arrows */}
      <div className="max-w-6xl mx-auto px-6 mt-2 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-2.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all duration-500"
              style={{
                width: activeIndex === i ? 32 : 10,
                height: 10,
                background: activeIndex === i ? "#C9A96E" : "#E5E1D8",
              }}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-12 h-12 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-[#1A1A1A]"
            aria-label="Previous testimonial"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === testimonials.length - 1}
            className="w-12 h-12 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed text-[#1A1A1A]"
            aria-label="Next testimonial"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}