import { useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Suzanne B.",
    rating: 5,
    text: "I was skeptical at first, but this diffuser has completely transformed my home. The fragrance has depth and complexity that you just can't get from basic air fresheners. You deserve this.",
    image: "/assets/testimonial-1.jpg",
    verified: true,
  },
  {
    id: 2,
    name: "Michelle R.",
    rating: 5,
    text: "Every time I walk into my living room it smells like a 5-star resort. My guests always ask what candle I'm burning — it's not a candle, it's Frägra.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
    verified: true,
  },
  {
    id: 3,
    name: "James T.",
    rating: 5,
    text: "Safe for my dogs and kids, and the scent lasts ALL day. I've tried everything — this is the only one that actually works consistently.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
    verified: true,
  },
  {
    id: 4,
    name: "Diana K.",
    rating: 5,
    text: "I bought it as a gift and ended up ordering one for myself the same week. The hotel scent collection is absolutely divine.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
    verified: true,
  },
  {
    id: 5,
    name: "Robert A.",
    rating: 5,
    text: "No more candle wax mess, no more worrying about open flames. Just clean, long-lasting scent. Worth every penny.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop&crop=face",
    verified: true,
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 16 16" fill="#E8A838">
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

  const CARD_WIDTH = 340; // card width + gap

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
    const index = Math.round(sliderRef.current.scrollLeft / CARD_WIDTH);
    setActiveIndex(index);
  };

  return (
    <section className="bg-[#F3F0E9] py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs tracking-widest text-[#717171] uppercase mb-3">
            50,000+ 5-Star Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] leading-snug">
            Why Thousands of Homes Are<br className="hidden md:block" /> Switching to Frägra
          </h2>
          <p className="text-[#717171] text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Real customers, real results. See what people are saying after making the switch.
          </p>
        </div>

        {/* Rating Summary */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="#E8A838">
                <path d="M8 1l1.8 3.6 4 .6-2.9 2.8.7 4L8 10l-3.6 1.9.7-4L2.2 5.2l4-.6z" />
              </svg>
            ))}
          </div>
          <p className="text-sm text-[#717171]">
            <span className="text-[#1A1A1A] font-medium">4.9 / 5</span> — 50,000+ reviews
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
        className="flex gap-5 overflow-x-auto pb-4"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
          userSelect: "none",
          paddingLeft: "calc((100vw - 1024px) / 2 + 24px)",
          paddingRight: "calc((100vw - 1024px) / 2 + 24px)",
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex-shrink-0 bg-white rounded-2xl overflow-hidden border border-[#E5E1D8] flex flex-col"
            style={{ width: 320 }}
          >
            {/* Photo */}
            <div
              className="h-48 overflow-hidden flex items-center justify-center"
              style={{ background: "#D3D1C7" }}
            >
              <img
                src={t.image}
                alt={`${t.name} — Frägra customer review`}
                loading="lazy"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=E5E1D8&color=1A1A1A&size=150&font-size=0.4`;
                }}
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3 flex-1">
              <StarRating count={t.rating} />
              <p className="text-[#1A1A1A] font-serif text-sm leading-relaxed italic flex-1">
                "{t.text}"
              </p>
              <div className="flex items-center justify-between pt-3 border-t border-[#E5E1D8]">
                <span className="text-sm font-medium text-[#1A1A1A]">— {t.name}</span>
                {t.verified && (
                  <span className="flex items-center gap-1 text-xs text-[#717171]">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#717171" strokeWidth="1.2" />
                      <path d="M5 8l2 2L11 6" stroke="#717171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="flex-shrink-0 w-1" />
      </div>

      {/* Dots + Arrows */}
      <div className="max-w-5xl mx-auto px-6 mt-6 flex items-center justify-between">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? 24 : 8,
                height: 8,
                background: activeIndex === i ? "#1A1A1A" : "#C9C5BB",
              }}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => scrollTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-10 h-10 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-[#1A1A1A]"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo(activeIndex + 1)}
            disabled={activeIndex === testimonials.length - 1}
            className="w-10 h-10 rounded-full border border-[#E5E1D8] flex items-center justify-center hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all disabled:opacity-30 disabled:cursor-not-allowed text-[#1A1A1A]"
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}